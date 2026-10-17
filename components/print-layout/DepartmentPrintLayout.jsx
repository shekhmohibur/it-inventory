"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function DepartmentPrintLayout({ departments, org }) {
  return (
    <PrintPageShell org={org} title="DEPARTMENT LIST">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">#</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Department Name</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Parent Company</th>
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-20">Sections</th>
              <th className="py-2.5 px-3 text-center w-24">Employees</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {departments.map((d, idx) => (
              <tr key={d.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300">
                  <div className="font-bold">{d.name !== "notfound" ? d.name : "notfound"}</div>
                  {d.reference !== "notfound" && (
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Ref: {d.reference}
                    </div>
                  )}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-medium">
                  {d.companyName !== "notfound" ? d.companyName : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono font-semibold">
                  {d.sectionsCount}
                </td>
                <td className="py-2.5 px-3 text-center font-mono font-bold">
                  {d.employeesCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}