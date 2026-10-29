"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function MotherboardPrintLayout({ motherboards, org }) {
  return (
    <PrintPageShell org={org} title="MOTHERBOARD SPECIFICATIONS DIRECTORY">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">SL</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Brand</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Model Name</th>
              <th className="py-2.5 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {motherboards.map((mb, idx) => (
              <tr key={mb.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-semibold text-slate-900">
                  {mb.brand !== "notfound" ? mb.brand : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold">
                  {mb.name !== "notfound" ? mb.name : "notfound"}
                </td>
                <td className="py-2.5 px-3 text-slate-500">
                  {mb.remarks && mb.remarks !== "notfound" ? mb.remarks : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}