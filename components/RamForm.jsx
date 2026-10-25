"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle, Cpu } from "lucide-react";
import { createRamAction, updateRamAction } from "@/app/actions/ram";

const RAM_TYPES = ["DDR2", "DDR3", "DDR3L", "DDR4", "DDR5"];
const FORM_FACTORS = ["DIMM (Desktop)", "SO-DIMM (Laptop)", "Server ECC"];

export function RamForm({ ram, isEdit = false }) {
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
    if (isEdit && ram?.id) {
      res = await updateRamAction(ram.id, formData);
    } else {
      res = await createRamAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        router.push("/hardware-specs/ram");
        router.refresh();
      }
    }
  };

  const handleDiscard = () => {
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      router.push("/hardware-specs/ram");
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
        <Link href="/hardware-specs/ram" className="hover:text-slate-700 transition">
          Hardware Specs
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-800 font-extrabold">
          {isEdit ? "EDIT RAM SPEC" : "CREATE RAM SPEC"}
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
          <span>RAM Specification Details</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Capacity */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Capacity <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="capacity"
                required
                defaultValue={ram?.capacity && ram.capacity !== "notfound" ? ram.capacity : ""}
                placeholder="e.g., 4 GB, 8 GB, 16 GB, 32 GB"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">Total memory storage size.</p>
            </div>

            {/* RAM Type */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                RAM Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="ramType"
                required
                defaultValue={ram?.ramType && ram.ramType !== "notfound" ? ram.ramType : "DDR4"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {RAM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">Generation architecture standard.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bus Speed */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Bus Speed / Frequency <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="busSpeed"
                required
                defaultValue={ram?.busSpeed && ram.busSpeed !== "notfound" ? ram.busSpeed : ""}
                placeholder="e.g., 2400 MHz, 2666 MHz, 3200 MHz"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">Clock speed in MHz.</p>
            </div>

            {/* Form Factor */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Form Factor <span className="text-rose-500">*</span>
              </label>
              <select
                name="formFactor"
                required
                defaultValue={ram?.formFactor && ram.formFactor !== "notfound" ? ram.formFactor : "DIMM (Desktop)"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {FORM_FACTORS.map((ff) => (
                  <option key={ff} value={ff}>
                    {ff}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">Desktop DIMM or Laptop SO-DIMM.</p>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">Remarks</label>
            <textarea
              name="remarks"
              rows={3}
              defaultValue={ram?.remarks && ram.remarks !== "notfound" ? ram.remarks : ""}
              placeholder="Optional notes regarding brand compatibility, CAS latency, etc..."
              className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none placeholder-slate-400"
            />
          </div>

          {/* Action Footer */}
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
              <span>{isEdit ? "Update RAM Spec" : "Create RAM Spec"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}