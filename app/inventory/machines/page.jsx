'use client'
import InventoryTable from "@/components/InventoryTable";
import { FiCpu } from "react-icons/fi";

const machines = [
  {
    id: 1,
    assetTag: "MCH-2024-001",
    machineName: "CUTTING-MACHINE-01",
    brand: "Brother",
    model: "Industrial PC",
    processor: "Intel Core i5",
    ram: "8GB",
    location: "Cutting",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 2,
    assetTag: "MCH-2024-002",
    machineName: "DYEING-MACHINE-01",
    brand: "Dell",
    model: "OptiPlex 3050",
    processor: "Intel Core i5",
    ram: "8GB",
    location: "Dyeing",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "-",
  },
  {
    id: 3,
    assetTag: "MCH-2025-003",
    machineName: "PRODUCTION-PC-01",
    brand: "HP",
    model: "ProDesk 400",
    processor: "Intel Core i5",
    ram: "16GB",
    location: "Production",
    company: "Kaizer Knitwears Ltd.",
    status: "Running",
    remarks: "Production monitoring",
  },
  {
    id: 4,
    assetTag: "MCH-2025-004",
    machineName: "STORE-PC-01",
    brand: "Dell",
    model: "OptiPlex 3080",
    processor: "Intel Core i5",
    ram: "8GB",
    location: "Store",
    company: "MK Fashion Ltd.",
    status: "In Stock",
    remarks: "-",
  },
];

export default function MachineInventoryPage() {
  return (
    <InventoryTable
      config={{
        title: "Machine Inventory",
        storageKey: "machine_inventory",
        icon: FiCpu,
        initialData: machines,

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
            key: "machineName",
            label: "Machine",
            render: (item) => (
              <div>
                <div className="text-[12px] font-bold">
                  {item.machineName}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.brand} • {item.model}
                </div>
              </div>
            ),
          },
          {
            key: "processor",
            label: "Processor",
            render: (item) => (
              <div>
                <div className="text-[11px]">
                  {item.processor}
                </div>
                <div className="text-[10px] text-slate-500">
                  RAM: {item.ram}
                </div>
              </div>
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
            key: "machineName",
            label: "Machine Name",
            required: true,
          },
          {
            key: "brand",
            label: "Brand",
            type: "select",
            options: [
              "Dell",
              "HP",
              "Lenovo",
              "ASUS",
              "Custom",
            ],
          },
          {
            key: "model",
            label: "Model",
          },
          {
            key: "processor",
            label: "Processor",
          },
          {
            key: "ram",
            label: "RAM",
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