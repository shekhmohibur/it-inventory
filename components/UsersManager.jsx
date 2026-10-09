"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Users,
  UserPlus,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Shield,
  CreditCard,
  Building,
  Briefcase,
  AlertCircle,
  Loader2,
  Lock,
  Mail,
  User,
  Phone,
  X,
} from "lucide-react";
import {
  updateUserStatusAction,
  updateUserRoleAction,
  deleteUserAction,
  createUserAction,
} from "@/app/actions/users";
import { DEPARTMENTS, DESIGNATIONS } from "@/lib/constants";

export function UsersManager({
  initialUsers,
  currentUserId,
  availableRoles,
  capabilities,
}) {
  const canCreate = capabilities?.canCreate ?? false;
  const canDelete = capabilities?.canDelete ?? false;
  const canEditRole = capabilities?.canEditRole ?? false;
  const canEditStatus = capabilities?.canEditStatus ?? false;

  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const rolesList = Array.isArray(availableRoles) ? availableRoles : [];

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.fullName !== "notfound" && u.fullName.toLowerCase().includes(search.toLowerCase())) ||
      (u.email !== "notfound" && u.email.toLowerCase().includes(search.toLowerCase())) ||
      (u.cardNumber !== "notfound" && u.cardNumber.toLowerCase().includes(search.toLowerCase())) ||
      (u.department !== "notfound" && u.department.toLowerCase().includes(search.toLowerCase()));

    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = async (userId, newStatus) => {
    if (!canEditStatus) {
      alert("You lack permission (status:edit) to alter account status.");
      return;
    }
    const res = await updateUserStatusAction(userId, newStatus);
    if (res?.error) {
      alert(res.error);
    } else {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!canEditRole) {
      alert("You lack permission (roles:edit) to modify user roles.");
      return;
    }
    const res = await updateUserRoleAction(userId, newRole);
    if (res?.error) {
      alert(res.error);
    } else {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!canDelete) {
      alert("You lack permission (users:delete) to remove accounts.");
      return;
    }
    if (!confirm("Are you sure you want to permanently delete this user?")) return;
    const res = await deleteUserAction(userId);
    if (res?.error) {
      alert(res.error);
    } else {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await createUserAction(formData);

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      setIsModalOpen(false);
      form.reset();
      window.location.reload();
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "REJECTED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search user, ID, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Dynamic Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="ALL">All Roles</option>
              {rolesList.map((r) => (
                <option key={r.roleName} value={r.roleName}>
                  {r.roleName}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add New User</span>
          </button>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/70 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">User</th>
                <th className="py-3 px-4">Card / ID</th>
                <th className="py-3 px-4">Department & Designation</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const initials =
                    u.fullName !== "notfound"
                      ? u.fullName
                          .split(" ")
                          .filter(Boolean)
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()
                      : "US";

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Avatar & Name */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                            {u.image !== "notfound" && u.image ? (
                              <Image
                                src={u.image}
                                alt={u.fullName}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                                unoptimized
                              />
                            ) : (
                              <span>{initials}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 leading-tight">
                              {u.fullName !== "notfound" ? u.fullName : "notfound"}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {u.email !== "notfound" ? u.email : "notfound"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Card ID */}
                      <td className="py-3 px-4 font-mono font-medium text-slate-600">
                        {u.cardNumber !== "notfound" ? u.cardNumber : "notfound"}
                      </td>

                      {/* Department & Designation */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">
                          {u.department !== "notfound" ? u.department : "notfound"}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {u.designation !== "notfound" ? u.designation : "notfound"}
                        </div>
                      </td>

                      {/* Dynamic Role Dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={u.role !== "notfound" ? u.role : (rolesList[0]?.roleName || "notfound")}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          disabled={!canEditRole || u.id === currentUserId}
                          className="bg-[#f8fafc] border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed"
                        >
                          {rolesList.map((r) => (
                            <option key={r.roleName} value={r.roleName}>
                              {r.roleName}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                            u.status
                          )}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              u.status === "APPROVED"
                                ? "bg-emerald-500"
                                : u.status === "PENDING"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                          />
                          {u.status !== "notfound" ? u.status : "notfound"}
                        </span>
                      </td>

                      {/* Actions: Governed by canEditStatus and canDelete */}
                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {canEditStatus && u.status === "PENDING" && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(u.id, "APPROVED")}
                                title="Approve Request"
                                className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(u.id, "REJECTED")}
                                title="Reject Request"
                                className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          {canEditStatus && u.status === "APPROVED" && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(u.id, "REJECTED")}
                              title="Suspend User"
                              className="px-2 py-0.5 rounded text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition cursor-pointer"
                            >
                              Suspend
                            </button>
                          )}

                          {canEditStatus && u.status === "REJECTED" && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(u.id, "APPROVED")}
                              title="Restore Access"
                              className="px-2 py-0.5 rounded text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
                            >
                              Re-approve
                            </button>
                          )}

                          {!canEditStatus && (
                            <span className="text-[10px] text-slate-400 italic">
                              View only
                            </span>
                          )}

                          {canDelete && u.id !== currentUserId && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u.id)}
                              title="Delete Account"
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer ml-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Add New System User</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Directly provision an account with pre-approved access.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Card / Punch ID</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    placeholder="e.g. 10452"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Official Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@kaizerknit.com"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="017XXXXXXXX"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Department</label>
                  <select
                    name="department"
                    defaultValue={DEPARTMENTS[0]}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Designation</label>
                  <select
                    name="designation"
                    defaultValue={DESIGNATIONS[0]}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    {DESIGNATIONS.map((desig) => (
                      <option key={desig} value={desig}>
                        {desig}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">System Role</label>
                  <select
                    name="role"
                    defaultValue={rolesList[0]?.roleName || "notfound"}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    {rolesList.map((r) => (
                      <option key={r.roleName} value={r.roleName}>
                        {r.roleName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Initial Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Min. 6 chars"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
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
                  <span>Create User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}