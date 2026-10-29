"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";
import { PrintAuditLogSection } from "@/components/print-layout/PrintAuditLogSection";

export function PsuPrintLayout({ psus, org, logs = [] }) {
  return (
    <PrintPageShell org={org} title="POWER SUPPLY (PSU) SPECIFICATIONS DIRECTORY">
      {/* 1. Main Printable Table (Renders on screen AND in print canvas) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">SL</th>
              <th className="py-2.5 px-3 border-r border-slate-300">PSU Name</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Power / Watt</th>
              <th className="py-2.5 px-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {psus.map((p, idx) => (
              <tr key={p.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold text-slate-900">
                  {p.name !== "notfound" ? p.name : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-mono font-bold text-amber-800">
                  {p.wattage !== "notfound" ? p.wattage : "notfound"}
                </td>
                <td className="py-2.5 px-3 text-slate-500">
                  {p.remarks && p.remarks !== "notfound" ? p.remarks : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Audit Log (Visible on screen, hidden on print canvas) */}
      <PrintAuditLogSection logs={logs} />
    </PrintPageShell>
  );
}