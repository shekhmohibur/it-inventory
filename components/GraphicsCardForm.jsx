"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle, MonitorPlay } from "lucide-react";
import { createGraphicsCardAction, updateGraphicsCardAction } from "@/app/actions/graphicsCard";

const CHIPSET_BRANDS = ["NVIDIA", "AMD", "Intel", "Apple", "Other"];
const CARD_TYPES = ["Dedicated (Discrete)", "Integrated (iGPU)", "Low Profile", "Mobile / Laptop"];
const MEMORY_TYPES = ["GDDR6X", "GDDR6", "GDDR5", "Shared DDR4", "Shared DDR5", "HBM2"];

export function GraphicsCardForm({ card, isEdit = false }) {
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
    if (isEdit && card?.id) {
      res = await updateGraphicsCardAction(card.id, formData);
    } else {
      res = await createGraphicsCardAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        router.push("/hardware-specs/graphics-card");
        router.refresh();
      }
    }
  };

  const handleDiscard = () => {
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      router.push("/hardware-specs/graphics-card");
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
        <Link href="/hardware-specs/graphics-card" className="hover:text-slate-700 transition">
          Hardware Specs
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-800 font-extrabold">
          {isEdit ? "EDIT GRAPHICS CARD" : "CREATE GRAPHICS CARD"}
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
          <MonitorPlay className="w-4 h-4 text-slate-500" />
          <span>Graphics Card Specification Details</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chipset Brand */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Chipset Brand <span className="text-rose-500">*</span>
              </label>
              <select
                name="chipsetBrand"
                required
                defaultValue={card?.chipsetBrand && card.chipsetBrand !== "notfound" ? card.chipsetBrand : "NVIDIA"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {CHIPSET_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">GPU chipset manufacturer.</p>
            </div>

            {/* Model Name */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Model Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="modelName"
                required
                defaultValue={card?.modelName && card.modelName !== "notfound" ? card.modelName : ""}
                placeholder="e.g., RTX 3060, RX 6600, UHD Graphics 770"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">GPU core/chip model number.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Series */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">Series / Generation</label>
              <input
                type="text"
                name="series"
                defaultValue={card?.series && card.series !== "notfound" ? card.series : ""}
                placeholder="e.g., GeForce RTX 30 Series, Radeon RX 6000"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">Marketing family or generation tier.</p>
            </div>

            {/* Card Type */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Card Type / Form Factor <span className="text-rose-500">*</span>
              </label>
              <select
                name="cardType"
                required
                defaultValue={card?.cardType && card.cardType !== "notfound" ? card.cardType : "Dedicated (Discrete)"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {CARD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">Discrete PCI-e card vs CPU-integrated.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* VRAM Capacity */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                VRAM Capacity <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="memoryCapacity"
                required
                defaultValue={card?.memoryCapacity && card.memoryCapacity !== "notfound" ? card.memoryCapacity : ""}
                placeholder="e.g., 4 GB, 8 GB, 12 GB, 16 GB, Shared"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">Video memory size.</p>
            </div>

            {/* Memory Type */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">VRAM Type</label>
              <select
                name="memoryType"
                defaultValue={card?.memoryType && card.memoryType !== "notfound" ? card.memoryType : "GDDR6"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {MEMORY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">Memory generation architecture.</p>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">Remarks</label>
            <textarea
              name="remarks"
              rows={3}
              defaultValue={card?.remarks && card.remarks !== "notfound" ? card.remarks : ""}
              placeholder="Optional notes regarding video outputs (DisplayPort, HDMI), power connectors (8-pin), etc..."
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
              <span>{isEdit ? "Update Graphics Card" : "Create Graphics Card"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}