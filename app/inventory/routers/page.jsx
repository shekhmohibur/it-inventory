"use client";
import InventoryTable from "@/components/InventoryTable";
import { BsFillRouterFill } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";

const routers = [
  {
    id: 1,
    assetTag: "RTR-2025-001",
    deviceName: "CORE-ROUTER-01",
    brand: "MikroTik",
    model: "RB4011iGS+",
    ipAddress: "192.168.10.1",
    macAddress: "2C:C8:1B:10:22:01",
    location: "Server Room",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 2,
    assetTag: "RTR-2025-002",
    deviceName: "OFFICE-ROUTER-01",
    brand: "TP-Link",
    model: "Archer C6",
    ipAddress: "192.168.12.1",
    macAddress: "44:33:4C:12:22:01",
    location: "Office Management",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "Main office router",
  },
  {
    id: 3,
    assetTag: "RTR-2025-003",
    deviceName: "MK-ROUTER-01",
    brand: "MikroTik",
    model: "hEX RB750Gr3",
    ipAddress: "192.168.20.1",
    macAddress: "64:D1:54:20:22:03",
    location: "MK Fashion",
    company: "MK Fashion Ltd.",
    status: "In Stock",
    remarks: "-",
  },
  {
    id: 4,
    assetTag: "RTR-2026-004",
    deviceName: "FACTORY-CORE",
    brand: "Cisco",
    model: "ISR 4331",
    ipAddress: "10.10.0.1",
    macAddress: "00:25:45:10:22:04",
    location: "Factory",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "Core network",
  },
  {
    id: 5,
    assetTag: "RTR-2026-005",
    deviceName: "BACKUP-ROUTER",
    brand: "TP-Link",
    model: "ER605",
    ipAddress: "192.168.50.1",
    macAddress: "10:FE:ED:50:22:05",
    location: "IT Department",
    company: "Kaizer Knitwears Ltd.",
    status: "In Repair",
    remarks: "WAN port issue",
  },
];

export default function RouterInventoryPage() {
  return (
    <InventoryTable
      config={{
        title: "Router Inventory",
        storageKey: "router_inventory",
        icon: BsFillRouterFill,
        initialData: routers,

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
            render: (item, copy) => (
              <div>
                <div className="text-[12px] font-bold text-slate-900">
                  {item.assetTag}
                  <button
                    onClick={() =>
                      copy(item.assetTag)
                    }
                    className="ml-1 text-slate-400 hover:text-indigo-600"
                  >
                    <FiCopy
                      className="inline"
                      size={11}
                    />
                  </button>
                </div>
                <div className="mt-1 text-[10px] text-slate-500">
                  {item.deviceName}
                </div>
              </div>
            ),
          },
          {
            key: "brand",
            label: "Hardware",
            render: (item) => (
              <div>
                <div className="text-[12px] font-semibold text-slate-800">
                  {item.brand}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.model}
                </div>
              </div>
            ),
          },
          {
            key: "ipAddress",
            label: "Network",
            render: (item) => (
              <div>
                <div className="font-mono text-[11px] font-semibold text-slate-800">
                  {item.ipAddress}
                </div>
                <div className="font-mono text-[10px] text-slate-500">
                  {item.macAddress}
                </div>
              </div>
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
            placeholder: "RTR-2026-006",
          },
          {
            key: "deviceName",
            label: "Device Name",
            required: true,
            placeholder: "CORE-ROUTER-02",
          },
          {
            key: "brand",
            label: "Brand",
            type: "select",
            options: [
              "MikroTik",
              "TP-Link",
              "Cisco",
              "HPE",
              "D-Link",
            ],
          },
          {
            key: "model",
            label: "Model",
            placeholder: "Router model",
          },
          {
            key: "ipAddress",
            label: "IP Address",
            placeholder: "192.168.1.1",
          },
          {
            key: "macAddress",
            label: "MAC Address",
            placeholder: "00:11:22:33:44:55",
          },
          {
            key: "location",
            label: "Location",
            placeholder: "Server Room",
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
            placeholder: "Optional remarks...",
          },
        ],
      }}
    />
  );
}

function Status({ value }) {
  const classes =
    value === "Running"
      ? "border-emerald-300 bg-emerald-50 text-emerald-600"
      : value === "In Stock"
      ? "border-blue-300 bg-blue-50 text-blue-600"
      : "border-orange-300 bg-orange-50 text-orange-600";

  return (
    <span
      className={`inline-flex rounded border px-2 py-1 text-[10px] font-semibold ${classes}`}
    >
      • {value}
    </span>
  );
}