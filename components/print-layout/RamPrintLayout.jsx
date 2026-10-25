"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function RamPrintLayout({ rams, org }) {
  return (
    <PrintPageShell org={org} title="RAM SPECIFICATIONS DIRECTORY">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">SL</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Capacity</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Type</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Bus Speed</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Form Factor</th>
              <th className="py-2.5 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {rams.map((r, idx) => (
              <tr key={r.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold">
                  {r.capacity !== "notfound" ? r.capacity : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-semibold text-blue-700">
                  {r.ramType !== "notfound" ? r.ramType : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-mono">
                  {r.busSpeed !== "notfound" ? r.busSpeed : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300">
                  {r.formFactor !== "notfound" ? r.formFactor : "notfound"}
                </td>
                <td className="py-2.5 px-3 text-slate-500">
                  {r.remarks && r.remarks !== "notfound" ? r.remarks : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}