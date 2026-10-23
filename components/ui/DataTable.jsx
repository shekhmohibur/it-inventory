"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Printer,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronRight as BreadcrumbSeparator,
  Home,
} from "lucide-react";

export function DataTable({
  breadcrumbs = [],
  searchPlaceholder = "Search...",
  searchKey = "",
  data = [],
  columns = [],
  // Add / Create props
  showAdd = true,      // <-- add this
  addLabel = "Add New",
  createUrl,          // <-- ensure this is present
  onAdd,
  // Print props
  showPrint = true,
  printUrl,
  onPrint,
  filterComponent,
  emptyMessage = "No matching records found.",
  rowKey = "id",
}) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const basePath = pathname.replace(/\/\$/, "");
  // Compute the target new-tab print URL automatically
  const targetPrintUrl = printUrl || `${basePath}/print`;

  // Search Filter
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((item) => {
      if (typeof searchKey === "function") return searchKey(item, term);
      if (typeof searchKey === "string" && searchKey) {
        const val = item[searchKey];
        return val && val !== "notfound" && String(val).toLowerCase().includes(term);
      }
      return Object.values(item).some(
        (val) =>
          val !== null &&
          val !== undefined &&
          val !== "notfound" &&
          String(val).toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, searchKey]);

  // Pagination Calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-4 font-sans">
      {/* 1. BREADCRUMBS */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase select-none print:hidden">
          <Link href="/" className="flex items-center gap-1 hover:text-slate-700 transition">
            <Home className="w-3.5 h-3.5" />
            <span>DASHBOARD</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbSeparator className="w-3 h-3 text-slate-300 shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-slate-700 transition">
                  {crumb.label.toUpperCase()}
                </Link>
              ) : (
                <span className="text-slate-800 font-extrabold">
                  {crumb.label.toUpperCase()}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* 2. CARD WITH STICKY TOOLBAR */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-visible">
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md rounded-t-2xl p-4 sm:px-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] print:hidden">
          {/* Search Bar & Custom Filters */}
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
            {filterComponent && <div className="w-full sm:w-auto shrink-0">{filterComponent}</div>}
          </div>

          {/* Action Buttons: Print & Add */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
            {showPrint && (
              <Link
                href={targetPrintUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer select-none"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </Link>
            )}

            {/* Render button if createUrl or onAdd exists */}
            {showAdd && (createUrl || onAdd) && (
              createUrl ? (
                <Link
                  href={createUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer select-none"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{addLabel}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onAdd}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer select-none"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{addLabel}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#fcfdfe] border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                {columns.map((col, idx) => (
                  <th key={col.key || idx} className={`py-3.5 px-6 ${col.headerClassName || ""}`}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-slate-400 text-xs">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rIdx) => {
                  const keyVal = row[rowKey] || rIdx;
                  return (
                    <tr key={keyVal} className="hover:bg-slate-50/70 transition-colors">
                      {columns.map((col, cIdx) => (
                        <td key={col.key || cIdx} className={`py-3.5 px-6 ${col.className || ""}`}>
                          {col.render
                            ? col.render(row, startIndex + rIdx)
                            : row[col.key] !== undefined && row[col.key] !== null
                            ? String(row[col.key])
                            : "notfound"}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 sm:px-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 bg-white print:hidden select-none rounded-b-2xl">
          <div className="flex items-center gap-3">
            <span>
              Showing <strong className="text-slate-800">{totalItems === 0 ? 0 : startIndex + 1}</strong> to{" "}
              <strong className="text-slate-800">{endIndex}</strong> of{" "}
              <strong className="text-slate-800">{totalItems}</strong> entries
            </span>
            <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
              <span className="text-[11px] font-bold uppercase text-slate-400">ROWS:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-[#f8fafc] border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-xs font-semibold text-slate-700">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}