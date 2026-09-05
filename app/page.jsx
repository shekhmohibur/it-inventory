"use client";

import {
  FiMonitor,
  FiWifi,
  FiPrinter,
  FiSearch,
  FiServer,
  FiCpu,
  FiHardDrive,
  FiDownload,
  FiPrinter as FiPrint,
  FiTool,
  FiChevronRight,
  FiRefreshCw,
  FiArrowUpRight,
} from "react-icons/fi";

/* =========================================================
   ASSET CARDS
========================================================= */

const assetCards = [
  {
    title: "COMPUTERS",
    value: "108",
    icon: FiMonitor,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    stats: [
      ["Running", "102", "green"],
      ["Scrapped", "02", "red"],
      ["In Stock", "04", "blue"],
    ],
  },
  {
    title: "LAPTOPS",
    value: "58",
    icon: FiMonitor,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    stats: [
      ["Running", "56", "green"],
      ["Scrapped", "02", "red"],
    ],
  },
  {
    title: "DESKTOPS",
    value: "49",
    icon: FiMonitor,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    stats: [
      ["Running", "46", "green"],
      ["Scrapped", "02", "red"],
      ["In Stock", "01", "blue"],
    ],
  },
  {
    title: "SERVERS",
    value: "01",
    icon: FiServer,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    stats: [
      ["Running", "01", "green"],
    ],
  },
  {
    title: "UPS UNITS",
    value: "06",
    icon: FiServer,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    stats: [
      ["Running", "02", "green"],
      ["Scrapped", "04", "red"],
    ],
  },
  {
    title: "ROUTERS",
    value: "28",
    icon: FiWifi,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    stats: [
      ["Running", "21", "green"],
      ["Scrapped", "06", "red"],
      ["In Stock", "01", "blue"],
    ],
  },
  {
    title: "ETHERNETS",
    value: "38",
    icon: FiWifi,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    stats: [
      ["Running", "38", "green"],
    ],
  },
  {
    title: "PRINTERS",
    value: "31",
    icon: FiPrinter,
    iconBg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-600",
    stats: [
      ["In Stock", "06", "blue"],
      ["Service", "01", "gray"],
      ["Running", "21", "green"],
      ["Scrapped", "03", "red"],
    ],
  },
  {
    title: "SCANNERS",
    value: "05",
    icon: FiSearch,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    stats: [
      ["Running", "05", "green"],
    ],
  },
  {
    title: "PUNCH MACHINES",
    value: "31",
    icon: FiCpu,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    stats: [
      ["Running", "18", "green"],
      ["Scrapped", "13", "red"],
    ],
  },
];

/* =========================================================
   INVENTORY DATA
========================================================= */

