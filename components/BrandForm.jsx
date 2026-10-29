"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle } from "lucide-react";
import { createBrandAction, updateBrandAction } from "@/app/actions/brand";

const DEFAULT_CATEGORIES = [
  "Computer",
  "Monitor",
  "Laptop",
  "Printer",
  "Scanner",
  "Networking",
  "Motherboards",
  "UPS",
  "Accessories",
];

export function BrandForm({ brand, categories = DEFAULT_CATEGORIES, isEdit = false }) {
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
    if (isEdit && brand?.id) {
      res = await updateBrandAction(brand.id, formData);
    } else {
      res = await createBrandAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        router.push("/hardware-specs/brands");
        router.refresh();
      }
    }
  };

  const handleDiscard = () => {
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      router.push("/hardware-specs/brands");
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
        <Link href="/hardware-specs/brands" className="hover:text-slate-700 transition">
          Hardware Specs
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-800 font-extrabold">
          {isEdit ? "EDIT BRAND" : "CREATE BRAND"}
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
        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              name="category"
              required
              defaultValue={brand?.category && brand.category !== "notfound" ? brand.category : ""}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="" disabled>---------</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">
              The hardware category this brand belongs to.
            </p>
          </div>

          {/* Brand Name Input */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">
              Brand Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={brand?.name && brand.name !== "notfound" ? brand.name : ""}
              placeholder="e.g., HP, Cisco, Dell"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
            />
            <p className="text-[11px] text-slate-400">
              The official name of the brand.
            </p>
          </div>

          {/* Remarks Textarea */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">
              Remarks
            </label>
            <textarea
              name="remarks"
              rows={4}
              defaultValue={
                brand?.remarks && brand.remarks !== "notfound" ? brand.remarks : ""
              }
              placeholder="Enter any optional notes here..."
              className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none placeholder-slate-400"
            />
            <p className="text-[11px] text-slate-400">
              Optional internal notes or descriptions about the brand.
            </p>
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
              <span>{isEdit ? "Update Brand" : "Create Brand"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}