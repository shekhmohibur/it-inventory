"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function updateLicenseAction(formData) {
  try {
    const auth = await requirePermission("settings:edit");
    if (!auth.authorized) {
      return { error: auth.error };
    }

    const licenseName = formData.get("licenseName")?.trim() || null;
    const noticeDateRaw = formData.get("noticeDate");
    const expirationDateRaw = formData.get("expirationDate");
    const enforceRestrictions = formData.get("enforceRestrictions") === "on";

    const noticeDate = noticeDateRaw ? new Date(noticeDateRaw) : null;
    const expirationDate = expirationDateRaw ? new Date(expirationDateRaw) : null;

    await prisma.systemLicense.upsert({
      where: { id: "default-license" },
      update: {
        licenseName,
        noticeDate,
        expirationDate,
        enforceRestrictions,
      },
      create: {
        id: "default-license",
        licenseName: licenseName || "Enterprise Workspace License",
        planType: "MONTHLY CLOUD SUBSCRIPTION",
        noticeDate,
        expirationDate,
        enforceRestrictions,
      },
    });

    revalidatePath("/settings/license");
    return { success: true };
  } catch (err) {
    console.error("License update error:", err);
    return { error: err?.message || "Failed to update license configuration." };
  }
}