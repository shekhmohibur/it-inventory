"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle, HardDrive } from "lucide-react";
import { createStorageAction, updateStorageAction } from "@/app/actions/storage";

const DRIVE_TYPES = ["SSD", "HDD", "NVMe SSD", "Hybrid (SSHD)"];
const INTERFACES = [
  "SATA III (6 Gb/s)",
  "PCIe NVMe Gen 3",
  "PCIe NVMe Gen 4",
  "PCIe NVMe Gen 5",
  "SAS",
  "USB 3.2 External",
];
const FORM_FACTORS = [
  "2.5 Inch",
  "3.5 Inch",
  "M.2 2280",
  "M.2 2230",
  "PCIe Add-in Card",
  "External Portable",
];

export function StorageForm({ storage, isEdit = false }) {
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
    if (isEdit && storage?.id) {
      res = await updateStorageAction(storage.id, formData);
    } else {
      res = await createStorageAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        router.push("/hardware-specs/storage");
        router.refresh();
      }
    }
  };

  const handleDiscard = () => {
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      router.push("/hardware-specs/storage");
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
        <Link href="/hardware-specs/storage" className="hover:text-slate-700 transition">
          Hardware Specs
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-800 font-extrabold">
          {isEdit ? "EDIT STORAGE SPEC" : "CREATE STORAGE SPEC"}
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
          <HardDrive className="w-4 h-4 text-slate-500" />
          <span>Storage Specification Details</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Drive Type */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Drive Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="driveType"
                required
                defaultValue={storage?.driveType && storage.driveType !== "notfound" ? storage.driveType : "SSD"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {DRIVE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">Media technology (SSD, HDD, NVMe).</p>
            </div>

            {/* Capacity */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Capacity <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="capacity"
                required
                defaultValue={storage?.capacity && storage.capacity !== "notfound" ? storage.capacity : ""}
                placeholder="e.g., 256 GB, 512 GB, 1 TB, 2 TB"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">Storage capacity value with unit.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Interface */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Interface <span className="text-rose-500">*</span>
              </label>
              <select
                name="interface"
                required
                defaultValue={storage?.interface && storage.interface !== "notfound" ? storage.interface : "SATA III (6 Gb/s)"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {INTERFACES.map((iface) => (
                  <option key={iface} value={iface}>
                    {iface}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">Connection bus protocol.</p>
            </div>

            {/* Form Factor */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Form Factor <span className="text-rose-500">*</span>
              </label>
              <select
                name="formFactor"
                required
                defaultValue={storage?.formFactor && storage.formFactor !== "notfound" ? storage.formFactor : "2.5 Inch"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {FORM_FACTORS.map((ff) => (
                  <option key={ff} value={ff}>
                    {ff}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">Physical dimension & mounting format.</p>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">Remarks</label>
            <textarea
              name="remarks"
              rows={3}
              defaultValue={storage?.remarks && storage.remarks !== "notfound" ? storage.remarks : ""}
              placeholder="Optional notes regarding NAND type (TLC/QLC), enclosure type, or OS drive suitability..."
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
              <span>{isEdit ? "Update Storage Spec" : "Create Storage Spec"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}