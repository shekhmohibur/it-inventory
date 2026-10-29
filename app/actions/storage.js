"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE STORAGE SPEC
export async function createStorageAction(formData) {
  try {
    const auth = await requirePermission("hardware:storage_create");
    if (!auth.authorized) return { error: auth.error };

    const driveType = formData.get("driveType")?.trim();
    const capacity = formData.get("capacity")?.trim();
    const storageInterface = formData.get("interface")?.trim();
    const formFactor = formData.get("formFactor")?.trim() || "2.5 Inch";
    const remarks = formData.get("remarks")?.trim() || null;

    if (!driveType || !capacity || !storageInterface) {
      return { error: "Drive Type, Capacity, and Interface are required." };
    }

    const existing = await prisma.storageSpec.findFirst({
      where: {
        driveType,
        capacity,
        interface: storageInterface,
        formFactor,
      },
    });

    if (existing) {
      return {
        error: `Storage spec (${capacity} ${driveType} ${storageInterface} ${formFactor}) already exists.`,
      };
    }

    await prisma.storageSpec.create({
      data: {
        driveType,
        capacity,
        interface: storageInterface,
        formFactor,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/storage");
    return { success: true };
  } catch (err) {
    console.error("Create storage error:", err);
    return { error: err?.message || "Failed to create storage specification." };
  }
}

// 2. UPDATE STORAGE SPEC
export async function updateStorageAction(id, formData) {
  try {
    const auth = await requirePermission("hardware:storage_edit");
    if (!auth.authorized) return { error: auth.error };

    const driveType = formData.get("driveType")?.trim();
    const capacity = formData.get("capacity")?.trim();
    const storageInterface = formData.get("interface")?.trim();
    const formFactor = formData.get("formFactor")?.trim() || "2.5 Inch";
    const remarks = formData.get("remarks")?.trim() || null;

    if (!driveType || !capacity || !storageInterface) {
      return { error: "Drive Type, Capacity, and Interface are required." };
    }

    await prisma.storageSpec.update({
      where: { id },
      data: {
        driveType,
        capacity,
        interface: storageInterface,
        formFactor,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/storage");
    return { success: true };
  } catch (err) {
    console.error("Update storage error:", err);
    return { error: err?.message || "Failed to update storage specification." };
  }
}

// 3. DELETE STORAGE SPEC
export async function deleteStorageAction(id) {
  try {
    const auth = await requirePermission("hardware:storage_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.storageSpec.delete({
      where: { id },
    });

    revalidatePath("/hardware-specs/storage");
    return { success: true };
  } catch (err) {
    console.error("Delete storage error:", err);
    return { error: err?.message || "Failed to delete storage specification." };
  }
}