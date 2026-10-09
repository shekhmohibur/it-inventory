"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckSquare,
  Square,
  Save,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";
import { saveRoleFullPermissionsAction } from "@/app/actions/roleEditor";
import {
  PERMISSION_GROUPS_COLUMN_1,
  PERMISSION_GROUPS_COLUMN_2,
  PERMISSION_GROUPS_COLUMN_3,
} from "@/lib/permissionsMatrix";

export function RoleMatrixEditor({ initialRole }) {
  const router = useRouter();

  const [roleName, setRoleName] = useState(
    initialRole?.roleName !== "notfound" ? initialRole.roleName : ""
  );
  const [description, setDescription] = useState(
    initialRole?.description !== "notfound" ? initialRole.description : ""
  );
  const [isActive, setIsActive] = useState(
    initialRole?.isActive !== undefined ? initialRole.isActive : true
  );

  // Selected permissions as a Set
  const [selectedKeys, setSelectedKeys] = useState(() => {
    const raw = initialRole?.permissions;
    if (Array.isArray(raw)) return new Set(raw);
    return new Set();
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // All permissions across all 3 columns combined
  const allKeys = useMemo(() => {
    const list = [];
    [
      ...PERMISSION_GROUPS_COLUMN_1,
      ...PERMISSION_GROUPS_COLUMN_2,
      ...PERMISSION_GROUPS_COLUMN_3,
    ].forEach((grp) => {
      grp.permissions.forEach((p) => list.push(p.key));
    });
    return list;
  }, []);

  const handleGlobalSelectAll = () => {
    setSelectedKeys(new Set(allKeys));
  };

  const handleGlobalClearAll = () => {
    setSelectedKeys(new Set());
  };

  const handleToggle = (key) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleGroupSelectAll = (permissions) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      permissions.forEach((p) => next.add(p.key));
      return next;
    });
  };

  const handleGroupClear = (permissions) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      permissions.forEach((p) => next.delete(p.key));
      return next;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const res = await saveRoleFullPermissionsAction({
      roleId: initialRole?.id !== "notfound" ? initialRole.id : "new",
      roleName,
      description,
      isActive,
      permissions: Array.from(selectedKeys),
    });

    setLoading(false);
    if (res?.error) {
      setErrorMsg(String(res.error));
    } else {
      setSuccessMsg("Role permissions saved successfully.");
      setTimeout(() => {
        router.push("/settings/user-roles");
      }, 1000);
    }
  };

  const renderModuleCard = (group) => {
    return (
      <div
        key={group.id}
        className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3"
      >
        {/* Module Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 tracking-wider uppercase">
              {group.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
            <button
              type="button"
              onClick={() => handleGroupSelectAll(group.permissions)}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              All
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleGroupClear(group.permissions)}
              className="hover:text-rose-600 transition cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* 2-Column Checkbox Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {group.permissions.map((perm) => {
            const isChecked = selectedKeys.has(perm.key);
            return (
              <div
                key={perm.key}
                onClick={() => handleToggle(perm.key)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                  isChecked
                    ? "bg-indigo-50/40 border-indigo-300 text-indigo-900"
                    : "bg-[#fcfdfe] border-slate-200/80 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-indigo-600 fill-indigo-50" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
                    {perm.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate leading-tight">
                    {perm.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSave} className="space-y-5 pb-24 font-sans">
      {/* 1. Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/settings/user-roles"
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Edit Role: {roleName || "notfound"}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                ROLE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure administrative access and modular capabilities.
            </p>
          </div>
        </div>

        {/* Global Select/Clear Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGlobalSelectAll}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Select All</span>
          </button>
          <button
            type="button"
            onClick={handleGlobalClearAll}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <Square className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {Boolean(successMsg) && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{String(successMsg)}</span>
        </div>
      )}
      {Boolean(errorMsg) && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{String(errorMsg)}</span>
        </div>
      )}

      {/* 2. GENERAL INFO Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
            GENERAL INFO
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
          <div className="md:col-span-4 space-y-1.5">
            <label className="font-semibold text-slate-700 uppercase text-[10px] tracking-wider">
              Role Name *
            </label>
            <input
              type="text"
              required
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="e.g. Owner"
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white font-medium"
            />
          </div>

          <div className="md:col-span-6 space-y-1.5">
            <label className="font-semibold text-slate-700 uppercase text-[10px] tracking-wider">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Full role for owner user accounts"
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5 flex flex-col justify-center">
            <label className="font-semibold text-slate-700 uppercase text-[10px] tracking-wider">
              Status
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-800">Active</span>
            </label>
            <span className="text-[10px] text-slate-400">Enable assignment</span>
          </div>
        </div>
      </div>

      {/* 3. 3-COLUMN MASONRY GRID OF MODULES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Column 1 */}
        <div className="space-y-4">
          {PERMISSION_GROUPS_COLUMN_1.map(renderModuleCard)}
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          {PERMISSION_GROUPS_COLUMN_2.map(renderModuleCard)}
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          {PERMISSION_GROUPS_COLUMN_3.map(renderModuleCard)}
        </div>
      </div>

      {/* 4. Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-3.5 px-6 shadow-lg flex items-center justify-end gap-3">
        <Link
          href="/settings/user-roles"
          className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition cursor-pointer disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
}