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
  Share2,
  Printer as PrintIcon,
} from "lucide-react";

// Stat card data matching the dashboard layout
const STAT_CARDS = [
  {
    label: "COMPUTERS",
    count: "110",
    icon: Monitor,
    iconBg: "bg-blue-50 text-blue-600",
    badges: [
      { text: "Running 108", type: "running" },
      { text: "Scrapped 02", type: "scrapped" },
    ],
  },
  {
    label: "LAPTOPS",
    count: "58",
    icon: Laptop,
    iconBg: "bg-amber-50 text-amber-600",
    badges: [
      { text: "Running 56", type: "running" },
      { text: "Scrapped 02", type: "scrapped" },
    ],
  },
  {
    label: "DESKTOPS",
    count: "51",
    icon: Tv,
    iconBg: "bg-sky-50 text-sky-600",
    badges: [{ text: "Running 51", type: "running" }],
  },
  {
    label: "SERVERS",
    count: "01",
    icon: Server,
    iconBg: "bg-slate-100 text-slate-700",
    badges: [{ text: "Running 01", type: "running" }],
  },
  {
    label: "UPS UNITS",
    count: "06",
    icon: Zap,
    iconBg: "bg-amber-50 text-amber-600",
    badges: [
      { text: "Running 02", type: "running" },
      { text: "Scrapped 04", type: "scrapped" },
    ],
  },
  {
    label: "ROUTERS",
    count: "28",
    icon: Wifi,
    iconBg: "bg-cyan-50 text-cyan-600",
    badges: [
      { text: "Running 21", type: "running" },
      { text: "Scrapped 06", type: "scrapped" },
      { text: "In Stock 01", type: "stock" },
    ],
  },
  {
    label: "ETHERNETS",
    count: "38",
    icon: Network,
    iconBg: "bg-emerald-50 text-emerald-600",
    badges: [{ text: "Running 38", type: "running" }],
  },
  {
    label: "PRINTERS",
    count: "32",
    icon: Printer,
    iconBg: "bg-fuchsia-100 text-fuchsia-600",
    badges: [
      { text: "In Stock 03", type: "stock" },
      { text: "Service Required 01", type: "service" },
      { text: "Running 22", type: "running" },
      { text: "Scrapped 06", type: "scrapped" },
    ],
  },
  {
    label: "SCANNERS",
    count: "05",
    icon: Copy,
    iconBg: "bg-rose-50 text-rose-500",
    badges: [{ text: "Running 05", type: "running" }],
  },
  {
    label: "PUNCH MACHINES",
    count: "31",
    icon: Fingerprint,
    iconBg: "bg-purple-50 text-purple-600",
    badges: [
      { text: "Running 18", type: "running" },
      { text: "Scrapped 13", type: "scrapped" },
    ],
  },
];

// Sample report table rows
const TABLE_ROWS = [
  {
    company: "KAIZER KNITWEARS LTD.",
    dept: "Cutting",
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
    punch: 1,
    remarks: "",
  },
  {
    company: "",
    dept: "Finishing",
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
    punch: 4,
    remarks: "",
  },
  {
    company: "",
    dept: "Knitting & Dyeing",
    sl: 3,
    section: "Dyeing",
    totalComp: 7,
    laptop: 5,
    desktop: 2,
    server: "-",
    monitor: "-",
    router: "-",
    printer: "-",
    scanner: "-",
    ethernet: "-",
    punch: "-",
    remarks: "",
  },
  {
    company: "",
    dept: "",
    sl: 4,
    section: "Knitting",
    totalComp: 3,
    laptop: 1,
    desktop: 2,
    server: "-",
    monitor: "-",
    router: "-",
    printer: "-",
    scanner: "-",
    ethernet: "-",
    punch: "-",
    remarks: "",
  },
  {
    isSubtotal: true,
    title: "KNITTING & DYEING TOTAL",
    totalComp: 10,
    laptop: 6,
    desktop: 4,
    server: "-",
    monitor: "-",
    router: "-",
    printer: "-",
    scanner: "-",
    ethernet: "-",
    punch: "-",
    remarks: "",
  },
  {
    company: "",
    dept: "Maintenance",
    sl: 5,
    section: "Maintenance (Electrical)",
    totalComp: 1,
    laptop: "-",
    desktop: 1,
    server: "-",
    monitor: "-",
    router: 1,
    printer: 1,
    scanner: "-",
    ethernet: 1,
    punch: "-",
    remarks: "",
  },
  {
    company: "",
    dept: "Merchandising & Planning",
    sl: 6,
    section: "IE",
    totalComp: 4,
    laptop: 3,
    desktop: 1,
    server: "-",
    monitor: "-",
    router: 1,
    printer: 1,
    scanner: "-",
    ethernet: "-",
    punch: "-",
    remarks: "",
  },
  {
    company: "",
    dept: "",
    sl: 7,
    section: "Merchandising",
    totalComp: 27,
    laptop: 23,
    desktop: 4,
    server: "-",
    monitor: 2,
    router: 3,
    printer: 4,
    scanner: 1,
    ethernet: "-",
    punch: "-",
    remarks: "",
  },
  {
    company: "",
    dept: "",
    sl: 8,
    section: "Planning",
    totalComp: 5,
    laptop: 4,
    desktop: 1,
    server: "-",
    monitor: "-",
    router: "-",
    printer: "-",
    scanner: "-",
    ethernet: "-",
    punch: "-",
    remarks: "",
  },
  {
    isSubtotal: true,
    title: "MERCHANDISING & PLANNING TOTAL",
    totalComp: 36,
    laptop: 30,
    desktop: 6,
    server: "-",
    monitor: 2,
    router: 4,
    printer: 5,
    scanner: 1,
    ethernet: "-",
    punch: "-",
    remarks: "",
  },
];

