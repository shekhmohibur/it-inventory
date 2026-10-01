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

const NAV_ITEMS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    subItems: [
      { title: "General", href: "/settings/general" },
      { title: "Organization", href: "/settings/org" },
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

export function Sidebar() {
  const pathname = usePathname();
  const {
    isDesktopCollapsed,
    setIsDesktopCollapsed,
    isMobileOpen,
    closeMobileSidebar,
  } = useSidebar();
  const [openMenus, setOpenMenus] = useState({});

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
          isDesktopCollapsed ? "lg:w-[68px]" : "lg:w-60",
          "w-60"
        )}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center px-4.5 gap-3 border-b border-[#221e4a] shrink-0 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white shadow-sm shrink-0">
            <Layers className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span
            className={cn(
              "font-bold tracking-wider text-xs text-white uppercase whitespace-nowrap transition-all duration-200",
              isDesktopCollapsed
                ? "lg:opacity-0 lg:w-0 lg:pointer-events-none"
                : "opacity-100"
            )}
          >
            KKL INVENTORY
          </span>
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
            className={cn(
              "text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5",
              isDesktopCollapsed ? "lg:text-center lg:text-[9px]" : ""
            )}
          >
            {isDesktopCollapsed ? "IT" : "TRAINEE (IT)"}
          </div>
          <button
            type="button"
            title={isDesktopCollapsed ? "Sign Out" : undefined}
            className={cn(
              "flex items-center text-rose-400 hover:text-rose-300 transition-colors font-medium text-xs w-full cursor-pointer",
              isDesktopCollapsed
                ? "lg:justify-center gap-0"
                : "gap-2 justify-start"
            )}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span
              className={cn(
                "whitespace-nowrap",
                isDesktopCollapsed ? "lg:hidden" : "inline"
              )}
            >
              Sign Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;