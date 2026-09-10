'use client'
import InventoryTable from "@/components/InventoryTable";
import { FiServer } from "react-icons/fi";

const ups = [
  {
    id: 1,
    assetTag: "UPS-2024-001",
    deviceName: "UPS-SERVER-01",
    brand: "APC",
    model: "BX1100C",
    capacity: "1100VA",
    location: "Server Room",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 2,
    assetTag: "UPS-2024-002",
    deviceName: "UPS-NETWORK-01",
    brand: "APC",
    model: "SMC1500I",
    capacity: "1500VA",
    location: "Network Room",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 3,
    assetTag: "UPS-2025-003",
    deviceName: "UPS-OFFICE-01",
    brand: "Power Guard",
    model: "PG1200",
    capacity: "1200VA",
    location: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    status: "In Stock",
    remarks: "Backup",
  },
  {
    id: 4,
    assetTag: "UPS-2026-004",
    deviceName: "UPS-MK-01",
    brand: "APC",
    model: "BX650",
    capacity: "650VA",
    location: "MK Fashion",
    company: "MK Fashion Ltd.",
    status: "In Repair",
    remarks: "Battery replacement",
  },
];

export default function UPSInventoryPage() {
  return (
    <InventoryTable
      config={{
        title: "UPS Inventory",
        storageKey: "ups_inventory",
        icon: FiServer,
        initialData: ups,

        filters: [
          {
            key: "brand",
            label: "Brand",
            options: [
              "APC",
              "Power Guard",
              "CyberPower",
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
            key: "deviceName",
            label: "UPS Device",
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
            key: "capacity",
            label: "Capacity",
            render: (item) => (
              <span className="rounded bg-purple-50 px-2 py-1 text-[11px] font-semibold text-purple-600">
                {item.capacity}
              </span>
            ),
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
          },
          {
            key: "deviceName",
            label: "Device Name",
            required: true,
          },
          {
            key: "brand",
            label: "Brand",
            type: "select",
            options: [
              "APC",
              "Power Guard",
              "CyberPower",
            ],
          },
          {
            key: "model",
            label: "Model",
          },
          {
            key: "capacity",
            label: "Capacity",
            placeholder: "e.g. 1100VA",
          },
          {
            key: "location",
            label: "Location",
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