"use client";

import React, { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Tag,
  Plus,
  Trash2,
  Save,
  Check,
  AlertCircle,
  Loader2,
  ShieldAlert,
  Layers,
} from "lucide-react";
import {
  updateCompanyAction,
  addDepartmentAction,
  deleteDepartmentAction,
} from "@/app/actions/organization";

export function OrganizationEditor({ company, departments, userRole }) {
  const isAdmin = userRole === "ADMIN";

  // Form states
  const [loading, setLoading] = useState(false);
  const [deptLoading, setDeptLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const res = await updateCompanyAction(formData);

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg("Organization details saved successfully.");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  const handleAddDept = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    setDeptLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await addDepartmentAction(formData);

    setDeptLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      form.reset();
      setSuccessMsg("Department added successfully.");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  const handleDeleteDept = async (id) => {
    if (!isAdmin) return;
    if (!confirm("Are you sure you want to remove this department?")) return;

    const res = await deleteDepartmentAction(id);
    if (res?.error) setErrorMsg(res.error);
  };

  return (
    <div className="space-y-6">
      {/* Messages */}
      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!isAdmin && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Read-only Mode: Only IT Administrators can modify organizational parameters.</span>
        </div>
      )}

      {/* 1. Primary Company Identity */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Company Identity & Headquarters
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Official corporate details registered on hardware allocations and audit reports.
            </p>
          </div>
        </div>

        <form onSubmit={handleCompanySubmit} className="p-5 sm:p-6 space-y-4">
          <input type="hidden" name="companyId" value={company?.id || "default-company"} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Official Legal Entity Name</label>
              <input
                type="text"
                name="name"
                required
                disabled={!isAdmin}
                defaultValue={company?.name || "KAIZER KNITWEARS LTD."}
                placeholder="e.g. KAIZER KNITWEARS LTD."
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Organization Abbreviation Code</label>
              <input
                type="text"
                name="code"
                required
                disabled={!isAdmin}
                defaultValue={company?.code || "KKL"}
                placeholder="e.g. KKL"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed font-medium font-mono uppercase"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Administrative Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                disabled={!isAdmin}
                defaultValue={company?.contactEmail || "it.admin@kaizerknit.com"}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                Contact / PABX Extension
              </label>
              <input
                type="text"
                name="contactPhone"
                disabled={!isAdmin}
                defaultValue={company?.contactPhone || "+880 2-9832101"}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed font-medium"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Headquarters / Factory Premises Address
              </label>
              <input
                type="text"
                name="address"
                disabled={!isAdmin}
                defaultValue={company?.address || "Plot #14, Sector 7, Export Processing Zone, Gazipur, Bangladesh"}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed font-medium"
              />
            </div>
          </div>

          {isAdmin && (
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Company Details</span>
              </button>
            </div>
          )}
        </form>
      </div>

      {/* 2. Registered Departments & Sections */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Departments & Sections
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configured organizational units available for employee signup and asset assignment.
              </p>
            </div>
          </div>
        </div>

        {/* Add Department Form (Admin Only) */}
        {isAdmin && (
          <form onSubmit={handleAddDept} className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-100">
            <input type="hidden" name="companyId" value={company?.id || "default-company"} />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="sm:col-span-1">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Department Name (e.g. Cutting)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div className="sm:col-span-1">
                <input
                  type="text"
                  name="code"
                  placeholder="Code (e.g. CUT)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono uppercase"
                />
              </div>
              <div className="sm:col-span-1">
                <input
                  type="text"
                  name="sections"
                  placeholder="Sections (comma-separated)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="sm:col-span-1">
                <button
                  type="submit"
                  disabled={deptLoading}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Dept</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Departments List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/70 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Department Name</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Operational Sections</th>
                {isAdmin && <th className="py-3 px-6 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {departments.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 4 : 3} className="py-6 text-center text-slate-400">
                    No departments added yet.
                  </td>
                </tr>
              ) : (
                departments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-6 font-semibold text-slate-900">{dept.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-500 font-medium">
                      {dept.code || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {dept.sections?.length > 0 ? (
                          dept.sections.map((sec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-medium"
                            >
                              {sec}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 text-[11px]">General</span>
                        )}
                      </div>
                    </td>
                    {isAdmin && (
                      <td className="py-3 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteDept(dept.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove Department"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}