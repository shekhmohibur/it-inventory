"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

function cleanPhoneNumber(phone) {
  if (!phone) return "notfound";
  return phone.replace(/[\s\-\(\)]/g, "");
}

// 1. UPDATE USER STATUS (Requires status:edit)
export async function updateUserStatusAction(userId, status) {
  try {
    const auth = await requirePermission("status:edit");
    if (!auth.authorized) return { error: auth.error };

    await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    revalidatePath("/settings/users");
    return { success: true };
  } catch (err) {
    console.error("Update status error:", err);
    return { error: err?.message || "Failed to update user status." };
  }
}

// 2. UPDATE USER ROLE (Requires roles:edit)
export async function updateUserRoleAction(userId, role) {
  try {
    const auth = await requirePermission("roles:edit");
    if (!auth.authorized) return { error: auth.error };

    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/settings/users");
    return { success: true };
  } catch (err) {
    console.error("Update role error:", err);
    return { error: err?.message || "Failed to update user role." };
  }
}

// 3. DELETE USER (Requires users:delete)
export async function deleteUserAction(userId) {
  try {
    const auth = await requirePermission("users:delete");
    if (!auth.authorized) return { error: auth.error };

    const session = await getSession();
    if (session?.id === userId) {
      return { error: "You cannot delete your own account." };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/settings/users");
    return { success: true };
  } catch (err) {
    console.error("Delete user error:", err);
    return { error: err?.message || "Failed to delete user." };
  }
}

// 4. CREATE USER (Requires users:create)
export async function createUserAction(formData) {
  try {
    const auth = await requirePermission("users:create");
    if (!auth.authorized) return { error: auth.error };

    const cardNumber = formData.get("cardNumber")?.trim() || null;
    const fullName = formData.get("fullName")?.trim() || null;
    const email = formData.get("email")?.trim().toLowerCase() || null;
    const rawPhone = formData.get("phone")?.trim() || null;
    const phone = rawPhone ? cleanPhoneNumber(rawPhone) : null;
    const department = formData.get("department")?.trim() || null;
    const designation = formData.get("designation")?.trim() || null;
    const role = formData.get("role")?.trim() || "TRAINEE";
    const password = formData.get("password");

    if (!cardNumber || !fullName || !email || !password) {
      return { error: "Card number, full name, email, and password are required." };
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ cardNumber }, { email }],
      },
    });

    if (existing) {
      if (existing.cardNumber === cardNumber) {
        return { error: "A user with this Card Number already exists." };
      }
      return { error: "A user with this email already exists." };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        cardNumber,
        fullName,
        email,
        phone,
        department,
        designation,
        passwordHash,
        role,
        status: "APPROVED",
      },
    });

    revalidatePath("/settings/users");
    return { success: true };
  } catch (err) {
    console.error("Create user error:", err);
    return { error: err?.message || "Failed to create user." };
  }
}