import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { RamManager } from "@/components/RamManager";
import { RamForm } from "@/components/RamForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "RAM | Hardware Specs | KKL Inventory",
};

export default async function HardwareSpecsRamPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // ==========================================
  // VIEW 1: CREATE RAM (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("hardware:ram_create");
    return <RamForm isEdit={false} />;
  }

  // ==========================================
  // VIEW 2: EDIT RAM (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("hardware:ram_edit");

    const ram = await prisma.ram.findUnique({
      where: { id: targetId },
    });

    const cleanRam = {
      id: ram?.id || "notfound",
      capacity: ram?.capacity || "notfound",
      ramType: ram?.ramType || "DDR4",
      busSpeed: ram?.busSpeed || "notfound",
      formFactor: ram?.formFactor || "DIMM (Desktop)",
      remarks: ram?.remarks || "",
    };

    return <RamForm ram={cleanRam} isEdit={true} />;
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("hardware:ram_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view RAM specs (<code>hardware:ram_view</code>).
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

  const canCreate = await hasPermission("hardware:ram_create");
  const canEdit = await hasPermission("hardware:ram_edit");
  const canDelete = await hasPermission("hardware:ram_delete");

  let rawRams = [];
  try {
    rawRams = await prisma.ram.findMany({
      orderBy: [{ ramType: "asc" }, { capacity: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load RAM specs:", err);
  }

  const rams = rawRams.map((r) => ({
    id: r.id || "notfound",
    capacity: r.capacity || "notfound",
    ramType: r.ramType || "notfound",
    busSpeed: r.busSpeed || "notfound",
    formFactor: r.formFactor || "DIMM (Desktop)",
    remarks: r.remarks || "—",
  }));

  return (
    <div className="space-y-6">
      <RamManager
        initialRams={rams}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}