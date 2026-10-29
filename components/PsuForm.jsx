"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle, Zap } from "lucide-react";
import { createPsuAction, updatePsuAction } from "@/app/actions/psu";

export function PsuForm({ psu, isEdit = false }) {
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
    if (isEdit && psu?.id) {
      res = await updatePsuAction(psu.id, formData);
    } else {
      res = await createPsuAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        router.push("/hardware-specs/psu");
        router.refresh();
      }
    }
  };

  const handleDiscard = () => {
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      router.push("/hardware-specs/psu");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans pb-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase select-none">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-700 transition">
          <Home className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <Link href="/hardware-specs/psu" className="hover:text-slate-700 transition">
          Hardware Specs
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-800 font-extrabold">
          {isEdit ? "EDIT PSU SPEC" : "CREATE PSU SPEC"}
        </span>
      </nav>

      {/* Error Alert */}
      {Boolean(errorMsg) && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{String(errorMsg)}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6 text-slate-800 font-bold text-sm">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Power Supply Specification Details</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PSU Name */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                PSU Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={psu?.name && psu.name !== "notfound" ? psu.name : ""}
                placeholder="e.g., Corsair CV550, Gigabyte P650B, Dell OEM"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">Model name or identifier of the power supply.</p>
            </div>

            {/* Wattage / Power */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Power (Watt) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="wattage"
                required
                defaultValue={psu?.wattage && psu.wattage !== "notfound" ? psu.wattage : ""}
                placeholder="e.g., 450W, 550W, 650W, 750W"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">Total rated continuous power output.</p>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">Remarks</label>
            <textarea
              name="remarks"
              rows={3}
              defaultValue={psu?.remarks && psu.remarks !== "notfound" ? psu.remarks : ""}
              placeholder="Optional notes..."
              className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none placeholder-slate-400"
            />
          </div>

          {/* Actions */}
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
              <span>{isEdit ? "Update PSU Spec" : "Create PSU Spec"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}