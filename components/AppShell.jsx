"use client";

import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  // Desktop sidebar
  // false = 212px
  // true  = 64px
  const [collapsed, setCollapsed] = useState(false);

  // Mobile drawer
  // false = closed
  // true  = open
  const [mobileOpen, setMobileOpen] = useState(false);

  // Expand desktop sidebar
  const expandSidebar = () => {
    setCollapsed(false);
  };

  // Toggle desktop sidebar
  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  // Close mobile sidebar
  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        closeMobile={closeMobileSidebar}
        onExpand={expandSidebar}
      />

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div
        className={`
          min-h-screen

          transition-[margin-left]
          duration-300
          ease-[cubic-bezier(0.4,0,0.2,1)]

          ${
            collapsed
              ? "lg:ml-[64px]"
              : "lg:ml-[212px]"
          }
        `}
      >
        {/* ===================================================
            NAVBAR
        =================================================== */}

        <Navbar
          collapsed={collapsed}
          onMenuClick={toggleSidebar}
          onMobileMenuClick={toggleMobileSidebar}
        />

        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <main className="pt-[49px]">
          {children}
        </main>
      </div>
    </div>
  );
}