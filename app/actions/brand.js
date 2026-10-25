"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE BRAND
export async function createBrandAction(formData) {
  try {
    const auth = await requirePermission("org:brand_create");
    if (!auth.authorized) return { error: auth.error };

    const category = formData.get("category")?.trim();
    const name = formData.get("name")?.trim();
    const remarks = formData.get("remarks")?.trim() || null;

    if (!category || !name) {
      return { error: "Category and Brand Name are required." };
    }

    const existing = await prisma.brand.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        category: { equals: category, mode: "insensitive" },
      },
    });

    if (existing) {
      return { error: `Brand "${name}" already exists in "${category}".` };
    }

    await prisma.brand.create({
      data: {
        name,
        category,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/brands");
    return { success: true };
  } catch (err) {
    console.error("Create brand error:", err);
    return { error: err?.message || "Failed to create brand." };
  }
}

// 2. UPDATE BRAND
export async function updateBrandAction(id, formData) {
  try {
    const auth = await requirePermission("org:brand_edit");
    if (!auth.authorized) return { error: auth.error };

    const category = formData.get("category")?.trim();
    const name = formData.get("name")?.trim();
    const remarks = formData.get("remarks")?.trim() || null;

    if (!category || !name) {
      return { error: "Category and Brand Name are required." };
    }

    await prisma.brand.update({
      where: { id },
      data: {
        name,
        category,
        remarks,
      },
    });

    revalidatePath("/master-data/brands");
    return { success: true };
  } catch (err) {
    console.error("Update brand error:", err);
    return { error: err?.message || "Failed to update brand." };
  }
}

// 3. DELETE BRAND
export async function deleteBrandAction(id) {
  try {
    const auth = await requirePermission("org:brand_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.brand.delete({
      where: { id },
    });

    revalidatePath("/master-data/brands");
    return { success: true };
  } catch (err) {
    console.error("Delete brand error:", err);
    return { error: err?.message || "Failed to delete brand." };
  }
}