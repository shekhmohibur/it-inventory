"use client";

import React from "react";
import {
  Monitor,
  Laptop,
  Tv,
  Server,
  Zap,
  Wifi,
  Network,
  Printer,
  Copy,
  Fingerprint,
  Download,
  Printer as PrintIcon,
} from "lucide-react";

// 1. Metric Cards Dataset
const ASSET_CARDS = [
  {
    title: "COMPUTERS",
    total: "110",
    icon: Monitor,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    badges: [
      { label: "Running 108", type: "success" },
      { label: "Scrapped 02", type: "danger" },
    ],
  },
  {
    title: "LAPTOPS",
    total: "58",
    icon: Laptop,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    badges: [
      { label: "Running 56", type: "success" },
      { label: "Scrapped 02", type: "danger" },
    ],
  },
  {
    title: "DESKTOPS",
    total: "51",
    icon: Tv,
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-50",
    badges: [{ label: "Running 51", type: "success" }],
  },
  {
    title: "SERVERS",
    total: "01",
    icon: Server,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100",
    badges: [{ label: "Running 01", type: "success" }],
  },
  {
    title: "UPS UNITS",
    total: "06",
    icon: Zap,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    badges: [
      { label: "Running 02", type: "success" },
      { label: "Scrapped 04", type: "danger" },
    ],
  },
  {
    title: "ROUTERS",
    total: "28",
    icon: Wifi,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
    badges: [
      { label: "Running 21", type: "success" },
      { label: "Scrapped 06", type: "danger" },
      { label: "In Stock 01", type: "info" },
    ],
  },
  {
    title: "ETHERNETS",
    total: "38",
    icon: Network,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    badges: [{ label: "Running 38", type: "success" }],
  },
  {
    title: "PRINTERS",
    total: "32",
    icon: Printer,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    badges: [
      { label: "In Stock 03", type: "info" },
      { label: "Service Required 01", type: "secondary" },
      { label: "Running 22", type: "success" },
      { label: "Scrapped 06", type: "danger" },
    ],
  },
  {
    title: "SCANNERS",
    total: "05",
    icon: Copy,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
    badges: [{ label: "Running 05", type: "success" }],
  },
  {
    title: "PUNCH MACHINES",
    total: "31",
    icon: Fingerprint,
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-50",
    badges: [
      { label: "Running 18", type: "success" },
      { label: "Scrapped 13", type: "danger" },
    ],
  },
];

// 2. Summary Table Allocation Dataset
const INVENTORY_ROWS = [
  {
    id: 1,
    company: "KAIZER KNITWEARS LTD.",
    department: "Cutting",
    sl: 1,
    section: "Cutting Staff",
    totalComp: 4,
    laptop: 1,
    desktop: 3,
    server: "-",
    monitor: 3,
    router: "-",
    printer: 2,
    scanner: "-",
    ethernet: 6,
  },
  {
    id: 2,
    company: "",
    department: "Finishing",
    sl: 2,
    section: "Finishing Staff",
    totalComp: 2,
    laptop: "-",
    desktop: 2,
    server: "-",
    monitor: 1,
    router: "-",
    printer: 1,
    scanner: "-",
    ethernet: 3,
  },
  {
    id: 3,
    company: "",
    department: "Sewing",
    sl: 3,
    section: "Floor QC & Sup.",
    totalComp: 6,
    laptop: "-",
    desktop: 6,
    server: "-",
    monitor: 6,
    router: 1,
    printer: 1,
    scanner: "-",
    ethernet: 8,
  },
  {
    id: 4,
    company: "",
    department: "Merchandising",
    sl: 4,
    section: "Brand Office",
    totalComp: 12,
    laptop: 4,
    desktop: 8,
    server: "-",
    monitor: 12,
    router: 2,
    printer: 3,
    scanner: 1,
    ethernet: 14,
  },
  {
    id: 5,
    company: "",
    department: "Accounts & Finance",
    sl: 5,
    section: "Accounts Executive",
    totalComp: 8,
    laptop: 2,
    desktop: 6,
    server: "-",
    monitor: 8,
    router: 1,
    printer: 2,
    scanner: 1,
    ethernet: 10,
  },
];

