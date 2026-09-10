"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiGrid,
  FiUsers,
  FiCpu,
  FiMail,
  FiHardDrive,
  FiChevronDown,
  FiLogOut,
  FiLayers,
  FiDatabase,
  FiUser,
  FiTag,
  FiBox,
  FiPrinter,
  FiMonitor,
  FiServer,
  FiWifi,
} from "react-icons/fi";

/* =========================================================
   MENU DATA
========================================================= */

const menuGroups = [
  {
    title: "Master Data",
    icon: FiUsers,
    items: [
      {
        name: "Company",
        icon: FiDatabase,
        href: "/master-data/company",
      },
      {
        name: "Department",
        icon: FiDatabase,
        href: "/master-data/department",
      },
      {
        name: "Section",
        icon: FiLayers,
        href: "/master-data/section",
      },
      {
        name: "Employee",
        icon: FiUser,
        href: "/master-data/employee",
      },
      {
        name: "Status",
        icon: FiTag,
        href: "/master-data/status",
      },
    ],
  },

  {
    title: "Hardware Specs",
    icon: FiCpu,
    items: [
      {
        name: "Brands",
        icon: FiBox,
        href: "/hardware-specs/brands",
      },
      {
        name: "Models",
        icon: FiBox,
        href: "/hardware-specs/models",
      },
      {
        name: "Generations",
        icon: FiLayers,
        href: "/hardware-specs/generations",
      },
      {
        name: "Processors",
        icon: FiCpu,
        href: "/hardware-specs/processors",
      },
      {
        name: "Motherboards",
        icon: FiCpu,
        href: "/hardware-specs/motherboards",
      },
      {
        name: "RAM",
        icon: FiDatabase,
        href: "/hardware-specs/ram",
      },
      {
        name: "Storage",
        icon: FiHardDrive,
        href: "/hardware-specs/storage",
      },
      {
        name: "Graphics Cards",
        icon: FiMonitor,
        href: "/hardware-specs/graphics-cards",
      },
      {
        name: "Power Supplies",
        icon: FiServer,
        href: "/hardware-specs/power-supplies",
      },
    ],
  },

  {
    title: "Mail Inventory",
    icon: FiMail,
    items: [
      {
        name: "Providers",
        icon: FiMail,
        href: "/inventory/mail/providers",
      },
      {
        name: "Mail Accounts",
        icon: FiMail,
        href: "/inventory/mail/accounts",
      },
      {
        name: "Assignments",
        icon: FiUsers,
        href: "/inventory/mail/assignments",
      },
      {
        name: "Audit Logs",
        icon: FiDatabase,
        href: "/inventory/mail/audit-logs",
      },
    ],
  },

  {
    title: "IT Inventory",
    icon: FiHardDrive,
    items: [
      {
        name: "Computer Inventory",
        icon: FiMonitor,
        href: "/inventory/computers",
      },
      {
        name: "Router Inventory",
        icon: FiWifi,
        href: "/inventory/routers",
      },
      {
        name: "Printer Inventory",
        icon: FiPrinter,
        href: "/inventory/printers",
      },
      {
        name: "Scanner Inventory",
        icon: FiMonitor,
        href: "/inventory/scanners",
      },
      {
        name: "Ethernet Inventory",
        icon: FiWifi,
        href: "/inventory/ethernet",
      },
      {
        name: "Machine Inventory",
        icon: FiCpu,
        href: "/inventory/machines",
      },
      {
        name: "UPS Inventory",
        icon: FiServer,
        href: "/inventory/ups",
      },
      {
        name: "Monitor Inventory",
        icon: FiMonitor,
        href: "/inventory/monitors",
      },
    ],
  },
];

/* =========================================================
   SIDEBAR COMPONENT
========================================================= */

