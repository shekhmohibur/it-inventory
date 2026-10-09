"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function updateProfileAction(formData) {
  try {
    const session = await getSession();
    if (!session?.id) {
      return { error: "Unauthorized session. Please log in again." };
    }

    if (!formData || typeof formData.get !== "function") {
      return { error: "Invalid form submission." };
    }

    const fullName = formData.get("fullName")?.trim();
    const phone = formData.get("phone")?.trim();
    const imageFile = formData.get("avatar");

    let imageUrl = undefined;

    if (imageFile && typeof imageFile.arrayBuffer === "function" && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
      await fs.mkdir(uploadDir, { recursive: true });

      const fileExtension = path.extname(imageFile.name) || ".jpg";
      const fileName = `${session.id}-${Date.now()}${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, buffer);
      imageUrl = `/uploads/avatars/${fileName}`;
    }

    const updatePayload = {
      ...(fullName && { fullName }),
      ...(phone !== undefined && { phone }),
      ...(imageUrl && { image: imageUrl }),
    };

    const updatedUser = await prisma.user.update({
      where: { id: session.id },
      data: updatePayload,
    });

    revalidatePath("/settings/profile");
    revalidatePath("/", "layout");

    return { success: true, imageUrl: updatedUser.image };
  } catch (err) {
    console.error("Profile update error:", err);
    return { error: err?.message || "Failed to update profile." };
  }
}