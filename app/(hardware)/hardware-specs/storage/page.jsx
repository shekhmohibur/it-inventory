"use client";

import HardwareSpecTable from "@/components/HardwareSpecTable";

const initialData = [
  { id: 1, name: "128GB SSD", remarks: "-" },
  { id: 2, name: "256GB SSD", remarks: "-" },
  { id: 3, name: "512GB SSD", remarks: "-" },
  { id: 4, name: "1TB SSD", remarks: "-" },
  { id: 5, name: "2TB SSD", remarks: "-" },
  { id: 6, name: "500GB HDD", remarks: "-" },
  { id: 7, name: "1TB HDD", remarks: "-" },
  { id: 8, name: "2TB HDD", remarks: "-" },
  { id: 9, name: "4TB HDD", remarks: "-" },
  { id: 10, name: "256GB NVMe SSD", remarks: "-" },
  { id: 11, name: "512GB NVMe SSD", remarks: "-" },
  { id: 12, name: "1TB NVMe SSD", remarks: "-" },
  { id: 13, name: "2TB NVMe SSD", remarks: "-" },
];

export default function StoragePage() {
  return (
    <HardwareSpecTable
      title="Storage"
      storageKey="it_inventory_storage"
      nameLabel="Storage Name"
      searchPlaceholder="Search storage or remarks..."
      addLabel="Add Storage"
      createLabel="Storage"
      editLabel="Storage"
      description="storage information"
      namePlaceholder="e.g., 512GB NVMe SSD"
      nameHelp="Enter the storage capacity and type."
      icon="harddrive"
      initialData={initialData}
    />
  );
}