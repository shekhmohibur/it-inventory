'use client'
import InventoryTable from "@/components/InventoryTable";
import { FiPrinter } from "react-icons/fi";

const printers = [
  {
    id: 1,
    assetTag: "PRN-2024-001",
    printerName: "PRINTER-ACCOUNTS",
    brand: "HP",
    model: "LaserJet Pro M404dn",
    ipAddress: "192.168.12.40",
    location: "Accounts & Audit",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 2,
    assetTag: "PRN-2024-002",
    printerName: "PRINTER-HR",
    brand: "Brother",
    model: "HL-L6200DW",
    ipAddress: "192.168.12.41",
    location: "HR Department",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "Network printer",
  },
  {
    id: 3,
    assetTag: "PRN-2025-003",
    printerName: "PRINTER-MERCH",
    brand: "Canon",
    model: "LBP226dw",
    ipAddress: "192.168.13.40",
    location: "Merchandising",
    company: "Kaizer Knitwears Ltd.",
    status: "In Stock",
    remarks: "-",
  },
  {
    id: 4,
    assetTag: "PRN-2025-004",
    printerName: "PRINTER-IT",
    brand: "EPSON",
    model: "WorkForce Pro",
    ipAddress: "192.168.10.44",
    location: "IT Department",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 5,
    assetTag: "PRN-2026-005",
    printerName: "PRINTER-MK",
    brand: "HP",
    model: "LaserJet M428fdw",
    ipAddress: "192.168.20.44",
    location: "Office Staff",
    company: "MK Fashion Ltd.",
    status: "In Repair",
    remarks: "Paper feed problem",
  },
];

export default function PrinterInventoryPage() {
  return (
    <InventoryTable
      config={{
        title: "Printer Inventory",
        storageKey: "printer_inventory",
        icon: FiPrinter,
        initialData: printers,

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
              "Damaged",
            ],
          },
        ],

        columns: [
          {
            key: "assetTag",
            label: "Asset Tag",
          },
          {
            key: "printerName",
            label: "Printer",
            render: (item) => (
              <div>
                <div className="text-[12px] font-bold text-slate-900">
                  {item.printerName}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.brand} • {item.model}
                </div>
              </div>
            ),
          },
          {
            key: "ipAddress",
            label: "Network",
            render: (item) => (
              <span className="font-mono text-[11px] text-slate-700">
                {item.ipAddress}
              </span>
            ),
          },
          {
            key: "location",
            label: "Location",
            render: (item) => (
              <div>
                <div className="text-[11px] font-semibold text-slate-800">
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
            placeholder: "PRN-2026-006",
          },
          {
            key: "printerName",
            label: "Printer Name",
            required: true,
            placeholder: "PRINTER-IT-02",
          },
          {
            key: "brand",
            label: "Brand",
            type: "select",
            options: [
              "HP",
              "Brother",
              "Canon",
              "EPSON",
              "Xerox",
            ],
          },
          {
            key: "model",
            label: "Model",
            placeholder: "Printer model",
          },
          {
            key: "ipAddress",
            label: "IP Address",
            placeholder: "192.168.1.50",
          },
          {
            key: "location",
            label: "Location",
            placeholder: "IT Department",
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