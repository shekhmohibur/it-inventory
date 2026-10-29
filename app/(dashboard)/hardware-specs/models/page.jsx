import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { ModelManager } from "@/components/ModelManager";
import { ModelForm } from "@/components/ModelForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Models | Hardware Specs | KKL Inventory",
};

const CATEGORIES = [
  "Computer",
  "Monitor",
  "Laptop",
  "Printer",
  "Scanner",
  "Networking",
  "Motherboards",
  "UPS",
  "Accessories",
];

export default async function HardwareSpecsModelsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // 1. Fetch Brands for selection
  const rawBrands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
  });
  const brands = rawBrands.map((b) => ({
    id: b.id,
    name: b.name || "notfound",
    category: b.category || "Computer",
  }));

  // ==========================================
  // VIEW 1: CREATE MODEL (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("hardware:model_create");
    return (
      <ModelForm
        brands={brands}
        categories={CATEGORIES}
        isEdit={false}
      />
    );
  }

  // ==========================================
  // VIEW 2: EDIT MODEL (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("hardware:model_edit");

    const model = await prisma.deviceModel.findUnique({
      where: { id: targetId },
    });

    const cleanModel = {
      id: model?.id || "notfound",
      name: model?.name || "notfound",
      category: model?.category || "Computer",
      brandId: model?.brandId || "",
      remarks: model?.remarks || "",
    };

    return (
      <ModelForm
        model={cleanModel}
        brands={brands}
        categories={CATEGORIES}
        isEdit={true}
      />
    );
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("hardware:model_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view hardware models (<code>hardware:model_view</code>).
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

  const canCreate = await hasPermission("hardware:model_create");
  const canEdit = await hasPermission("hardware:model_edit");
  const canDelete = await hasPermission("hardware:model_delete");

  let rawModels = [];
  try {
    rawModels = await prisma.deviceModel.findMany({
      include: { brand: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load models:", err);
  }

  const models = rawModels.map((m) => ({
    id: m.id || "notfound",
    name: m.name || "notfound",
    category: m.category || "notfound",
    brandName: m.brand?.name || "notfound",
    remarks: m.remarks || "—",
  }));

  return (
    <div className="space-y-6">
      <ModelManager
        initialModels={models}
        categories={CATEGORIES}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}