export default function Sidebar({
  collapsed = false,
  mobileOpen = false,
  closeMobile = () => {},
  onExpand = () => {},
}) {
  const pathname = usePathname();

  const [openGroup, setOpenGroup] = useState(null);

  /* =======================================================
     ACTIVE LINK
  ======================================================= */

  const isActive = (href) => {
    // Dashboard
    if (href === "/") {
      return pathname === "/";
    }

    // Other routes
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  /* =======================================================
     FIND ACTIVE GROUP
  ======================================================= */

  const activeGroup = menuGroups.find((group) =>
    group.items.some((item) =>
      isActive(item.href)
    )
  );

  /* =======================================================
     AUTOMATICALLY OPEN ACTIVE GROUP
  ======================================================= */

  useEffect(() => {
    if (activeGroup) {
      setOpenGroup(activeGroup.title);
    }
  }, [pathname]);

  /* =======================================================
     TOGGLE GROUP
  ======================================================= */

  const toggleGroup = (title) => {
    setOpenGroup((current) =>
      current === title ? null : title
    );
  };

  /* =======================================================
     HANDLE LINK CLICK
  ======================================================= */

  const handleLinkClick = () => {
    /*
      If desktop sidebar is collapsed,
      expand it when the user clicks an icon/link.
    */

    if (collapsed) {
      onExpand();
    }

    // Always close mobile drawer
    closeMobile();
  };

  /* =======================================================
     HANDLE GROUP CLICK
  ======================================================= */

  const handleGroupClick = (title) => {
    /*
      When collapsed, clicking a group icon
      expands the sidebar instead of opening
      a submenu that the user cannot see.
    */

    if (collapsed) {
      onExpand();
      return;
    }

    toggleGroup(title);
  };

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      <div
        onClick={closeMobile}
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-40

          bg-black/40

          lg:hidden

          transition-opacity
          duration-300
          ease-out

          ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50

          flex
          h-screen
          flex-col

          overflow-hidden

          bg-[#211d54]
          text-white

          w-[212px]

          transform-gpu
          will-change-transform

          transition-transform
          duration-300
          ease-[cubic-bezier(0.4,0,0.2,1)]

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0

          lg:transition-[width]
          lg:duration-300
          lg:ease-[cubic-bezier(0.4,0,0.2,1)]

          ${
            collapsed
              ? "lg:w-[64px]"
              : "lg:w-[212px]"
          }
        `}
      >

        {/* ===================================================
            LOGO
        =================================================== */}

        <div
          className="
            flex
            h-[49px]
            shrink-0
            items-center

            border-b
            border-white/10

            px-4
          "
        >
          <Link
            href="/"
            onClick={handleLinkClick}
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            {/* Logo */}
            <div
              className="
                flex
                h-7
                w-7
                shrink-0

                items-center
                justify-center

                rounded-md

                bg-white
                text-[#211d54]

                text-xs
                font-bold
              "
            >
              IT
            </div>

            {/* Logo text */}
            <span
              className={`
                whitespace-nowrap

                text-[14px]
                font-semibold

                transition-opacity
                duration-200

                ${
                  collapsed
                    ? "lg:pointer-events-none lg:opacity-0"
                    : "opacity-100"
                }
              `}
            >
              IT Inventory
            </span>
          </Link>
        </div>

        {/* ===================================================
            NAVIGATION
        =================================================== */}

        <nav
          className="
            flex-1

            overflow-y-auto
            overflow-x-hidden

            py-3
          "
        >

          {/* =================================================
              DASHBOARD
          ================================================= */}

          <Link
            href="/"
            onClick={handleLinkClick}
            className={`
              mx-2
              mb-1

              flex
              h-10

              items-center

              rounded-md

              transition-all
              duration-200

              ${
                pathname === "/"
                  ? `
                    bg-white
                    text-[#211d54]
                    shadow-sm
                  `
                  : `
                    text-white/70
                    hover:bg-white/10
                    hover:text-white
                  `
              }
            `}
          >
            {/* Icon */}
            <div
              className="
                flex
                w-[44px]
                shrink-0

                items-center
                justify-center
              "
            >
              <FiGrid size={17} />
            </div>

            {/* Text */}
            <span
              className={`
                whitespace-nowrap

                text-[13px]

                transition-opacity
                duration-200

                ${
                  collapsed
                    ? "lg:pointer-events-none lg:opacity-0"
                    : "opacity-100"
                }
              `}
            >
              Dashboard
            </span>
          </Link>

          {/* =================================================
              MENU GROUPS
          ================================================= */}

          <div className="mt-2">

            {menuGroups.map((group) => {
              const GroupIcon = group.icon;

              const groupActive =
                group.items.some((item) =>
                  isActive(item.href)
                );

              const isOpen =
                openGroup === group.title;

              return (
                <div
                  key={group.title}
                  className="mb-1"
                >

                  {/* =========================================
                      GROUP BUTTON
                  ========================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      handleGroupClick(group.title)
                    }
                    aria-expanded={isOpen}
                    className={`
                      mx-2

                      flex
                      h-10
                      w-[calc(100%-16px)]

                      items-center

                      rounded-md

                      text-left

                      transition-all
                      duration-200

                      ${
                        groupActive
                          ? `
                            bg-white/10
                            text-white
                          `
                          : `
                            text-white/70
                            hover:bg-white/10
                            hover:text-white
                          `
                      }
                    `}
                  >

                    {/* Group icon */}
                    <div
                      className="
                        flex
                        w-[44px]
                        shrink-0

                        items-center
                        justify-center
                      "
                    >
                      <GroupIcon size={17} />
                    </div>

                    {/* Group title */}
                    <span
                      className={`
                        flex-1

                        whitespace-nowrap

                        text-[13px]

                        transition-opacity
                        duration-200

                        ${
                          collapsed
                            ? "lg:pointer-events-none lg:opacity-0"
                            : "opacity-100"
                        }
                      `}
                    >
                      {group.title}
                    </span>

                    {/* Chevron */}
                    <FiChevronDown
                      size={14}
                      className={`
                        mr-3
                        shrink-0

                        transition-transform
                        duration-200

                        ${
                          isOpen
                            ? "rotate-180"
                            : "rotate-0"
                        }

                        ${
                          collapsed
                            ? "lg:hidden"
                            : ""
                        }
                      `}
                    />

                  </button>

                  {/* =========================================
                      SUBMENU
                  ========================================= */}

                  <div
                    className={`
                      grid

                      transition-[grid-template-rows,opacity]
                      duration-300
                      ease-in-out

                      ${
                        isOpen && !collapsed
                          ? `
                            grid-rows-[1fr]
                            opacity-100
                          `
                          : `
                            grid-rows-[0fr]
                            opacity-0
                          `
                      }
                    `}
                  >
                    <div className="overflow-hidden">

                      <div
                        className="
                          ml-4
                          mr-2

                          border-l
                          border-white/10

                          py-1
                        "
                      >

                        {group.items.map((item) => {
                          const ItemIcon = item.icon;

                          const active =
                            isActive(item.href);

                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={handleLinkClick}
                              className={`
                                ml-2

                                flex
                                h-9

                                items-center

                                rounded-md

                                px-2

                                transition-all
                                duration-200

                                ${
                                  active
                                    ? `
                                      bg-white
                                      text-[#211d54]
                                      font-medium
                                      shadow-sm
                                    `
                                    : `
                                      text-white/60
                                      hover:bg-white/10
                                      hover:text-white
                                    `
                                }
                              `}
                            >

                              {/* Item icon */}
                              <ItemIcon
                                size={14}
                                className="
                                  mr-3
                                  shrink-0
                                "
                              />

                              {/* Item text */}
                              <span
                                className="
                                  whitespace-nowrap
                                  text-[12px]
                                "
                              >
                                {item.name}
                              </span>

                            </Link>
                          );
                        })}

                      </div>

                    </div>
                  </div>

                </div>
              );
            })}

          </div>

        </nav>

        {/* ===================================================
            LOGOUT
        =================================================== */}

        <div
          className="
            shrink-0

            border-t
            border-white/10

            p-2
          "
        >
          <button
            type="button"
            className="
              flex
              h-10
              w-full

              items-center

              rounded-md

              text-white/70

              transition-colors
              duration-200

              hover:bg-white/10
              hover:text-white
            "
          >

            {/* Icon */}
            <div
              className="
                flex
                w-[44px]
                shrink-0

                items-center
                justify-center
              "
            >
              <FiLogOut size={17} />
            </div>

            {/* Text */}
            <span
              className={`
                whitespace-nowrap

                text-[13px]

                transition-opacity
                duration-200

                ${
                  collapsed
                    ? "lg:pointer-events-none lg:opacity-0"
                    : "opacity-100"
                }
              `}
            >
              Logout
            </span>

          </button>
        </div>

      </aside>
    </>
  );
}