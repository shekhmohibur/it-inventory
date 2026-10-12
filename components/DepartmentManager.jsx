"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import {
  Building2,
  Layers,
  Edit3,
  Trash2,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  createDepartmentAction,
  updateDepartmentAction,
  deleteDepartmentAction,
} from "@/app/actions/department";

export function DepartmentManager({
  initialDepartments,
  companies,
  capabilities,
}) {
  const [departments, setDepartments] = useState(initialDepartments);
  const [companyFilter, setCompanyFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const canCreate = capabilities?.canCreate ?? false;
  const canEdit = capabilities?.canEdit ?? false;
  const canDelete = capabilities?.canDelete ?? false;

  // Filter dataset by Parent Company dropdown
  const filteredData = departments.filter((d) => {
    if (companyFilter === "ALL") return true;
    return d.companyId === companyFilter;
  });

  const handleOpenCreate = () => {
    setEditingDept(null);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dept) => {
    setEditingDept(dept);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete department "${name}"?`)) return;

    const res = await deleteDepartmentAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    let res;
    if (editingDept) {
      res = await updateDepartmentAction(editingDept.id, formData);
    } else {
      res = await createDepartmentAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      setIsModalOpen(false);
      window.location.reload();
    }
  };

  const columns = [
    {
      key: "name",
      header: "DEPARTMENT NAME",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100/70 text-indigo-600 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 leading-tight">
              {row.name !== "notfound" ? row.name : "notfound"}
            </div>
            {row.description && row.description !== "notfound" && (
              <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {row.description}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "companyName",
      header: "PARENT COMPANY",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-800">
            {row.companyName !== "notfound" ? row.companyName : "notfound"}
          </span>
          {row.companyShortName && row.companyShortName !== "notfound" && (
            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-mono text-[10px] font-bold">
              {row.companyShortName}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "sectionsCount",
      header: "SECTIONS",
      headerClassName: "text-center",
      className: "text-center",
      render: (row) => (
        <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
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
        <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-200">
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
            <button
              type="button"
              onClick={() => handleOpenEdit(row)}
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Department"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
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
    <>
      <DataTable
        breadcrumbs={[
          { label: "Master Data", href: "/master-data" },
          { label: "Department" },
        ]}
        searchPlaceholder="Search by department or parent company..."
        searchKey={(item, term) =>
          item.name.toLowerCase().includes(term) ||
          item.companyName.toLowerCase().includes(term)
        }
        data={filteredData}
        columns={columns}
        addLabel={canCreate ? "Add Department" : undefined}
        onAdd={canCreate ? handleOpenCreate : undefined}
        filterComponent={
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="w-full sm:w-auto bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            <option value="ALL">All Companies</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        }
      />

      {/* CREATE & EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {editingDept ? "Edit Department" : "Add New Department"}
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Configure department hierarchy under parent company.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="m-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Parent Company *
                </label>
                <select
                  name="companyId"
                  required
                  defaultValue={editingDept?.companyId || companies[0]?.id}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                >
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.shortName !== "notfound" ? `(${c.shortName})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Department Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editingDept?.name !== "notfound" ? editingDept?.name : ""}
                  placeholder="e.g. Cutting, Merchandising, Accounts"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Description / Notes
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={
                    editingDept?.description !== "notfound"
                      ? editingDept?.description
                      : ""
                  }
                  placeholder="Brief overview of department scope..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition cursor-pointer disabled:opacity-70 flex items-center gap-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingDept ? "Save Changes" : "Create Department"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}