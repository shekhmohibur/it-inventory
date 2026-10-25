"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { Edit3, Trash2 } from "lucide-react";
import { deleteBrandAction } from "@/app/actions/brand";

export function BrandManager({ initialBrands, categories = [], capabilities }) {
  const [brands, setBrands] = useState(initialBrands);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete brand "${name}"?`)) return;

    const res = await deleteBrandAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setBrands((prev) => prev.filter((b) => b.id !== id));
    }
  };

  // Filter by selected Category dropdown
  const filteredBrands = useMemo(() => {
    if (selectedCategory === "ALL") return brands;
    return brands.filter(
      (b) => b.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [brands, selectedCategory]);

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
      header: "BRAND NAME",
      render: (row) => (
        <span className="font-bold text-slate-900">
          {row.name !== "notfound" ? row.name : "notfound"}
        </span>
      ),
    },
    {
      key: "category",
      header: "CATEGORY",
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
          {row.category !== "notfound" ? row.category : "notfound"}
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
              href={`/hardware-specs/brands?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Brand"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, row.name)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete Brand"
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

  // Category filter dropdown passed to DataTable toolbar
  const categoryFilterDropdown = (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
    >
      <option value="ALL">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );

  return (
    <DataTable
      breadcrumbs={[
        { label: "Hardware Specs", href: "/hardware-specs" },
        { label: "Brands" },
      ]}
      searchPlaceholder="Search brand or remarks..."
      searchKey={(item, term) =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        (item.remarks && item.remarks.toLowerCase().includes(term))
      }
      data={filteredBrands}
      columns={columns}
      filterComponent={categoryFilterDropdown}
      showPrint={true}
      printUrl="/hardware-specs/brands/print"
      createUrl="/hardware-specs/brands?action=create"
      showAdd={canCreate}
      addLabel="Add Brand"
    />
  );
}