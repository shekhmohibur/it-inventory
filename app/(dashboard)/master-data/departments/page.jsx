import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { DepartmentListManager } from "@/components/DepartmentListManager";
import { DepartmentForm } from "@/components/DepartmentForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Department | Master Data | KKL Inventory",
};

export default async function MasterDataDepartmentsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action; // "create" | "edit" | undefined
  const targetId = resolvedSearchParams?.id;

  // 1. Fetch companies for select dropdowns
  const rawCompanies = await prisma.company.findMany({
    orderBy: { name: "asc" },
  });
  const companies = rawCompanies.map((c) => ({
    id: c.id || "notfound",
    name: c.name || "notfound",
    shortName: c.shortName || "notfound",
  }));

  // ==========================================
  // VIEW 1: CREATE ACTION (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("org:dept_create");
    return <DepartmentForm companies={companies} isEdit={false} />;
  }

  // ==========================================
  // VIEW 2: EDIT ACTION (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("org:dept_edit");

    const dept = await prisma.department.findUnique({
      where: { id: targetId },
    });

    const cleanDept = {
      id: dept?.id || "notfound",
      name: dept?.name || "notfound",
      description: dept?.description || "notfound",
      companyId: dept?.companyId || "notfound",
    };

    return (
      <DepartmentForm
        department={cleanDept}
        companies={companies}
        isEdit={true}
      />
    );
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
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

  // Fetch departments with relations
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

  // Count employees per department
  let deptEmployeeCounts = {};
  try {
    const users = await prisma.user.findMany({
      select: { department: true },
    });
    users.forEach((u) => {
      if (u.department) {
        deptEmployeeCounts[u.department] = (deptEmployeeCounts[u.department] || 0) + 1;
      }
    });
  } catch (err) {
    console.error("Failed to count department employees:", err);
  }

  const departments = rawDepartments.map((d) => {
    const companySlug = (d.company?.name || "company")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-\$/g, "");
    const deptSlug = (d.name || "dept")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-\$/g, "");

    return {
      id: d.id || "notfound",
      name: d.name || "notfound",
      description: d.description || "notfound",
      reference: `${companySlug}-${deptSlug}`,
      companyId: d.companyId || "notfound",
      companyName: d.company?.name || "notfound",
      companyLogo: d.company?.logo || "notfound",
      sectionsCount: d.sections?.length || 0,
      employeesCount: deptEmployeeCounts[d.name] || 0,
    };
  });

  return (
    <div className="space-y-6">
      <DepartmentListManager
        initialDepartments={departments}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}