"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE MODEL
export async function createDeviceModelAction(formData) {
  try {
    const auth = await requirePermission("hardware:model_create");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const category = formData.get("category")?.trim();
    const brandId = formData.get("brandId")?.trim();
    const remarks = formData.get("remarks")?.trim() || null;

    if (!name || !category || !brandId) {
      return { error: "Model Name, Category, and Brand are required." };
    }

    const existing = await prisma.deviceModel.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        brandId,
      },
    });

    if (existing) {
      return { error: `Model "${name}" already exists under this brand.` };
    }

    await prisma.deviceModel.create({
      data: {
        name,
        category,
        brandId,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/models");
    return { success: true };
  } catch (err) {
    console.error("Create model error:", err);
    return { error: err?.message || "Failed to create device model." };
  }
}

// 2. UPDATE MODEL
export async function updateDeviceModelAction(id, formData) {
  try {
    const auth = await requirePermission("hardware:model_edit");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const category = formData.get("category")?.trim();
    const brandId = formData.get("brandId")?.trim();
    const remarks = formData.get("remarks")?.trim() || null;

    if (!name || !category || !brandId) {
      return { error: "Model Name, Category, and Brand are required." };
    }

    await prisma.deviceModel.update({
      where: { id },
      data: {
        name,
        category,
        brandId,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/models");
    return { success: true };
  } catch (err) {
    console.error("Update model error:", err);
    return { error: err?.message || "Failed to update device model." };
  }
}

// 3. DELETE MODEL
export async function deleteDeviceModelAction(id) {
  try {
    const auth = await requirePermission("hardware:model_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.deviceModel.delete({
      where: { id },
    });

    revalidatePath("/hardware-specs/models");
    return { success: true };
  } catch (err) {
    console.error("Delete model error:", err);
    return { error: err?.message || "Failed to delete device model." };
  }
}