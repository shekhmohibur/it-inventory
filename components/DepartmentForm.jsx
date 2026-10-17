"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle } from "lucide-react";
import {
  createDepartmentAction,
  updateDepartmentAction,
} from "@/app/actions/department";

export function DepartmentForm({ department, companies = [], isEdit = false }) {
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
    if (isEdit && department?.id) {
      res = await updateDepartmentAction(department.id, formData);
    } else {
      res = await createDepartmentAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.close();
      } else {
        router.push("/master-data/departments");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-24">
      {/* Breadcrumb Header */}
      <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase select-none">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-700 transition">
          <Home className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <Link href="/master-data/departments" className="hover:text-slate-700 transition">
          Master Data
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-800 font-extrabold">
          {isEdit ? "EDIT DEPARTMENT" : "CREATE DEPARTMENT"}
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
        <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-700">
          {/* Parent Company Selection */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">
              Parent Company <span className="text-rose-500">*</span>
            </label>
            <select
              name="companyId"
              required
              defaultValue={department?.companyId || companies[0]?.id || ""}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.shortName && c.shortName !== "notfound" ? `(${c.shortName})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Department Name */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">
              Department Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={department?.name && department?.name !== "notfound" ? department.name : ""}
              placeholder="e.g., Cutting, Finishing, Sewing, Accounts"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">
              Description / Scope
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={
                department?.description && department?.description !== "notfound"
                  ? department.description
                  : ""
              }
              placeholder="Brief description of department scope..."
              className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none placeholder-slate-400"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.opener) {
                  window.close();
                } else {
                  router.push("/master-data/departments");
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
              <span>{isEdit ? "Update Department" : "Create Department"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}