"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function BrandPrintLayout({ brands = [], org }) {
  return (
    <PrintPageShell org={org} title="HARDWARE BRANDS DIRECTORY">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">SL</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Brand Name</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Category</th>
              <th className="py-2.5 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {brands.map((b, idx) => (
              <tr key={b.id || idx} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px] text-slate-400">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold text-slate-900">
                  {b.name !== "notfound" ? b.name : "—"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-slate-700">
                  {b.category !== "notfound" ? b.category : "—"}
                </td>
                <td className="py-2.5 px-3 text-slate-500">
                  {b.remarks && b.remarks !== "notfound" ? b.remarks : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}