"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { Edit3, Trash2 } from "lucide-react";
import { deleteStatusAction } from "@/app/actions/status";

export function StatusManager({ initialStatuses, capabilities }) {
  const [statuses, setStatuses] = useState(initialStatuses);

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete status "${name}"?`)) return;

    const res = await deleteStatusAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setStatuses((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const columns = [
    {
      key: "name",
      header: "STATUS NAME",
      render: (row) => (
        <span className="font-bold text-slate-900">
          {row.name !== "notfound" ? row.name : "notfound"}
        </span>
      ),
    },
    {
      key: "description",
      header: "DESCRIPTION",
      render: (row) => (
        <span className="text-slate-500 max-w-md truncate block">
          {row.description && row.description !== "notfound" ? row.description : "-"}
        </span>
      ),
    },
    {
      key: "color",
      header: "COLOR",
      render: (row) => {
        const hex = row.color && row.color !== "notfound" ? row.color : "#808080";
        return (
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0 shadow-xs"
              style={{ backgroundColor: hex }}
            />
            <span className="font-mono text-[11px] text-slate-500 uppercase">
              {hex}
            </span>
          </div>
        );
      },
    },
    {
      key: "visibility",
      header: "VISIBILITY",
      render: (row) => (
        <span
          className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            row.visibility === "Active"
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-slate-100 text-slate-500 border border-slate-200"
          }`}
        >
          {row.visibility}
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
              href={`/master-data/status?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Status"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, row.name)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete Status"
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
        { label: "Status" },
      ]}
      searchPlaceholder="Search by status name or description..."
      searchKey={(item, term) =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.color.toLowerCase().includes(term)
      }
      data={statuses}
      columns={columns}
      showPrint={false}
      showAdd={canCreate}
      addLabel="Add Status"
      createUrl="/master-data/status?action=create"
    />
  );
}