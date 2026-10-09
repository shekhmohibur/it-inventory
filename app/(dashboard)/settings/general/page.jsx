import React from "react";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { GeneralSettingsForm } from "@/components/GeneralSettingsForm";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Account Preferences | KKL Inventory",
};

export default async function GeneralSettingsPage() {
  const session = await getSession();

  let user = null;
  if (session?.id || session?.email) {
    try {
      user = await prisma.user.findFirst({
        where: {
          OR: [
            ...(session.id ? [{ id: session.id }] : []),
            ...(session.email ? [{ email: session.email }] : []),
          ],
        },
      });
    } catch (e) {
      console.error("Failed to load user for general settings:", e);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Account Preferences
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage system notification triggers, password security, and regional workspace options.
        </p>
      </div>

      <GeneralSettingsForm user={user || session} />
    </div>
  );
}