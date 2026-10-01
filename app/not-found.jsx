import React from "react";
import Link from "next/link";
import "@/app/globals.css";
import { ArrowLeft, Home } from "lucide-react";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function NotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="m-0 p-0 min-h-screen bg-[#f8fafc] text-slate-900 antialiased font-sans flex items-center justify-center p-4 font-sans">
        <main className="w-full max-w-md bg-white border border-slate-200/90 rounded-xl shadow-xs p-8 text-center">
          {/* Subtle Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 mb-4 border border-slate-200">
            <span>404</span>
            <span className="text-slate-300">/</span>
            <span>Not Found</span>
          </div>

          {/* Heading & Description */}
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Page not found
          </h1>
          <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
            The page you are looking for doesn’t exist or has been moved. Check the URL or navigate back to the dashboard.
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Go Back</span>
            </Link>
          </div>

          {/* Clean Footer Details */}
          <div className="mt-8 pt-5 border-t border-slate-100 text-[11px] text-slate-400">
            KKL Inventory Management System
          </div>
        </main>
      </body>
    </html>
  );
}