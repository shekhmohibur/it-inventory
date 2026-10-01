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
import { Menu as Dropdown } from "@base-ui/react";
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
      { title: "Scrapped", href: "/inventory/scrapped" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isDesktopCollapsed, isMobileOpen, closeMobileSidebar } = useSidebar();
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubmenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "bg-[#141233] text-slate-300 flex flex-col h-screen select-none border-r border-[#201d4a] shrink-0 z-40 transition-all duration-300 ease-in-out",
          // Mobile responsive drawer
          "fixed top-0 bottom-0 left-0 lg:static",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Desktop collapsed vs expanded width
          isDesktopCollapsed ? "lg:w-20" : "lg:w-64",
          "w-64"
        )}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center px-5 gap-3 border-b border-[#201d4a] overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-950 shrink-0">
            <Layers className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span
            className={cn(
              "font-bold tracking-wider text-sm text-white uppercase whitespace-nowrap transition-opacity duration-200",
              isDesktopCollapsed ? "lg:hidden" : "block"
            )}
          >
            KKL INVENTORY
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
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

            // CASE 1: COLLAPSED ON DESKTOP WITH SUBMENU -> Floating flyout dropdown
            if (isDesktopCollapsed && hasChildren) {
              return (
                <div key={item.title} className="hidden lg:flex justify-center">
                  <Dropdown.Root>
                    <Dropdown.Trigger
                      className={cn(
                        "w-11 h-11 flex items-center justify-center rounded-xl transition-all outline-none cursor-pointer",
                        isActive
                          ? "bg-[#332a75] text-white shadow-md shadow-[#1e1750]"
                          : "text-slate-400 hover:text-white hover:bg-white/10"
                      )}
                      title={item.title}
                    >
                      <item.icon
                        className={cn(
                          "w-5 h-5 shrink-0",
                          isActive ? "text-amber-400" : "text-slate-400"
                        )}
                      />
                    </Dropdown.Trigger>

                    <Dropdown.Portal>
                      <Dropdown.Positioner
                        side="right"
                        align="start"
                        sideOffset={12}
                        className="z-50"
                      >
                        <Dropdown.Popup className="w-48 bg-[#1a1740] border border-[#2d2866] rounded-xl shadow-2xl p-1.5 text-xs text-slate-200 backdrop-blur-md">
                          {/* Dropdown Header */}
                          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-[#2d2866] mb-1">
                            {item.title}
                          </div>
                          {/* Submenu links */}
                          {item.subItems.map((sub) => (
                            <Dropdown.Item key={sub.title} asChild>
                              <Link
                                href={sub.href}
                                className={cn(
                                  "block px-3 py-2 rounded-lg text-xs font-medium transition-colors outline-none",
                                  pathname === sub.href
                                    ? "bg-indigo-600 text-white font-semibold"
                                    : "text-slate-300 hover:text-white hover:bg-white/10"
                                )}
                              >
                                {sub.title}
                              </Link>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Popup>
                      </Dropdown.Positioner>
                    </Dropdown.Portal>
                  </Dropdown.Root>
                </div>
              );
            }

            // CASE 2: EXPANDED (OR ON MOBILE) WITH SUBMENU -> Standard accordion collapse
            if (hasChildren) {
              return (
                <div key={item.title} className="w-full">
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-colors outline-none",
                      "text-slate-300 hover:text-white hover:bg-white/5",
                      isOpen && "text-white",
                      isActive && "text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "w-4 h-4 shrink-0",
                          isActive ? "text-amber-400" : "text-slate-400"
                        )}
                      />
                      <span className="whitespace-nowrap">{item.title}</span>
                    </div>

                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-slate-400 transition-transform duration-200",
                        isOpen && "rotate-180 text-white"
                      )}
                    />
                  </button>

                  {/* Inline Submenu items */}
                  {isOpen && (
                    <div className="pl-9 pr-2 py-1 space-y-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={closeMobileSidebar}
                          className={cn(
                            "block py-1.5 px-2 rounded-md text-xs font-medium text-slate-400 hover:text-white transition-colors",
                            pathname === sub.href &&
                              "text-indigo-400 font-semibold"
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

            // CASE 3: NO SUBMENU -> Simple Direct Link (Collapsed or Expanded)
            return (
              <Link
                key={item.title}
                href={item.href}
                title={isDesktopCollapsed ? item.title : undefined}
                onClick={closeMobileSidebar}
                className={cn(
                  "flex items-center rounded-lg text-[13px] font-medium transition-all duration-150",
                  isDesktopCollapsed
                    ? "lg:justify-center lg:w-11 lg:h-11 lg:p-0 mx-auto px-3.5 py-2.5 gap-3"
                    : "gap-3 px-3.5 py-2.5",
                  isActive
                    ? "bg-[#332a75] text-white shadow-sm shadow-[#1e1750]"
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
                    "whitespace-nowrap transition-opacity",
                    isDesktopCollapsed ? "lg:hidden" : "inline"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Role & Sign Out */}
        <div className="p-4 border-t border-[#201d4a] text-xs">
          <div
            className={cn(
              "text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3 whitespace-nowrap overflow-hidden text-ellipsis",
              isDesktopCollapsed ? "lg:text-center lg:text-[9px]" : ""
            )}
          >
            {isDesktopCollapsed ? "IT" : "TRAINEE (IT)"}
          </div>
          <button
            type="button"
            title={isDesktopCollapsed ? "Sign Out" : undefined}
            className={cn(
              "flex items-center text-rose-400 hover:text-rose-300 transition-colors font-medium text-sm w-full",
              isDesktopCollapsed
                ? "lg:justify-center gap-0"
                : "gap-2 justify-start"
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
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