"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Printer,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronRight as BreadcrumbSeparator,
  Home,
} from "lucide-react";
import { Button } from "./button";


export function DataTable({
  // Breadcrumb structure: e.g. [{ label: "Dashboard", href: "/" }, { label: "Master Data" }, { label: "Company" }]
  breadcrumbs = [],
  // Search
  searchPlaceholder = "Search...",
  searchKey = "", // Key or custom predicate
  // Data & Columns
  data = [],
  columns = [],
  // Top Actions
  onAdd,
  addLabel = "Add New",
  onPrint,
  filterComponent,
  // Empty message
  emptyMessage = "No matching records found.",
  // Identifier
  rowKey = "id",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 1. Client-Side Search Filter
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();
    return data.filter((item) => {
      if (typeof searchKey === "function") {
        return searchKey(item, term);
      }
      if (typeof searchKey === "string" && searchKey) {
        const val = item[searchKey];
        return val && val !== "notfound" && String(val).toLowerCase().includes(term);
      }
      // If no searchKey provided, search across all primitive values
      return Object.values(item).some(
        (val) =>
          val !== null &&
          val !== undefined &&
          val !== "notfound" &&
          String(val).toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, searchKey]);

  // 2. Pagination Calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePrint = () => {
    if (onPrint) onPrint();
    else window.print();
  };

  return (
    <div className="space-y-4 print:space-y-0 font-sans">
      {/* 1. BREADCRUMBS */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase print:hidden">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-slate-700 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbSeparator className="w-3 h-3 text-slate-300 shrink-0" />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-slate-700 transition"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-800 font-extrabold">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* 2. STICKY ACTION BAR */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 print:hidden">
        {/* Left: Search Bar & Optional Custom Filters */}
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-2.5 w-full">
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
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          {filterComponent && (
            <div className="w-full sm:w-auto shrink-0">{filterComponent}</div>
          )}
        </div>

        {/* Right: Print & Add Trigger Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <Button
            variant="accent"
            size="md"
            icon={Printer}
            onClick={handlePrint}
            className="!bg-amber-500 hover:!bg-amber-600"
          >
            Print
          </Button>

          {onAdd && (
            <Button
              variant="accent"
              size="md"
              icon={Plus}
              onClick={onAdd}
              className="!bg-amber-500 hover:!bg-amber-600"
            >
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      {/* 3. TABLE BODY */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden print:border-none print:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                {columns.map((col, idx) => (
                  <th
                    key={col.key || idx}
                    className={`py-3.5 px-4 ${col.headerClassName || ""}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 text-center text-slate-400 text-xs"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rIdx) => {
                  const keyVal = row[rowKey] || rIdx;
                  return (
                    <tr
                      key={keyVal}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {columns.map((col, cIdx) => (
                        <td
                          key={col.key || cIdx}
                          className={`py-3.5 px-4 ${col.className || ""}`}
                        >
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

        {/* 4. BOTTOM PAGINATION BAR */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 bg-white print:hidden select-none">
          {/* Showing X to Y of Z */}
          <div className="flex items-center gap-3">
            <span>
              Showing{" "}
              <strong className="text-slate-800">
                {totalItems === 0 ? 0 : startIndex + 1}
              </strong>{" "}
              to{" "}
              <strong className="text-slate-800">{endIndex}</strong> of{" "}
              <strong className="text-slate-800">{totalItems}</strong> entries
            </span>

            <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
              <span className="text-[11px] font-bold uppercase text-slate-400">
                ROWS:
              </span>
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="px-3 text-xs font-semibold text-slate-700">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
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