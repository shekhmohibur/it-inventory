"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { Edit3, Trash2 } from "lucide-react";
import { deleteGraphicsCardAction } from "@/app/actions/graphicsCard";

export function GraphicsCardManager({ initialCards, capabilities }) {
  const [cards, setCards] = useState(initialCards);
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete graphics card "${name}"?`)) return;

    const res = await deleteGraphicsCardAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setCards((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filteredCards = useMemo(() => {
    if (selectedBrand === "ALL") return cards;
    return cards.filter(
      (c) => c.chipsetBrand?.toLowerCase() === selectedBrand.toLowerCase()
    );
  }, [cards, selectedBrand]);

  const columns = [
    {
      key: "sl",
      header: "SL",
      headerClassName: "w-12 text-center",
      className: "text-center font-mono text-slate-400 text-[11px]",
      render: (_row, index) => index + 1,
    },
    {
      key: "modelName",
      header: "GPU MODEL",
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">
            {row.modelName !== "notfound" ? row.modelName : "notfound"}
          </span>
          {row.series && (
            <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
              {row.series}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "chipsetBrand",
      header: "BRAND",
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
            row.chipsetBrand?.toLowerCase() === "nvidia"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : row.chipsetBrand?.toLowerCase() === "amd"
              ? "bg-rose-50 text-rose-600 border-rose-200"
              : row.chipsetBrand?.toLowerCase() === "intel"
              ? "bg-blue-50 text-blue-600 border-blue-200"
              : "bg-slate-100 text-slate-700 border-slate-200"
          }`}
        >
          {row.chipsetBrand !== "notfound" ? row.chipsetBrand : "notfound"}
        </span>
      ),
    },
    {
      key: "vram",
      header: "VRAM / MEMORY",
      render: (row) => (
        <div className="font-mono text-xs">
          <span className="font-bold text-slate-800">{row.memoryCapacity}</span>{" "}
          <span className="text-slate-400 text-[11px]">({row.memoryType})</span>
        </div>
      ),
    },
    {
      key: "cardType",
      header: "TYPE",
      render: (row) => (
        <span className="text-slate-600 text-xs">
          {row.cardType !== "notfound" ? row.cardType : "Dedicated"}
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
              href={`/hardware-specs/graphics-card?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Graphics Card"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, `${row.chipsetBrand} ${row.modelName}`)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete Graphics Card"
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
      <option value="NVIDIA">NVIDIA</option>
      <option value="AMD">AMD</option>
      <option value="Intel">Intel</option>
      <option value="Apple">Apple</option>
      <option value="Other">Other</option>
    </select>
  );

  return (
    <DataTable
      breadcrumbs={[
        { label: "Hardware Specs", href: "/hardware-specs" },
        { label: "Graphics Cards" },
      ]}
      searchPlaceholder="Search model, chipset brand, or series..."
      searchKey={(item, term) =>
        item.modelName.toLowerCase().includes(term) ||
        item.chipsetBrand.toLowerCase().includes(term) ||
        item.memoryCapacity.toLowerCase().includes(term) ||
        (item.series && item.series.toLowerCase().includes(term))
      }
      data={filteredCards}
      columns={columns}
      filterComponent={brandFilterDropdown}
      showPrint={true}
      printUrl="/hardware-specs/graphics-card/print"
      createUrl="/hardware-specs/graphics-card?action=create"
      showAdd={canCreate}
      addLabel="Add Graphics Card"
    />
  );
}