const inventoryRows = [
  {
    company: "KAIZER KNITWEARS LTD.",
    department: "Cutting",
    sl: "1",
    section: "Cutting Staff",
    total: "4",
    laptop: "2",
    desktop: "3",
    server: "-",
    monitor: "3",
    router: "-",
    printer: "1",
    scanner: "-",
    ethernet: "6",
    punch: "4",
  },
  {
    company: "",
    department: "",
    sl: "2",
    section: "Finishing Staff",
    total: "1",
    laptop: "1",
    desktop: "1",
    server: "-",
    monitor: "1",
    router: "-",
    printer: "1",
    scanner: "-",
    ethernet: "3",
    punch: "4",
  },
  {
    company: "",
    department: "Knitting & Dyeing",
    sl: "3",
    section: "Dyeing",
    total: "5",
    laptop: "5",
    desktop: "1",
    server: "-",
    monitor: "1",
    router: "-",
    printer: "1",
    scanner: "-",
    ethernet: "3",
    punch: "4",
  },
  {
    company: "",
    department: "",
    sl: "4",
    section: "Knitting",
    total: "3",
    laptop: "1",
    desktop: "2",
    server: "-",
    monitor: "1",
    router: "-",
    printer: "1",
    scanner: "-",
    ethernet: "3",
    punch: "4",
  },
  {
    company: "",
    department: "Maintenance",
    sl: "5",
    section: "Maintenance (Electrical)",
    total: "8",
    laptop: "6",
    desktop: "2",
    server: "-",
    monitor: "-",
    router: "1",
    printer: "-",
    scanner: "-",
    ethernet: "1",
    punch: "-",
  },
  {
    company: "",
    department: "Merchandising & Planning",
    sl: "6",
    section: "IE",
    total: "4",
    laptop: "3",
    desktop: "1",
    server: "-",
    monitor: "1",
    router: "1",
    printer: "1",
    scanner: "1",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "",
    sl: "7",
    section: "Merchandising",
    total: "27",
    laptop: "23",
    desktop: "4",
    server: "-",
    monitor: "1",
    router: "3",
    printer: "3",
    scanner: "1",
    ethernet: "1",
    punch: "1",
  },
  {
    company: "",
    department: "",
    sl: "8",
    section: "Planning",
    total: "5",
    laptop: "4",
    desktop: "1",
    server: "-",
    monitor: "1",
    router: "1",
    printer: "1",
    scanner: "1",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "Office Management",
    sl: "9",
    section: "Accounts & Audit",
    total: "7",
    laptop: "3",
    desktop: "4",
    server: "-",
    monitor: "1",
    router: "1",
    printer: "2",
    scanner: "1",
    ethernet: "-",
    punch: "2",
  },
  {
    company: "",
    department: "",
    sl: "10",
    section: "Admin, HR & Compliance",
    total: "9",
    laptop: "5",
    desktop: "4",
    server: "-",
    monitor: "-",
    router: "1",
    printer: "2",
    scanner: "2",
    ethernet: "-",
    punch: "2",
  },
  {
    company: "",
    department: "",
    sl: "11",
    section: "Central Controlling (IT)",
    total: "3",
    laptop: "1",
    desktop: "2",
    server: "-",
    monitor: "-",
    router: "-",
    printer: "-",
    scanner: "-",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "",
    sl: "12",
    section: "Civil & Architecture",
    total: "1",
    laptop: "1",
    desktop: "-",
    server: "-",
    monitor: "-",
    router: "-",
    printer: "-",
    scanner: "-",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "",
    sl: "13",
    section: "Factory Management",
    total: "1",
    laptop: "1",
    desktop: "-",
    server: "-",
    monitor: "-",
    router: "6",
    printer: "-",
    scanner: "-",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "",
    sl: "14",
    section: "Information & Technology",
    total: "4",
    laptop: "3",
    desktop: "-",
    server: "1",
    monitor: "-",
    router: "2",
    printer: "2",
    scanner: "-",
    ethernet: "18",
    punch: "2",
  },
  {
    company: "",
    department: "Quality Assurance",
    sl: "15",
    section: "Quality (QPC)",
    total: "2",
    laptop: "1",
    desktop: "1",
    server: "-",
    monitor: "-",
    router: "3",
    printer: "2",
    scanner: "-",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "",
    sl: "16",
    section: "Quality Staff",
    total: "2",
    laptop: "2",
    desktop: "-",
    server: "-",
    monitor: "-",
    router: "-",
    printer: "1",
    scanner: "-",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "Recording & Matching",
    sl: "17",
    section: "Staff (Recording & Matching)",
    total: "4",
    laptop: "3",
    desktop: "1",
    server: "-",
    monitor: "1",
    router: "3",
    printer: "1",
    scanner: "-",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "Sampling",
    sl: "18",
    section: "Sampling",
    total: "6",
    laptop: "-",
    desktop: "5",
    server: "-",
    monitor: "1",
    router: "1",
    printer: "2",
    scanner: "-",
    ethernet: "6",
    punch: "-",
  },
  {
    company: "",
    department: "Sewing",
    sl: "19",
    section: "Sewing Staff",
    total: "6",
    laptop: "-",
    desktop: "5",
    server: "-",
    monitor: "1",
    router: "1",
    printer: "1",
    scanner: "-",
    ethernet: "6",
    punch: "10",
  },
  {
    company: "",
    department: "Store & Accessories",
    sl: "20",
    section: "Fabric (Store)",
    total: "2",
    laptop: "-",
    desktop: "2",
    server: "-",
    monitor: "1",
    router: "1",
    printer: "1",
    scanner: "-",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "",
    sl: "21",
    section: "Hand & Stock",
    total: "5",
    laptop: "1",
    desktop: "4",
    server: "-",
    monitor: "3",
    router: "6",
    printer: "9",
    scanner: "-",
    ethernet: "-",
    punch: "13",
  },
  {
    company: "",
    department: "",
    sl: "22",
    section: "Stock",
    total: "6",
    laptop: "1",
    desktop: "4",
    server: "-",
    monitor: "3",
    router: "1",
    printer: "1",
    scanner: "-",
    ethernet: "-",
    punch: "-",
  },
  {
    company: "",
    department: "",
    sl: "23",
    section: "Store (Accessories)",
    total: "9",
    laptop: "-",
    desktop: "3",
    server: "-",
    monitor: "4",
    router: "1",
    printer: "1",
    scanner: "-",
    ethernet: "6",
    punch: "-",
  },
  {
    company: "",
    department: "",
    sl: "24",
    section: "Yarn (Store)",
    total: "2",
    laptop: "-",
    desktop: "2",
    server: "-",
    monitor: "1",
    router: "7",
    printer: "11",
    scanner: "-",
    ethernet: "-",
    punch: "-",
  },
];

