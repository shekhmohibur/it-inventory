import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { CompanyManager } from "@/components/CompanyManager";
import { DynamicFormPage } from "@/components/ui/DynamicFormPage";
import { createCompanyAction, updateCompanyAction } from "@/app/actions/company";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Company | Master Data | KKL Inventory",
};

// Define the fields once
const COMPANY_FORM_FIELDS = [
  {
    name: "name",
    label: "Company Name",
    type: "text",
    required: true,
    placeholder: "Enter company name",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    rows: 4,
    placeholder: "Enter full company address",
  },
  {
    name: "shortName",
    label: "Short Name",
    type: "text",
    placeholder: "e.g., ABC Ltd.",
  },
  {
    name: "logo",
    label: "Company Logo",
    type: "file",
    accept: "image/*",
  },
];

export default async function MasterDataCompanyPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // 1. CREATE ACTION (Opens in New Tab)
  if (action === "create") {
    await requirePermission("org:company_create");
    return (
      <DynamicFormPage
        breadcrumbs={[{ label: "Master Data", href: "/master-data" }, { label: "Company", href: "/master-data/company" }, { label: "Create Company" }]}
        title="CREATE COMPANY"
        fields={COMPANY_FORM_FIELDS}
        onSubmitAction={createCompanyAction}
        submitLabel="Create Company"
        backUrl="/master-data/company"
      />
    );
  }

  // 2. EDIT ACTION (Opens in New Tab)
  if (action === "edit" && targetId) {
    await requirePermission("org:company_edit");
    const company = await prisma.company.findUnique({
      where: { id: targetId },
    });

    const initialData = {
      name: company?.name || "notfound",
      address: company?.address || "notfound",
      shortName: company?.shortName || "notfound",
    };

    return (
      <DynamicFormPage
        breadcrumbs={[{ label: "Master Data", href: "/master-data" }, { label: "Company", href: "/master-data/company" }, { label: "Edit Company" }]}
        title="EDIT COMPANY"
        fields={COMPANY_FORM_FIELDS}
        initialData={initialData}
        onSubmitAction={updateCompanyAction.bind(null, targetId)}
        submitLabel="Update Company"
        backUrl="/master-data/company"
      />
    );
  }

  // 3. TABLE VIEW
  const canView = await hasPermission("org:company_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view companies (<code>org:company_view</code>).
          </p>
          <div className="mt-5">
            <Link href="/" className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canCreate = await hasPermission("org:company_create");
  const canEdit = await hasPermission("org:company_edit");
  const canDelete = await hasPermission("org:company_delete");

// Fetch companies with relation counts
let rawCompanies = [];
try {
  rawCompanies = await prisma.company.findMany({
    include: {
      departments: {
        include: {
          sections: true,
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
  console.error("Failed to load companies:", err);
}

const companies = rawCompanies.map((c) => ({
  id: c.id || "notfound",
  name: c.name || "notfound",
  shortName: c.shortName || "notfound",
  address: c.address || "notfound",
  logo: c.logo || "notfound",
  departments: c.departments.length,
  sections: c.departments.reduce((acc, d) => acc + (d.sections?.length || 0), 0),
  employees: c._count?.employees || 0, // Accurate live count
}));

  return (
    <div className="space-y-6">
      <CompanyManager
        initialCompanies={companies}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}