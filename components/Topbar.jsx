"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Moon,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Menu as Dropdown } from "@base-ui/react";
import { useSidebar } from "@/context/SidebarContext";
import { logoutAction } from "@/app/actions/auth";
import Image from "next/image";
import { LicenseTopBadge } from "./LicenseTopBadge";

export function Topbar({ user, licenseInfo, org }) {
  const { toggleSidebar } = useSidebar();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Dynamic user data resolution with strict fallbacks
  const displayName = user?.fullName && user.fullName !== "notfound" ? user.fullName : "User";
  const displayRole = user?.role && user.role !== "notfound" ? user.role : "TRAINEE";
  const displayEmail = user?.email && user.email !== "notfound" ? user.email : "";
  const userImage = user?.image && user.image !== "notfound" && user.image.trim() !== "" ? user.image : null;

  // Generate 2-character initials
  const initials =
    user?.initials ||
    displayName
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ||
    "IT";

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 select-none relative">
      {/* 1. Left Section: Sidebar Toggle & Search Input */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 pr-2">
        <button
          type="button"
          onClick={toggleSidebar}
          className="text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100 focus:outline-none cursor-pointer shrink-0"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Search */}
        <div className="hidden sm:block relative w-full max-w-xs md:max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search across workspace..."
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Mobile Search Trigger Button */}
        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(true)}
          className="sm:hidden p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="absolute inset-0 bg-white z-40 px-3 flex items-center gap-2 sm:hidden animate-in fade-in duration-150">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder="Search workspace..."
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100"
            aria-label="Close Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 2. Right Section: License, Notification, Theme & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* LICENSE NOTICE BADGE */}
        <div className="shrink-0 max-w-[120px] sm:max-w-none">
          <LicenseTopBadge licenseInfo={licenseInfo} />
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer hidden xs:flex items-center justify-center"
          title="Toggle Theme"
        >
          <Moon className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 relative transition-colors cursor-pointer shrink-0"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {licenseInfo?.showBadge && (
            <span className="w-2 h-2 bg-amber-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white" />
          )}
        </button>

        {/* User Profile Dropdown */}
        <Dropdown.Root>
          <Dropdown.Trigger className="flex items-center gap-2 pl-1 sm:pl-2 cursor-pointer outline-none group py-1 shrink-0">
            {/* Avatar image with fallback to initials */}
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden shrink-0 border border-slate-200">
              {userImage ? (
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

            <div className="hidden lg:flex flex-col text-left max-w-[120px]">
              <span className="text-xs font-semibold text-slate-800 group-hover:text-slate-900 transition-colors leading-tight truncate">
                {displayName}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5 truncate uppercase">
                {displayRole}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform hidden sm:block shrink-0" />
          </Dropdown.Trigger>

          <Dropdown.Portal>
            <Dropdown.Positioner sideOffset={8} align="end" className="z-50">
              <Dropdown.Popup className="w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-100">
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
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
                    {displayRole}
                  </span>
                </div>

                {/* Profile Details Link */}
                <Dropdown.Item className="p-0 outline-none">
                  <Link
                    href="/settings/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 w-full transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profile Details</span>
                  </Link>
                </Dropdown.Item>

                {/* Account Preferences Link */}
                <Dropdown.Item className="p-0 outline-none">
                  <Link
                    href="/settings/general"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 w-full transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Account Preferences</span>
                  </Link>
                </Dropdown.Item>

                <div className="my-1 border-t border-slate-100" />

                {/* Logout Action */}
                <Dropdown.Item className="p-0 outline-none">
                  <form action={logoutAction} className="w-full">
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors font-medium text-left cursor-pointer"
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