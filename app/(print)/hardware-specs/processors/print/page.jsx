import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { ProcessorPrintLayout } from "@/components/print-layout/ProcessorPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Processors Directory - Print View | KKL Inventory",
};

export default async function HardwareSpecsProcessorsPrintPage() {
  const org = await getOrganizationData();

  let rawProcessors = [];
  try {
    rawProcessors = await prisma.processor.findMany({
      orderBy: [{ brand: "asc" }, { name: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load processors for print:", err);
  }

  const processors = rawProcessors.map((p) => ({
    id: p.id || "notfound",
    name: p.name || "notfound",
    brand: p.brand || "notfound",
    series: p.series || "",
    generation: p.generation || "",
    baseSpeed: p.baseSpeed || "",
    coresThreads: p.coresThreads || "",
    remarks: p.remarks || "—",
  }));

  return <ProcessorPrintLayout processors={processors} org={org} />;
}