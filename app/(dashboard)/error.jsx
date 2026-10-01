"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    if (error) {
      console.error("Dashboard caught an error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-5 shadow-xs">
          <AlertTriangle className="w-7 h-7 stroke-[2]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          500 Error
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Something went wrong
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
          An unexpected error occurred while loading this view. You can try refreshing the section or return to the main dashboard.
        </p>

        {error?.message && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-left mb-6 overflow-hidden">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Error Details
            </span>
            <p className="text-xs font-mono text-slate-700 truncate">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition-colors"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}