"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { UserCheck, Phone, Mail, Edit3, Trash2 } from "lucide-react";
import { deleteEmployeeAction } from "@/app/actions/employee";

export function EmployeeManager({ initialEmployees, capabilities }) {
  const [employees, setEmployees] = useState(initialEmployees);

  const canCreate = capabilities?.canCreate ?? true;
  const canEdit = capabilities?.canEdit ?? true;
  const canDelete = capabilities?.canDelete ?? true;

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete employee "${name}"?`)) return;

    const res = await deleteEmployeeAction(id);
    if (res?.error) {
      alert(res.error);
    } else {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const columns = [
    {
      key: "employee",
      header: "EMPLOYEE",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 min-w-9 min-h-9 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 leading-tight">
              {row.name !== "notfound" ? row.name : "notfound"}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              Code: <span className="text-slate-600 font-semibold">{row.employeeCode}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "designation",
      header: "DESIGNATION",
      render: (row) => (
        <span className="font-semibold text-slate-800">
          {row.designation !== "notfound" ? row.designation : "notfound"}
        </span>
      ),
    },
    {
      key: "department",
      header: "COMPANY / DEPT",
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-900">{row.companyName}</div>
          <div className="text-[11px] text-slate-400">
            {row.departmentName} {row.sectionName !== "—" ? `• ${row.sectionName}` : ""}
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "CONTACT",
      render: (row) => (
        <div className="space-y-0.5 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Phone className="w-3 h-3 text-slate-400" />
            <span>{row.contactNumber}</span>
          </div>
          {(row.officeEmail || row.personalEmail) && (
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
              <Mail className="w-3 h-3" />
              <span>{row.officeEmail || row.personalEmail}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      headerClassName: "text-center",
      className: "text-center",
      render: (row) => (
        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
          row.status === "Active"
            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
            : "bg-slate-100 text-slate-500 border border-slate-200"
        }`}>
          {row.status}
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
              href={`/master-data/employees?action=edit&id=${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Edit Employee"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(row.id, row.name)}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
              title="Delete Employee"
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
    <DataTable
      breadcrumbs={[
        { label: "Master Data", href: "/master-data" },
        { label: "Employees" },
      ]}
      searchPlaceholder="Search by name, code, designation, or department..."
      searchKey={(item, term) =>
        item.name.toLowerCase().includes(term) ||
        item.employeeCode.toLowerCase().includes(term) ||
        item.designation.toLowerCase().includes(term) ||
        item.companyName.toLowerCase().includes(term) ||
        item.departmentName.toLowerCase().includes(term)
      }
      data={employees}
      columns={columns}
      printUrl="/master-data/employees/print"
      createUrl="/master-data/employees?action=create"
      showAdd={canCreate}
      addLabel="Add Employee"
    />
  );
}