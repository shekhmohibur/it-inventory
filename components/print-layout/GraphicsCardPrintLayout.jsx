"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function GraphicsCardPrintLayout({ cards, org }) {
  return (
    <PrintPageShell org={org} title="GRAPHICS CARD SPECIFICATIONS DIRECTORY">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">SL</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Chipset Brand</th>
              <th className="py-2.5 px-3 border-r border-slate-300">GPU Model</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Series</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Memory</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Type</th>
              <th className="py-2.5 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {cards.map((c, idx) => (
              <tr key={c.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-semibold text-slate-900">
                  {c.chipsetBrand !== "notfound" ? c.chipsetBrand : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold">
                  {c.modelName !== "notfound" ? c.modelName : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-slate-600">
                  {c.series || "—"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-mono text-[11px]">
                  {c.memoryCapacity} {c.memoryType ? `(${c.memoryType})` : ""}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-[11px]">
                  {c.cardType}
                </td>
                <td className="py-2.5 px-3 text-slate-500">
                  {c.remarks && c.remarks !== "notfound" ? c.remarks : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}