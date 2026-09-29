'use client'
import InventoryTable from "@/components/InventoryTable";
import { FiDatabase } from "react-icons/fi";

const logs = [
  {
    id: 1,
    action: "Mail Account Created",
    email: "sheikh.mohibur@company.com",
    performedBy: "IT Admin",
    date: "10 Sep 2026 09:42",
    ipAddress: "192.168.12.100",
    status: "Success",
    remarks: "-",
  },
  {
    id: 2,
    action: "Mail Account Assigned",
    email: "accounts@company.com",
    performedBy: "IT Admin",
    date: "10 Sep 2026 09:15",
    ipAddress: "192.168.12.100",
    status: "Success",
    remarks: "-",
  },
  {
    id: 3,
    action: "Password Updated",
    email: "hr@company.com",
    performedBy: "IT Admin",
    date: "09 Sep 2026 16:22",
    ipAddress: "192.168.12.101",
    status: "Success",
    remarks: "Password changed",
  },
  {
    id: 4,
    action: "Mail Account Disabled",
    email: "old.user@company.com",
    performedBy: "IT Admin",
    date: "09 Sep 2026 14:10",
    ipAddress: "192.168.12.100",
    status: "Success",
    remarks: "Employee resigned",
  },
  {
    id: 5,
    action: "Login Failed",
    email: "unknown@company.com",
    performedBy: "System",
    date: "09 Sep 2026 11:31",
    ipAddress: "192.168.13.88",
    status: "Failed",
    remarks: "Invalid password",
  },
];

export default function MailAuditLogsPage() {
  return (
    <InventoryTable
      config={{
        title: "Mail Audit Logs",
        storageKey: "mail_audit_logs",
        icon: FiDatabase,
        initialData: logs,

        filters: [
          {
            key: "status",
            label: "Status",
            options: [
              "Success",
              "Failed",
            ],
          },
        ],

        columns: [
          {
            key: "action",
            label: "Action",
            render: (item) => (
              <div>
                <div className="text-[12px] font-bold text-slate-900">
                  {item.action}
                </div>

                <div className="mt-1 text-[10px] text-slate-500">
                  {item.remarks}
                </div>
              </div>
            ),
          },
          {
            key: "email",
            label: "Mail Account",
          },
          {
            key: "performedBy",
            label: "Performed By",
          },
          {
            key: "date",
            label: "Date & Time",
          },
          {
            key: "ipAddress",
            label: "IP Address",
            render: (item) => (
              <span className="font-mono text-[11px] text-slate-700">
                {item.ipAddress}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (item) => (
              <span
                className={`
                  inline-flex rounded border px-2 py-1
                  text-[10px] font-semibold
                  ${
                    item.status === "Success"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                      : "border-red-300 bg-red-50 text-red-500"
                  }
                `}
              >
                • {item.status}
              </span>
            ),
          },
        ],

        fields: [
          {
            key: "action",
            label: "Action",
            required: true,
            placeholder: "Mail Account Created",
          },
          {
            key: "email",
            label: "Mail Account",
            type: "email",
            required: true,
            placeholder: "user@company.com",
          },
          {
            key: "performedBy",
            label: "Performed By",
            placeholder: "IT Admin",
          },
          {
            key: "date",
            label: "Date & Time",
            placeholder: "10 Sep 2026 10:00",
          },
          {
            key: "ipAddress",
            label: "IP Address",
            placeholder: "192.168.12.100",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: [
              "Success",
              "Failed",
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