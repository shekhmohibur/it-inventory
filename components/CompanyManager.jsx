"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { MapPin, Edit3, Trash2 } from "lucide-react";
import { deleteCompanyAction } from "@/app/actions/company";

export function CompanyManager({ initialCompanies, capabilities }) {
  const [companies, setCompanies] = useState(initialCompanies);

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    const res = await deleteCompanyAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const columns = [
    {
      key: "company",
      header: "COMPANY",
      render: (row) => {
        const initials =
          row.shortName && row.shortName !== "notfound"
            ? row.shortName.slice(0, 2).toUpperCase()
            : (row.name || "CO")
                .split(" ")
                .filter(Boolean)
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

        const hasLogo =
          row.logo &&
          row.logo !== "notfound" &&
          row.logo.trim() !== "" &&
          !row.logo.includes("placeholder");

        return (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 min-w-9 min-h-9 rounded-xl bg-slate-100 border border-slate-200/90 flex items-center justify-center shrink-0 overflow-hidden text-slate-600 font-bold text-xs">
              {hasLogo ? (
                <Image
                  src={row.logo}
                  alt={row.name !== "notfound" ? row.name : "Logo"}
                  width={36}
                  height={36}
                  className="w-full h-full object-contain p-1"
                  unoptimized
                />
              ) : (
                <span className="leading-none">{initials}</span>
              )}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-slate-900 leading-tight truncate">
                {row.name !== "notfound" ? row.name : "notfound"}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate max-w-sm">
                  {row.address !== "notfound" ? row.address : "notfound"}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "shortName",
      header: "SHORT NAME",
      render: (row) => (
        <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px] font-bold">
          {row.shortName !== "notfound" ? row.shortName : "notfound"}
        </span>
      ),
    },
    {
      key: "departments",
      header: "DEPARTMENTS",
      headerClassName: "text-center",
      className: "text-center",
      render: (row) => (
        <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200">
          {row.departments ?? 0}
        </span>
      ),
    },
    {
      key: "sections",
      header: "SECTIONS",
      headerClassName: "text-center",
      className: "text-center",
      render: (row) => (
        <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
          {row.sections ?? 0}
        </span>
      ),
    },
    {
      key: "employees",
      header: "EMPLOYEES",
      headerClassName: "text-center",
      className: "text-center",
      render: (row) => (
        <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-200">
          {row.employees ?? 0}
        </span>
      ),
    },
    {
      key: "actions",
      header: "ACTIONS",
      headerClassName: "text-right",
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          {canEdit && (
            <Link
              href={`/master-data/company?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Company"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, row.name)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete Company"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      breadcrumbs={[{ label: "Master Data", href: "/master-data" }, { label: "Company" }]}
      searchPlaceholder="Search by company name or short name..."
      searchKey={(item, term) =>
        item.name.toLowerCase().includes(term) ||
        item.shortName.toLowerCase().includes(term)
      }
      data={companies}
      columns={columns}
      printUrl="/master-data/company/print"
      createUrl="/master-data/company?action=create"
      showAdd={canCreate}
      addLabel="Add Company"
    />
  );
}