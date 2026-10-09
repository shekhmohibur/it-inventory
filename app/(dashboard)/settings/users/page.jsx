import React from "react";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { UsersManager } from "@/components/UsersManager";
import { hasPermission } from "@/lib/authGuard";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Users Management | KKL Inventory",
};

export default async function UsersPage() {
  const session = await getSession();

  // 1. Verify View Permission
  const canViewUsers = await hasPermission("users:view");
  if (!canViewUsers) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Unauthorized Access
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view user accounts (<code className="text-rose-600 font-mono text-[11px]">users:view</code>). Contact your IT Administrator for access.
          </p>
          <div className="mt-5">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Query Granular Capabilities
  const canCreate = await hasPermission("users:create");
  const canDelete = await hasPermission("users:delete");
  const canEditRole = await hasPermission("roles:edit");
  const canEditStatus = await hasPermission("status:edit");

  // 3. Query All Users
  let rawUsers = [];
  try {
    rawUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load users:", error);
  }

  const users = rawUsers.map((u) => ({
    id: u.id || "notfound",
    cardNumber: u.cardNumber || "notfound",
    fullName: u.fullName || "notfound",
    email: u.email || "notfound",
    phone: u.phone || "notfound",
    department: u.department || "notfound",
    designation: u.designation || "notfound",
    role: u.role || "notfound",
    status: u.status || "notfound",
    image: u.image || "notfound",
    createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : "notfound",
  }));

  // 4. Query Dynamic Roles from DB (No Hardcoded Roles)
  let rawRoles = [];
  try {
    rawRoles = await prisma.rolePermission.findMany({
      where: { isActive: true },
      select: { roleName: true },
      orderBy: { roleName: "asc" },
    });
  } catch (error) {
    console.error("Failed to load roles:", error);
  }

  const availableRoles = rawRoles.map((r) => ({
    roleName: r.roleName || "notfound",
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Users & Access Control
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review employee access requests, manage system roles, and provision new accounts.
        </p>
      </div>

      <UsersManager
        initialUsers={users}
        currentUserId={session?.id || "notfound"}
        availableRoles={availableRoles}
        capabilities={{
          canCreate,
          canDelete,
          canEditRole,
          canEditStatus,
        }}
      />
    </div>
  );
}