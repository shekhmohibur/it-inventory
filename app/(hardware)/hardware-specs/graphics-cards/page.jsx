"use client";

import HardwareSpecTable from "@/components/HardwareSpecTable";

const initialData = [
  { id: 1, name: "Intel UHD Graphics 620", remarks: "-" },
  { id: 2, name: "Intel UHD Graphics 630", remarks: "-" },
  { id: 3, name: "Intel Iris Xe Graphics", remarks: "-" },
  { id: 4, name: "NVIDIA GeForce GT 710", remarks: "-" },
  { id: 5, name: "NVIDIA GeForce GT 1030", remarks: "-" },
  { id: 6, name: "NVIDIA GeForce GTX 1050", remarks: "-" },
  { id: 7, name: "NVIDIA GeForce GTX 1050 Ti", remarks: "-" },
  { id: 8, name: "NVIDIA GeForce GTX 1650", remarks: "-" },
  { id: 9, name: "NVIDIA GeForce GTX 1660", remarks: "-" },
  { id: 10, name: "NVIDIA GeForce RTX 2060", remarks: "-" },
  { id: 11, name: "NVIDIA GeForce RTX 3060", remarks: "-" },
  { id: 12, name: "NVIDIA GeForce RTX 4060", remarks: "-" },
  { id: 13, name: "AMD Radeon RX 550", remarks: "-" },
  { id: 14, name: "AMD Radeon RX 580", remarks: "-" },
  { id: 15, name: "AMD Radeon RX 6600", remarks: "-" },
];

export default function GraphicsCardsPage() {
  return (
    <HardwareSpecTable
      title="Graphics Cards"
      storageKey="it_inventory_graphics_cards"
      nameLabel="Graphics Card Name"
      searchPlaceholder="Search graphics card or remarks..."
      addLabel="Add Graphics Card"
      createLabel="Graphics Card"
      editLabel="Graphics Card"
      description="graphics card information"
      namePlaceholder="e.g., NVIDIA GeForce RTX 3060"
      nameHelp="Enter the official graphics card name."
      icon="monitor"
      initialData={initialData}
    />
  );
}