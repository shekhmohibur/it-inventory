import { getSession } from "@/lib/auth";
import { getOrganizationData } from "@/lib/getOrg";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { SidebarProvider } from "@/context/SidebarContext";
import { getLicenseStatus } from "@/lib/getLicense";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  // 1. Fetch user session
  const session = await getSession();
  const licenseInfo = await getLicenseStatus();
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
    } catch (e) {
      console.error("Failed to query user in layout:", e);
    }
  }

  const currentUser = {
    fullName: dbUser?.fullName || session?.fullName || "notfound",
    email: dbUser?.email || session?.email || "notfound",
    role: dbUser?.role || session?.role || "TRAINEE",
    image: dbUser?.image || null,
    initials: (dbUser?.fullName || session?.fullName || "IT")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
  };

  // 2. Fetch Organization Data
  const org = await getOrganizationData();

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-800">
        {/* Pass both user and org */}
        <Sidebar user={currentUser} org={org} />

        <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
          <Topbar user={currentUser} org={org} licenseInfo={licenseInfo}/>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}