export default function DashboardPage() {
  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = [
      "Company",
      "Department",
      "SL",
      "Section",
      "Total Comp",
      "Laptop",
      "Desktop",
      "Server",
      "Monitor",
      "Router",
      "Printer",
      "Scanner",
      "Ethernet",
    ];

    const rows = INVENTORY_ROWS.map((row) => [
      row.company || "KAIZER KNITWEARS LTD.",
      row.department,
      row.sl,
      row.section,
      row.totalComp,
      row.laptop,
      row.desktop,
      row.server,
      row.monitor,
      row.router,
      row.printer,
      row.scanner,
      row.ethernet,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `KKL_IT_Inventory_Report_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/70";
      case "danger":
        return "bg-rose-50 text-rose-700 border-rose-200/70";
      case "info":
        return "bg-blue-50 text-blue-700 border-blue-200/70";
      case "secondary":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getDotClass = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-500";
      case "danger":
        return "bg-rose-500";
      case "info":
        return "bg-blue-500";
      case "secondary":
        return "bg-slate-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="space-y-6 print:space-y-4 print:p-0">
      {/* 1. Header & Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            IT Asset Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            Real-time status of all hardware across the organization.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Data</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <PrintIcon className="w-3.5 h-3.5" />
            <span>Print Summary</span>
          </button>
        </div>
      </div>

      {/* 2. 10 Asset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 print:grid-cols-5 print:gap-2">
        {ASSET_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all print:border print:shadow-none"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      {card.title}
                    </span>
                    <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                      {card.total}
                    </div>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}
                  >
                    <Icon className={`w-4 h-4 ${card.iconColor}`} />
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
                {card.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getBadgeClass(
                      badge.type
                    )}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${getDotClass(
                        badge.type
                      )}`}
                    />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. IT Inventory Summary Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden print:border print:shadow-none">
        {/* Table Top Banner */}
        <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              IT INVENTORY SUMMARY
            </h2>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
              OFFICIAL ASSET ALLOCATION REPORT
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold transition-colors cursor-pointer print:hidden"
          >
            <PrintIcon className="w-3.5 h-3.5" />
            <span>PRINT</span>
          </button>
        </div>

        {/* Responsive Table Scroll Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/70 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">COMPANY</th>
                <th className="py-3 px-3">DEPARTMENT</th>
                <th className="py-3 px-2 text-center">SL</th>
                <th className="py-3 px-3">SECTION</th>
                <th className="py-3 px-3 text-center bg-indigo-50/60 text-indigo-700 font-bold border-x border-indigo-100/50">
                  TOTAL COMP
                </th>
                <th className="py-3 px-2 text-center">LAPTOP</th>
                <th className="py-3 px-2 text-center">DESKTOP</th>
                <th className="py-3 px-2 text-center">SERVER</th>
                <th className="py-3 px-2 text-center">MONITOR</th>
                <th className="py-3 px-2 text-center">ROUTER</th>
                <th className="py-3 px-2 text-center">PRINTER</th>
                <th className="py-3 px-2 text-center">SCANNER</th>
                <th className="py-3 px-3 text-center">ETHERNET</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {INVENTORY_ROWS.map((row, index) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  {/* Rowspan or Company Title */}
                  <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 text-xs">
                    {index === 0 ? "KAIZER KNITWEARS LTD." : ""}
                  </td>
                  <td className="py-3 px-3 text-slate-800">{row.department}</td>
                  <td className="py-3 px-2 text-center text-slate-400 font-mono text-[11px]">
                    {row.sl}
                  </td>
                  <td className="py-3 px-3 text-slate-800">{row.section}</td>
                  <td className="py-3 px-3 text-center font-bold text-indigo-600 bg-indigo-50/30 border-x border-indigo-100/50">
                    {row.totalComp}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-600">
                    {row.laptop}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-600">
                    {row.desktop}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-400">
                    {row.server}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-600">
                    {row.monitor}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-600">
                    {row.router}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-600">
                    {row.printer}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-400">
                    {row.scanner}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-600">
                    {row.ethernet}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}