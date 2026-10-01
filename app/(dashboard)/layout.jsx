import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { SidebarProvider } from "@/context/SidebarContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "KKL Inventory",
  description: "IT Asset Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="m-0 p-0 antialiased font-sans">
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-800">
            {/* Responsive Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
              <Topbar />
              <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}