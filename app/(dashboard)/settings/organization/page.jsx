import React from "react";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { OrganizationEditor } from "@/components/OrganizationEditor";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Organization Settings | KKL Inventory",
};

export default async function OrganizationPage() {
  const session = await getSession();

  // Fetch or fallback company record
  let company = await prisma.company.findFirst();
  if (!company) {
    company = {
      id: "default-company",
      name: "KAIZER KNITWEARS LTD.",
      code: "KKL",
      address: "Plot #14, Sector 7, Export Processing Zone, Gazipur, Bangladesh",
      contactEmail: "it.admin@kaizerknit.com",
      contactPhone: "+880 2-9832101",
    };
  }

  // Fetch company departments
  const departments = await prisma.department.findMany({
    where: { companyId: company.id },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Organization Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure corporate entity records, factory branches, and operational departments.
        </p>
      </div>

      <OrganizationEditor
        company={company}
        departments={departments}
        userRole={session?.role || "TRAINEE"}
      />
    </div>
  );
}