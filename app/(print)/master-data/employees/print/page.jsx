import React from "react";
import { PrismaClient } from "@prisma/client";
import { getOrganizationData } from "@/lib/getOrg";
import { EmployeePrintLayout } from "@/components/print-layout/EmployeePrintLayout";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Employee Directory - Print View | KKL Inventory",
};

export default async function EmployeePrintPage() {
  const org = await getOrganizationData();

  let rawEmployees = [];
  try {
    rawEmployees = await prisma.employee.findMany({
      include: {
        company: true,
        department: true,
        section: true,
      },
      orderBy: { employeeCode: "asc" },
    });
  } catch (err) {
    console.error("Failed to load employees for print:", err);
  }

  const employees = rawEmployees.map((e) => ({
    id: e.id || "notfound",
    employeeCode: e.employeeCode || "notfound",
    name: e.name || "notfound",
    designation: e.designation || "notfound",
    contactNumber: e.contactNumber || "notfound",
    personalEmail: e.personalEmail || "",
    officeEmail: e.officeEmail || "",
    status: e.status || "Active",
    companyName: e.company?.name || "notfound",
    departmentName: e.department?.name || "—",
    sectionName: e.section?.name || "—",
  }));

  return <EmployeePrintLayout employees={employees} org={org} />;
}