"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE MOTHERBOARD
export async function createMotherboardAction(formData) {
  try {
    const auth = await requirePermission("hardware:motherboard_create");
    if (!auth.authorized) return { error: auth.error };

    const brandId = formData.get("brandId")?.trim();
    const modelId = formData.get("modelId")?.trim();
    const remarks = formData.get("remarks")?.trim() || null;

    if (!brandId || !modelId) {
      return { error: "Both Brand and Model are required." };
    }

    const existing = await prisma.motherboard.findUnique({
      where: {
        brandId_modelId: {
          brandId,
          modelId,
        },
      },
    });

    if (existing) {
      return { error: "This Motherboard specification already exists." };
    }

    await prisma.motherboard.create({
      data: {
        brandId,
        modelId,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/motherboards");
    return { success: true };
  } catch (err) {
    console.error("Create motherboard error:", err);
    return { error: err?.message || "Failed to create motherboard." };
  }
}

// 2. UPDATE MOTHERBOARD
export async function updateMotherboardAction(id, formData) {
  try {
    const auth = await requirePermission("hardware:motherboard_edit");
    if (!auth.authorized) return { error: auth.error };

    const brandId = formData.get("brandId")?.trim();
    const modelId = formData.get("modelId")?.trim();
    const remarks = formData.get("remarks")?.trim() || null;

    if (!brandId || !modelId) {
      return { error: "Both Brand and Model are required." };
    }

    await prisma.motherboard.update({
      where: { id },
      data: {
        brandId,
        modelId,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/motherboards");
    return { success: true };
  } catch (err) {
    console.error("Update motherboard error:", err);
    return { error: err?.message || "Failed to update motherboard." };
  }
}

// 3. DELETE MOTHERBOARD
export async function deleteMotherboardAction(id) {
  try {
    const auth = await requirePermission("hardware:motherboard_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.motherboard.delete({
      where: { id },
    });

    revalidatePath("/hardware-specs/motherboards");
    return { success: true };
  } catch (err) {
    console.error("Delete motherboard error:", err);
    return { error: err?.message || "Failed to delete motherboard." };
  }
}