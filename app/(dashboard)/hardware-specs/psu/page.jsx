import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { PsuManager } from "@/components/PsuManager";
import { PsuForm } from "@/components/PsuForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Power Supply (PSU) | Hardware Specs | KKL Inventory",
};

export default async function HardwareSpecsPsuPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // 1. CREATE ACTION
  if (action === "create") {
    await requirePermission("hardware:psu_create");
    return <PsuForm isEdit={false} />;
  }

  // 2. EDIT ACTION
  if (action === "edit" && targetId) {
    await requirePermission("hardware:psu_edit");

    const psu = await prisma.psuSpec.findUnique({
      where: { id: targetId },
    });

    const cleanPsu = {
      id: psu?.id || "notfound",
      name: psu?.name || "notfound",
      wattage: psu?.wattage || "notfound",
      remarks: psu?.remarks || "",
    };

    return <PsuForm psu={cleanPsu} isEdit={true} />;
  }

  // 3. TABLE VIEW
  const canView = await hasPermission("hardware:psu_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view PSU specs (<code>hardware:psu_view</code>).
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

  const canCreate = await hasPermission("hardware:psu_create");
  const canEdit = await hasPermission("hardware:psu_edit");
  const canDelete = await hasPermission("hardware:psu_delete");

  let rawPsus = [];
  try {
    rawPsus = await prisma.psuSpec.findMany({
      orderBy: [{ wattage: "asc" }, { name: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load PSU specs:", err);
  }

  const psus = rawPsus.map((p) => ({
    id: p.id || "notfound",
    name: p.name || "notfound",
    wattage: p.wattage || "notfound",
    remarks: p.remarks || "—",
  }));

  return (
    <div className="space-y-6">
      <PsuManager
        initialPsus={psus}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}