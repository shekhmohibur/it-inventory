"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. UPDATE COMPANY PROFILE
export async function updateCompanyAction(formData) {
  try {
    const session = await getSession();
    if (!session?.id || session.role !== "ADMIN") {
      return { error: "Administrative privileges are required to edit organization details." };
    }

    const companyId = formData.get("companyId");
    const name = formData.get("name")?.trim();
    const code = formData.get("code")?.trim().toUpperCase();
    const address = formData.get("address")?.trim();
    const contactEmail = formData.get("contactEmail")?.trim().toLowerCase();
    const contactPhone = formData.get("contactPhone")?.trim();

    if (!name || !code) {
      return { error: "Company name and abbreviation code are required." };
    }

    await prisma.company.upsert({
      where: { id: companyId || "default-company" },
      update: { name, code, address, contactEmail, contactPhone },
      create: {
        id: companyId || "default-company",
        name,
        code,
        address,
        contactEmail,
        contactPhone,
      },
    });

    revalidatePath("/settings/organization");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Update company error:", err);
    return { error: "Failed to save company details." };
  }
}

// 2. ADD DEPARTMENT
export async function addDepartmentAction(formData) {
  try {
    const session = await getSession();
    if (!session?.id || session.role !== "ADMIN") {
      return { error: "Administrative privileges required." };
    }

    const companyId = formData.get("companyId") || "default-company";
    const name = formData.get("name")?.trim();
    const code = formData.get("code")?.trim().toUpperCase();
    const rawSections = formData.get("sections")?.trim();

    if (!name) {
      return { error: "Department name is mandatory." };
    }

    // Split sections by comma
    const sections = rawSections
      ? rawSections.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    await prisma.department.create({
      data: {
        name,
        code,
        companyId,
        sections,
      },
    });

    revalidatePath("/settings/organization");
    return { success: true };
  } catch (err) {
    console.error("Add department error:", err);
    return { error: "Department already exists or could not be created." };
  }
}

// 3. DELETE DEPARTMENT
export async function deleteDepartmentAction(departmentId) {
  try {
    const session = await getSession();
    if (!session?.id || session.role !== "ADMIN") {
      return { error: "Unauthorized operation." };
    }

    await prisma.department.delete({
      where: { id: departmentId },
    });

    revalidatePath("/settings/organization");
    return { success: true };
  } catch (err) {
    console.error("Delete department error:", err);
    return { error: "Failed to remove department." };
  }
}