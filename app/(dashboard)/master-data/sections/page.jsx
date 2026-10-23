import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { SectionManager } from "@/components/SectionManager";
import { DynamicFormPage } from "@/components/ui/DynamicFormPage";
import { createSectionAction, updateSectionAction } from "@/app/actions/section";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Section | Master Data | KKL Inventory",
};

export default async function MasterDataSectionsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // 1. Fetch departments with their company names for dropdown options
  const rawDepartments = await prisma.department.findMany({
    include: { company: true },
    orderBy: { name: "asc" },
  });

  const departmentOptions = rawDepartments.map((d) => ({
    value: d.id,
    label: `${d.name} (${d.company?.shortName || d.company?.name || "No Company"})`,
  }));

  const SECTION_FORM_FIELDS = [
    {
      name: "departmentId",
      label: "Parent Department",
      type: "select",
      required: true,
      options: departmentOptions,
    },
    {
      name: "name",
      label: "Section Name",
      type: "text",
      required: true,
      placeholder: "e.g., Sewing Line 1, Fabric Cutting, Quality Audit",
    },
  ];

  // ==========================================
  // VIEW 1: CREATE SECTION (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("org:section_create");
    return (
      <DynamicFormPage
        breadcrumbs={[
          { label: "Master Data", href: "/master-data" },
          { label: "Section", href: "/master-data/sections" },
          { label: "Create Section" },
        ]}
        title="CREATE SECTION"
        fields={SECTION_FORM_FIELDS}
        onSubmitAction={createSectionAction}
        submitLabel="Create Section"
        backUrl="/master-data/sections"
      />
    );
  }

  // ==========================================
  // VIEW 2: EDIT SECTION (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("org:section_edit");

    const section = await prisma.section.findUnique({
      where: { id: targetId },
    });

    const initialData = {
      name: section?.name || "notfound",
      departmentId: section?.departmentId || "notfound",
    };

    return (
      <DynamicFormPage
        breadcrumbs={[
          { label: "Master Data", href: "/master-data" },
          { label: "Section", href: "/master-data/sections" },
          { label: "Edit Section" },
        ]}
        title="EDIT SECTION"
        fields={SECTION_FORM_FIELDS}
        initialData={initialData}
        onSubmitAction={updateSectionAction.bind(null, targetId)}
        submitLabel="Update Section"
        backUrl="/master-data/sections"
      />
    );
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("org:section_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view sections (<code>org:section_view</code>).
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

  const canCreate = await hasPermission("org:section_create");
  const canEdit = await hasPermission("org:section_edit");
  const canDelete = await hasPermission("org:section_delete");

  // Fetch sections with relation counts
let rawSections = [];
try {
  rawSections = await prisma.section.findMany({
    include: {
      department: {
        include: {
          company: true,
        },
      },
      _count: {
        select: {
          employees: true, // Counts directly from Employee table
        },
      },
    },
    orderBy: { name: "asc" },
  });
} catch (err) {
  console.error("Failed to load sections:", err);
}

const sections = rawSections.map((s) => {
  const deptSlug = (s.department?.name || "dept")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const secSlug = (s.name || "section")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: s.id || "notfound",
    name: s.name || "notfound",
    reference: `${deptSlug}-${secSlug}`,
    departmentId: s.departmentId || "notfound",
    departmentName: s.department?.name || "notfound",
    companyName: s.department?.company?.name || "notfound",
    companyLogo: s.department?.company?.logo || "notfound",
    employeesCount: s._count?.employees || 0, // Accurate live count
  };
});

  return (
    <div className="space-y-6">
      <SectionManager
        initialSections={sections}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}