"use client";

import HardwareSpecTable from "@/components/HardwareSpecTable";

const initialData = [
  { id: 1, name: "4GB DDR3 RAM", remarks: "-" },
  { id: 2, name: "8GB DDR3 RAM", remarks: "-" },
  { id: 3, name: "8GB DDR4 RAM", remarks: "-" },
  { id: 4, name: "16GB DDR4 RAM", remarks: "-" },
  { id: 5, name: "32GB DDR4 RAM", remarks: "-" },
  { id: 6, name: "4GB DDR4 RAM", remarks: "-" },
  { id: 7, name: "8GB DDR4 2666MHz", remarks: "-" },
  { id: 8, name: "8GB DDR4 3200MHz", remarks: "-" },
  { id: 9, name: "16GB DDR4 3200MHz", remarks: "-" },
  { id: 10, name: "16GB DDR5 RAM", remarks: "-" },
  { id: 11, name: "32GB DDR5 RAM", remarks: "-" },
  { id: 12, name: "8GB DDR5 RAM", remarks: "-" },
  { id: 13, name: "4GB DDR4 SODIMM", remarks: "-" },
  { id: 14, name: "8GB DDR4 SODIMM", remarks: "-" },
  { id: 15, name: "16GB DDR4 SODIMM", remarks: "-" },
];

export default function RamPage() {
  return (
    <HardwareSpecTable
      title="RAM"
      storageKey="it_inventory_ram"
      nameLabel="RAM Name"
      searchPlaceholder="Search RAM or remarks..."
      addLabel="Add RAM"
      createLabel="RAM"
      editLabel="RAM"
      description="RAM information"
      namePlaceholder="e.g., 16GB DDR4 3200MHz"
      nameHelp="Enter the RAM capacity, type, and speed."
      icon="server"
      initialData={initialData}
    />
  );
}