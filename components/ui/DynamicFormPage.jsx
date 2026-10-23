"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle } from "lucide-react";

export function DynamicFormPage({
  breadcrumbs = [],
  title = "Form",
  fields = [],
  initialData = {},
  onSubmitAction,
  submitLabel = "Save Changes",
  backUrl = "/",
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const res = await onSubmitAction(formData);

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        router.push(backUrl);
        router.refresh();
      }
    }
  };

  const handleDiscard = () => {
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      router.push(backUrl);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-24">
      {/* 1. BREADCRUMBS */}
      <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase select-none">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-700 transition">
          <Home className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-slate-700 transition">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-slate-800 font-extrabold">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
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
        <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-700">
          {fields.map((field) => {
            const rawValue = initialData[field.name];
            const defaultValue = rawValue && rawValue !== "notfound" ? rawValue : "";

            return (
              <div key={field.name} className="space-y-1.5">
                <label className="font-semibold text-slate-800 text-xs">
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>

                {/* TEXT / NUMBER / EMAIL */}
                {["text", "number", "email", "tel"].includes(field.type || "text") && (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    required={field.required}
                    defaultValue={defaultValue}
                    placeholder={field.placeholder || ""}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
                  />
                )}

                {/* TEXTAREA */}
                {field.type === "textarea" && (
                  <textarea
                    name={field.name}
                    rows={field.rows || 4}
                    required={field.required}
                    defaultValue={defaultValue}
                    placeholder={field.placeholder || ""}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none placeholder-slate-400"
                  />
                )}

                {/* SELECT DROPDOWN */}
                {field.type === "select" && (
                  <select
                    name={field.name}
                    required={field.required}
                    defaultValue={defaultValue || (field.options?.[0]?.value ?? "")}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {/* FILE INPUT */}
                {field.type === "file" && (
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <input
                      type="file"
                      name={field.name}
                      accept={field.accept || "image/*"}
                      required={field.required}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-l-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* ACTION BUTTONS */}
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
              <span>{submitLabel}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}