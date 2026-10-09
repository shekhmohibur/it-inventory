"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

async function saveFile(file, prefix) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return null;
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads", "branding");
  await fs.mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name) || ".png";
  const filename = `${prefix}-${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, filename);

  await fs.writeFile(filePath, buffer);
  return `/uploads/branding/${filename}`;
}

export async function saveOrganizationAction(formData) {
  try {
    const session = await getSession();
    if (!session?.id) {
      return { error: "Unauthorized session." };
    }

    // Media uploads
    const mainLogoFile = formData.get("mainLogo");
    const faviconFile = formData.get("favicon");
    const ogImageFile = formData.get("ogImage");
    const signatureFile = formData.get("officialSignature");

    const mainLogoUrl = await saveFile(mainLogoFile, "logo");
    const faviconUrl = await saveFile(faviconFile, "favicon");
    const ogImageUrl = await saveFile(ogImageFile, "og");
    const signatureUrl = await saveFile(signatureFile, "signature");

    const data = {
      businessName: formData.get("businessName")?.trim() || null,
      shortName: formData.get("shortName")?.trim() || null,
      emailAddress: formData.get("emailAddress")?.trim() || null,
      phoneNumber: formData.get("phoneNumber")?.trim() || null,
      physicalAddress: formData.get("physicalAddress")?.trim() || null,
      workingHours: formData.get("workingHours")?.trim() || null,
      footerDescription: formData.get("footerDescription")?.trim() || null,
      systemTimezone: formData.get("systemTimezone")?.trim() || null,

      globalMetaTitle: formData.get("globalMetaTitle")?.trim() || null,
      metaKeywords: formData.get("metaKeywords")?.trim() || null,
      metaDescription: formData.get("metaDescription")?.trim() || null,
      robotsTxt: formData.get("robotsTxt")?.trim() || null,

      facebookUrl: formData.get("facebookUrl")?.trim() || null,
      instagramUrl: formData.get("instagramUrl")?.trim() || null,
      twitterUrl: formData.get("twitterUrl")?.trim() || null,
      youtubeUrl: formData.get("youtubeUrl")?.trim() || null,

      primaryColor: formData.get("primaryColor")?.trim() || null,
      secondaryColor: formData.get("secondaryColor")?.trim() || null,
      accentColor: formData.get("accentColor")?.trim() || null,

      ga4Id: formData.get("ga4Id")?.trim() || null,
      fbPixelId: formData.get("fbPixelId")?.trim() || null,

      ...(mainLogoUrl && { mainLogo: mainLogoUrl }),
      ...(faviconUrl && { favicon: faviconUrl }),
      ...(ogImageUrl && { ogImage: ogImageUrl }),
      ...(signatureUrl && { officialSignature: signatureUrl }),
    };

    await prisma.organization.upsert({
      where: { id: "default-org" },
      update: data,
      create: { id: "default-org", ...data },
    });

    revalidatePath("/settings/organization");
    return { success: true };
  } catch (err) {
    console.error("Save organization error:", err);
    return { error: err?.message || "Failed to update organization details." };
  }
}