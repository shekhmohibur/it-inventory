import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { BrandManager } from "@/components/BrandManager";
import { BrandForm } from "@/components/BrandForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Brands | Hardware Specs | KKL Inventory",
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

export default async function HardwareSpecsBrandsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // ==========================================
  // VIEW 1: CREATE BRAND (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("hardware:brand_create");
    return <BrandForm categories={CATEGORIES} isEdit={false} />;
  }

  // ==========================================
  // VIEW 2: EDIT BRAND (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("hardware:brand_edit");

    const brand = await prisma.brand.findUnique({
      where: { id: targetId },
    });

    const cleanBrand = {
      id: brand?.id || "notfound",
      name: brand?.name || "notfound",
      category: brand?.category || "Computer",
      remarks: brand?.remarks || "",
    };

    return (
      <BrandForm
        brand={cleanBrand}
        categories={CATEGORIES}
        isEdit={true}
      />
    );
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("hardware:brand_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view brands (<code>hardware:brand_view</code>).
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

  const canCreate = await hasPermission("hardware:brand_create");
  const canEdit = await hasPermission("hardware:brand_edit");
  const canDelete = await hasPermission("hardware:brand_delete");

  let rawBrands = [];
  try {
    rawBrands = await prisma.brand.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load brands:", err);
  }

  const brands = rawBrands.map((b) => ({
    id: b.id || "notfound",
    name: b.name || "notfound",
    category: b.category || "notfound",
    remarks: b.remarks || "—",
  }));

  return (
    <div className="space-y-6">
      <BrandManager
        initialBrands={brands}
        categories={CATEGORIES}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}