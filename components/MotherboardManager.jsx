"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { Edit3, Trash2 } from "lucide-react";
import { deleteMotherboardAction } from "@/app/actions/motherboard";

export function MotherboardManager({ initialMotherboards, capabilities }) {
  const [motherboards, setMotherboards] = useState(initialMotherboards);

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete motherboard "${title}"?`)) return;

    const res = await deleteMotherboardAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setMotherboards((prev) => prev.filter((m) => m.id !== id));
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
      key: "brand",
      header: "BRAND",
      render: (row) => (
        <span className="font-semibold text-slate-800">
          {row.brand !== "notfound" ? row.brand : "notfound"}
        </span>
      ),
    },
    {
      key: "name",
      header: "MODEL NAME",
      render: (row) => (
        <span className="font-bold text-slate-900">
          {row.name !== "notfound" ? row.name : "notfound"}
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
              href={`/hardware-specs/motherboards?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Motherboard"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, `${row.brand} ${row.name}`)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete Motherboard"
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
        { label: "Motherboards" },
      ]}
      searchPlaceholder="Search by brand or model name..."
      searchKey={(item, term) =>
        item.brand.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        (item.remarks && item.remarks.toLowerCase().includes(term))
      }
      data={motherboards}
      columns={columns}
      showPrint={true}
      printUrl="/hardware-specs/motherboards/print"
      createUrl="/hardware-specs/motherboards?action=create"
      showAdd={canCreate}
      addLabel="Add Motherboard"
    />
  );
}