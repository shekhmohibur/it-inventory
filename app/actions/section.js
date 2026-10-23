"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE SECTION
export async function createSectionAction(formData) {
  try {
    const auth = await requirePermission("org:section_create");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const departmentId = formData.get("departmentId")?.trim();
    const description = formData.get("description")?.trim() || null;

    if (!name || !departmentId) {
      return { error: "Section Name and Parent Department are required." };
    }

    const existing = await prisma.section.findFirst({
      where: { name, departmentId },
    });

    if (existing) {
      return { error: "A section with this name already exists under the selected department." };
    }

    await prisma.section.create({
      data: {
        name,
        departmentId,
      },
    });

    revalidatePath("/master-data/sections");
    return { success: true };
  } catch (err) {
    console.error("Create section error:", err);
    return { error: err?.message || "Failed to create section." };
  }
}

// 2. UPDATE SECTION
export async function updateSectionAction(id, formData) {
  try {
    const auth = await requirePermission("org:section_edit");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const departmentId = formData.get("departmentId")?.trim();

    if (!name || !departmentId) {
      return { error: "Section Name and Parent Department are required." };
    }

    await prisma.section.update({
      where: { id },
      data: {
        name,
        departmentId,
      },
    });

    revalidatePath("/master-data/sections");
    return { success: true };
  } catch (err) {
    console.error("Update section error:", err);
    return { error: err?.message || "Failed to update section." };
  }
}

// 3. DELETE SECTION
export async function deleteSectionAction(id) {
  try {
    const auth = await requirePermission("org:section_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.section.delete({
      where: { id },
    });

    revalidatePath("/master-data/sections");
    return { success: true };
  } catch (err) {
    console.error("Delete section error:", err);
    return { error: err?.message || "Failed to delete section." };
  }
}