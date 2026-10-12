import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { hasPermission } from "@/lib/authGuard";
import { LicenseEditor } from "@/components/LicenseEditor";
import { ShieldAlert, ChevronRight } from "lucide-react";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "License Settings | KKL Inventory",
};

export default async function LicensePage() {
  // 1. Authorization check
  const canView = await hasPermission("settings:view");
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
            Your role does not have authorization to view license configuration (<code>settings:view</code>).
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

  const canEdit = await hasPermission("settings:edit");

  // 2. Fetch or seed default license record
  let rawLicense = null;
  try {
    rawLicense = await prisma.systemLicense.findFirst({
      where: { id: "default-license" },
    });

    if (!rawLicense) {
      rawLicense = await prisma.systemLicense.create({
        data: {
          id: "default-license",
          licenseName: "Enterprise Workspace License",
          planType: "MONTHLY CLOUD SUBSCRIPTION",
          noticeDate: new Date("2026-09-20"),
          expirationDate: new Date("2026-10-31"),
          enforceRestrictions: true,
        },
      });
    }
  } catch (err) {
    console.error("Failed to fetch license:", err);
  }

  const licenseData = {
    id: rawLicense?.id || "notfound",
    licenseName: rawLicense?.licenseName || "notfound",
    planType: rawLicense?.planType || "notfound",
    noticeDate: rawLicense?.noticeDate
      ? rawLicense.noticeDate.toISOString()
      : "notfound",
    expirationDate: rawLicense?.expirationDate
      ? rawLicense.expirationDate.toISOString()
      : "notfound",
    enforceRestrictions: rawLicense?.enforceRestrictions ?? true,
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <Link href="/" className="hover:text-slate-600 transition">
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/settings/general" className="hover:text-slate-600 transition">
          Settings
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900">License</span>
      </nav>

      <LicenseEditor initialData={licenseData} canEdit={canEdit} />
    </div>
  );
}