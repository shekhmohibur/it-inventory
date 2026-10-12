import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission } from "@/lib/authGuard";
import { DepartmentManager } from "@/components/DepartmentManager";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Department | Master Data | KKL Inventory",
};

export default async function MasterDataDepartmentPage() {
  // 1. Authorization check
  const canView = await hasPermission("org:dept_view");
  if (!canView) {
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
            Your role does not have authorization to view departments (<code>org:dept_view</code>).
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

  const canCreate = await hasPermission("org:dept_create");
  const canEdit = await hasPermission("org:dept_edit");
  const canDelete = await hasPermission("org:dept_delete");

  // 2. Fetch Departments with Relations
  let rawDepartments = [];
  try {
    rawDepartments = await prisma.department.findMany({
      include: {
        company: true,
        sections: true,
      },
      orderBy: { name: "asc" },
    });
  } catch (err) {
    console.error("Failed to load departments:", err);
  }

  // 3. Fetch Parent Companies for dropdown filter & select
  let rawCompanies = [];
  try {
    rawCompanies = await prisma.company.findMany({
      orderBy: { name: "asc" },
    });
  } catch (err) {
    console.error("Failed to load companies:", err);
  }

  // Aggregate employee counts per department
  let deptEmployeeCounts = {};
  try {
    const users = await prisma.user.findMany({
      select: { department: true },
    });
    users.forEach((u) => {
      if (u.department) {
        deptEmployeeCounts[u.department] =
          (deptEmployeeCounts[u.department] || 0) + 1;
      }
    });
  } catch (err) {
    console.error("Failed to count department employees:", err);
  }

  // Map safe objects with "notfound" fallbacks
  const departments = rawDepartments.map((d) => ({
    id: d.id || "notfound",
    name: d.name || "notfound",
    description: d.description || "notfound",
    companyId: d.companyId || "notfound",
    companyName: d.company?.name || "notfound",
    companyShortName: d.company?.shortName || "notfound",
    sectionsCount: d.sections?.length || 0,
    employeesCount: deptEmployeeCounts[d.name] || 0,
  }));

  const companies = rawCompanies.map((c) => ({
    id: c.id || "notfound",
    name: c.name || "notfound",
    shortName: c.shortName || "notfound",
  }));

  return (
    <div className="space-y-6">
      <DepartmentManager
        initialDepartments={departments}
        companies={companies}
        capabilities={{
          canCreate,
          canEdit,
          canDelete,
        }}
      />
    </div>
  );
}