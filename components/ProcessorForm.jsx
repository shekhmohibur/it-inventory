"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle, Cpu } from "lucide-react";
import { createProcessorAction, updateProcessorAction } from "@/app/actions/processor";

const PROCESSOR_BRANDS = ["Intel", "AMD", "Apple", "Qualcomm", "Other"];

export function ProcessorForm({ processor, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    let res;
    if (isEdit && processor?.id) {
      res = await updateProcessorAction(processor.id, formData);
    } else {
      res = await createProcessorAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        router.push("/hardware-specs/processors");
        router.refresh();
      }
    }
  };

  const handleDiscard = () => {
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      router.push("/hardware-specs/processors");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans pb-24">
      {/* 1. BREADCRUMBS */}
      <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase select-none">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-700 transition">
          <Home className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <Link href="/hardware-specs/processors" className="hover:text-slate-700 transition">
          Hardware Specs
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-800 font-extrabold">
          {isEdit ? "EDIT PROCESSOR" : "CREATE PROCESSOR"}
        </span>
      </nav>

      {/* 2. ERROR BANNER */}
      {Boolean(errorMsg) && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{String(errorMsg)}</span>
        </div>
      )}

      {/* 3. CARD CONTAINER */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6 text-slate-800 font-bold text-sm">
          <Cpu className="w-4 h-4 text-slate-500" />
          <span>Processor Specification</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand Dropdown */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Brand / Manufacturer <span className="text-rose-500">*</span>
              </label>
              <select
                name="brand"
                required
                defaultValue={processor?.brand && processor.brand !== "notfound" ? processor.brand : "Intel"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {PROCESSOR_BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">Processor chipset vendor.</p>
            </div>

            {/* Processor Name */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Processor Model / Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={processor?.name && processor.name !== "notfound" ? processor.name : ""}
                placeholder="e.g., Core i5-12400, Ryzen 5 5600X"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">Full official processor model name.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Series */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">Series</label>
              <input
                type="text"
                name="series"
                defaultValue={processor?.series && processor.series !== "notfound" ? processor.series : ""}
                placeholder="e.g., Core i5, Ryzen 5, Xeon E3"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
            </div>

            {/* Generation */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">Generation</label>
              <input
                type="text"
                name="generation"
                defaultValue={processor?.generation && processor.generation !== "notfound" ? processor.generation : ""}
                placeholder="e.g., 10th Gen, 12th Gen, Zen 3"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Base Speed */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">Base / Turbo Clock</label>
              <input
                type="text"
                name="baseSpeed"
                defaultValue={processor?.baseSpeed && processor.baseSpeed !== "notfound" ? processor.baseSpeed : ""}
                placeholder="e.g., 2.50 GHz (Turbo up to 4.40 GHz)"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
            </div>

            {/* Cores / Threads */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">Cores & Threads</label>
              <input
                type="text"
                name="coresThreads"
                defaultValue={processor?.coresThreads && processor.coresThreads !== "notfound" ? processor.coresThreads : ""}
                placeholder="e.g., 6 Cores / 12 Threads"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">Remarks</label>
            <textarea
              name="remarks"
              rows={3}
              defaultValue={processor?.remarks && processor.remarks !== "notfound" ? processor.remarks : ""}
              placeholder="Optional notes regarding socket type, integrated GPU (UHD 730), TDP..."
              className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none placeholder-slate-400"
            />
          </div>

          {/* Bottom Bar Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleDiscard}
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
              <span>{isEdit ? "Update Processor" : "Create Processor"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}