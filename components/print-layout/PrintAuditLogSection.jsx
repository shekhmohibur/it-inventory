"use client";

import React from "react";
import { History, User, Clock } from "lucide-react";

export function PrintAuditLogSection({ logs = [] }) {
  if (!logs || logs.length === 0) return null;

  return (
    // 'print:hidden' hides this entire block from paper / PDF prints
    <div className="print:hidden mt-10 pt-6 border-t border-slate-200">
      <div className="flex items-center gap-2 mb-3 text-slate-700">
        <History className="w-4 h-4 text-slate-500" />
        <h3 className="text-xs font-bold tracking-wider uppercase">
          Modification & Change Logs (Screen Only)
        </h3>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-2.5 px-3 w-12 text-center">SL</th>
              <th className="py-2.5 px-3">Action</th>
              <th className="py-2.5 px-3">Modified By</th>
              <th className="py-2.5 px-3">Date & Time</th>
              <th className="py-2.5 px-3">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {logs.map((log, idx) => (
              <tr key={log.id} className="text-slate-700 hover:bg-slate-100/50 transition">
                <td className="py-2.5 px-3 text-center font-mono text-[11px] text-slate-400">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 font-semibold">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      log.action === "CREATE"
                        ? "bg-emerald-100 text-emerald-800"
                        : log.action === "UPDATE"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-medium text-slate-900">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{log.fullName}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{log.formattedDate}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                  {log.details || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}