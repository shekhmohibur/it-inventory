import React from "react";
import { PrismaClient } from "@prisma/client";
import { RolesOverview } from "@/components/RolesOverview";
import {
  PERMISSION_GROUPS_COLUMN_1,
  PERMISSION_GROUPS_COLUMN_2,
  PERMISSION_GROUPS_COLUMN_3,
} from "@/lib/permissionsMatrix";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "User Roles | KKL Inventory",
};

export default async function UserRolesListPage() {
  // 1. Ensure default Owner & Trainee roles exist
  try {
    const allMatrixKeys = [];
    [
      ...PERMISSION_GROUPS_COLUMN_1,
      ...PERMISSION_GROUPS_COLUMN_2,
      ...PERMISSION_GROUPS_COLUMN_3,
    ].forEach((grp) => {
      grp.permissions.forEach((p) => allMatrixKeys.push(p.key));
    });

    const defaultRoles = [
      {
        roleName: "Owner",
        description: "This role for owner user accounts with full access.",
        isSystem: true,
        isActive: true,
        permissions: allMatrixKeys,
      },
      {
        roleName: "ADMIN",
        description: "Administrative access across all operational modules.",
        isSystem: true,
        isActive: true,
        permissions: allMatrixKeys,
      },
      {
        roleName: "TRAINEE",
        description: "Read-only access for onboarding and physical audits.",
        isSystem: true,
        isActive: true,
        permissions: ["dashboard:view"],
      },
    ];

    for (const r of defaultRoles) {
      await prisma.rolePermission.upsert({
        where: { roleName: r.roleName },
        update: {},
        create: r,
      });
    }
  } catch (e) {
    console.error("Default roles check failed:", e);
  }

  // 2. Query all roles
  let rawRoles = [];
  try {
    rawRoles = await prisma.rolePermission.findMany({
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Failed to load roles:", error);
  }

  // 3. User distribution count per role
  let roleCounts = {};
  try {
    const users = await prisma.user.findMany({
      select: { role: true },
    });
    users.forEach((u) => {
      const r = u.role || "notfound";
      roleCounts[r] = (roleCounts[r] || 0) + 1;
    });
  } catch (e) {
    console.error("Failed to aggregate user counts:", e);
  }

  const roles = rawRoles.map((r) => ({
    id: r.id || "notfound",
    roleName: r.roleName || "notfound",
    description: r.description || "notfound",
    isSystem: Boolean(r.isSystem),
    isActive: Boolean(r.isActive),
    permissions: Array.isArray(r.permissions) ? r.permissions : [],
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          User Roles & Access Control
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage system role profiles, authorization tiers, and granular modular permissions.
        </p>
      </div>

      <RolesOverview roles={roles} roleUserCounts={roleCounts} />
    </div>
  );
}