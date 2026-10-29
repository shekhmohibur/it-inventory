"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function StoragePrintLayout({ storages, org }) {
  return (
    <PrintPageShell org={org} title="STORAGE SPECIFICATIONS DIRECTORY">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">SL</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Capacity</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Drive Type</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Interface</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Form Factor</th>
              <th className="py-2.5 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {storages.map((s, idx) => (
              <tr key={s.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold">
                  {s.capacity !== "notfound" ? s.capacity : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-semibold text-blue-700">
                  {s.driveType !== "notfound" ? s.driveType : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-mono text-[11px]">
                  {s.interface !== "notfound" ? s.interface : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-slate-600">
                  {s.formFactor !== "notfound" ? s.formFactor : "notfound"}
                </td>
                <td className="py-2.5 px-3 text-slate-500">
                  {s.remarks && s.remarks !== "notfound" ? s.remarks : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}