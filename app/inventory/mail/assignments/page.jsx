'use client'
import InventoryTable from "@/components/InventoryTable";
import { FiUsers } from "react-icons/fi";

const assignments = [
  {
    id: 1,
    email: "sheikh.mohibur@company.com",
    employee: "Sheikh Mohibur Rahman",
    employeeId: "600136",
    department: "IT",
    assignedDate: "12 Aug 2026",
    assignedBy: "IT Admin",
    status: "Active",
    remarks: "-",
  },
  {
    id: 2,
    email: "accounts@company.com",
    employee: "Accounts Department",
    employeeId: "DEPT-001",
    department: "Accounts & Audit",
    assignedDate: "10 Aug 2026",
    assignedBy: "IT Admin",
    status: "Active",
    remarks: "Department account",
  },
  {
    id: 3,
    email: "hr@company.com",
    employee: "HR Department",
    employeeId: "DEPT-002",
    department: "HR",
    assignedDate: "05 Aug 2026",
    assignedBy: "IT Admin",
    status: "Active",
    remarks: "-",
  },
  {
    id: 4,
    email: "former.user@company.com",
    employee: "Former Employee",
    employeeId: "500120",
    department: "N/A",
    assignedDate: "02 Jan 2025",
    assignedBy: "IT Admin",
    status: "Revoked",
    remarks: "Employee resigned",
  },
];

export default function MailAssignmentsPage() {
  return (
    <InventoryTable
      config={{
        title: "Mail Assignments",
        storageKey: "mail_assignments",
        icon: FiUsers,
        initialData: assignments,

        filters: [
          {
            key: "department",
            label: "Department",
            options: [
              "IT",
              "Accounts & Audit",
              "HR",
              "Merchandising",
            ],
          },
          {
            key: "status",
            label: "Status",
            options: [
              "Active",
              "Revoked",
            ],
          },
        ],

        columns: [
          {
            key: "email",
            label: "Mail Account",
            render: (item) => (
              <div>
                <div className="text-[12px] font-bold text-slate-900">
                  {item.email}
                </div>

                <div className="text-[10px] text-slate-500">
                  {item.status}
                </div>
              </div>
            ),
          },
          {
            key: "employee",
            label: "Assigned To",
            render: (item) => (
              <div>
                <div className="text-[11px] font-semibold">
                  {item.employee}
                </div>

                <div className="text-[10px] text-slate-500">
                  ID: {item.employeeId}
                </div>
              </div>
            ),
          },
          {
            key: "department",
            label: "Department",
          },
          {
            key: "assignedDate",
            label: "Assigned Date",
          },
          {
            key: "assignedBy",
            label: "Assigned By",
          },
          {
            key: "remarks",
            label: "Remarks",
          },
        ],

        fields: [
          {
            key: "email",
            label: "Mail Account",
            type: "email",
            required: true,
            placeholder: "user@company.com",
          },
          {
            key: "employee",
            label: "Employee / Department",
            required: true,
            placeholder: "Employee name",
          },
          {
            key: "employeeId",
            label: "Employee ID",
            placeholder: "600136",
          },
          {
            key: "department",
            label: "Department",
            placeholder: "IT Department",
          },
          {
            key: "assignedDate",
            label: "Assigned Date",
            type: "date",
          },
          {
            key: "assignedBy",
            label: "Assigned By",
            placeholder: "IT Admin",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: [
              "Active",
              "Revoked",
            ],
          },
          {
            key: "remarks",
            label: "Remarks",
            type: "textarea",
            fullWidth: true,
          },
        ],
      }}
    />
  );
}