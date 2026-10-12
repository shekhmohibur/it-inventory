"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";
import fs from "fs/promises";
import path from "path";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

async function saveCompanyLogo(file) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return null;
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads", "companies");
  await fs.mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name) || ".png";
  const filename = `company-${Date.now()}${ext}`;
  await fs.writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/companies/${filename}`;
}

// 1. CREATE COMPANY
export async function createCompanyAction(formData) {
  try {
    const auth = await requirePermission("org:company_create");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const shortName = formData.get("shortName")?.trim() || null;
    const address = formData.get("address")?.trim() || null;
    const logoFile = formData.get("logo");

    if (!name) {
      return { error: "Company Name is required." };
    }

    const existing = await prisma.company.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });

    if (existing) {
      return { error: "A company with this name already exists." };
    }

    const logoUrl = await saveCompanyLogo(logoFile);

    await prisma.company.create({
      data: {
        name,
        shortName,
        address,
        logo: logoUrl,
      },
    });

    revalidatePath("/master-data/company");
    return { success: true };
  } catch (err) {
    console.error("Create company error:", err);
    return { error: err?.message || "Failed to create company." };
  }
}

// 2. UPDATE COMPANY
export async function updateCompanyAction(id, formData) {
  try {
    const auth = await requirePermission("org:company_edit");
    if (!auth.authorized) return { error: auth.error };

    const name = formData.get("name")?.trim();
    const shortName = formData.get("shortName")?.trim() || null;
    const address = formData.get("address")?.trim() || null;
    const logoFile = formData.get("logo");

    if (!name) {
      return { error: "Company Name is required." };
    }

    const logoUrl = await saveCompanyLogo(logoFile);

    await prisma.company.update({
      where: { id },
      data: {
        name,
        shortName,
        address,
        ...(logoUrl && { logo: logoUrl }),
      },
    });

    revalidatePath("/master-data/company");
    return { success: true };
  } catch (err) {
    console.error("Update company error:", err);
    return { error: err?.message || "Failed to update company." };
  }
}

// 3. DELETE COMPANY
export async function deleteCompanyAction(id) {
  try {
    const auth = await requirePermission("org:company_delete");
    if (!auth.authorized) return { error: auth.error };

    await prisma.company.delete({
      where: { id },
    });

    revalidatePath("/master-data/company");
    return { success: true };
  } catch (err) {
    console.error("Delete company error:", err);
    return { error: err?.message || "Failed to delete company." };
  }
}