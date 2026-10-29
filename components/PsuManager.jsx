"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { Edit3, Trash2 } from "lucide-react";
import { deletePsuAction } from "@/app/actions/psu";

export function PsuManager({ initialPsus, capabilities }) {
  const [psus, setPsus] = useState(initialPsus);

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, label) => {
    if (!confirm(`Are you sure you want to delete PSU spec "${label}"?`)) return;

    const res = await deletePsuAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setPsus((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const columns = [
    {
      key: "sl",
      header: "SL",
      headerClassName: "w-12 text-center",
      className: "text-center font-mono text-slate-400 text-[11px]",
      render: (_row, index) => index + 1,
    },
    {
      key: "name",
      header: "PSU NAME",
      render: (row) => (
        <span className="font-bold text-slate-900">
          {row.name !== "notfound" ? row.name : "notfound"}
        </span>
      ),
    },
    {
      key: "wattage",
      header: "POWER / WATT",
      render: (row) => (
        <span className="font-mono text-amber-700 font-bold text-xs bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md inline-block">
          {row.wattage !== "notfound" ? row.wattage : "notfound"}
        </span>
      ),
    },
    {
      key: "remarks",
      header: "REMARKS",
      render: (row) => (
        <span className="text-slate-400 text-xs">
          {row.remarks && row.remarks !== "notfound" && row.remarks.trim() !== ""
            ? row.remarks
            : "-"}
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
              href={`/hardware-specs/psu?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit PSU Spec"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, `${row.name} (${row.wattage})`)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete PSU Spec"
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
        { label: "Hardware Specs", href: "/hardware-specs" },
        { label: "PSU" },
      ]}
      searchPlaceholder="Search by name or wattage..."
      searchKey={(item, term) =>
        item.name.toLowerCase().includes(term) ||
        item.wattage.toLowerCase().includes(term) ||
        (item.remarks && item.remarks.toLowerCase().includes(term))
      }
      data={psus}
      columns={columns}
      showPrint={true}
      printUrl="/hardware-specs/psu/print"
      createUrl="/hardware-specs/psu?action=create"
      showAdd={canCreate}
      addLabel="Add PSU"
    />
  );
}