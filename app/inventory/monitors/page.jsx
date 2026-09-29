'use client'
import InventoryTable from "@/components/InventoryTable";
import { FiMonitor } from "react-icons/fi";

const monitors = [
  {
    id: 1,
    assetTag: "MON-2024-001",
    deviceName: "MONITOR-IT-01",
    brand: "Dell",
    model: "P2419H",
    size: "24-inch",
    resolution: "1920x1080",
    employee: "MD. RAIHANUL ISLAM",
    location: "IT Department",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 2,
    assetTag: "MON-2024-002",
    deviceName: "MONITOR-ACCOUNTS-01",
    brand: "HP",
    model: "P24v G4",
    size: "24-inch",
    resolution: "1920x1080",
    employee: "MD. ZIAUL ALAM",
    location: "Accounts & Audit",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 3,
    assetTag: "MON-2025-003",
    deviceName: "MONITOR-MERCH-01",
    brand: "ASUS",
    model: "VA24EHE",
    size: "24-inch",
    resolution: "1920x1080",
    employee: "MD. SHOHELL RESVE",
    location: "Merchandising",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 4,
    assetTag: "MON-2025-004",
    deviceName: "MONITOR-STOCK-01",
    brand: "BenQ",
    model: "GW2480",
    size: "24-inch",
    resolution: "1920x1080",
    employee: "N/A",
    location: "IT Store",
    company: "Kaizer Knitwears Ltd.",
    status: "In Stock",
    remarks: "Available",
  },
  {
    id: 5,
    assetTag: "MON-2026-005",
    deviceName: "MONITOR-MK-01",
    brand: "Dell",
    model: "E2422H",
    size: "24-inch",
    resolution: "1920x1080",
    employee: "N/A",
    location: "MK Fashion",
    company: "MK Fashion Ltd.",
    status: "In Repair",
    remarks: "Display issue",
  },
];

export default function MonitorInventoryPage() {
  return (
    <InventoryTable
      config={{
        title: "Monitor Inventory",
        storageKey: "monitor_inventory",
        icon: FiMonitor,
        initialData: monitors,

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
            key: "brand",
            label: "Brand",
            options: [
              "Dell",
              "HP",
              "ASUS",
              "BenQ",
              "ViewSonic",
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
            key: "deviceName",
            label: "Monitor",
            render: (item) => (
              <div>
                <div className="text-[12px] font-bold">
                  {item.deviceName}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.brand} • {item.model}
                </div>
              </div>
            ),
          },
          {
            key: "size",
            label: "Display",
            render: (item) => (
              <div>
                <div className="text-[11px] font-semibold">
                  {item.size}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.resolution}
                </div>
              </div>
            ),
          },
          {
            key: "employee",
            label: "Assignment",
            render: (item) => (
              <div>
                <div className="text-[11px] font-semibold">
                  {item.employee}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.location}
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
            placeholder: "MON-2026-006",
          },
          {
            key: "deviceName",
            label: "Device Name",
            required: true,
            placeholder: "MONITOR-IT-02",
          },
          {
            key: "brand",
            label: "Brand",
            type: "select",
            options: [
              "Dell",
              "HP",
              "ASUS",
              "BenQ",
              "ViewSonic",
            ],
          },
          {
            key: "model",
            label: "Model",
            placeholder: "P2419H",
          },
          {
            key: "size",
            label: "Display Size",
            placeholder: "24-inch",
          },
          {
            key: "resolution",
            label: "Resolution",
            placeholder: "1920x1080",
          },
          {
            key: "employee",
            label: "Assigned Employee",
            placeholder: "Employee name",
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
  const color =
    value === "Running"
      ? "border-emerald-300 bg-emerald-50 text-emerald-600"
      : value === "In Stock"
      ? "border-blue-300 bg-blue-50 text-blue-600"
      : "border-orange-300 bg-orange-50 text-orange-600";

  return (
    <span
      className={`inline-flex rounded border px-2 py-1 text-[10px] font-semibold ${color}`}
    >
      • {value}
    </span>
  );
}