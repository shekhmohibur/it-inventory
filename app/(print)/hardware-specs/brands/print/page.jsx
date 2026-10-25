import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { BrandPrintLayout } from "@/components/print-layout/BrandPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Brand Directory - Print View | KKL Inventory",
};

export default async function HardwareSpecsBrandsPrintPage() {
  const org = await getOrganizationData();

  let rawBrands = [];
  try {
    rawBrands = await prisma.brand.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  } catch (err) {
    console.error("Failed to load brands for print:", err);
  }

  const brands = rawBrands.map((b) => ({
    id: b.id || "notfound",
    name: b.name || "notfound",
    category: b.category || "notfound",
    remarks: b.remarks || "—",
  }));

  return <BrandPrintLayout brands={brands} org={org} />;
}