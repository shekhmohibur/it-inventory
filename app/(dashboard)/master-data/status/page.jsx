import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { StatusManager } from "@/components/StatusManager";
import { DynamicFormPage } from "@/components/ui/DynamicFormPage";
import { createStatusAction, updateStatusAction } from "@/app/actions/status";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Status | Master Data | KKL Inventory",
};

const STATUS_FORM_FIELDS = [
  {
    name: "name",
    label: "Status Name",
    type: "text",
    required: true,
    placeholder: "e.g., Running, Damaged, In Stock, Scrapped",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    rows: 3,
    placeholder: "Explain what this device status indicates...",
  },
  {
    name: "color",
    label: "Status Color (Hex)",
    type: "color", // <-- Changed from "text" to "color"
    required: true,
  },
  {
    name: "visibility",
    label: "Visibility",
    type: "select",
    required: true,
    options: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
    ],
  },
];

export default async function MasterDataStatusPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // ==========================================
  // VIEW 1: CREATE STATUS (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("org:status_create");
    return (
      <DynamicFormPage
        breadcrumbs={[
          { label: "Master Data", href: "/master-data" },
          { label: "Status", href: "/master-data/status" },
          { label: "Create Status" },
        ]}
        title="CREATE STATUS"
        fields={STATUS_FORM_FIELDS}
        initialData={{ color: "#0010F5", visibility: "Active" }}
        onSubmitAction={createStatusAction}
        submitLabel="Create Status"
        backUrl="/master-data/status"
      />
    );
  }

  // ==========================================
  // VIEW 2: EDIT STATUS (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("org:status_edit");

    const status = await prisma.deviceStatus.findUnique({
      where: { id: targetId },
    });

    const initialData = {
      name: status?.name || "notfound",
      description: status?.description || "",
      color: status?.color || "#0010F5",
      visibility: status?.visibility || "Active",
    };

    return (
      <DynamicFormPage
        breadcrumbs={[
          { label: "Master Data", href: "/master-data" },
          { label: "Status", href: "/master-data/status" },
          { label: "Edit Status" },
        ]}
        title="EDIT STATUS"
        fields={STATUS_FORM_FIELDS}
        initialData={initialData}
        onSubmitAction={updateStatusAction.bind(null, targetId)}
        submitLabel="Update Status"
        backUrl="/master-data/status"
      />
    );
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("org:status_view");
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
            Your role does not have authorization to view status items (<code>org:status_view</code>).
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

  const canCreate = await hasPermission("org:status_create");
  const canEdit = await hasPermission("org:status_edit");
  const canDelete = await hasPermission("org:status_delete");

  let rawStatuses = [];
  try {
    rawStatuses = await prisma.deviceStatus.findMany({
      orderBy: { name: "asc" },
    });
  } catch (err) {
    console.error("Failed to load statuses:", err);
  }

  const statuses = rawStatuses.map((s) => ({
    id: s.id || "notfound",
    name: s.name || "notfound",
    description: s.description || "-",
    color: s.color || "#0010F5",
    visibility: s.visibility || "Active",
  }));

  return (
    <div className="space-y-6">
      <StatusManager
        initialStatuses={statuses}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}