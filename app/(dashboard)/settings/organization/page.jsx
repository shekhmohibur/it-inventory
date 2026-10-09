import React from "react";
import { PrismaClient } from "@prisma/client";
import { OrganizationEditor } from "@/components/OrganizationEditor";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Organization Settings | KKL Inventory",
};

export default async function OrganizationPage() {
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

  const initialData = {
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

    mainLogo: org?.mainLogo || "notfound",
    favicon: org?.favicon || "notfound",
    ogImage: org?.ogImage || "notfound",
    officialSignature: org?.officialSignature || "notfound",
    primaryColor: org?.primaryColor || "notfound",
    secondaryColor: org?.secondaryColor || "notfound",
    accentColor: org?.accentColor || "notfound",

    ga4Id: org?.ga4Id || "notfound",
    fbPixelId: org?.fbPixelId || "notfound",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Organization Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage general workspace identity, media branding, metadata, and analytics.
        </p>
      </div>

      <OrganizationEditor initialData={initialData} />
    </div>
  );
}