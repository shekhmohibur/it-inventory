"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 1. SAVE / UPDATE ROLE WITH FULL PERMISSIONS ARRAY
export async function saveRoleFullPermissionsAction({
  roleId,
  roleName,
  description,
  isActive,
  permissions,
}) {
  try {
    const session = await getSession();
    if (!session?.id) {
      return { error: "Unauthorized session. Please log in again." };
    }

    if (!roleName || roleName.trim() === "") {
      return { error: "Role name cannot be empty." };
    }

    const trimmedName = roleName.trim();
    const cleanDesc = description && description.trim() !== "" ? description.trim() : null;

    if (roleId && roleId !== "new" && roleId !== "notfound") {
      await prisma.rolePermission.update({
        where: { id: roleId },
        data: {
          roleName: trimmedName,
          description: cleanDesc,
          isActive: Boolean(isActive),
          permissions: Array.isArray(permissions) ? permissions : [],
        },
      });
    } else {
      await prisma.rolePermission.upsert({
        where: { roleName: trimmedName },
        update: {
          description: cleanDesc,
          isActive: Boolean(isActive),
          permissions: Array.isArray(permissions) ? permissions : [],
        },
        create: {
          roleName: trimmedName,
          description: cleanDesc,
          isActive: Boolean(isActive),
          permissions: Array.isArray(permissions) ? permissions : [],
        },
      });
    }

    revalidatePath("/settings/user-roles");
    return { success: true };
  } catch (err) {
    console.error("Save role error:", err);
    return { error: err?.message || "Failed to update role permissions." };
  }
}

// 2. CREATE NEW ROLE FROM MODAL
export async function createQuickRoleAction(formData) {
  try {
    const session = await getSession();
    if (!session?.id) {
      return { error: "Unauthorized session." };
    }

    const roleName = formData.get("roleName")?.trim().toUpperCase();
    const description = formData.get("description")?.trim() || null;

    if (!roleName) {
      return { error: "Role name is required." };
    }

    const existing = await prisma.rolePermission.findUnique({
      where: { roleName },
    });

    if (existing) {
      return { error: "A role with this name already exists." };
    }

    const newRole = await prisma.rolePermission.create({
      data: {
        roleName,
        description,
        isSystem: false,
        isActive: true,
        permissions: ["dashboard:view"],
      },
    });

    revalidatePath("/settings/user-roles");
    return { success: true, roleId: newRole.id };
  } catch (err) {
    console.error("Create role error:", err);
    return { error: err?.message || "Failed to create new role." };
  }
}

// 3. DELETE ROLE
export async function deleteRoleAction(roleId) {
  try {
    const session = await getSession();
    if (!session?.id) {
      return { error: "Unauthorized session." };
    }

    const role = await prisma.rolePermission.findUnique({
      where: { id: roleId },
    });

    if (role?.isSystem) {
      return { error: "System-defined roles cannot be deleted." };
    }

    await prisma.rolePermission.delete({
      where: { id: roleId },
    });

    revalidatePath("/settings/user-roles");
    return { success: true };
  } catch (err) {
    console.error("Delete role error:", err);
    return { error: err?.message || "Failed to delete role." };
  }
}