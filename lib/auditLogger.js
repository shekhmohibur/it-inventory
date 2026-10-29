import { PrismaClient } from "@prisma/client";
import { requirePermission } from "@/lib/authGuard";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function logChange({ entityType, entityId, action, details = null, fallbackUser = "System User" }) {
  try {
    // Check permission helper which resolves the current session / auth context
    const auth = await requirePermission();
    const user = auth?.user || auth?.session?.user;
    
    const userName =
      user?.fullName ||
      user?.username ||
      user?.email ||
      fallbackUser;

    await prisma.auditLog.create({
      data: {
        entityType,
        entityId: String(entityId),
        action,
        fullName: user?.fullName || null,
        details,
      },
    });
  } catch (err) {
    console.error("Failed to write audit log:", err);
  }
}