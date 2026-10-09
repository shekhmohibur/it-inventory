import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

/**
 * Checks whether the current session user has a specific permission key.
 * If user role is "Owner" or has the exact key, returns true.
 */
export async function hasPermission(requiredKey) {
  try {
    const session = await getSession();
    if (!session?.id) return false;

    // Fetch user to get their actual role
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { role: true },
    });

    const userRole = user?.role || session.role || "notfound";
    if (userRole === "notfound") return false;

    // "Owner" always bypasses all checks
    if (userRole.toUpperCase() === "OWNER") return true;

    // Fetch the role's assigned permissions array
    const roleRecord = await prisma.rolePermission.findFirst({
      where: {
        roleName: {
          equals: userRole,
          mode: "insensitive",
        },
      },
      select: { permissions: true, isActive: true },
    });

    if (!roleRecord || !roleRecord.isActive) return false;

    const permissions = Array.isArray(roleRecord.permissions)
      ? roleRecord.permissions
      : [];

    return permissions.includes(requiredKey);
  } catch (error) {
    console.error("Permission verification error:", error);
    return false;
  }
}

/**
 * Throws or returns an error if permission check fails.
 */
export async function requirePermission(requiredKey) {
  const allowed = await hasPermission(requiredKey);
  if (!allowed) {
    return {
      authorized: false,
      error: `Access Denied: You do not have the required permission (${requiredKey}).`,
    };
  }
  return { authorized: true };
}