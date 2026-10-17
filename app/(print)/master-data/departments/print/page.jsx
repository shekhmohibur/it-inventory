import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { DepartmentPrintLayout } from "@/components/print-layout/DepartmentPrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Department List - Print View | KKL Inventory",
};

export default async function DepartmentPrintPage() {
  const org = await getOrganizationData();

  let rawDepartments = [];
  try {
    rawDepartments = await prisma.department.findMany({
      include: {
        company: true,
        sections: true,
      },
      orderBy: { name: "asc" },
    });
  } catch (err) {
    console.error("Failed to load departments for print:", err);
  }

  let deptEmployeeCounts = {};
  try {
    const users = await prisma.user.findMany({
      select: { department: true },
    });
    users.forEach((u) => {
      if (u.department) {
        deptEmployeeCounts[u.department] = (deptEmployeeCounts[u.department] || 0) + 1;
      }
    });
  } catch (err) {
    console.error("Failed to count department employees:", err);
  }

  const departments = rawDepartments.map((d) => {
    const companySlug = (d.company?.name || "company")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-\$/g, "");
    const deptSlug = (d.name || "dept")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-\$/g, "");

    return {
      id: d.id || "notfound",
      name: d.name || "notfound",
      reference: `${companySlug}-${deptSlug}`,
      companyName: d.company?.name || "notfound",
      sectionsCount: d.sections?.length || 0,
      employeesCount: deptEmployeeCounts[d.name] || 0,
    };
  });

  return <DepartmentPrintLayout departments={departments} org={org} />;
}