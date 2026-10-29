import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { ModelPrintLayout } from "@/components/print-layout/ModelPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Model Directory - Print View | KKL Inventory",
};

export default async function HardwareSpecsModelsPrintPage() {
  const org = await getOrganizationData();

  let rawModels = [];
  try {
    rawModels = await prisma.deviceModel.findMany({
      include: { brand: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load models for print:", err);
  }

  const models = rawModels.map((m) => ({
    id: m.id || "notfound",
    name: m.name || "notfound",
    category: m.category || "notfound",
    brandName: m.brand?.name || "notfound",
    remarks: m.remarks || "—",
  }));

  return <ModelPrintLayout models={models} org={org} />;
}