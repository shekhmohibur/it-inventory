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

  const [rawPsus, rawLogs] = await Promise.all([
    prisma.psuSpec.findMany({
      orderBy: [{ wattage: "asc" }, { name: "asc" }],
    }),
    prisma.auditLog.findMany({
      where: { entityType: "PSU" },
      orderBy: { createdAt: "desc" },
      take: 20, // Most recent 20 changes
    }),
  ]);

  const psus = rawPsus.map((p) => ({
    id: p.id || "notfound",
    name: p.name || "notfound",
    wattage: p.wattage || "notfound",
    remarks: p.remarks || "—",
  }));

  const logs = rawLogs.map((l) => ({
    id: l.id,
    action: l.action,
    fullName: l.fullName || "Unknown User",
    details: l.details,
    formattedDate: new Date(l.createdAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  }));

  return <PsuPrintLayout psus={psus} org={org} logs={logs} />;
}