"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  FiMenu,
  FiSearch,
  FiMoon,
  FiSun,
  FiBell,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiShield,
  FiLogOut,
  FiCheck,
  FiMail,
  FiPackage,
  FiAlertCircle,
  FiX,
  FiGrid,
  FiMonitor,
  FiPrinter,
  FiUsers,
  FiCpu,
} from "react-icons/fi";

/* =========================================================
   USER
========================================================= */

const user = {
  name: "Sheikh Mohibur Rahman",
  email: "sheikhmohibur01@gmail.com",
  role: "Trainee (IT)",
  avatar: "https://i.pravatar.cc/150?img=12",
};

/* =========================================================
   INITIAL NOTIFICATIONS
========================================================= */

const initialNotifications = [
  {
    id: 1,
    type: "inventory",
    title: "New asset added",
    message: "Dell Latitude 5420 was added to inventory.",
    time: "5 min ago",
    unread: true,
    href: "/inventory/computer",
  },
  {
    id: 2,
    type: "mail",
    title: "Mail account assigned",
    message: "A new company mail account was assigned.",
    time: "24 min ago",
    unread: true,
    href: "/inventory/mail/accounts",
  },
  {
    id: 3,
    type: "warning",
    title: "Low inventory",
    message: "Only 3 monitors are currently available.",
    time: "1 hour ago",
    unread: false,
    href: "/inventory/monitor",
  },
];

/* =========================================================
   SEARCH ROUTES
========================================================= */

