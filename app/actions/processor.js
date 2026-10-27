"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE PROCESSOR
export async function createProcessorAction(formData) {
  try {
    const auth = await requirePermission("hardware:processor_create");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const brand = formData.get("brand")?.trim();
    const series = formData.get("series")?.trim() || null;
    const generation = formData.get("generation")?.trim() || null;
    const baseSpeed = formData.get("baseSpeed")?.trim() || null;
    const coresThreads = formData.get("coresThreads")?.trim() || null;
    const remarks = formData.get("remarks")?.trim() || null;

    if (!name || !brand) {
      return { error: "Processor Name and Brand are required." };
    }

    const existing = await prisma.processor.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        brand: { equals: brand, mode: "insensitive" },
      },
    });

    if (existing) {
      return { error: `Processor "${name}" already exists under ${brand}.` };
    }

    await prisma.processor.create({
      data: {
        name,
        brand,
        series,
        generation,
        baseSpeed,
        coresThreads,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/processors");
    return { success: true };
  } catch (err) {
    console.error("Create processor error:", err);
    return { error: err?.message || "Failed to create processor specification." };
  }
}

// 2. UPDATE PROCESSOR
export async function updateProcessorAction(id, formData) {
  try {
    const auth = await requirePermission("hardware:processor_edit");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const brand = formData.get("brand")?.trim();
    const series = formData.get("series")?.trim() || null;
    const generation = formData.get("generation")?.trim() || null;
    const baseSpeed = formData.get("baseSpeed")?.trim() || null;
    const coresThreads = formData.get("coresThreads")?.trim() || null;
    const remarks = formData.get("remarks")?.trim() || null;

    if (!name || !brand) {
      return { error: "Processor Name and Brand are required." };
    }

    await prisma.processor.update({
      where: { id },
      data: {
        name,
        brand,
        series,
        generation,
        baseSpeed,
        coresThreads,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/processors");
    return { success: true };
  } catch (err) {
    console.error("Update processor error:", err);
    return { error: err?.message || "Failed to update processor specification." };
  }
}

// 3. DELETE PROCESSOR
export async function deleteProcessorAction(id) {
  try {
    const auth = await requirePermission("hardware:processor_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.processor.delete({
      where: { id },
    });

    revalidatePath("/hardware-specs/processors");
    return { success: true };
  } catch (err) {
    console.error("Delete processor error:", err);
    return { error: err?.message || "Failed to delete processor specification." };
  }
}