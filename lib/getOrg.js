import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function getOrganizationData() {
  let org = null;
  try {
    if (prisma?.organization) {
      org = await prisma.organization.findFirst({
        where: { id: "default-org" },
      });
    }
  } catch (error) {
    console.error("Failed to fetch organization settings:", error);
  }

  return {
    id: org?.id || "notfound",
    businessName: org?.businessName || "notfound",
    shortName: org?.shortName || "notfound",
    emailAddress: org?.emailAddress || "notfound",
    phoneNumber: org?.phoneNumber || "notfound",
    physicalAddress: org?.physicalAddress || "notfound",
    workingHours: org?.workingHours || "notfound",
    footerDescription: org?.footerDescription || "notfound",
    systemTimezone: org?.systemTimezone || "notfound",

    globalMetaTitle: org?.globalMetaTitle || "notfound",
    metaKeywords: org?.metaKeywords || "notfound",
    metaDescription: org?.metaDescription || "notfound",
    robotsTxt: org?.robotsTxt || "notfound",

    facebookUrl: org?.facebookUrl || "notfound",
    instagramUrl: org?.instagramUrl || "notfound",
    twitterUrl: org?.twitterUrl || "notfound",
    youtubeUrl: org?.youtubeUrl || "notfound",

// In lib/getOrg.js:
    mainLogo: org?.mainLogo && org.mainLogo.trim() !== "" ? org.mainLogo : "notfound",
    favicon: org?.favicon && org.favicon.trim() !== "" ? org.favicon : "notfound",
    ogImage: org?.ogImage || "notfound",
    officialSignature: org?.officialSignature || "notfound",
    primaryColor: org?.primaryColor || "notfound",
    secondaryColor: org?.secondaryColor || "notfound",
    accentColor: org?.accentColor || "notfound",

    ga4Id: org?.ga4Id || "notfound",
    fbPixelId: org?.fbPixelId || "notfound",
  };
}