import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { RamPrintLayout } from "@/components/print-layout/RamPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "RAM Specifications - Print View | KKL Inventory",
};

export default async function HardwareSpecsRamPrintPage() {
  const org = await getOrganizationData();

  let rawRams = [];
  try {
    rawRams = await prisma.ram.findMany({
      orderBy: [{ ramType: "asc" }, { capacity: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load RAM for print:", err);
  }

  const rams = rawRams.map((r) => ({
    id: r.id || "notfound",
    capacity: r.capacity || "notfound",
    ramType: r.ramType || "notfound",
    busSpeed: r.busSpeed || "notfound",
    formFactor: r.formFactor || "DIMM",
    remarks: r.remarks || "—",
  }));

  return <RamPrintLayout rams={rams} org={org} />;
}