import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function getLicenseStatus() {
  let license = null;
  try {
    if (prisma?.systemLicense) {
      license = await prisma.systemLicense.findFirst({
        where: { id: "default-license" },
      });
    }
  } catch (error) {
    console.error("Failed to read license status:", error);
  }

  if (!license || !license.noticeDate || !license.expirationDate) {
    return {
      showBadge: false,
      status: "notfound",
      daysLeft: 0,
      expirationDate: "notfound",
      licenseName: "notfound",
    };
  }

  const now = new Date();
  const noticeDate = new Date(license.noticeDate);
  const expirationDate = new Date(license.expirationDate);

  // Check if current date has reached or passed notice date
  const hasReachedNotice = now >= noticeDate;
  const isExpired = now > expirationDate;

  // Calculate days remaining until expiration
  const diffTime = expirationDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    showBadge: hasReachedNotice,
    isExpired,
    status: isExpired ? "expired" : hasReachedNotice ? "expiring_soon" : "active",
    daysLeft: daysLeft > 0 ? daysLeft : 0,
    expirationDate: license.expirationDate.toISOString(),
    licenseName: license.licenseName || "notfound",
    enforceRestrictions: license.enforceRestrictions ?? true,
  };
}