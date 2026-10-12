"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DataTable } from "@/components/ui/DataTable";
import { MapPin, Edit3, Trash2 } from "lucide-react";

// Mock dataset matching image
const INITIAL_COMPANIES = [
  {
    id: "1",
    name: "Color House Ltd.",
    address: "Nayapara, Kashimpur, Gazipur-...",
    logo: "/uploads/branding/logo-sample.png",
    shortName: "CH",
    departments: 0,
    sections: 0,
    employees: 0,
  },
  {
    id: "2",
    name: "Kaizer Knitwears Ltd.",
    address: "Nayapara, Kashimpur, Gazipur-...",
    logo: "/uploads/branding/logo-sample.png",
    shortName: "KKL",
    departments: 12,
    sections: 27,
    employees: 117,
  },
  {
    id: "3",
    name: "Kaizer Logistics",
    address: "Nayapara, Kashimpur, Gazipur-...",
    logo: "/uploads/branding/logo-sample.png",
    shortName: "KL",
    departments: 1,
    sections: 1,
    employees: 2,
  },
  {
    id: "4",
    name: "MK Fashion Ltd.",
    address: "Nayapara, Kashimpur, Gazipur-...",
    logo: "/uploads/branding/logo-sample.png",
    shortName: "MK",
    departments: 2,
    sections: 2,
    employees: 8,
  },
];

export default function MasterDataCompanyPage() {
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);

  const handleEdit = (company) => {
    alert(`Editing ${company.name}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this company?")) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const columns = [
    {
      key: "company",
      header: "COMPANY",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
            {row.logo && row.logo !== "notfound" ? (
              <Image
                src={row.logo}
                alt={row.name}
                width={32}
                height={32}
                className="object-contain"
                unoptimized
              />
            ) : (
              <span className="font-bold text-[10px] text-slate-400">
                {row.shortName}
              </span>
            )}
          </div>
          <div>
            <div className="font-bold text-slate-900 leading-tight">
              {row.name !== "notfound" ? row.name : "notfound"}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{row.address !== "notfound" ? row.address : "notfound"}</span>
            </div>
          </div>
        </div>
      ),
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
          {row.departments ?? "notfound"}
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
          {row.sections ?? "notfound"}
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
          {row.employees ?? "notfound"}
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
          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
            title="Edit"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      breadcrumbs={[{ label: "Master Data" }, { label: "Company" }]}
      searchPlaceholder="Search by company name or short name..."
      searchKey={(item, term) =>
        item.name.toLowerCase().includes(term) ||
        item.shortName.toLowerCase().includes(term)
      }
      data={companies}
      columns={columns}
      addLabel="Add Company"
      onAdd={() => alert("Open Add Company Modal")}
    />
  );
}