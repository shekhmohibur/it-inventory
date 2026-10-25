"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE RAM
export async function createRamAction(formData) {
  try {
    const auth = await requirePermission("hardware:ram_create");
    if (!auth.authorized) return { error: auth.error };

    const capacity = formData.get("capacity")?.trim();
    const ramType = formData.get("ramType")?.trim();
    const busSpeed = formData.get("busSpeed")?.trim();
    const formFactor = formData.get("formFactor")?.trim() || "DIMM";
    const remarks = formData.get("remarks")?.trim() || null;

    if (!capacity || !ramType || !busSpeed) {
      return { error: "Capacity, RAM Type, and Bus Speed are required." };
    }

    const existing = await prisma.ram.findFirst({
      where: {
        capacity,
        ramType,
        busSpeed,
        formFactor,
      },
    });

    if (existing) {
      return { error: `RAM spec (${capacity} ${ramType} ${busSpeed} ${formFactor}) already exists.` };
    }

    await prisma.ram.create({
      data: {
        capacity,
        ramType,
        busSpeed,
        formFactor,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/ram");
    return { success: true };
  } catch (err) {
    console.error("Create RAM error:", err);
    return { error: err?.message || "Failed to create RAM specification." };
  }
}

// 2. UPDATE RAM
export async function updateRamAction(id, formData) {
  try {
    const auth = await requirePermission("hardware:ram_edit");
    if (!auth.authorized) return { error: auth.error };

    const capacity = formData.get("capacity")?.trim();
    const ramType = formData.get("ramType")?.trim();
    const busSpeed = formData.get("busSpeed")?.trim();
    const formFactor = formData.get("formFactor")?.trim() || "DIMM";
    const remarks = formData.get("remarks")?.trim() || null;

    if (!capacity || !ramType || !busSpeed) {
      return { error: "Capacity, RAM Type, and Bus Speed are required." };
    }

    await prisma.ram.update({
      where: { id },
      data: {
        capacity,
        ramType,
        busSpeed,
        formFactor,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/ram");
    return { success: true };
  } catch (err) {
    console.error("Update RAM error:", err);
    return { error: err?.message || "Failed to update RAM specification." };
  }
}

// 3. DELETE RAM
export async function deleteRamAction(id) {
  try {
    const auth = await requirePermission("hardware:ram_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.ram.delete({
      where: { id },
    });

    revalidatePath("/hardware-specs/ram");
    return { success: true };
  } catch (err) {
    console.error("Delete RAM error:", err);
    return { error: err?.message || "Failed to delete RAM specification." };
  }
}