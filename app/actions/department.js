"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE DEPARTMENT
export async function createDepartmentAction(formData) {
  try {
    const auth = await requirePermission("org:dept_create");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const companyId = formData.get("companyId")?.trim();
    const description = formData.get("description")?.trim() || null;

    if (!name || !companyId) {
      return { error: "Department Name and Parent Company are required." };
    }

    const existing = await prisma.department.findFirst({
      where: { name, companyId },
    });

    if (existing) {
      return { error: "This department already exists under the selected company." };
    }

    await prisma.department.create({
      data: {
        name,
        companyId,
        description,
      },
    });

    revalidatePath("/master-data/department");
    return { success: true };
  } catch (err) {
    console.error("Create department error:", err);
    return { error: err?.message || "Failed to create department." };
  }
}

// 2. UPDATE DEPARTMENT
export async function updateDepartmentAction(id, formData) {
  try {
    const auth = await requirePermission("org:dept_edit");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const companyId = formData.get("companyId")?.trim();
    const description = formData.get("description")?.trim() || null;

    if (!name || !companyId) {
      return { error: "Department Name and Parent Company are required." };
    }

    await prisma.department.update({
      where: { id },
      data: {
        name,
        companyId,
        description,
      },
    });

    revalidatePath("/master-data/department");
    return { success: true };
  } catch (err) {
    console.error("Update department error:", err);
    return { error: err?.message || "Failed to update department." };
  }
}

// 3. DELETE DEPARTMENT
export async function deleteDepartmentAction(id) {
  try {
    const auth = await requirePermission("org:dept_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.department.delete({
      where: { id },
    });

    revalidatePath("/master-data/department");
    return { success: true };
  } catch (err) {
    console.error("Delete department error:", err);
    return { error: err?.message || "Failed to delete department." };
  }
}