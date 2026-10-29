import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { MotherboardManager } from "@/components/MotherboardManager";
import { MotherboardForm } from "@/components/MotherboardForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Motherboards | Hardware Specs | KKL Inventory",
};

export default async function HardwareSpecsMotherboardsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // Fetch Brands and Models
  const [rawBrands, rawModels] = await Promise.all([
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.deviceModel.findMany({ orderBy: { name: "asc" } }),
  ]);

  const brands = rawBrands.map((b) => ({
    id: b.id,
    name: b.name || "notfound",
  }));

  const models = rawModels.map((m) => ({
    id: m.id,
    name: m.name || "notfound",
    brandId: m.brandId,
  }));

  // ==========================================
  // VIEW 1: CREATE (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("hardware:motherboard_create");
    return <MotherboardForm brands={brands} models={models} isEdit={false} />;
  }

  // ==========================================
  // VIEW 2: EDIT (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("hardware:motherboard_edit");

    const motherboard = await prisma.motherboard.findUnique({
      where: { id: targetId },
    });

    const cleanMotherboard = {
      id: motherboard?.id || "notfound",
      brandId: motherboard?.brandId || "",
      modelId: motherboard?.modelId || "",
      remarks: motherboard?.remarks || "",
    };

    return (
      <MotherboardForm
        motherboard={cleanMotherboard}
        brands={brands}
        models={models}
        isEdit={true}
      />
    );
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("hardware:motherboard_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view motherboards (<code>hardware:motherboard_view</code>).
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

  const canCreate = await hasPermission("hardware:motherboard_create");
  const canEdit = await hasPermission("hardware:motherboard_edit");
  const canDelete = await hasPermission("hardware:motherboard_delete");

  let rawMotherboards = [];
  try {
    rawMotherboards = await prisma.motherboard.findMany({
      include: {
        brand: true,
        model: true,
      },
      orderBy: [{ brand: { name: "asc" } }, { model: { name: "asc" } }],
    });
  } catch (err) {
    console.error("Failed to load motherboards:", err);
  }

  const motherboards = rawMotherboards.map((mb) => ({
    id: mb.id || "notfound",
    brand: mb.brand?.name || "notfound",
    name: mb.model?.name || "notfound",
    remarks: mb.remarks || "—",
  }));

  return (
    <div className="space-y-6">
      <MotherboardManager
        initialMotherboards={motherboards}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}