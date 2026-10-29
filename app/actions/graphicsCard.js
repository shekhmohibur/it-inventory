"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE GRAPHICS CARD
export async function createGraphicsCardAction(formData) {
  try {
    const auth = await requirePermission("hardware:graphics_card_create");
    if (!auth.authorized) return { error: auth.error };

    const chipsetBrand = formData.get("chipsetBrand")?.trim();
    const series = formData.get("series")?.trim() || null;
    const modelName = formData.get("modelName")?.trim();
    const memoryCapacity = formData.get("memoryCapacity")?.trim();
    const memoryType = formData.get("memoryType")?.trim() || "GDDR6";
    const cardType = formData.get("cardType")?.trim() || "Dedicated";
    const remarks = formData.get("remarks")?.trim() || null;

    if (!chipsetBrand || !modelName || !memoryCapacity) {
      return { error: "Chipset Brand, Model Name, and Memory Capacity are required." };
    }

    const existing = await prisma.graphicsCard.findFirst({
      where: {
        chipsetBrand: { equals: chipsetBrand, mode: "insensitive" },
        modelName: { equals: modelName, mode: "insensitive" },
        memoryCapacity: { equals: memoryCapacity, mode: "insensitive" },
      },
    });

    if (existing) {
      return {
        error: `Graphics card (${chipsetBrand} ${modelName} ${memoryCapacity}) already exists.`,
      };
    }

    await prisma.graphicsCard.create({
      data: {
        chipsetBrand,
        series,
        modelName,
        memoryCapacity,
        memoryType,
        cardType,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/graphics-card");
    return { success: true };
  } catch (err) {
    console.error("Create graphics card error:", err);
    return { error: err?.message || "Failed to create graphics card specification." };
  }
}

// 2. UPDATE GRAPHICS CARD
export async function updateGraphicsCardAction(id, formData) {
  try {
    const auth = await requirePermission("hardware:graphics_card_edit");
    if (!auth.authorized) return { error: auth.error };

    const chipsetBrand = formData.get("chipsetBrand")?.trim();
    const series = formData.get("series")?.trim() || null;
    const modelName = formData.get("modelName")?.trim();
    const memoryCapacity = formData.get("memoryCapacity")?.trim();
    const memoryType = formData.get("memoryType")?.trim() || "GDDR6";
    const cardType = formData.get("cardType")?.trim() || "Dedicated";
    const remarks = formData.get("remarks")?.trim() || null;

    if (!chipsetBrand || !modelName || !memoryCapacity) {
      return { error: "Chipset Brand, Model Name, and Memory Capacity are required." };
    }

    await prisma.graphicsCard.update({
      where: { id },
      data: {
        chipsetBrand,
        series,
        modelName,
        memoryCapacity,
        memoryType,
        cardType,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/graphics-card");
    return { success: true };
  } catch (err) {
    console.error("Update graphics card error:", err);
    return { error: err?.message || "Failed to update graphics card specification." };
  }
}

// 3. DELETE GRAPHICS CARD
export async function deleteGraphicsCardAction(id) {
  try {
    const auth = await requirePermission("hardware:graphics_card_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.graphicsCard.delete({
      where: { id },
    });

    revalidatePath("/hardware-specs/graphics-card");
    return { success: true };
  } catch (err) {
    console.error("Delete graphics card error:", err);
    return { error: err?.message || "Failed to delete graphics card specification." };
  }
}