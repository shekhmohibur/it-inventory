import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { PsuPrintLayout } from "@/components/print-layout/PsuPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PSU Specifications - Print View | KKL Inventory",
};

export default async function HardwareSpecsPsuPrintPage() {
  const org = await getOrganizationData();

  let rawPsus = [];
  try {
    rawPsus = await prisma.psuSpec.findMany({
      orderBy: [{ wattage: "asc" }, { name: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load PSU specs for print:", err);
  }

  const psus = rawPsus.map((p) => ({
    id: p.id || "notfound",
    name: p.name || "notfound",
    wattage: p.wattage || "notfound",
    remarks: p.remarks || "—",
  }));

  return <PsuPrintLayout psus={psus} org={org} />;
}