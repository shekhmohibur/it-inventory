"use client";

import React from "react";
import { PrintPageShell } from "@/components/print-layout/PrintPageShell";

export function EmployeePrintLayout({ employees, org }) {
  return (
    <PrintPageShell org={org} title="EMPLOYEE DIRECTORY">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-700 uppercase">
              <th className="py-2.5 px-3 border-r border-slate-300 text-center w-12">#</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Code</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Employee Name</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Designation</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Company & Dept</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Contact / Email</th>
              <th className="py-2.5 px-3 text-center w-20">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {employees.map((emp, idx) => (
              <tr key={emp.id} className="text-slate-800">
                <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-mono font-bold">
                  {emp.employeeCode !== "notfound" ? emp.employeeCode : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 font-bold">
                  {emp.name !== "notfound" ? emp.name : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300">
                  {emp.designation !== "notfound" ? emp.designation : "notfound"}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-[11px]">
                  <div className="font-semibold text-slate-900">{emp.companyName}</div>
                  <div className="text-slate-500">{emp.departmentName}</div>
                </td>
                <td className="py-2.5 px-3 border-r border-slate-300 text-[11px] font-mono">
                  <div>{emp.contactNumber}</div>
                  <div className="text-slate-400 text-[10px]">{emp.officeEmail || emp.personalEmail || "—"}</div>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    emp.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                  }`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrintPageShell>
  );
}