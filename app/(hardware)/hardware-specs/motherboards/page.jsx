"use client";

import HardwareSpecTable from "@/components/HardwareSpecTable";

const initialData = [
  { id: 1, name: "ASUS H110M-K", remarks: "-" },
  { id: 2, name: "Gigabyte H110M-S2", remarks: "-" },
  { id: 3, name: "ASUS H110M-D", remarks: "-" },
  { id: 4, name: "Gigabyte H310M-S2P", remarks: "-" },
  { id: 5, name: "ASUS H310M-E", remarks: "-" },
  { id: 6, name: "MSI H310M PRO-VDH", remarks: "-" },
  { id: 7, name: "Gigabyte B360M DS3H", remarks: "-" },
  { id: 8, name: "ASUS B450M-A", remarks: "-" },
  { id: 9, name: "MSI B450M PRO", remarks: "-" },
  { id: 10, name: "Gigabyte B550M DS3H", remarks: "-" },
  { id: 11, name: "ASUS B550M-K", remarks: "-" },
  { id: 12, name: "Gigabyte H610M H", remarks: "-" },
  { id: 13, name: "ASUS PRIME H610M-E", remarks: "-" },
  { id: 14, name: "MSI PRO H610M-G", remarks: "-" },
  { id: 15, name: "Gigabyte B660M DS3H", remarks: "-" },
];

export default function MotherboardsPage() {
  return (
    <HardwareSpecTable
      title="Motherboards"
      storageKey="it_inventory_motherboards"
      nameLabel="Motherboard Name"
      searchPlaceholder="Search motherboard or remarks..."
      addLabel="Add Motherboard"
      createLabel="Motherboard"
      editLabel="Motherboard"
      description="motherboard information"
      namePlaceholder="e.g., ASUS PRIME H610M-E"
      nameHelp="Enter the official motherboard model."
      icon="cpu"
      initialData={initialData}
    />
  );
}