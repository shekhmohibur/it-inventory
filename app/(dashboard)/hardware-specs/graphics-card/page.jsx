import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { GraphicsCardManager } from "@/components/GraphicsCardManager";
import { GraphicsCardForm } from "@/components/GraphicsCardForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Graphics Cards | Hardware Specs | KKL Inventory",
};

export default async function HardwareSpecsGraphicsCardPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // ==========================================
  // VIEW 1: CREATE (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("hardware:graphics_card_create");
    return <GraphicsCardForm isEdit={false} />;
  }

  // ==========================================
  // VIEW 2: EDIT (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("hardware:graphics_card_edit");

    const card = await prisma.graphicsCard.findUnique({
      where: { id: targetId },
    });

    const cleanCard = {
      id: card?.id || "notfound",
      chipsetBrand: card?.chipsetBrand || "NVIDIA",
      series: card?.series || "",
      modelName: card?.modelName || "notfound",
      memoryCapacity: card?.memoryCapacity || "notfound",
      memoryType: card?.memoryType || "GDDR6",
      cardType: card?.cardType || "Dedicated (Discrete)",
      remarks: card?.remarks || "",
    };

    return <GraphicsCardForm card={cleanCard} isEdit={true} />;
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("hardware:graphics_card_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view graphics cards (<code>hardware:graphics_card_view</code>).
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

  const canCreate = await hasPermission("hardware:graphics_card_create");
  const canEdit = await hasPermission("hardware:graphics_card_edit");
  const canDelete = await hasPermission("hardware:graphics_card_delete");

  let rawCards = [];
  try {
    rawCards = await prisma.graphicsCard.findMany({
      orderBy: [{ chipsetBrand: "asc" }, { modelName: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load graphics cards:", err);
  }

  const cards = rawCards.map((c) => ({
    id: c.id || "notfound",
    chipsetBrand: c.chipsetBrand || "notfound",
    modelName: c.modelName || "notfound",
    series: c.series || "",
    memoryCapacity: c.memoryCapacity || "notfound",
    memoryType: c.memoryType || "GDDR6",
    cardType: c.cardType || "Dedicated",
    remarks: c.remarks || "—",
  }));

  return (
    <div className="space-y-6">
      <GraphicsCardManager
        initialCards={cards}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}