'use client'
import InventoryTable from "@/components/InventoryTable";
import { FiMail } from "react-icons/fi";

const accounts = [
  {
    id: 1,
    email: "sheikh.mohibur@company.com",
    employee: "Sheikh Mohibur Rahman",
    department: "IT",
    provider: "Google Workspace",
    accountType: "Employee",
    status: "Active",
    remarks: "-",
  },
  {
    id: 2,
    email: "accounts@company.com",
    employee: "Accounts Department",
    department: "Accounts & Audit",
    provider: "Microsoft 365",
    accountType: "Department",
    status: "Active",
    remarks: "Shared account",
  },
  {
    id: 3,
    email: "hr@company.com",
    employee: "HR Department",
    department: "HR",
    provider: "Google Workspace",
    accountType: "Department",
    status: "Active",
    remarks: "Shared account",
  },
  {
    id: 4,
    email: "merchandising@company.com",
    employee: "Merchandising",
    department: "Merchandising",
    provider: "Google Workspace",
    accountType: "Department",
    status: "Active",
    remarks: "-",
  },
  {
    id: 5,
    email: "old.user@company.com",
    employee: "Former Employee",
    department: "N/A",
    provider: "cPanel Mail",
    accountType: "Employee",
    status: "Disabled",
    remarks: "Account disabled",
  },
];

export default function MailAccountsPage() {
  return (
    <InventoryTable
      config={{
        title: "Mail Accounts",
        storageKey: "mail_accounts",
        icon: FiMail,
        initialData: accounts,

        filters: [
          {
            key: "provider",
            label: "Provider",
            options: [
              "Google Workspace",
              "Microsoft 365",
              "Zoho Mail",
              "cPanel Mail",
            ],
          },
          {
            key: "accountType",
            label: "Type",
            options: [
              "Employee",
              "Department",
            ],
          },
          {
            key: "status",
            label: "Status",
            options: [
              "Active",
              "Disabled",
            ],
          },
        ],

        columns: [
          {
            key: "email",
            label: "Email Address",
            render: (item) => (
              <div>
                <div className="text-[12px] font-bold text-slate-900">
                  {item.email}
                </div>

                <div className="mt-1 text-[10px] text-slate-500">
                  {item.accountType}
                </div>
              </div>
            ),
          },
          {
            key: "employee",
            label: "Account Holder",
            render: (item) => (
              <div>
                <div className="text-[11px] font-semibold text-slate-800">
                  {item.employee}
                </div>

                <div className="text-[10px] text-slate-500">
                  {item.department}
                </div>
              </div>
            ),
          },
          {
            key: "provider",
            label: "Provider",
          },
          {
            key: "status",
            label: "Status",
            render: (item) => (
              <Status value={item.status} />
            ),
          },
          {
            key: "remarks",
            label: "Remarks",
          },
        ],

        fields: [
          {
            key: "email",
            label: "Email Address",
            type: "email",
            required: true,
            placeholder: "user@company.com",
          },
          {
            key: "employee",
            label: "Account Holder",
            required: true,
            placeholder: "Employee name",
          },
          {
            key: "department",
            label: "Department",
            placeholder: "IT Department",
          },
          {
            key: "provider",
            label: "Mail Provider",
            type: "select",
            options: [
              "Google Workspace",
              "Microsoft 365",
              "Zoho Mail",
              "cPanel Mail",
            ],
          },
          {
            key: "accountType",
            label: "Account Type",
            type: "select",
            options: [
              "Employee",
              "Department",
            ],
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: [
              "Active",
              "Disabled",
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

function Status({ value }) {
  return (
    <span
      className={`
        inline-flex rounded border px-2 py-1
        text-[10px] font-semibold
        ${
          value === "Active"
            ? "border-emerald-300 bg-emerald-50 text-emerald-600"
            : "border-red-300 bg-red-50 text-red-500"
        }
      `}
    >
      • {value}
    </span>
  );
}