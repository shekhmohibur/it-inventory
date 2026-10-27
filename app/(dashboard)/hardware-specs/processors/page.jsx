import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { ProcessorManager } from "@/components/ProcessorManager";
import { ProcessorForm } from "@/components/ProcessorForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Processors | Hardware Specs | KKL Inventory",
};

export default async function HardwareSpecsProcessorsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // ==========================================
  // VIEW 1: CREATE PROCESSOR (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("hardware:processor_create");
    return <ProcessorForm isEdit={false} />;
  }

  // ==========================================
  // VIEW 2: EDIT PROCESSOR (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("hardware:processor_edit");

    const processor = await prisma.processor.findUnique({
      where: { id: targetId },
    });

    const cleanProcessor = {
      id: processor?.id || "notfound",
      name: processor?.name || "notfound",
      brand: processor?.brand || "Intel",
      series: processor?.series || "",
      generation: processor?.generation || "",
      baseSpeed: processor?.baseSpeed || "",
      coresThreads: processor?.coresThreads || "",
      remarks: processor?.remarks || "",
    };

    return <ProcessorForm processor={cleanProcessor} isEdit={true} />;
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("hardware:processor_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view processors (<code>hardware:processor_view</code>).
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

  const canCreate = await hasPermission("hardware:processor_create");
  const canEdit = await hasPermission("hardware:processor_edit");
  const canDelete = await hasPermission("hardware:processor_delete");

  let rawProcessors = [];
  try {
    rawProcessors = await prisma.processor.findMany({
      orderBy: [{ brand: "asc" }, { name: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load processors:", err);
  }

  const processors = rawProcessors.map((p) => ({
    id: p.id || "notfound",
    name: p.name || "notfound",
    brand: p.brand || "notfound",
    series: p.series || "",
    generation: p.generation || "",
    baseSpeed: p.baseSpeed || "",
    coresThreads: p.coresThreads || "",
    remarks: p.remarks || "—",
  }));

  return (
    <div className="space-y-6">
      <ProcessorManager
        initialProcessors={processors}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}