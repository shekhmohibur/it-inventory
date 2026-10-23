"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function SectionPrintLayout({ sections, org }) {
  return (
    <PrintPageShell org={org} title="SECTION LIST">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">#</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Section Name</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Parent Department</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Company</th>
              <th className="py-2.5 px-3 text-center w-24">Employees</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {sections.map((s, idx) => (
              <tr key={s.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300">
                  <div className="font-bold">{s.name !== "notfound" ? s.name : "notfound"}</div>
                  {s.reference !== "notfound" && (
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Ref: {s.reference}
                    </div>
                  )}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-medium">
                  {s.departmentName !== "notfound" ? s.departmentName : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-slate-600">
                  {s.companyName !== "notfound" ? s.companyName : "notfound"}
                </td>
                <td className="py-2.5 px-3 text-center font-mono font-bold">
                  {s.employeesCount ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}