"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function ProcessorPrintLayout({ processors, org }) {
  return (
    <PrintPageShell org={org} title="PROCESSOR SPECIFICATIONS DIRECTORY">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">SL</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Processor Name</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Brand</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Gen / Series</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Base Clock</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Cores / Threads</th>
              <th className="py-2.5 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {processors.map((p, idx) => (
              <tr key={p.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold">
                  {p.name !== "notfound" ? p.name : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-semibold text-slate-900">
                  {p.brand !== "notfound" ? p.brand : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-[11px]">
                  <div>{p.series || "—"}</div>
                  <div className="text-slate-400 text-[10px]">{p.generation || ""}</div>
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-mono text-[11px]">
                  {p.baseSpeed || "—"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-[11px]">
                  {p.coresThreads || "—"}
                </td>
                <td className="py-2.5 px-3 text-slate-500">
                  {p.remarks && p.remarks !== "notfound" ? p.remarks : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}