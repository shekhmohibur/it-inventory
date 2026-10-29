"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function ModelPrintLayout({ models, org }) {
  return (
    <PrintPageShell org={org} title="DEVICE MODEL DIRECTORY">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">SL</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Model Name</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Brand</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Category</th>
              <th className="py-2.5 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {models.map((m, idx) => (
              <tr key={m.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold">
                  {m.name !== "notfound" ? m.name : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-semibold text-slate-900">
                  {m.brandName !== "notfound" ? m.brandName : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300">
                  {m.category !== "notfound" ? m.category : "notfound"}
                </td>
                <td className="py-2.5 px-3 text-slate-500">
                  {m.remarks && m.remarks !== "notfound" ? m.remarks : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}