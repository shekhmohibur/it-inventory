"use client";

import React from "react";
import Link from "next/link";
import { Menu, Search, Moon, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Menu as Dropdown } from "@base-ui/react";
import { useSidebar } from "@/context/SidebarContext";
import { logoutAction } from "@/app/actions/auth";
import Image from "next/image";
export function Topbar({ user }) {
  const { toggleSidebar } = useSidebar();

  // Dynamic user data resolution with fallbacks
  const displayName = user?.fullName || "User";
  const displayRole = user?.role || "TRAINEE (IT)";
  const displayEmail = user?.email || "";
  const userImage = user?.image;


  // Generate 2-character initials
  const initials = user?.initials || (
    displayName
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "IT"
  );

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 select-none">
      {/* Left: Sidebar Toggle & Search Input */}
      <div className="flex items-center gap-3 sm:gap-5 flex-1 max-w-xl">
        <button
          type="button"
          onClick={toggleSidebar}
          className="text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer"
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
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          <Moon className="w-4 h-4" />
        </button>

        <button
          type="button"
          className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 relative transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-amber-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>

        {/* Profile Dropdown */}
        <Dropdown.Root>
          <Dropdown.Trigger className="flex items-center gap-2.5 pl-2 cursor-pointer outline-none group py-1">
            {/* Avatar image with fallback to initials */}
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden shrink-0">
              {user?.image ? (
                <Image
                  src={userImage}
                  alt={displayName}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors leading-tight">
                {displayName}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                {displayRole}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform hidden md:block" />
          </Dropdown.Trigger>

          <Dropdown.Portal>
            <Dropdown.Positioner sideOffset={8} align="end" className="z-50">
              <Dropdown.Popup className="w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-100">
                {/* User Header Details */}
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <div className="font-semibold text-slate-900 truncate">
                    {displayName}
                  </div>
                  {displayEmail && (
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {displayEmail}
                    </div>
                  )}
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {displayRole}
                  </span>
                </div>

{/* Profile Details */}
<Dropdown.Item className="p-0 outline-none">
  <Link
    href="/settings/profile"
    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 w-full transition-colors"
  >
    <User className="w-3.5 h-3.5 text-slate-400" />
    <span>Profile Details</span>
  </Link>
</Dropdown.Item>

{/* Account Preferences */}
<Dropdown.Item className="p-0 outline-none">
  <Link
    href="/settings/general"
    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 w-full transition-colors"
  >
    <Settings className="w-3.5 h-3.5 text-slate-400" />
    <span>Account Preferences</span>
  </Link>
</Dropdown.Item>

<div className="my-1 border-t border-slate-100" />

{/* Logout */}
<Dropdown.Item className="p-0 outline-none">
  <form action={logoutAction} className="w-full">
    <button
      type="submit"
      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors font-medium text-left cursor-pointer"
    >
      <LogOut className="w-3.5 h-3.5 text-rose-500" />
      <span>Log Out</span>
    </button>
  </form>
</Dropdown.Item>

              </Dropdown.Popup>
            </Dropdown.Positioner>
          </Dropdown.Portal>
        </Dropdown.Root>
      </div>
    </header>
  );
}