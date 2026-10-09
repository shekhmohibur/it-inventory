import React from "react";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { ProfileEditor } from "@/components/ProfileEditor";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Profile Details | KKL Inventory",
};

export default async function ProfilePage() {
  const session = await getSession();

  let dbUser = null;
  if (session?.id || session?.email) {
    try {
      dbUser = await prisma.user.findFirst({
        where: {
          OR: [
            ...(session.id ? [{ id: session.id }] : []),
            ...(session.email ? [{ email: session.email }] : []),
          ],
        },
      });
    } catch (error) {
      console.error("Database fetch error:", error);
    }
  }

  const user = {
    id: dbUser?.id || session?.id || "",
    cardNumber: dbUser?.cardNumber || "N/A",
    fullName: dbUser?.fullName || session?.fullName || "",
    email: dbUser?.email || session?.email || "",
    phone: dbUser?.phone || "",
    department: dbUser?.department || "General",
    designation: dbUser?.designation || "TRAINEE",
    role: dbUser?.role || session?.role || "TRAINEE",
    status: dbUser?.status || session?.status || "APPROVED",
    image: dbUser?.image || null,
    createdAt: dbUser?.createdAt ? new Date(dbUser.createdAt).toISOString() : null,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Profile Details
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal information, department designation, and security settings.
        </p>
      </div>

      <ProfileEditor initialUser={user} />
    </div>
  );
}