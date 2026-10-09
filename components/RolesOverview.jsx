"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Plus,
  Users,
  Trash2,
  Edit,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { createQuickRoleAction, deleteRoleAction } from "@/app/actions/roleEditor";

export function RolesOverview({ roles, roleUserCounts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await createQuickRoleAction(formData);

    setLoading(false);
    if (res?.error) {
      setErrorMsg(String(res.error));
    } else {
      setIsModalOpen(false);
      form.reset();
      window.location.href = `/settings/user-roles/${res.roleId}`;
    }
  };

  const handleDelete = async (roleId, roleName) => {
    if (!confirm(`Are you sure you want to permanently delete role "${roleName}"?`)) return;

    const res = await deleteRoleAction(roleId);
    if (res?.error) {
      alert(res.error);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Configured System Roles
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a role to inspect or update its 22-module permission matrix.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Role</span>
        </button>
      </div>

      {/* Grid of Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => {
          const userCount = roleUserCounts[role.roleName] || 0;
          const grantedCount = Array.isArray(role.permissions) ? role.permissions.length : 0;

          return (
            <div
              key={role.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        role.roleName === "ADMIN" || role.roleName === "OWNER"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {role.roleName}
                      </h3>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {role.isSystem ? "System Role" : "Custom Role"}
                      </span>
                    </div>
                  </div>

                  {!role.isSystem && (
                    <button
                      type="button"
                      onClick={() => handleDelete(role.id, role.roleName)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                      title="Delete Role"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-3 line-clamp-2">
                  {role.description !== "notfound"
                    ? role.description
                    : "No description provided for this role."}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {userCount} Users
                  </span>
                  <span>&bull;</span>
                  <span className="font-semibold text-indigo-600">
                    {grantedCount} Grants
                  </span>
                </div>

                <Link
                  href={`/settings/user-roles/${role.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition"
                >
                  <Edit className="w-3 h-3" />
                  <span>Configure</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Create New Role</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Define the role identity before setting up its permissions matrix.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
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

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Role Identifier</label>
                <input
                  type="text"
                  name="roleName"
                  required
                  placeholder="e.g. AUDITOR or MANAGER"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 uppercase font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe scope and department coverage..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
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
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition cursor-pointer disabled:opacity-70 flex items-center gap-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Create & Configure</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}