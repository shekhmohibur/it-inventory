import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { SectionPrintLayout } from "@/components/print-layout/SectionPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Section List - Print View | KKL Inventory",
};

export default async function SectionPrintPage() {
  const org = await getOrganizationData();

  let rawSections = [];
  try {
    rawSections = await prisma.section.findMany({
      include: {
        department: {
          include: {
            company: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });
  } catch (err) {
    console.error("Failed to load sections for print:", err);
  }

  // Count employees per section
  let sectionEmployeeCounts = {};
  try {
    const users = await prisma.user.findMany({
      select: { section: true },
    });
    users.forEach((u) => {
      if (u.section) {
        sectionEmployeeCounts[u.section] = (sectionEmployeeCounts[u.section] || 0) + 1;
      }
    });
  } catch (err) {
    console.error("Failed to count section employees:", err);
  }

  const sections = rawSections.map((s) => {
    const deptSlug = (s.department?.name || "dept")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const secSlug = (s.name || "section")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return {
      id: s.id || "notfound",
      name: s.name || "notfound",
      reference: `${deptSlug}-${secSlug}`,
      departmentName: s.department?.name || "notfound",
      companyName: s.department?.company?.name || "notfound",
      employeesCount: sectionEmployeeCounts[s.name] || 0,
    };
  });

  return <SectionPrintLayout sections={sections} org={org} />;
}