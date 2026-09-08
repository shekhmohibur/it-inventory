"use client";

import HardwareSpecTable from "@/components/HardwareSpecTable";

const initialData = [
  { id: 1, name: "Dell 240W Power Supply", remarks: "-" },
  { id: 2, name: "Dell 300W Power Supply", remarks: "-" },
  { id: 3, name: "HP 240W Power Supply", remarks: "-" },
  { id: 4, name: "HP 300W Power Supply", remarks: "-" },
  { id: 5, name: "HP 400W Power Supply", remarks: "-" },
  { id: 6, name: "450W ATX Power Supply", remarks: "-" },
  { id: 7, name: "500W ATX Power Supply", remarks: "-" },
  { id: 8, name: "550W ATX Power Supply", remarks: "-" },
  { id: 9, name: "600W ATX Power Supply", remarks: "-" },
  { id: 10, name: "650W 80+ Bronze", remarks: "-" },
  { id: 11, name: "750W 80+ Bronze", remarks: "-" },
  { id: 12, name: "850W 80+ Gold", remarks: "-" },
];

export default function PowerSuppliesPage() {
  return (
    <HardwareSpecTable
      title="Power Supplies"
      storageKey="it_inventory_power_supplies"
      nameLabel="Power Supply Name"
      searchPlaceholder="Search power supply or remarks..."
      addLabel="Add Power Supply"
      createLabel="Power Supply"
      editLabel="Power Supply"
      description="power supply information"
      namePlaceholder="e.g., 650W 80+ Bronze"
      nameHelp="Enter the power supply wattage and model."
      icon="server"
      initialData={initialData}
    />
  );
}