'use client'
import InventoryTable from "@/components/InventoryTable";
import { FiWifi } from "react-icons/fi";

const ethernet = [
  {
    id: 1,
    assetTag: "ETH-2025-001",
    cableType: "CAT6",
    length: "3 Meter",
    quantity: 25,
    location: "IT Store",
    company: "Kaizer Knitwears Ltd.",
    status: "In Stock",
    remarks: "Blue CAT6",
  },
  {
    id: 2,
    assetTag: "ETH-2025-002",
    cableType: "CAT6",
    length: "5 Meter",
    quantity: 18,
    location: "IT Store",
    company: "Kaizer Knitwears Ltd.",
    status: "In Stock",
    remarks: "RJ45 terminated",
  },
  {
    id: 3,
    assetTag: "ETH-2025-003",
    cableType: "CAT5e",
    length: "10 Meter",
    quantity: 12,
    location: "IT Store",
    company: "Kaizer Knitwears Ltd.",
    status: "In Stock",
    remarks: "-",
  },
  {
    id: 4,
    assetTag: "ETH-2026-004",
    cableType: "CAT6",
    length: "20 Meter",
    quantity: 5,
    location: "Network Room",
    company: "MK Fashion Ltd.",
    status: "Running",
    remarks: "Active connection",
  },
];

export default function EthernetInventoryPage() {
  return (
    <InventoryTable
      config={{
        title: "Ethernet Inventory",
        storageKey: "ethernet_inventory",
        icon: FiWifi,
        initialData: ethernet,

        filters: [
          {
            key: "cableType",
            label: "Type",
            options: [
              "CAT5e",
              "CAT6",
              "CAT6A",
            ],
          },
          {
            key: "status",
            label: "Status",
            options: [
              "In Stock",
              "Running",
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
            key: "cableType",
            label: "Cable Type",
            render: (item) => (
              <div>
                <div className="text-[12px] font-bold">
                  {item.cableType}
                </div>
                <div className="text-[10px] text-slate-500">
                  Ethernet Cable
                </div>
              </div>
            ),
          },
          {
            key: "length",
            label: "Length",
          },
          {
            key: "quantity",
            label: "Quantity",
            render: (item) => (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">
                {item.quantity}
              </span>
            ),
          },
          {
            key: "location",
            label: "Location",
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
            placeholder: "ETH-2026-005",
          },
          {
            key: "cableType",
            label: "Cable Type",
            type: "select",
            options: [
              "CAT5e",
              "CAT6",
              "CAT6A",
            ],
          },
          {
            key: "length",
            label: "Cable Length",
            placeholder: "e.g. 10 Meter",
          },
          {
            key: "quantity",
            label: "Quantity",
            type: "number",
          },
          {
            key: "location",
            label: "Location",
            placeholder: "IT Store",
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
              "In Stock",
              "Running",
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
    <span className="inline-flex rounded border border-blue-300 bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600">
      • {value}
    </span>
  );
}