"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  Calendar,
  Check,
  AlertCircle,
  Loader2,
  Save,
} from "lucide-react";
import { updateLicenseAction } from "@/app/actions/license";

function formatDateDisplay(dateStr) {
  if (!dateStr || dateStr === "notfound") return "notfound";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "notfound";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "notfound";
  }
}

function formatDateInput(dateStr) {
  if (!dateStr || dateStr === "notfound") return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  } catch {
    return "";
  }
}

export function LicenseEditor({ initialData, canEdit }) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [enforce, setEnforce] = useState(
    initialData?.enforceRestrictions ?? true
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canEdit) {
      setErrorMsg("You do not have permission (settings:edit) to modify license configurations.");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.set("enforceRestrictions", enforce ? "on" : "off");

    const res = await updateLicenseAction(formData);
    setLoading(false);

    if (res?.error) {
      setErrorMsg(String(res.error));
    } else {
      setSuccessMsg("License configuration updated successfully.");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  const formattedExp = formatDateDisplay(initialData?.expirationDate);
  const formattedNotice = formatDateDisplay(initialData?.noticeDate);

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Alert Messages */}
      {Boolean(successMsg) && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{String(successMsg)}</span>
        </div>
      )}
      {Boolean(errorMsg) && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{String(errorMsg)}</span>
        </div>
      )}

      {/* 1. TOP OVERVIEW CARD */}
      <div className="bg-white border-t-4 border-t-amber-500 border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-500 shrink-0 shadow-xs">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {initialData?.licenseName !== "notfound"
                  ? initialData.licenseName
                  : "Enterprise Workspace License"}
              </h2>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                {initialData?.planType !== "notfound"
                  ? initialData.planType
                  : "MONTHLY CLOUD SUBSCRIPTION"}
              </p>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Expiring Soon
            </span>
          </div>
        </div>

        {/* Renewal Warning Banner */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-amber-800">Renewal Required</div>
            <p className="text-xs text-amber-700 mt-0.5">
              License expires on{" "}
              <span className="font-bold underline decoration-amber-300">
                {formattedExp !== "notfound" ? formattedExp : "the specified expiration date"}
              </span>
              . Please renew soon.
            </p>
          </div>
        </div>

        {/* Date Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
              EXPIRATION DATE
            </span>
            <div className="text-base font-bold text-slate-900 mt-1">
              {formattedExp}
            </div>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
              NOTICE PERIOD STARTED
            </span>
            <div className="text-base font-bold text-slate-900 mt-1">
              {formattedNotice}
            </div>
          </div>
        </div>
      </div>

      {/* 2. UPDATE CONFIGURATION CARD */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-5">
          Update Configuration
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 text-[10px] tracking-wider uppercase">
              LICENSE NAME
            </label>
            <input
              type="text"
              name="licenseName"
              defaultValue={
                initialData?.licenseName !== "notfound"
                  ? initialData.licenseName
                  : "Enterprise Workspace License"
              }
              disabled={!canEdit}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 text-[10px] tracking-wider uppercase">
                NOTICE DATE
              </label>
              <input
                type="date"
                name="noticeDate"
                defaultValue={formatDateInput(initialData?.noticeDate)}
                disabled={!canEdit}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 text-[10px] tracking-wider uppercase">
                EXPIRATION DATE
              </label>
              <input
                type="date"
                name="expirationDate"
                defaultValue={formatDateInput(initialData?.expirationDate)}
                disabled={!canEdit}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Enforce Restrictions Checkbox */}
          <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl flex items-start gap-3">
            <input
              type="checkbox"
              id="enforceRestrictions"
              checked={enforce}
              onChange={(e) => setEnforce(e.target.checked)}
              disabled={!canEdit}
              className="w-4 h-4 mt-0.5 rounded text-amber-500 focus:ring-amber-400 border-slate-300 cursor-pointer disabled:cursor-not-allowed"
            />
            <label htmlFor="enforceRestrictions" className="cursor-pointer select-none">
              <div className="font-bold text-slate-800 text-xs">
                Enforce License Restrictions
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Uncheck to disable lockouts. (Users can log in regardless of dates).
              </div>
            </label>
          </div>

          {canEdit && (
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}