import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { GraphicsCardPrintLayout } from "@/components/print-layout/GraphicsCardPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Graphics Cards - Print View | KKL Inventory",
};

export default async function HardwareSpecsGraphicsCardPrintPage() {
  const org = await getOrganizationData();

  let rawCards = [];
  try {
    rawCards = await prisma.graphicsCard.findMany({
      orderBy: [{ chipsetBrand: "asc" }, { modelName: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load graphics cards for print:", err);
  }

  const cards = rawCards.map((c) => ({
    id: c.id || "notfound",
    chipsetBrand: c.chipsetBrand || "notfound",
    modelName: c.modelName || "notfound",
    series: c.series || "",
    memoryCapacity: c.memoryCapacity || "notfound",
    memoryType: c.memoryType || "GDDR6",
    cardType: c.cardType || "Dedicated",
    remarks: c.remarks || "—",
  }));

  return <GraphicsCardPrintLayout cards={cards} org={org} />;
}