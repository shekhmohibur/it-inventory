import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { SidebarProvider } from "@/context/SidebarContext";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default async function DashboardLayout({ children }) {
  const session = await getSession();

  // Query database so uploaded avatar updates appear across the entire dashboard
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
      console.error(e);
    }
  }

  const currentUser = {
    fullName: dbUser?.fullName || session?.fullName || "User",
    email: dbUser?.email || session?.email || "",
    role: dbUser?.role ? `${dbUser.role} (IT)` : "TRAINEE (IT)",
    image: dbUser?.image || null, // <--- Add this line
    initials: (dbUser?.fullName || session?.fullName || "IT")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-800">
        <Sidebar user={currentUser} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
          <Topbar user={currentUser} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}