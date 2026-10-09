"use server";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function changePasswordAction(formData) {
  try {
    const session = await getSession();
    if (!session?.id) {
      return { error: "Unauthorized session. Please log in again." };
    }

    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { error: "Please fill in all password fields." };
    }

    if (newPassword !== confirmPassword) {
      return { error: "New password and confirmation do not match." };
    }

    if (newPassword.length < 6) {
      return { error: "New password must be at least 6 characters long." };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
    });

    if (!user) {
      return { error: "User account not found." };
    }

    // Verify current password
    const isCurrentValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentValid) {
      return { error: "Current password is incorrect." };
    }

    // Hash and store new password
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: session.id },
      data: { passwordHash: newHashedPassword },
    });

    return { success: true };
  } catch (err) {
    console.error("Change password error:", err);
    return { error: "Failed to update password. Please try again." };
  }
}