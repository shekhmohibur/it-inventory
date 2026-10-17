
"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home, Check, Loader2, AlertCircle } from "lucide-react";

export function FormPageShell({
  breadcrumbs = [],
  title,
  onSubmit,
  loading = false,
  errorMsg = "",
  submitLabel = "Save Changes",
  backUrl,
  children,
}) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-24">
      {/* 1. BREADCRUMBS */}
      <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase select-none">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-700 transition">
          <Home className="w-3.5 h-3.5" />
          <span>DASHBOARD</span>
        </Link>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-slate-700 transition">
                {crumb.label.toUpperCase()}
              </Link>
            ) : (
              <span className="text-slate-800 font-extrabold">
                {crumb.label.toUpperCase()}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* 2. ERROR BANNER */}
      {Boolean(errorMsg) && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{String(errorMsg)}</span>
        </div>
      )}

      {/* 3. CARD CONTAINER & FORM */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <form onSubmit={onSubmit} className="space-y-6 text-xs text-slate-700">
          {children}

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.opener) {
                  window.close();
                } else if (backUrl) {
                  window.location.href = backUrl;
                } else {
                  window.history.back();
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition cursor-pointer"
            >
              Discard Changes
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>{submitLabel}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}