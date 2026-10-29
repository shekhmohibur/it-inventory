import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { MotherboardPrintLayout } from "@/components/print-layout/MotherboardPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Motherboards Directory - Print View | KKL Inventory",
};

export default async function HardwareSpecsMotherboardsPrintPage() {
  const org = await getOrganizationData();

  let rawMotherboards = [];
  try {
    rawMotherboards = await prisma.motherboard.findMany({
      include: {
        brand: true,
        model: true,
      },
      orderBy: [{ brand: { name: "asc" } }, { model: { name: "asc" } }],
    });
  } catch (err) {
    console.error("Failed to load motherboards for print:", err);
  }

  const motherboards = rawMotherboards.map((mb) => ({
    id: mb.id || "notfound",
    brand: mb.brand?.name || "notfound",
    name: mb.model?.name || "notfound",
    remarks: mb.remarks || "—",
  }));

  return <MotherboardPrintLayout motherboards={motherboards} org={org} />;
}