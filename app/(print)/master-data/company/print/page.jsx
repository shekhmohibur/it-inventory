import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { CompanyPrintLayout } from "@/components/print-layout/CompanyPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Company List - Print View | KKL Inventory",
};

export default async function CompanyPrintPage() {
  const org = await getOrganizationData();

  let rawCompanies = [];
  try {
    rawCompanies = await prisma.company.findMany({
      include: {
        departments: {
          include: { sections: true },
        },
      },
      orderBy: { name: "asc" },
    });
  } catch (err) {
    console.error("Failed to load companies for print:", err);
  }

  let companyEmployeeCounts = {};
  try {
    const users = await prisma.user.findMany({
      select: { department: true },
    });
    rawCompanies.forEach((comp) => {
      const deptNames = comp.departments.map((d) => d.name);
      companyEmployeeCounts[comp.id] = users.filter(
        (u) => u.department && deptNames.includes(u.department)
      ).length;
    });
  } catch (e) {
    console.error("Failed to count employees:", e);
  }

  const companies = rawCompanies.map((c) => ({
    id: c.id || "notfound",
    name: c.name || "notfound",
    shortName: c.shortName || "notfound",
    address: c.address || "notfound",
    departments: c.departments.length,
    sections: c.departments.reduce((acc, d) => acc + (d.sections?.length || 0), 0),
    employees: companyEmployeeCounts[c.id] || 0,
  }));

  return <CompanyPrintLayout companies={companies} org={org} />;
}