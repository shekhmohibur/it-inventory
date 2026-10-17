"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { GitFork, Edit3, Trash2 } from "lucide-react";
import { deleteDepartmentAction } from "@/app/actions/department";

export function DepartmentListManager({ initialDepartments, capabilities }) {
  const [departments, setDepartments] = useState(initialDepartments);

  const canCreate = capabilities?.canCreate ?? false;
  const canEdit = capabilities?.canEdit ?? false;
  const canDelete = capabilities?.canDelete ?? false;

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete department "${name}"?`)) return;

    const res = await deleteDepartmentAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const columns = [
    {
      key: "name",
      header: "DEPARTMENT NAME",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 min-w-9 min-h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <GitFork className="w-4 h-4 rotate-180" />
          </div>
          <div>
            <div className="font-bold text-slate-900 leading-tight">
              {row.name !== "notfound" ? row.name : "notfound"}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              Ref: {row.reference}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "companyName",
      header: "PARENT COMPANY",
      render: (row) => {
        const hasLogo =
          row.companyLogo &&
          row.companyLogo !== "notfound" &&
          row.companyLogo.trim() !== "";

        return (
          <div className="flex items-center gap-2">
            {hasLogo && (
              <div className="w-5 h-5 relative shrink-0">
                <Image
                  src={row.companyLogo}
                  alt={row.companyName}
                  width={20}
                  height={20}
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            <span className="font-medium text-slate-800">
              {row.companyName !== "notfound" ? row.companyName : "notfound"}
            </span>
          </div>
        );
      },
    },
    {
      key: "sectionsCount",
      header: "SECTIONS",
      headerClassName: "text-center",
      className: "text-center",
      render: (row) => (
        <span className="inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-200">
          {row.sectionsCount ?? 0}
        </span>
      ),
    },
    {
      key: "employeesCount",
      header: "EMPLOYEES",
      headerClassName: "text-center",
      className: "text-center",
      render: (row) => (
        <span className="inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full text-xs font-bold bg-cyan-50 text-cyan-600 border border-cyan-200">
          {row.employeesCount ?? 0}
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
              href={`/master-data/departments?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Department"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, row.name)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete Department"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {!canEdit && !canDelete && (
            <span className="text-[10px] text-slate-400 italic">View only</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      breadcrumbs={[
        { label: "Master Data", href: "/master-data" },
        { label: "Department" },
      ]}
      searchPlaceholder="Search by department or company name..."
      searchKey={(item, term) =>
        item.name.toLowerCase().includes(term) ||
        item.companyName.toLowerCase().includes(term) ||
        item.reference.toLowerCase().includes(term)
      }
      data={departments}
      columns={columns}
      printUrl="/master-data/departments/print"
      createUrl="/master-data/departments?action=create"
      showAdd={canCreate}
      addLabel="Add Department"
    />
  );
}