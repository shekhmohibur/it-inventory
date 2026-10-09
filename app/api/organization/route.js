import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function GET() {
  try {
    const org = await prisma.organization.findFirst({
      where: { id: "default-org" },
    });

    return NextResponse.json({
      businessName: org?.businessName || "notfound",
      shortName: org?.shortName || "notfound",
    });
  } catch {
    return NextResponse.json({
      businessName: "notfound",
      shortName: "notfound",
    });
  }
}