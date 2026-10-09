"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Users,
  Cpu,
  Mail,
  Boxes,
  ChevronDown,
  LogOut,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";

const NAV_ITEMS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    subItems: [
      { title: "General", href: "/settings/general" },
      { title: "Organization", href: "/settings/organization" },
      { title: "Users", href: "/settings/users" },
      { title: "User-roles", href: "/settings/user-roles" },
    ],
  },
  {
    title: "Master Data",
    icon: Users,
    href: "/master-data",
    subItems: [
      { title: "Companies", href: "/master-data/companies" },
      { title: "Departments", href: "/master-data/departments" },
    ],
  },
  {
    title: "Hardware Specs",
    icon: Cpu,
    href: "/hardware-specs",
    subItems: [
      { title: "Processors", href: "/hardware-specs/cpu" },
      { title: "RAM & Storage", href: "/hardware-specs/memory" },
    ],
  },
  {
    title: "Mail Inventory",
    icon: Mail,
    href: "/mail-inventory",
  },
  {
    title: "IT Inventory",
    icon: Boxes,
    href: "/inventory",
    subItems: [
      { title: "All Assets", href: "/inventory/all" },
      { title: "Scrapped Items", href: "/inventory/scrapped" },
    ],
  },
];

export function Sidebar({ user, org }) {
  
  const pathname = usePathname();
  const {
    isDesktopCollapsed,
    setIsDesktopCollapsed,
    isMobileOpen,
    closeMobileSidebar,
  } = useSidebar();
  const shortName = org?.shortName !== "notfound" ? org?.shortName : "notfound";
  const businessName = org?.businessName !== "notfound" ? org?.businessName : "notfound";
  const logo = org?.mainLogo !== "notfound" ? org?.mainLogo : "notfound";
  const [openMenus, setOpenMenus] = useState({});
  const displayRole = user?.role || "TRAINEE (IT)";
  const handleParentClick = (title) => {
    // If collapsed, expand the entire sidebar first and open this specific dropdown
    if (isDesktopCollapsed) {
      setIsDesktopCollapsed(false);
      setOpenMenus((prev) => ({ ...prev, [title]: true }));
      return;
    }

    // Normal accordion toggle when already expanded
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={cn(
          "bg-[#161338] text-slate-300 flex flex-col h-screen select-none border-r border-[#221e4a] shrink-0 z-50 transition-all duration-300 ease-in-out font-sans",
          // Mobile drawer positioning
          "fixed top-0 bottom-0 left-0 lg:static",
          isMobileOpen
            ? "translate-x-0 shadow-2xl"
            : "-translate-x-full lg:translate-x-0",
          // Desktop width
          isDesktopCollapsed ? "lg:w-17" : "lg:w-60",
          "w-60"
        )}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-gray-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 overflow-hidden ">
          // ❌ Problematic check (passes on empty string ""):
{logo !== "notfound" ? (
  <Image src={logo} alt={shortName} width={36} height={36} className="p-0.5" unoptimized />
) : (
  <Layers className="w-5  h-5 text-indigo-400" />
)}

// ✅ Robust check:
{Boolean(logo) && logo !== "notfound" && logo.trim() !== "" ? (
  <Image
    src={logo}
    alt={shortName !== "notfound" ? shortName : "Logo"}
    width={36}
    height={36}
    className="object-contain"
    unoptimized
  />
) : (
  <Layers className="w-5 h-5 text-indigo-400" />
)}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-sm text-white tracking-tight truncate">
            {shortName}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            {businessName}
          </div>
        </div>
      </div>

        {/* Navigation List */}
        <nav className="flex-1 px-2.5 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const hasChildren = item.subItems && item.subItems.length > 0;
            const isChildActive =
              hasChildren &&
              item.subItems.some((sub) => pathname === sub.href);
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href)) ||
              isChildActive;
            const isOpen = openMenus[item.title];

            /* ========================================================
               1. PARENT ITEM (WITH SUB-ITEMS)
               ======================================================== */
            if (hasChildren) {
              return (
                <div key={item.title}>
                  <button
                    type="button"
                    title={isDesktopCollapsed ? item.title : undefined}
                    onClick={() => handleParentClick(item.title)}
                    className={cn(
                      "w-full flex items-center rounded-lg text-xs font-medium transition-colors outline-none cursor-pointer",
                      isDesktopCollapsed
                        ? "lg:justify-center lg:w-10 lg:h-10 lg:p-0 mx-auto px-3 py-2 justify-between"
                        : "justify-between px-3 py-2",
                      isActive
                        ? "bg-[#332b6e] text-white"
                        : "text-slate-300 hover:text-white hover:bg-white/5",
                      isOpen && !isDesktopCollapsed && "text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "w-4 h-4 shrink-0",
                          isActive ? "text-amber-400" : "text-slate-400"
                        )}
                      />
                      <span
                        className={cn(
                          "whitespace-nowrap transition-all duration-200",
                          isDesktopCollapsed ? "lg:hidden" : "inline"
                        )}
                      >
                        {item.title}
                      </span>
                    </div>

                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 text-slate-400 transition-transform duration-200",
                        isOpen && "rotate-180 text-white",
                        isDesktopCollapsed ? "lg:hidden" : "block"
                      )}
                    />
                  </button>

                  {/* Submenu (rendered when expanded and active) */}
                  {isOpen && !isDesktopCollapsed && (
                    <div className="pl-9 pr-1 py-1 space-y-0.5 animate-in fade-in duration-200">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={closeMobileSidebar}
                          className={cn(
                            "block py-1.5 px-2 rounded-md text-xs transition-colors",
                            pathname === sub.href
                              ? "text-indigo-400 font-semibold"
                              : "text-slate-400 hover:text-white"
                          )}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* ========================================================
               2. LEAF ITEM (DIRECT LINK)
               ======================================================== */
            return (
              <Link
                key={item.title}
                href={item.href}
                title={isDesktopCollapsed ? item.title : undefined}
                onClick={closeMobileSidebar}
                className={cn(
                  "flex items-center rounded-lg text-xs font-medium transition-colors",
                  isDesktopCollapsed
                    ? "lg:justify-center lg:w-10 lg:h-10 lg:p-0 mx-auto px-3 py-2 gap-3"
                    : "gap-3 px-3 py-2",
                  isActive
                    ? "bg-[#332b6e] text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    isActive ? "text-amber-400" : "text-slate-400"
                  )}
                />
                <span
                  className={cn(
                    "whitespace-nowrap transition-all duration-200",
                    isDesktopCollapsed ? "lg:hidden" : "inline"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer: Trainee Badge & Sign Out */}
            <div className="p-4 border-t border-[#221e4a] shrink-0">
                <div
                  className={`text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5 ${
                    isDesktopCollapsed ? "lg:text-center lg:text-[9px]" : ""
                  }`}
                >
                  {isDesktopCollapsed ? "IT" : displayRole}
                </div>
                
                {/* Logout form/button */}
              </div>
      </aside>
    </>
  );
}

export default Sidebar;