// Badge styling helper
function Badge({ text, type }) {
  let style = "bg-slate-100 text-slate-700 border-slate-200";
  let dot = "bg-slate-400";

  if (type === "running") {
    style = "bg-emerald-50 text-emerald-700 border-emerald-200";
    dot = "bg-emerald-500";
  } else if (type === "scrapped") {
    style = "bg-rose-50 text-rose-700 border-rose-200";
    dot = "bg-rose-500";
  } else if (type === "stock") {
    style = "bg-blue-50 text-blue-700 border-blue-200";
    dot = "bg-blue-500";
  } else if (type === "service") {
    style = "bg-slate-100 text-slate-700 border-slate-300";
    dot = "bg-slate-600";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {text}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            IT Asset Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Real-time status of all hardware across the organization.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Data</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm transition"
          >
            <PrintIcon className="w-3.5 h-3.5 text-white" />
            <span>Print Summary</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards (5 per row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {card.label}
                </span>
                <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
                  {card.count}
                </span>
              </div>
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${card.iconBg}`}
              >
                <card.icon className="w-5 h-5 stroke-[2]" />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
              {card.badges.map((b, idx) => (
                <Badge key={idx} text={b.text} type={b.type} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Asset Allocation Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Title Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              IT INVENTORY SUMMARY
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              OFFICIAL ASSET ALLOCATION REPORT
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition"
          >
            <PrintIcon className="w-3 h-3 text-white" />
            <span>PRINT</span>
          </button>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold text-slate-600 border-b border-slate-200">
                <th className="py-2.5 px-3">COMPANY</th>
                <th className="py-2.5 px-3">DEPARTMENT</th>
                <th className="py-2.5 px-2 text-center">SL</th>
                <th className="py-2.5 px-3">SECTION</th>
                <th className="py-2.5 px-3 text-center text-indigo-700 font-bold bg-indigo-50/50">
                  TOTAL COMP
                </th>
                <th className="py-2.5 px-2 text-center">LAPTOP</th>
                <th className="py-2.5 px-2 text-center">DESKTOP</th>
                <th className="py-2.5 px-2 text-center">SERVER</th>
                <th className="py-2.5 px-2 text-center">MONITOR</th>
                <th className="py-2.5 px-2 text-center">ROUTER</th>
                <th className="py-2.5 px-2 text-center">PRINTER</th>
                <th className="py-2.5 px-2 text-center">SCANNER</th>
                <th className="py-2.5 px-2 text-center">ETHERNET</th>
                <th className="py-2.5 px-2 text-center">PUNCH MACHINE</th>
                <th className="py-2.5 px-3 text-center">REMARKS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {TABLE_ROWS.map((row, idx) => {
                if (row.isSubtotal) {
                  return (
                    <tr
                      key={idx}
                      className="bg-indigo-50/40 font-bold text-[11px] text-slate-900 border-y border-indigo-100"
                    >
                      <td colSpan={4} className="py-2 px-3 text-right uppercase tracking-wider text-indigo-950">
                        {row.title}
                      </td>
                      <td className="py-2 px-3 text-center text-indigo-700 font-extrabold bg-indigo-100/50">
                        {row.totalComp}
                      </td>
                      <td className="py-2 px-2 text-center">{row.laptop}</td>
                      <td className="py-2 px-2 text-center">{row.desktop}</td>
                      <td className="py-2 px-2 text-center">{row.server}</td>
                      <td className="py-2 px-2 text-center">{row.monitor}</td>
                      <td className="py-2 px-2 text-center">{row.router}</td>
                      <td className="py-2 px-2 text-center">{row.printer}</td>
                      <td className="py-2 px-2 text-center">{row.scanner}</td>
                      <td className="py-2 px-2 text-center">{row.ethernet}</td>
                      <td className="py-2 px-2 text-center">{row.punch}</td>
                      <td className="py-2 px-3"></td>
                    </tr>
                  );
                }

                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {row.company}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      {row.dept}
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-400">
                      {row.sl}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">
                      {row.section}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-indigo-600 bg-indigo-50/30">
                      {row.totalComp}
                    </td>
                    <td className="py-2.5 px-2 text-center">{row.laptop}</td>
                    <td className="py-2.5 px-2 text-center">{row.desktop}</td>
                    <td className="py-2.5 px-2 text-center">{row.server}</td>
                    <td className="py-2.5 px-2 text-center">{row.monitor}</td>
                    <td className="py-2.5 px-2 text-center">{row.router}</td>
                    <td className="py-2.5 px-2 text-center">{row.printer}</td>
                    <td className="py-2.5 px-2 text-center">{row.scanner}</td>
                    <td className="py-2.5 px-2 text-center">{row.ethernet}</td>
                    <td className="py-2.5 px-2 text-center">{row.punch}</td>
                    <td className="py-2.5 px-3 text-slate-400">{row.remarks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}