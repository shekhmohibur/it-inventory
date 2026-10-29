"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { Edit3, Trash2 } from "lucide-react";
import { deleteStorageAction } from "@/app/actions/storage";

export function StorageManager({ initialStorages, capabilities }) {
  const [storages, setStorages] = useState(initialStorages);
  const [selectedType, setSelectedType] = useState("ALL");

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, label) => {
    if (!confirm(`Are you sure you want to delete storage spec "${label}"?`)) return;

    const res = await deleteStorageAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setStorages((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const filteredStorages = useMemo(() => {
    if (selectedType === "ALL") return storages;
    return storages.filter(
      (s) => s.driveType?.toLowerCase() === selectedType.toLowerCase()
    );
  }, [storages, selectedType]);

  const columns = [
    {
      key: "sl",
      header: "SL",
      headerClassName: "w-12 text-center",
      className: "text-center font-mono text-slate-400 text-[11px]",
      render: (_row, index) => index + 1,
    },
    {
      key: "capacity",
      header: "CAPACITY",
      render: (row) => (
        <span className="font-bold text-slate-900">
          {row.capacity !== "notfound" ? row.capacity : "notfound"}
        </span>
      ),
    },
    {
      key: "driveType",
      header: "DRIVE TYPE",
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
          {row.driveType !== "notfound" ? row.driveType : "notfound"}
        </span>
      ),
    },
    {
      key: "interface",
      header: "INTERFACE",
      render: (row) => (
        <span className="font-mono text-slate-700 font-semibold text-xs">
          {row.interface !== "notfound" ? row.interface : "notfound"}
        </span>
      ),
    },
    {
      key: "formFactor",
      header: "FORM FACTOR",
      render: (row) => (
        <span className="text-slate-600 text-xs">
          {row.formFactor !== "notfound" ? row.formFactor : "2.5 Inch"}
        </span>
      ),
    },
    {
      key: "remarks",
      header: "REMARKS",
      render: (row) => (
        <span className="text-slate-400 text-xs truncate max-w-xs block">
          {row.remarks && row.remarks !== "notfound" ? row.remarks : "-"}
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
              href={`/hardware-specs/storage?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Storage Spec"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, `${row.capacity} ${row.driveType}`)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete Storage Spec"
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

  const typeFilterDropdown = (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
    >
      <option value="ALL">All Drive Types</option>
      <option value="SSD">SSD</option>
      <option value="HDD">HDD</option>
      <option value="NVMe SSD">NVMe SSD</option>
      <option value="Hybrid (SSHD)">Hybrid (SSHD)</option>
    </select>
  );

  return (
    <DataTable
      breadcrumbs={[
        { label: "Hardware Specs", href: "/hardware-specs" },
        { label: "Storage" },
      ]}
      searchPlaceholder="Search capacity, drive type, interface..."
      searchKey={(item, term) =>
        item.capacity.toLowerCase().includes(term) ||
        item.driveType.toLowerCase().includes(term) ||
        item.interface.toLowerCase().includes(term) ||
        item.formFactor.toLowerCase().includes(term)
      }
      data={filteredStorages}
      columns={columns}
      filterComponent={typeFilterDropdown}
      showPrint={true}
      printUrl="/hardware-specs/storage/print"
      createUrl="/hardware-specs/storage?action=create"
      showAdd={canCreate}
      addLabel="Add Storage"
    />
  );
}