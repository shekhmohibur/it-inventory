import React from "react";
import { PrismaClient } from "@prisma/client";
import { RoleMatrixEditor } from "@/components/RoleMatrixEditor";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Role Permissions | KKL Inventory",
};

export default async function RoleEditPage({ params }) {
  const resolvedParams = await params;
  const roleId = resolvedParams?.id || "notfound";

  let roleRecord = null;

  try {
    if (roleId !== "notfound" && roleId !== "new") {
      roleRecord = await prisma.rolePermission.findFirst({
        where: {
          OR: [{ id: roleId }, { roleName: roleId }],
        },
      });
    }
  } catch (err) {
    console.error("Failed to load role:", err);
  }

  const role = {
    id: roleRecord?.id || "notfound",
    roleName: roleRecord?.roleName || "Owner",
    description: roleRecord?.description || "notfound",
    isActive: roleRecord?.isActive !== undefined ? roleRecord.isActive : true,
    permissions: Array.isArray(roleRecord?.permissions)
      ? roleRecord.permissions
      : [],
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <RoleMatrixEditor initialRole={role} />
    </div>
  );
}