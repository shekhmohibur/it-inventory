"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle, CircuitBoard } from "lucide-react";
import { createMotherboardAction, updateMotherboardAction } from "@/app/actions/motherboard";

export function MotherboardForm({ motherboard, brands = [], models = [], isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [selectedBrandId, setSelectedBrandId] = useState(
    motherboard?.brandId || brands[0]?.id || ""
  );
  const [selectedModelId, setSelectedModelId] = useState(
    motherboard?.modelId || ""
  );

  // Filter models belonging to the selected brand
  const filteredModels = models.filter((m) => m.brandId === selectedBrandId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    let res;
    if (isEdit && motherboard?.id) {
      res = await updateMotherboardAction(motherboard.id, formData);
    } else {
      res = await createMotherboardAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        router.push("/hardware-specs/motherboards");
        router.refresh();
      }
    }
  };

  const handleDiscard = () => {
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      router.push("/hardware-specs/motherboards");
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
        <Link href="/hardware-specs/motherboards" className="hover:text-slate-700 transition">
          Hardware Specs
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-800 font-extrabold">
          {isEdit ? "EDIT MOTHERBOARD" : "CREATE MOTHERBOARD"}
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
          <CircuitBoard className="w-4 h-4 text-slate-500" />
          <span>Motherboard Selection</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand Dropdown */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Brand <span className="text-rose-500">*</span>
              </label>
              <select
                name="brandId"
                required
                value={selectedBrandId}
                onChange={(e) => {
                  setSelectedBrandId(e.target.value);
                  setSelectedModelId("");
                }}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="" disabled>Select Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">Motherboard brand from Brands list.</p>
            </div>

            {/* Model Dropdown (Filtered by Brand) */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Model <span className="text-rose-500">*</span>
              </label>
              <select
                name="modelId"
                required
                value={selectedModelId || (filteredModels[0]?.id ?? "")}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {filteredModels.length === 0 ? (
                  <option value="" disabled>No models found for this brand</option>
                ) : (
                  filteredModels.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))
                )}
              </select>
              <p className="text-[11px] text-slate-400">Model name from Models list.</p>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">Remarks</label>
            <textarea
              name="remarks"
              rows={3}
              defaultValue={motherboard?.remarks && motherboard.remarks !== "notfound" ? motherboard.remarks : ""}
              placeholder="Optional notes..."
              className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none placeholder-slate-400"
            />
          </div>

          {/* Action Buttons */}
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
              disabled={loading || filteredModels.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>{isEdit ? "Update Motherboard" : "Create Motherboard"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}