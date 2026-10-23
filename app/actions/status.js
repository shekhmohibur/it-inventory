"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE STATUS
export async function createStatusAction(formData) {
  try {
    const auth = await requirePermission("org:status_create");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const description = formData.get("description")?.trim() || null;
    const color = formData.get("color")?.trim() || "#0010F5";
    const visibility = formData.get("visibility")?.trim() || "Active";

    if (!name) {
      return { error: "Status Name is required." };
    }

    const existing = await prisma.deviceStatus.findUnique({
      where: { name },
    });
    if (existing) {
      return { error: `Status "${name}" already exists.` };
    }

    await prisma.deviceStatus.create({
      data: {
        name,
        description,
        color,
        visibility,
      },
    });

    revalidatePath("/master-data/status");
    return { success: true };
  } catch (err) {
    console.error("Create status error:", err);
    return { error: err?.message || "Failed to create status." };
  }
}

// 2. UPDATE STATUS
export async function updateStatusAction(id, formData) {
  try {
    const auth = await requirePermission("org:status_edit");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const description = formData.get("description")?.trim() || null;
    const color = formData.get("color")?.trim() || "#0010F5";
    const visibility = formData.get("visibility")?.trim() || "Active";

    if (!name) {
      return { error: "Status Name is required." };
    }

    await prisma.deviceStatus.update({
      where: { id },
      data: {
        name,
        description,
        color,
        visibility,
      },
    });

    revalidatePath("/master-data/status");
    return { success: true };
  } catch (err) {
    console.error("Update status error:", err);
    return { error: err?.message || "Failed to update status." };
  }
}

// 3. DELETE STATUS
export async function deleteStatusAction(id) {
  try {
    const auth = await requirePermission("org:status_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.deviceStatus.delete({
      where: { id },
    });

    revalidatePath("/master-data/status");
    return { success: true };
  } catch (err) {
    console.error("Delete status error:", err);
    return { error: err?.message || "Failed to delete status." };
  }
}