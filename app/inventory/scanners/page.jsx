'use client'

import InventoryTable from "@/components/InventoryTable";
import { FiMonitor } from "react-icons/fi";

const scanners = [
  {
    id: 1,
    assetTag: "SCN-2024-001",
    scannerName: "SCANNER-ACCOUNTS",
    brand: "Canon",
    model: "imageFORMULA DR-C240",
    connection: "USB",
    location: "Accounts & Audit",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 2,
    assetTag: "SCN-2024-002",
    scannerName: "SCANNER-HR",
    brand: "HP",
    model: "ScanJet Pro 2600",
    connection: "USB",
    location: "HR Department",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 3,
    assetTag: "SCN-2025-003",
    scannerName: "SCANNER-MERCH",
    brand: "Epson",
    model: "WorkForce DS-530",
    connection: "USB",
    location: "Merchandising",
    company: "Kaizer Knitwears Ltd.",
    status: "In Stock",
    remarks: "Backup unit",
  },
  {
    id: 4,
    assetTag: "SCN-2026-004",
    scannerName: "SCANNER-IT",
    brand: "Brother",
    model: "ADS-2200",
    connection: "USB",
    location: "IT Department",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
];

export default function ScannerInventoryPage() {
  return (
    <InventoryTable
      config={{
        title: "Scanner Inventory",
        storageKey: "scanner_inventory",
        icon: FiMonitor,
        initialData: scanners,

        filters: [
          {
            key: "company",
            label: "Company",
            options: [
              "Kaizer Knitwears Ltd.",
              "MK Fashion Ltd.",
            ],
          },
          {
            key: "status",
            label: "Status",
            options: [
              "Running",
              "In Stock",
              "In Repair",
            ],
          },
        ],

        columns: [
          {
            key: "assetTag",
            label: "Asset Tag",
          },
          {
            key: "scannerName",
            label: "Scanner",
            render: (item) => (
              <div>
                <div className="text-[12px] font-bold text-slate-900">
                  {item.scannerName}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.brand} • {item.model}
                </div>
              </div>
            ),
          },
          {
            key: "connection",
            label: "Connection",
          },
          {
            key: "location",
            label: "Location",
            render: (item) => (
              <div>
                <div className="text-[11px] font-semibold">
                  {item.location}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.company}
                </div>
              </div>
            ),
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
            key: "assetTag",
            label: "Asset Tag",
            required: true,
            placeholder: "SCN-2026-005",
          },
          {
            key: "scannerName",
            label: "Scanner Name",
            required: true,
            placeholder: "SCANNER-OFFICE",
          },
          {
            key: "brand",
            label: "Brand",
            type: "select",
            options: [
              "Canon",
              "HP",
              "Epson",
              "Brother",
            ],
          },
          {
            key: "model",
            label: "Model",
            placeholder: "Scanner model",
          },
          {
            key: "connection",
            label: "Connection",
            type: "select",
            options: [
              "USB",
              "Network",
              "USB + Network",
            ],
          },
          {
            key: "location",
            label: "Location",
            placeholder: "Office Management",
          },
          {
            key: "company",
            label: "Company",
            type: "select",
            options: [
              "Kaizer Knitwears Ltd.",
              "MK Fashion Ltd.",
            ],
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: [
              "Running",
              "In Stock",
              "In Repair",
              "Damaged",
              "Scrapped",
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
    <span className="inline-flex rounded border border-emerald-300 bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
      • {value}
    </span>
  );
}