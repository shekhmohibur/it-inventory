'use client'
import InventoryTable from "@/components/InventoryTable";
import { FiMail } from "react-icons/fi";

const providers = [
  {
    id: 1,
    providerName: "Google Workspace",
    domain: "company.com",
    emailCount: 85,
    contact: "support@google.com",
    status: "Active",
    remarks: "Primary mail provider",
  },
  {
    id: 2,
    providerName: "Microsoft 365",
    domain: "companybd.com",
    emailCount: 42,
    contact: "admin@microsoft.com",
    status: "Active",
    remarks: "Microsoft accounts",
  },
  {
    id: 3,
    providerName: "Zoho Mail",
    domain: "mkfashion.com",
    emailCount: 24,
    contact: "support@zoho.com",
    status: "Active",
    remarks: "-",
  },
  {
    id: 4,
    providerName: "cPanel Mail",
    domain: "factory.com",
    emailCount: 18,
    contact: "admin@factory.com",
    status: "Inactive",
    remarks: "Legacy mail server",
  },
];

export default function ProvidersPage() {
  return (
    <InventoryTable
      config={{
        title: "Mail Providers",
        storageKey: "mail_providers",
        icon: FiMail,
        initialData: providers,

        filters: [
          {
            key: "status",
            label: "Status",
            options: [
              "Active",
              "Inactive",
            ],
          },
        ],

        columns: [
          {
            key: "providerName",
            label: "Provider",
            render: (item) => (
              <div>
                <div className="text-[12px] font-bold text-slate-900">
                  {item.providerName}
                </div>

                <div className="mt-1 text-[10px] text-slate-500">
                  {item.domain}
                </div>
              </div>
            ),
          },
          {
            key: "domain",
            label: "Domain",
          },
          {
            key: "emailCount",
            label: "Accounts",
            render: (item) => (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">
                {item.emailCount}
              </span>
            ),
          },
          {
            key: "contact",
            label: "Contact",
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
            key: "providerName",
            label: "Provider Name",
            required: true,
            placeholder: "Google Workspace",
          },
          {
            key: "domain",
            label: "Domain",
            required: true,
            placeholder: "company.com",
          },
          {
            key: "emailCount",
            label: "Number of Accounts",
            type: "number",
          },
          {
            key: "contact",
            label: "Contact Email",
            type: "email",
            placeholder: "admin@example.com",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: [
              "Active",
              "Inactive",
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
            : "border-slate-300 bg-slate-50 text-slate-500"
        }
      `}
    >
      • {value}
    </span>
  );
}