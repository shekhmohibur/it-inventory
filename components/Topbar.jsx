"use client";

import React from "react";
import Image from "next/image";
import { Menu, Search, Moon, Bell, ChevronDown } from "lucide-react";
import { Menu as Dropdown } from "@base-ui/react";
import { useSidebar } from "@/context/SidebarContext";

export function Topbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
      {/* Left: Sidebar Toggle & Search Input */}
      <div className="flex items-center gap-3 sm:gap-5 flex-1 max-w-xl">
        <button
          type="button"
          onClick={toggleSidebar}
          className="text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-xs sm:max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search across workspace..."
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg pl-9 pr-3.5 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          title="Toggle Theme"
        >
          <Moon className="w-4 h-4" />
        </button>

        <button
          type="button"
          className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 relative transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-amber-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>

        {/* Profile Dropdown */}
        <Dropdown.Root>
          <Dropdown.Trigger className="flex items-center gap-2.5 pl-2 cursor-pointer outline-none group">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              SM
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors hidden md:inline-block">
              Shekh Mohibur Rahman
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />
          </Dropdown.Trigger>

          <Dropdown.Portal>
            <Dropdown.Positioner sideOffset={8} align="end" className="z-50">
              <Dropdown.Popup className="w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1 text-xs text-slate-700">
                <Dropdown.Item className="px-3 py-2 rounded-md hover:bg-slate-100 cursor-pointer outline-none">
                  Profile Details
                </Dropdown.Item>
                <Dropdown.Item className="px-3 py-2 rounded-md hover:bg-slate-100 cursor-pointer outline-none">
                  Account Preferences
                </Dropdown.Item>
                <div className="my-1 border-t border-slate-100" />
                <Dropdown.Item className="px-3 py-2 rounded-md hover:bg-rose-50 text-rose-600 cursor-pointer outline-none font-medium">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Popup>
            </Dropdown.Positioner>
          </Dropdown.Portal>
        </Dropdown.Root>
      </div>
    </header>
  );
}