/* =========================================================
   STAT BADGE
========================================================= */

function StatBadge({ label, value, type }) {
  const styles = {
    green:
      "border-emerald-200 bg-emerald-50 text-emerald-600",
    red:
      "border-rose-200 bg-rose-50 text-rose-500",
    blue:
      "border-blue-200 bg-blue-50 text-blue-600",
    gray:
      "border-slate-200 bg-slate-50 text-slate-500",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1
        rounded
        border
        px-1.5
        py-1
        text-[9px]
        font-medium
        transition-colors
        ${styles[type]}
      `}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label} {value}
    </span>
  );
}

/* =========================================================
   ASSET CARD
========================================================= */

function AssetCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  stats,
}) {
  return (
    <div
      className="
        group
        min-h-[112px]
        rounded-lg
        border
        border-slate-200
        bg-white
        p-3.5

        shadow-sm

        transition-all
        duration-200
        ease-out

        hover:-translate-y-0.5
        hover:border-indigo-200
        hover:shadow-md

        cursor-default
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] font-semibold tracking-wide text-slate-400">
            {title}
          </p>

          <p
            className="
              mt-1
              text-2xl
              font-bold
              leading-none
              tracking-tight
              text-slate-700
            "
          >
            {value}
          </p>
        </div>

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg

            ${iconBg}
            ${iconColor}

            transition-transform
            duration-200

            group-hover:scale-110
          `}
        >
          <Icon size={17} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {stats.map(([label, value, type]) => (
          <StatBadge
            key={`${label}-${value}`}
            label={label}
            value={value}
            type={type}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-49px)] bg-[#f7f9fc] p-4 md:p-5">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-800 md:text-2xl">
              IT Asset Overview
            </h1>

            <span className="hidden rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-medium text-emerald-600 sm:inline-flex">
              LIVE
            </span>
          </div>

          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Real-time status of all hardware across the organization.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="
              inline-flex
              h-9
              items-center
              gap-2
              rounded-md
              border
              border-slate-200
              bg-white
              px-3
              text-xs
              font-medium
              text-slate-600

              shadow-sm

              transition-all
              duration-200

              hover:border-slate-300
              hover:bg-slate-50
              hover:text-slate-800
              hover:shadow

              active:scale-[0.98]
            "
          >
            <FiDownload size={13} />
            Export Data
          </button>

          <button
            type="button"
            className="
              inline-flex
              h-9
              items-center
              gap-2
              rounded-md
              bg-amber-500
              px-3
              text-xs
              font-medium
              text-white

              shadow-sm

              transition-all
              duration-200

              hover:bg-amber-600
              hover:shadow-md

              active:scale-[0.98]
            "
          >
            <FiPrint size={13} />
            Print Summary
          </button>
        </div>
      </div>

      {/* ===================================================
          ASSET CARDS
      =================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-3

          min-[480px]:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {assetCards.map((card) => (
          <AssetCard
            key={card.title}
            {...card}
          />
        ))}
      </div>

      {/* ===================================================
          INVENTORY SUMMARY
      =================================================== */}

      <section
        className="
          mt-5
          overflow-hidden
          rounded-lg
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        {/* Header */}
        <div
          className="
            flex
            flex-col
            gap-2
            border-b
            border-slate-200
            px-4
            py-3

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h2 className="text-sm font-bold text-slate-700">
              IT INVENTORY SUMMARY
            </h2>

            <p className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-400">
              Official Asset Location Report
            </p>
          </div>

          <button
            type="button"
            className="
              inline-flex
              h-7
              items-center
              justify-center
              gap-1.5
              self-start
              rounded
              bg-indigo-600
              px-2.5
              text-[9px]
              font-semibold
              text-white

              transition-all
              duration-200

              hover:bg-indigo-700
              hover:shadow-md

              active:scale-95
            "
          >
            <FiPrint size={10} />
            PRINT
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead>
              <tr className="bg-slate-50">
                {[
                  "COMPANY",
                  "DEPARTMENT",
                  "SL",
                  "SECTION",
                  "TOTAL COMP",
                  "LAPTOP",
                  "DESKTOP",
                  "SERVER",
                  "MONITOR",
                  "ROUTER",
                  "PRINTER",
                  "SCANNER",
                  "ETHERNET",
                  "PUNCH MACHINE",
                  "REMARKS",
                ].map((header) => (
                  <th
                    key={header}
                    className="
                      border
                      border-slate-200
                      px-2
                      py-2.5

                      text-center
                      text-[8px]
                      font-semibold
                      tracking-wide
                      text-slate-500
                    "
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {inventoryRows.map((row, index) => (
                <tr
                  key={`${row.sl}-${index}`}
                  className="
                    border-b
                    border-slate-100

                    transition-colors
                    duration-150

                    hover:bg-indigo-50/40
                  "
                >
                  <td className="border-r border-slate-100 px-2 py-2 text-[9px] font-semibold text-slate-600">
                    {row.company}
                  </td>

                  <td className="border-r border-slate-100 px-2 py-2 text-[9px] text-slate-600">
                    {row.department}
                  </td>

                  <td className="border-r border-slate-100 px-2 py-2 text-center text-[9px] text-slate-500">
                    {row.sl}
                  </td>

                  <td className="border-r border-slate-100 px-2 py-2 text-[9px] text-slate-600">
                    {row.section}
                  </td>

                  {[
                    row.total,
                    row.laptop,
                    row.desktop,
                    row.server,
                    row.monitor,
                    row.router,
                    row.printer,
                    row.scanner,
                    row.ethernet,
                    row.punch,
                  ].map((value, i) => (
                    <td
                      key={i}
                      className="
                        border-r
                        border-slate-100
                        px-2
                        py-2
                        text-center
                        text-[9px]
                        font-medium
                        text-slate-600
                      "
                    >
                      {value}
                    </td>
                  ))}

                  <td className="px-2 py-2 text-center text-[9px] text-slate-400">
                    -
                  </td>
                </tr>
              ))}

              {/* Company total */}
              <tr className="bg-slate-100">
                <td
                  colSpan={4}
                  className="
                    border-r
                    border-slate-200
                    px-2
                    py-2.5
                    text-right
                    text-[9px]
                    font-bold
                    text-slate-600
                  "
                >
                  KAIZER KNITWEARS LTD. TOTAL
                </td>

                {[
                  "96",
                  "56",
                  "41",
                  "1",
                  "10",
                  "27",
                  "29",
                  "4",
                  "24",
                  "30",
                ].map((value, i) => (
                  <td
                    key={i}
                    className="
                      border-r
                      border-slate-200
                      px-2
                      py-2.5
                      text-center
                      text-[9px]
                      font-bold
                      text-indigo-600
                    "
                  >
                    {value}
                  </td>
                ))}

                <td />
              </tr>

              {/* Logistics */}
              <tr className="border-b border-slate-200 hover:bg-indigo-50/40">
                <td className="px-2 py-2 text-[9px] font-semibold text-slate-600">
                  KAIZER LOGISTICS
                </td>

                <td className="px-2 py-2 text-[9px] text-slate-600">
                  Transport Logistics
                </td>

                <td className="px-2 py-2 text-center text-[9px]">
                  1
                </td>

                <td className="px-2 py-2 text-[9px]">
                  Transport & Logistics
                </td>

                {[
                  "9",
                  "8",
                  "1",
                  "-",
                  "1",
                  "1",
                  "1",
                  "1",
                  "4",
                  "1",
                ].map((value, i) => (
                  <td
                    key={i}
                    className="px-2 py-2 text-center text-[9px]"
                  >
                    {value}
                  </td>
                ))}

                <td />
              </tr>

              {/* MK Fashion */}
              <tr className="border-b border-slate-200 hover:bg-indigo-50/40">
                <td className="px-2 py-2 text-[9px] font-semibold text-slate-600">
                  MK FASHION LTD.
                </td>

                <td className="px-2 py-2 text-[9px] text-slate-600">
                  Knitting Staff
                </td>

                <td className="px-2 py-2 text-center text-[9px]">
                  1
                </td>

                <td className="px-2 py-2 text-[9px]">
                  Office Staff
                </td>

                {[
                  "9",
                  "2",
                  "7",
                  "-",
                  "1",
                  "1",
                  "2",
                  "1",
                  "4",
                  "1",
                ].map((value, i) => (
                  <td
                    key={i}
                    className="px-2 py-2 text-center text-[9px]"
                  >
                    {value}
                  </td>
                ))}

                <td />
              </tr>

              {/* Grand total */}
              <tr className="bg-[#293041] text-white">
                <td
                  colSpan={4}
                  className="
                    px-2
                    py-3
                    text-right
                    text-[10px]
                    font-bold
                  "
                >
                  GRAND TOTAL
                </td>

                {[
                  "108",
                  "58",
                  "49",
                  "1",
                  "11",
                  "28",
                  "31",
                  "5",
                  "38",
                  "31",
                ].map((value, i) => (
                  <td
                    key={i}
                    className="
                      px-2
                      py-3
                      text-center
                      text-[10px]
                      font-bold
                    "
                  >
                    {value}
                  </td>
                ))}

                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================
          BOTTOM CARDS
      =================================================== */}

      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-4
          lg:grid-cols-[2fr_1fr]
        "
      >

        {/* =================================================
            RECENTLY ADDED
        ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-lg
            border
            border-slate-200
            bg-white
            shadow-sm

            transition-all
            duration-200

            hover:border-slate-300
            hover:shadow-md
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-200
              px-4
              py-3
            "
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-50 text-orange-500">
                <FiRefreshCw size={13} />
              </div>

              <h2 className="text-sm font-semibold text-slate-700">
                Recently Added Assets
              </h2>
            </div>

            <button
              type="button"
              className="
                text-[10px]
                font-medium
                text-orange-500

                transition-colors

                hover:text-orange-600
                hover:underline
              "
            >
              View Inventory
            </button>
          </div>

          <div className="grid grid-cols-[1.5fr_1fr_100px] border-b border-slate-100 px-4 py-2.5">
            <span className="text-[9px] font-semibold text-slate-400">
              HARDWARE ID
            </span>

            <span className="text-[9px] font-semibold text-slate-400">
              CATEGORY
            </span>

            <span className="text-right text-[9px] font-semibold text-slate-400">
              STATUS
            </span>
          </div>

          <div className="flex min-h-[90px] items-center justify-center">
            <p className="text-xs text-slate-400">
              No recent assets added.
            </p>
          </div>
        </section>

        {/* =================================================
            ASSET MANAGEMENT
        ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-lg
            border
            border-slate-200
            bg-white
            shadow-sm

            transition-all
            duration-200

            hover:border-slate-300
            hover:shadow-md
          "
        >
          <div
            className="
              border-b
              border-slate-200
              px-4
              py-3
            "
          >
            <h2 className="text-sm font-semibold text-slate-700">
              Asset Management
            </h2>
          </div>

          <div className="space-y-1 p-3">

            {/* Assign hardware */}
            <button
              type="button"
              className="
                group
                flex
                w-full
                items-center
                gap-3
                rounded-md
                p-2
                text-left

                transition-all
                duration-200

                hover:bg-indigo-50
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  bg-slate-100
                  text-slate-500

                  transition-colors

                  group-hover:bg-indigo-100
                  group-hover:text-indigo-600
                "
              >
                <FiHardDrive size={15} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600">
                  Assign Hardware
                </p>

                <p className="mt-0.5 text-[9px] text-slate-400">
                  Allocate assets to employees
                </p>
              </div>

              <FiChevronRight
                size={14}
                className="
                  text-slate-300

                  transition-transform
                  duration-200

                  group-hover:translate-x-1
                  group-hover:text-indigo-500
                "
              />
            </button>

            {/* Report issue */}
            <button
              type="button"
              className="
                group
                flex
                w-full
                items-center
                gap-3
                rounded-md
                p-2
                text-left

                transition-all
                duration-200

                hover:bg-indigo-50
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  bg-slate-100
                  text-slate-500

                  transition-colors

                  group-hover:bg-indigo-100
                  group-hover:text-indigo-600
                "
              >
                <FiTool size={15} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600">
                  Report Issue
                </p>

                <p className="mt-0.5 text-[9px] text-slate-400">
                  Log hardware maintenance
                </p>
              </div>

              <FiChevronRight
                size={14}
                className="
                  text-slate-300

                  transition-transform
                  duration-200

                  group-hover:translate-x-1
                  group-hover:text-indigo-500
                "
              />
            </button>

          </div>
        </section>
      </div>
    </div>
  );
}