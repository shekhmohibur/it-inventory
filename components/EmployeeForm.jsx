"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Home, Check, Loader2, AlertCircle, Contact2 } from "lucide-react";
import { createEmployeeAction, updateEmployeeAction } from "@/app/actions/employee";

export function EmployeeForm({ employee, companies = [], departments = [], sections = [], isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Cascading selections
  const [selectedCompanyId, setSelectedCompanyId] = useState(employee?.companyId || companies[0]?.id || "");
  const [selectedDeptId, setSelectedDeptId] = useState(employee?.departmentId || "");

  const filteredDepartments = departments.filter((d) => d.companyId === selectedCompanyId);
  const filteredSections = sections.filter((s) => s.departmentId === selectedDeptId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    let res;
    if (isEdit && employee?.id) {
      res = await updateEmployeeAction(employee.id, formData);
    } else {
      res = await createEmployeeAction(formData);
    }

    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      if (typeof window !== "undefined" && window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        router.push("/master-data/employees");
      }
    }
  };

  const handleDiscard = () => {
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      router.push("/master-data/employees");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-24">
      {/* 1. BREADCRUMBS */}
      <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase select-none">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-700 transition">
          <Home className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <Link href="/master-data/employees" className="hover:text-slate-700 transition">
          Master Data
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-800 font-extrabold">
          {isEdit ? "EDIT EMPLOYEE" : "CREATE EMPLOYEE"}
        </span>
      </nav>

      {/* 2. ERROR BANNER */}
      {Boolean(errorMsg) && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{String(errorMsg)}</span>
        </div>
      )}

      {/* 3. CARD CONTAINER */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Section Title Header */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6 text-slate-800 font-bold text-sm">
          <Contact2 className="w-4 h-4 text-slate-500" />
          <span>Employee Information</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
          {/* Row 1: Employee Code */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">
              Employee Code <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="employeeCode"
              required
              defaultValue={employee?.employeeCode && employee.employeeCode !== "notfound" ? employee.employeeCode : ""}
              placeholder="Enter Employee Code"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
            />
          </div>

          {/* Row 2: Employee Name */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">
              Employee Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={employee?.name && employee.name !== "notfound" ? employee.name : ""}
              placeholder="Enter Full Name"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
            />
          </div>

          {/* Row 3: Company & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Company <span className="text-rose-500">*</span>
              </label>
              <select
                name="companyId"
                required
                value={selectedCompanyId}
                onChange={(e) => {
                  setSelectedCompanyId(e.target.value);
                  setSelectedDeptId("");
                }}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="" disabled>---------</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.shortName && c.shortName !== "notfound" ? `(${c.shortName})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">Department</label>
              <select
                name="departmentId"
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="none">---------</option>
                {filteredDepartments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Section & Designation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">Section</label>
              <select
                name="sectionId"
                defaultValue={employee?.sectionId || "none"}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="none">---------</option>
                {filteredSections.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Designation <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="designation"
                required
                defaultValue={employee?.designation && employee.designation !== "notfound" ? employee.designation : ""}
                placeholder="Enter Designation"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Row 5: Contact Number & Personal Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Contact Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="contactNumber"
                required
                defaultValue={employee?.contactNumber && employee.contactNumber !== "notfound" ? employee.contactNumber : ""}
                placeholder="Enter Phone Number"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">Personal Email</label>
              <input
                type="email"
                name="personalEmail"
                defaultValue={employee?.personalEmail && employee.personalEmail !== "notfound" ? employee.personalEmail : ""}
                placeholder="Personal Email Address"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Row 6: Office Email & Joining Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">Office Email</label>
              <input
                type="email"
                name="officeEmail"
                defaultValue={employee?.officeEmail && employee.officeEmail !== "notfound" ? employee.officeEmail : ""}
                placeholder="Office Email Address"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 text-xs">
                Joining Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                name="joiningDate"
                required
                defaultValue={
                  employee?.joiningDate && employee.joiningDate !== "notfound"
                    ? new Date(employee.joiningDate).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Row 7: Status */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 text-xs">
              Status <span className="text-rose-500">*</span>
            </label>
            <select
              name="status"
              required
              defaultValue={employee?.status || "Active"}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleDiscard}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition cursor-pointer"
            >
              Discard Changes
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>{isEdit ? "Update Employee" : "Create Employee"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}