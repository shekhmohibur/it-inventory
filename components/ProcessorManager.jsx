"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { Edit3, Trash2 } from "lucide-react";
import { deleteProcessorAction } from "@/app/actions/processor";

export function ProcessorManager({ initialProcessors, capabilities }) {
  const [processors, setProcessors] = useState(initialProcessors);
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete processor "${name}"?`)) return;

    const res = await deleteProcessorAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setProcessors((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProcessors = useMemo(() => {
    if (selectedBrand === "ALL") return processors;
    return processors.filter(
      (p) => p.brand?.toLowerCase() === selectedBrand.toLowerCase()
    );
  }, [processors, selectedBrand]);

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
      header: "PROCESSOR NAME",
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">
            {row.name !== "notfound" ? row.name : "notfound"}
          </span>
          {(row.series || row.generation) && (
            <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
              {[row.series, row.generation].filter(Boolean).join(" • ")}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "brand",
      header: "BRAND",
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
            row.brand?.toLowerCase() === "intel"
              ? "bg-blue-50 text-blue-600 border-blue-200"
              : row.brand?.toLowerCase() === "amd"
              ? "bg-rose-50 text-rose-600 border-rose-200"
              : "bg-slate-100 text-slate-700 border-slate-200"
          }`}
        >
          {row.brand !== "notfound" ? row.brand : "notfound"}
        </span>
      ),
    },
    {
      key: "baseSpeed",
      header: "CLOCK SPEED",
      render: (row) => (
        <span className="font-mono text-slate-700 text-xs">
          {row.baseSpeed ? row.baseSpeed : "—"}
        </span>
      ),
    },
    {
      key: "coresThreads",
      header: "CORES / THREADS",
      render: (row) => (
        <span className="text-slate-600 text-xs">
          {row.coresThreads ? row.coresThreads : "—"}
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
              href={`/hardware-specs/processors?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Processor"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, row.name)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete Processor"
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

  const brandFilterDropdown = (
    <select
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
      className="bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
    >
      <option value="ALL">All Brands</option>
      <option value="Intel">Intel</option>
      <option value="AMD">AMD</option>
      <option value="Apple">Apple</option>
      <option value="Other">Other</option>
    </select>
  );

  return (
    <DataTable
      breadcrumbs={[
        { label: "Hardware Specs", href: "/hardware-specs" },
        { label: "Processors" },
      ]}
      searchPlaceholder="Search processor, series, or brand..."
      searchKey={(item, term) =>
        item.name.toLowerCase().includes(term) ||
        item.brand.toLowerCase().includes(term) ||
        (item.series && item.series.toLowerCase().includes(term)) ||
        (item.generation && item.generation.toLowerCase().includes(term))
      }
      data={filteredProcessors}
      columns={columns}
      filterComponent={brandFilterDropdown}
      showPrint={true}
      printUrl="/hardware-specs/processors/print"
      createUrl="/hardware-specs/processors?action=create"
      showAdd={canCreate}
      addLabel="Add Processor"
    />
  );
}