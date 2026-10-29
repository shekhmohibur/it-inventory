import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission, requirePermission } from "@/lib/authGuard";
import { StorageManager } from "@/components/StorageManager";
import { StorageForm } from "@/components/StorageForm";
import { ShieldAlert } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Storage | Hardware Specs | KKL Inventory",
};

export default async function HardwareSpecsStoragePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const action = resolvedSearchParams?.action;
  const targetId = resolvedSearchParams?.id;

  // ==========================================
  // VIEW 1: CREATE STORAGE (New Tab Full Page)
  // ==========================================
  if (action === "create") {
    await requirePermission("hardware:storage_create");
    return <StorageForm isEdit={false} />;
  }

  // ==========================================
  // VIEW 2: EDIT STORAGE (New Tab Full Page)
  // ==========================================
  if (action === "edit" && targetId) {
    await requirePermission("hardware:storage_edit");

    const storage = await prisma.storageSpec.findUnique({
      where: { id: targetId },
    });

    const cleanStorage = {
      id: storage?.id || "notfound",
      driveType: storage?.driveType || "SSD",
      capacity: storage?.capacity || "notfound",
      interface: storage?.interface || "SATA III (6 Gb/s)",
      formFactor: storage?.formFactor || "2.5 Inch",
      remarks: storage?.remarks || "",
    };

    return <StorageForm storage={cleanStorage} isEdit={true} />;
  }

  // ==========================================
  // VIEW 3: MAIN LIST TABLE
  // ==========================================
  const canView = await hasPermission("hardware:storage_view");
  if (!canView) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Your role does not have authorization to view storage specs (<code>hardware:storage_view</code>).
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

  const canCreate = await hasPermission("hardware:storage_create");
  const canEdit = await hasPermission("hardware:storage_edit");
  const canDelete = await hasPermission("hardware:storage_delete");

  let rawStorages = [];
  try {
    rawStorages = await prisma.storageSpec.findMany({
      orderBy: [{ driveType: "asc" }, { capacity: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load storage specs:", err);
  }

  const storages = rawStorages.map((s) => ({
    id: s.id || "notfound",
    driveType: s.driveType || "notfound",
    capacity: s.capacity || "notfound",
    interface: s.interface || "notfound",
    formFactor: s.formFactor || "2.5 Inch",
    remarks: s.remarks || "—",
  }));

  return (
    <div className="space-y-6">
      <StorageManager
        initialStorages={storages}
        capabilities={{ canCreate, canEdit, canDelete }}
      />
    </div>
  );
}