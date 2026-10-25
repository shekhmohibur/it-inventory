"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { Edit3, Trash2 } from "lucide-react";
import { deleteRamAction } from "@/app/actions/ram";

export function RamManager({ initialRams, capabilities }) {
  const [rams, setRams] = useState(initialRams);
  const [selectedType, setSelectedType] = useState("ALL");

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, specLabel) => {
    if (!confirm(`Are you sure you want to delete RAM spec "${specLabel}"?`)) return;

    const res = await deleteRamAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setRams((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const filteredRams = useMemo(() => {
    if (selectedType === "ALL") return rams;
    return rams.filter(
      (r) => r.ramType?.toLowerCase() === selectedType.toLowerCase()
    );
  }, [rams, selectedType]);

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
      key: "ramType",
      header: "RAM TYPE",
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
          {row.ramType !== "notfound" ? row.ramType : "notfound"}
        </span>
      ),
    },
    {
      key: "busSpeed",
      header: "BUS SPEED",
      render: (row) => (
        <span className="font-mono text-slate-700 font-semibold text-xs">
          {row.busSpeed !== "notfound" ? row.busSpeed : "notfound"}
        </span>
      ),
    },
    {
      key: "formFactor",
      header: "FORM FACTOR",
      render: (row) => (
        <span className="text-slate-600 text-xs">
          {row.formFactor !== "notfound" ? row.formFactor : "DIMM"}
        </span>
      ),
    },
    {
      key: "remarks",
      header: "REMARKS",
      render: (row) => (
        <span className="text-slate-400 text-xs">
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
              href={`/hardware-specs/ram?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit RAM"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, `${row.capacity} ${row.ramType}`)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete RAM"
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
      <option value="ALL">All RAM Types</option>
      <option value="DDR3">DDR3</option>
      <option value="DDR4">DDR4</option>
      <option value="DDR5">DDR5</option>
    </select>
  );

  return (
    <DataTable
      breadcrumbs={[
        { label: "Hardware Specs", href: "/hardware-specs" },
        { label: "RAM" },
      ]}
      searchPlaceholder="Search capacity, type, bus speed..."
      searchKey={(item, term) =>
        item.capacity.toLowerCase().includes(term) ||
        item.ramType.toLowerCase().includes(term) ||
        item.busSpeed.toLowerCase().includes(term) ||
        item.formFactor.toLowerCase().includes(term)
      }
      data={filteredRams}
      columns={columns}
      filterComponent={typeFilterDropdown}
      showPrint={true}
      printUrl="/hardware-specs/ram/print"
      createUrl="/hardware-specs/ram?action=create"
      showAdd={canCreate}
      addLabel="Add RAM"
    />
  );
}