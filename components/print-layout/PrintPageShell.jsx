"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Printer, X } from "lucide-react";

export function PrintPageShell({ org, title = "REPORT", children }) {
  const [printDate, setPrintDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setPrintDate(
      now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  }, []);

  const orgLogo = org?.mainLogo && org.mainLogo !== "notfound" ? org.mainLogo : null;
  const orgName = org?.businessName && org.businessName !== "notfound" ? org.businessName : "Kaizer Knitwears Ltd.";
  const orgAddress = org?.physicalAddress && org.physicalAddress !== "notfound" ? org.physicalAddress : "Nayapara, Kashimpur, Gazipur-1346, Bangladesh";

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-4 flex justify-center print:p-0 print:bg-white print:min-h-0 font-sans">
      {/* Floating Action Controls */}
      <div className="fixed top-6 right-6 flex flex-col gap-2 z-50 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="w-10 h-10 rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 flex items-center justify-center transition cursor-pointer"
          title="Print Document"
        >
          <Printer className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => window.close()}
          className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-xl hover:bg-slate-100 flex items-center justify-center transition cursor-pointer border border-slate-200"
          title="Close Tab"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* The Isolated Sheet */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-8 sm:p-12 text-slate-900 print:shadow-none print:p-0 print:max-w-none print:rounded-none">
        {/* Header Block */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-5 mb-6">
          <div className="flex items-center gap-4">
            {orgLogo && (
              <div className="w-12 h-12 relative shrink-0">
                <Image
                  src={orgLogo}
                  alt={orgName}
                  width={48}
                  height={48}
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                {orgName}
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {orgAddress}
              </p>
              <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase mt-1">
                {title}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-slate-500">
              Printed on: <span className="font-semibold text-slate-700">{printDate}</span>
            </div>
            <div className="text-[10px] font-bold text-slate-900 mt-0.5">
              Showing all records
            </div>
          </div>
        </div>

        {/* Content */}
        {children}

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-400 mt-8 tracking-widest uppercase">
          --- End of Report ---
        </div>
      </div>
    </div>
  );
}