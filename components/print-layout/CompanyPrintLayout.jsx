"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function CompanyPrintLayout({ companies, org }) {
  return (
    <PrintPageShell org={org} title="COMPANY LIST">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">#</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Company Name</th>
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-24">Short Name</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Address</th>
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-16">Depts</th>
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-16">Sections</th>
              <th className="py-2.5 px-3 text-center w-20">Employees</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {companies.map((c, idx) => (
              <tr key={c.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold">
                  {c.name !== "notfound" ? c.name : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono font-medium">
                  {c.shortName !== "notfound" ? c.shortName : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-[11px] text-slate-600">
                  {c.address !== "notfound" ? c.address : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono">
                  {c.departments ?? 0}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono">
                  {c.sections ?? 0}
                </td>
                <td className="py-2.5 px-3 text-center font-mono font-bold">
                  {c.employees ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}