const searchItems = [
  {
    id: 1,
    title: "Dashboard",
    category: "Dashboard",
    href: "/",
    icon: FiGrid,
  },

  /* ---------------- IT INVENTORY ---------------- */

  {
    id: 2,
    title: "Computer Inventory",
    category: "IT Inventory",
    href: "/inventory/computer",
    icon: FiMonitor,
  },
  {
    id: 3,
    title: "Router Inventory",
    category: "IT Inventory",
    href: "/inventory/router",
    icon: FiCpu,
  },
  {
    id: 4,
    title: "Printer Inventory",
    category: "IT Inventory",
    href: "/inventory/printer",
    icon: FiPrinter,
  },
  {
    id: 5,
    title: "Scanner Inventory",
    category: "IT Inventory",
    href: "/inventory/scanner",
    icon: FiMonitor,
  },
  {
    id: 6,
    title: "Ethernet Inventory",
    category: "IT Inventory",
    href: "/inventory/ethernet",
    icon: FiCpu,
  },
  {
    id: 7,
    title: "Machine Inventory",
    category: "IT Inventory",
    href: "/inventory/machine",
    icon: FiCpu,
  },
  {
    id: 8,
    title: "UPS Inventory",
    category: "IT Inventory",
    href: "/inventory/ups",
    icon: FiPackage,
  },
  {
    id: 9,
    title: "Monitor Inventory",
    category: "IT Inventory",
    href: "/inventory/monitor",
    icon: FiMonitor,
  },

  /* ---------------- MASTER DATA ---------------- */

  {
    id: 10,
    title: "Company",
    category: "Master Data",
    href: "/master-data/company",
    icon: FiUsers,
  },
  {
    id: 11,
    title: "Department",
    category: "Master Data",
    href: "/master-data/department",
    icon: FiUsers,
  },
  {
    id: 12,
    title: "Section",
    category: "Master Data",
    href: "/master-data/section",
    icon: FiUsers,
  },
  {
    id: 13,
    title: "Employee",
    category: "Master Data",
    href: "/master-data/employee",
    icon: FiUser,
  },
  {
    id: 14,
    title: "Status",
    category: "Master Data",
    href: "/master-data/status",
    icon: FiShield,
  },

  /* ---------------- HARDWARE SPECS ---------------- */

  {
    id: 15,
    title: "Brands",
    category: "Hardware Specs",
    href: "/hardware/brands",
    icon: FiPackage,
  },
  {
    id: 16,
    title: "Models",
    category: "Hardware Specs",
    href: "/hardware/models",
    icon: FiPackage,
  },
  {
    id: 17,
    title: "Generations",
    category: "Hardware Specs",
    href: "/hardware/generations",
    icon: FiCpu,
  },
  {
    id: 18,
    title: "Processors",
    category: "Hardware Specs",
    href: "/hardware/processors",
    icon: FiCpu,
  },
  {
    id: 19,
    title: "Motherboards",
    category: "Hardware Specs",
    href: "/hardware/motherboards",
    icon: FiCpu,
  },
  {
    id: 20,
    title: "RAM",
    category: "Hardware Specs",
    href: "/hardware/ram",
    icon: FiPackage,
  },
  {
    id: 21,
    title: "Storage",
    category: "Hardware Specs",
    href: "/hardware/storage",
    icon: FiPackage,
  },
  {
    id: 22,
    title: "Graphics Cards",
    category: "Hardware Specs",
    href: "/hardware/graphics-cards",
    icon: FiMonitor,
  },
  {
    id: 23,
    title: "Power Supplies",
    category: "Hardware Specs",
    href: "/hardware/power-supplies",
    icon: FiPackage,
  },

  /* ---------------- MAIL INVENTORY ---------------- */

  {
    id: 24,
    title: "Mail Providers",
    category: "Mail Inventory",
    href: "/inventory/mail/providers",
    icon: FiMail,
  },
  {
    id: 25,
    title: "Mail Accounts",
    category: "Mail Inventory",
    href: "/inventory/mail/accounts",
    icon: FiMail,
  },
  {
    id: 26,
    title: "Mail Assignments",
    category: "Mail Inventory",
    href: "/inventory/mail/assignments",
    icon: FiUsers,
  },
  {
    id: 27,
    title: "Mail Audit Logs",
    category: "Mail Inventory",
    href: "/inventory/mail/audit-logs",
    icon: FiShield,
  },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar({
  collapsed = false,
  onMenuClick = () => {},
  onMobileMenuClick = () => {},
}) {
  const router = useRouter();
  const pathname = usePathname();

  /* -------------------------------------------------------
     STATES
  ------------------------------------------------------- */

  const [profileOpen, setProfileOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [darkMode, setDarkMode] = useState(false);

  /* -------------------------------------------------------
     REFS
  ------------------------------------------------------- */

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  /* =======================================================
     CLOSE DROPDOWNS
  ======================================================= */

  useEffect(() => {
    const handleOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
    };
  }, []);

  /* =======================================================
     CLOSE DROPDOWNS WHEN ROUTE CHANGES
  ======================================================= */

  useEffect(() => {
    setProfileOpen(false);
    setNotificationOpen(false);
    setSearchOpen(false);
    setSearch("");
  }, [pathname]);

  /* =======================================================
     UNREAD COUNT
  ======================================================= */

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredSearch = search
    ? searchItems
        .filter((item) => {
          const query = search
            .trim()
            .toLowerCase();

          return (
            item.title
              .toLowerCase()
              .includes(query) ||
            item.category
              .toLowerCase()
              .includes(query)
          );
        })
        .slice(0, 8)
    : [];

  /* =======================================================
     NAVIGATE
  ======================================================= */

  const navigateTo = (href) => {
    setSearchOpen(false);
    setNotificationOpen(false);
    setProfileOpen(false);
    setSearch("");

    router.push(href);
  };

  /* =======================================================
     MENU HANDLER
  ======================================================= */

  const handleMenuClick = () => {
    if (window.innerWidth >= 1024) {
      onMenuClick();
    } else {
      onMobileMenuClick();
    }
  };

  /* =======================================================
     MARK ALL READ
  ======================================================= */

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  /* =======================================================
     MARK SINGLE READ
  ======================================================= */

  const openNotification = (notification) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? {
              ...item,
              unread: false,
            }
          : item
      )
    );

    navigateTo(notification.href);
  };

  /* =======================================================
     DARK MODE UI
  ======================================================= */

  const toggleDarkMode = () => {
    setDarkMode((current) => !current);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <header
      className={`
        fixed
        left-0
        right-0
        top-0
        z-40

        h-[49px]

        border-b
        border-slate-200

        bg-white

        transition-[left]
        duration-300
        ease-in-out

        ${
          collapsed
            ? "lg:left-[64px]"
            : "lg:left-[212px]"
        }
      `}
    >
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-between

          px-[10px]
          sm:px-[15px]
        "
      >
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
          "
        >
          {/* HAMBURGER */}

          <button
            type="button"
            onClick={handleMenuClick}
            aria-label="Toggle sidebar"
            className="
              mr-[8px]
              flex
              h-[32px]
              w-[32px]
              shrink-0
              items-center
              justify-center
              rounded-[6px]
              text-slate-500
              transition-all
              duration-200
              hover:bg-slate-100
              hover:text-slate-700
              active:scale-95

              sm:mr-[14px]
            "
          >
            <FiMenu
              size={19}
              strokeWidth={1.8}
            />
          </button>

          {/* SEARCH */}

          <div
            ref={searchRef}
            className="
              relative
              min-w-0
              flex-1
              sm:flex-none
            "
          >
            <div
              className="
                flex
                h-[32px]

                w-full
                max-w-[360px]

                items-center

                rounded-[7px]

                border
                border-slate-200

                bg-white

                px-[10px]

                transition-all
                duration-200

                focus-within:border-indigo-300
                focus-within:ring-2
                focus-within:ring-indigo-50

                sm:w-[235px]
              "
            >
              <FiSearch
                size={15}
                className="
                  mr-[7px]
                  shrink-0
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => {
                  if (search) {
                    setSearchOpen(true);
                  }
                }}
                placeholder="
                  Search across workspace...
                "
                className="
                  h-full
                  min-w-0
                  flex-1

                  bg-transparent

                  text-[11px]
                  text-slate-700

                  outline-none

                  placeholder:text-slate-400

                  sm:text-[12px]
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSearchOpen(false);
                  }}
                  className="
                    ml-1
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-600
                  "
                >
                  <FiX size={13} />
                </button>
              )}
            </div>

            {/* SEARCH RESULTS */}

            {searchOpen && search && (
              <div
                className="
                  absolute
                  left-0
                  top-[40px]
                  z-[100]

                  w-[calc(100vw-20px)]
                  max-w-[330px]

                  overflow-hidden

                  rounded-[10px]

                  border
                  border-slate-200

                  bg-white

                  shadow-[0_12px_35px_rgba(15,23,42,0.15)]

                  sm:w-[330px]
                "
              >
                {filteredSearch.length > 0 ? (
                  <div className="py-[5px]">
                    <div
                      className="
                        flex
                        items-center
                        justify-between

                        border-b
                        border-slate-100

                        px-[12px]
                        py-[8px]
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wide
                          text-slate-400
                        "
                      >
                        Search Results
                      </p>

                      <span
                        className="
                          rounded
                          bg-slate-50
                          px-1.5
                          py-0.5
                          text-[9px]
                          text-slate-400
                        "
                      >
                        {filteredSearch.length}
                      </span>
                    </div>

                    <div className="max-h-[360px] overflow-y-auto">
                      {filteredSearch.map((item) => {
                        const Icon = item.icon;

                        const active =
                          pathname === item.href;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              navigateTo(item.href)
                            }
                            className="
                              group

                              flex
                              w-full
                              items-center
                              gap-[10px]

                              px-[12px]
                              py-[9px]

                              text-left

                              transition-colors

                              hover:bg-slate-50
                            "
                          >
                            <div
                              className={`
                                flex
                                h-[28px]
                                w-[28px]
                                shrink-0
                                items-center
                                justify-center
                                rounded-[6px]

                                ${
                                  active
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "bg-slate-50 text-slate-400"
                                }

                                group-hover:bg-indigo-50
                                group-hover:text-indigo-600
                              `}
                            >
                              <Icon size={14} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p
                                className="
                                  truncate
                                  text-[11px]
                                  font-semibold
                                  text-slate-700
                                "
                              >
                                {item.title}
                              </p>

                              <p
                                className="
                                  mt-[2px]
                                  truncate
                                  text-[9px]
                                  text-slate-400
                                "
                              >
                                {item.category}
                              </p>
                            </div>

                            <FiChevronDown
                              size={13}
                              className="
                                -rotate-90
                                shrink-0
                                text-slate-300
                                transition-transform
                                group-hover:translate-x-0.5
                                group-hover:text-indigo-400
                              "
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-7 text-center">
                    <FiSearch
                      size={21}
                      className="
                        mx-auto
                        text-slate-300
                      "
                    />

                    <p
                      className="
                        mt-2
                        text-[12px]
                        font-medium
                        text-slate-500
                      "
                    >
                      No results found
                    </p>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-slate-400
                      "
                    >
                      Try another search term.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div
          className="
            ml-[6px]
            flex
            h-full
            shrink-0
            items-center

            sm:ml-[12px]
          "
        >
          {/* MOON */}

          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="
              mr-[3px]

              flex
              h-[32px]
              w-[32px]

              items-center
              justify-center

              rounded-[6px]

              text-slate-500

              transition-all
              duration-200

              hover:bg-slate-100
              hover:text-slate-700

              active:scale-95

              sm:mr-[8px]
            "
          >
            {darkMode ? (
              <FiSun size={17} />
            ) : (
              <FiMoon size={17} />
            )}
          </button>

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setNotificationOpen(
                  (current) => !current
                );

                setProfileOpen(false);
                setSearchOpen(false);
              }}
              aria-label="Notifications"
              className="
                relative
                mr-[3px]

                flex
                h-[32px]
                w-[32px]

                items-center
                justify-center

                rounded-[6px]

                text-slate-500

                transition-all
                duration-200

                hover:bg-slate-100
                hover:text-slate-700

                active:scale-95

                sm:mr-[8px]
              "
            >
              <FiBell size={17} />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    right-[2px]
                    top-[2px]

                    flex
                    h-[14px]
                    min-w-[14px]

                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white

                    bg-orange-500

                    px-[2px]

                    text-[8px]
                    font-bold
                    text-white
                  "
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* NOTIFICATION DROPDOWN */}

            {notificationOpen && (
              <div
                className="
                  absolute
                  right-[-45px]
                  top-[43px]
                  z-[100]

                  w-[calc(100vw-20px)]
                  max-w-[340px]

                  overflow-hidden

                  rounded-[11px]

                  border
                  border-slate-200

                  bg-white

                  shadow-[0_12px_35px_rgba(15,23,42,0.15)]

                  sm:right-0
                  sm:w-[340px]
                "
              >
                {/* HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    border-b
                    border-slate-100

                    px-[14px]
                    py-[12px]
                  "
                >
                  <div>
                    <p
                      className="
                        text-[12px]
                        font-semibold
                        text-slate-800
                      "
                    >
                      Notifications
                    </p>

                    <p
                      className="
                        mt-[2px]
                        text-[10px]
                        text-slate-400
                      "
                    >
                      {unreadCount} unread
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="
                        flex
                        items-center
                        gap-[4px]

                        rounded
                        px-1.5
                        py-1

                        text-[10px]
                        font-medium
                        text-indigo-600

                        hover:bg-indigo-50
                      "
                    >
                      <FiCheck size={12} />
                      Mark all read
                    </button>
                  )}
                </div>

                {/* NOTIFICATIONS */}

                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(
                      (notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() =>
                            openNotification(
                              notification
                            )
                          }
                          className={`
                            flex
                            w-full
                            gap-[10px]

                            border-b
                            border-slate-50

                            px-[14px]
                            py-[12px]

                            text-left

                            transition-colors

                            hover:bg-slate-50

                            ${
                              notification.unread
                                ? "bg-indigo-50/30"
                                : ""
                            }
                          `}
                        >
                          <div
                            className="
                              flex
                              h-[30px]
                              w-[30px]
                              shrink-0
                              items-center
                              justify-center

                              rounded-full

                              bg-slate-100
                              text-slate-500
                            "
                          >
                            {notification.type ===
                            "mail" ? (
                              <FiMail size={15} />
                            ) : notification.type ===
                              "warning" ? (
                              <FiAlertCircle
                                size={15}
                              />
                            ) : (
                              <FiPackage size={15} />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className="
                                  truncate
                                  text-[11px]
                                  font-semibold
                                  text-slate-700
                                "
                              >
                                {notification.title}
                              </p>

                              {notification.unread && (
                                <span
                                  className="
                                    mt-1
                                    h-[6px]
                                    w-[6px]
                                    shrink-0
                                    rounded-full
                                    bg-indigo-500
                                  "
                                />
                              )}
                            </div>

                            <p
                              className="
                                mt-[3px]
                                line-clamp-2
                                text-[10px]
                                leading-4
                                text-slate-400
                              "
                            >
                              {notification.message}
                            </p>

                            <p
                              className="
                                mt-[4px]
                                text-[9px]
                                text-slate-300
                              "
                            >
                              {notification.time}
                            </p>
                          </div>
                        </button>
                      )
                    )
                  ) : (
                    <div
                      className="
                        px-4
                        py-8
                        text-center
                      "
                    >
                      <FiBell
                        size={21}
                        className="
                          mx-auto
                          text-slate-300
                        "
                      />

                      <p
                        className="
                          mt-2
                          text-[11px]
                          text-slate-500
                        "
                      >
                        No notifications
                      </p>
                    </div>
                  )}
                </div>

                {/* FOOTER */}

                <button
                  type="button"
                  onClick={() =>
                    navigateTo(
                      "/notifications"
                    )
                  }
                  className="
                    w-full

                    border-t
                    border-slate-100

                    py-[10px]

                    text-center

                    text-[10px]
                    font-semibold
                    text-indigo-600

                    transition-colors

                    hover:bg-slate-50
                  "
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              PROFILE
          ================================================= */}

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setProfileOpen(
                  (current) => !current
                );

                setNotificationOpen(false);
                setSearchOpen(false);
              }}
              className="
                flex
                h-[49px]
                items-center
                gap-[6px]

                rounded-[6px]

                transition-colors

                hover:bg-slate-50

                sm:gap-[8px]
              "
            >
              {/* AVATAR */}

              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="
                    h-[30px]
                    w-[30px]
                    rounded-full
                    object-cover
                    ring-1
                    ring-slate-200
                  "
                />

                <span
                  className="
                    absolute
                    bottom-[-1px]
                    right-[-1px]

                    h-[8px]
                    w-[8px]

                    rounded-full

                    border-2
                    border-white

                    bg-green-500
                  "
                />
              </div>

              {/* USER NAME */}

              <span
                className="
                  hidden
                  max-w-[180px]
                  truncate

                  text-[12px]
                  font-semibold
                  text-slate-800

                  xl:block
                "
              >
                {user.name}
              </span>

              <FiChevronDown
                size={14}
                className={`
                  text-slate-400
                  transition-transform
                  duration-200

                  ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {/* PROFILE DROPDOWN */}

            {profileOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-[50px]
                  z-[100]

                  w-[calc(100vw-20px)]
                  max-w-[260px]

                  overflow-hidden

                  rounded-[11px]

                  border
                  border-slate-200

                  bg-white

                  shadow-[0_12px_35px_rgba(15,23,42,0.15)]

                  sm:w-[260px]
                "
              >
                {/* USER INFO */}

                <div
                  className="
                    border-b
                    border-slate-100

                    px-[15px]
                    py-[14px]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-[10px]
                    "
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="
                        h-[40px]
                        w-[40px]
                        rounded-full
                        object-cover
                        ring-1
                        ring-slate-200
                      "
                    />

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-[12px]
                          font-semibold
                          text-slate-800
                        "
                      >
                        {user.name}
                      </p>

                      <p
                        className="
                          mt-[2px]
                          truncate
                          text-[10px]
                          text-slate-400
                        "
                      >
                        {user.email}
                      </p>

                      <p
                        className="
                          mt-[3px]
                          text-[9px]
                          font-medium
                          text-green-500
                        "
                      >
                        ● {user.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* MENU */}

                <div className="p-[6px]">
                  <ProfileItem
                    icon={FiUser}
                    label="My Profile"
                    onClick={() =>
                      navigateTo("/profile")
                    }
                  />

                  <ProfileItem
                    icon={FiSettings}
                    label="Account Settings"
                    onClick={() =>
                      navigateTo("/settings")
                    }
                  />

                  <ProfileItem
                    icon={FiShield}
                    label="Security"
                    onClick={() =>
                      navigateTo("/security")
                    }
                  />

                  <div
                    className="
                      my-[5px]
                      border-t
                      border-slate-100
                    "
                  />

                  <ProfileItem
                    icon={FiLogOut}
                    label="Sign Out"
                    danger
                    onClick={() => {
                      setProfileOpen(false);

                      // Replace this later with your
                      // real logout API/auth action.
                      router.push("/login");
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   PROFILE ITEM
========================================================= */

function ProfileItem({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        h-[38px]
        w-full
        items-center
        gap-[11px]

        rounded-[6px]

        px-[10px]

        text-left

        text-[11px]
        font-medium

        transition-colors

        ${
          danger
            ? "text-red-500 hover:bg-red-50"
            : "text-slate-600 hover:bg-slate-50"
        }
      `}
    >
      <Icon
        size={15}
        className={
          danger
            ? "text-red-400"
            : "text-slate-400"
        }
      />

      {label}
    </button>
  );
}