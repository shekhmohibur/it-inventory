"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";
import { logChange } from "@/lib/auditLogger";
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. CREATE PSU SPEC
export async function createPsuAction(formData) {
  try {
    const auth = await requirePermission("hardware:psu_create");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const wattage = formData.get("wattage")?.trim();
    const remarks = formData.get("remarks")?.trim() || null;
    const newPsu = await prisma.psuSpec.create({
  data: { name, wattage, remarks },
});

await logChange({
  entityType: "PSU",
  entityId: newPsu.id,
  action: "CREATE",
  details: `Created PSU: ${name} (${wattage})`,
});

    if (!name || !wattage) {
      return { error: "Name and Wattage are required." };
    }

    const existing = await prisma.psuSpec.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        wattage: { equals: wattage, mode: "insensitive" },
      },
    });

    if (existing) {
      return { error: `PSU "${name} (${wattage})" already exists.` };
    }

    await prisma.psuSpec.create({
      data: {
        name,
        wattage,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/psu");
    return { success: true };
  } catch (err) {
    console.error("Create PSU error:", err);
    return { error: err?.message || "Failed to create PSU specification." };
  }
}

// 2. UPDATE PSU SPEC
export async function updatePsuAction(id, formData) {
  try {
    const auth = await requirePermission("hardware:psu_edit");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const wattage = formData.get("wattage")?.trim();
    const remarks = formData.get("remarks")?.trim() || null;
    await prisma.psuSpec.update({
  where: { id },
  data: { name, wattage, remarks },
});

await logChange({
  entityType: "PSU",
  entityId: id,
  action: "UPDATE",
  details: `Updated PSU: ${name} (${wattage})`,
});

    if (!name || !wattage) {
      return { error: "Name and Wattage are required." };
    }

    await prisma.psuSpec.update({
      where: { id },
      data: {
        name,
        wattage,
        remarks,
      },
    });

    revalidatePath("/hardware-specs/psu");
    return { success: true };
  } catch (err) {
    console.error("Update PSU error:", err);
    return { error: err?.message || "Failed to update PSU specification." };
  }
}

// 3. DELETE PSU SPEC
export async function deletePsuAction(id) {
  try {
    const auth = await requirePermission("hardware:psu_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.psuSpec.delete({
      where: { id },
    });
    await prisma.psuSpec.delete({ where: { id } });

await logChange({
  entityType: "PSU",
  entityId: id,
  action: "DELETE",
  details: `Deleted PSU ID: ${id}`,
});

    revalidatePath("/hardware-specs/psu");
    return { success: true };
  } catch (err) {
    console.error("Delete PSU error:", err);
    return { error: err?.message || "Failed to delete PSU specification." };
  }
}