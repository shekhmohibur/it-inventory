import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { StoragePrintLayout } from "@/components/print-layout/StoragePrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Storage Specifications - Print View | KKL Inventory",
};

export default async function HardwareSpecsStoragePrintPage() {
  const org = await getOrganizationData();

  let rawStorages = [];
  try {
    rawStorages = await prisma.storageSpec.findMany({
      orderBy: [{ driveType: "asc" }, { capacity: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load storage specs for print:", err);
  }

  const storages = rawStorages.map((s) => ({
    id: s.id || "notfound",
    driveType: s.driveType || "notfound",
    capacity: s.capacity || "notfound",
    interface: s.interface || "notfound",
    formFactor: s.formFactor || "2.5 Inch",
    remarks: s.remarks || "—",
  }));

  return <StoragePrintLayout storages={storages} org={org} />;
}