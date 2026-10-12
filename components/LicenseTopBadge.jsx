"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ShieldAlert } from "lucide-react";

export function LicenseTopBadge({ licenseInfo }) {
  if (!licenseInfo || !licenseInfo.showBadge) {
    return null;
  }

  const { isExpired, daysLeft } = licenseInfo;

  // 1. EXPIRED STATE
  if (isExpired) {
    return (
      <Link
        href="/settings/license"
        title="Workspace license has expired. Click to renew."
        className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/90 hover:bg-rose-100 transition-all shadow-xs cursor-pointer animate-pulse shrink-0 select-none"
      >
        <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
        
        {/* Full text on sm+ screens */}
        <span className="hidden sm:inline">License Expired</span>
        
        {/* Short text on mobile */}
        <span className="inline sm:hidden font-mono">Expired</span>
      </Link>
    );
  }

  // 2. EXPIRING SOON STATE
  return (
    <Link
      href="/settings/license"
      title={`Workspace license expires in ${daysLeft} days. Click to renew.`}
      className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/90 hover:bg-amber-100 transition-all shadow-xs cursor-pointer shrink-0 select-none"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
      </span>

      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 -ml-0.5 hidden xs:block" />

      {/* Expanded text on tablet / desktop (sm+) */}
      <span className="hidden sm:inline">
        Expiring Soon ({daysLeft}d left)
      </span>

      {/* Compact counter on smaller screens */}
      <span className="inline sm:hidden font-mono text-[10px]">
        {daysLeft}d left
      </span>
    </Link>
  );
}