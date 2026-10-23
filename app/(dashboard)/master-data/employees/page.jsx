import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { EmployeeManager } from "@/components/EmployeeManager";
import { EmployeeForm } from "@/components/EmployeeForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Employee Directory | Master Data | KKL Inventory",
};

export default async function MasterDataEmployeesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // 1. Fetch organizational lookup data
  const [rawCompanies, rawDepartments, rawSections] = await Promise.all([
    prisma.company.findMany({ orderBy: { name: "asc" } }),
    prisma.department.findMany({ orderBy: { name: "asc" } }),
    prisma.section.findMany({ orderBy: { name: "asc" } }),
  ]);

  const companies = rawCompanies.map((c) => ({
    id: c.id,
    name: c.name || "notfound",
    shortName: c.shortName || "notfound",
  }));

  const departments = rawDepartments.map((d) => ({
    id: d.id,
    name: d.name || "notfound",
    companyId: d.companyId,
  }));

  const sections = rawSections.map((s) => ({
    id: s.id,
    name: s.name || "notfound",
    departmentId: s.departmentId,
  }));

  // ==========================================
  // VIEW 1: CREATE EMPLOYEE (New Tab)
  // ==========================================
  if (action === "create") {
    await requirePermission("org:employee_create");
    return (
      <EmployeeForm
        companies={companies}
        departments={departments}
        sections={sections}
        isEdit={false}
      />
    );
  }

  // ==========================================
  // VIEW 2: EDIT EMPLOYEE (New Tab)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("org:employee_edit");

    const employee = await prisma.employee.findUnique({
      where: { id: targetId },
    });

    const cleanEmployee = {
      id: employee?.id || "notfound",
      employeeCode: employee?.employeeCode || "notfound",
      name: employee?.name || "notfound",
      companyId: employee?.companyId || "notfound",
      departmentId: employee?.departmentId || "",
      sectionId: employee?.sectionId || "",
      designation: employee?.designation || "notfound",
      contactNumber: employee?.contactNumber || "notfound",
      personalEmail: employee?.personalEmail || "",
      officeEmail: employee?.officeEmail || "",
      joiningDate: employee?.joiningDate || new Date(),
      status: employee?.status || "Active",
    };

    return (
      <EmployeeForm
        employee={cleanEmployee}
        companies={companies}
        departments={departments}
        sections={sections}
        isEdit={true}
      />
    );
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("org:employee_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view employees (<code>org:employee_view</code>).
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

  const canCreate = await hasPermission("org:employee_create");
  const canEdit = await hasPermission("org:employee_edit");
  const canDelete = await hasPermission("org:employee_delete");

  let rawEmployees = [];
  try {
    rawEmployees = await prisma.employee.findMany({
      include: {
        company: true,
        department: true,
        section: true,
      },
      orderBy: { employeeCode: "asc" },
    });
  } catch (err) {
    console.error("Failed to load employees:", err);
  }

  const employees = rawEmployees.map((e) => ({
    id: e.id || "notfound",
    employeeCode: e.employeeCode || "notfound",
    name: e.name || "notfound",
    designation: e.designation || "notfound",
    contactNumber: e.contactNumber || "notfound",
    personalEmail: e.personalEmail || "",
    officeEmail: e.officeEmail || "",
    joiningDate: e.joiningDate || new Date(),
    status: e.status || "Active",
    companyName: e.company?.name || "notfound",
    departmentName: e.department?.name || "—",
    sectionName: e.section?.name || "—",
  }));

  return (
    <div className="space-y-6">
      <EmployeeManager
        initialEmployees={employees}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}