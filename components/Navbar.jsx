"use client";

import { useEffect, useRef, useState } from "react";

import {
  FiMenu,
  FiSearch,
  FiMoon,
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
} from "react-icons/fi";

const user = {
  name: "Sheikh Mohibur Rahman",
  email: "sheikhmohibur01@gmail.com",
  role: "Trainee (IT)",
  avatar: "https://i.pravatar.cc/150?img=12",
};

const notifications = [
  {
    id: 1,
    type: "inventory",
    title: "New asset added",
    message:
      "Dell Latitude 5420 was added to inventory.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "mail",
    title: "Mail account assigned",
    message:
      "A new company mail account was assigned.",
    time: "24 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "warning",
    title: "Low inventory",
    message:
      "Only 3 monitors are currently available.",
    time: "1 hour ago",
    unread: false,
  },
];

const searchItems = [
  {
    id: 1,
    title: "Computer Inventory",
    category: "IT Inventory",
  },
  {
    id: 2,
    title: "Monitor Inventory",
    category: "IT Inventory",
  },
  {
    id: 3,
    title: "Printer Inventory",
    category: "IT Inventory",
  },
  {
    id: 4,
    title: "Company",
    category: "Master Data",
  },
  {
    id: 5,
    title: "Department",
    category: "Master Data",
  },
  {
    id: 6,
    title: "Employee",
    category: "Master Data",
  },
  {
    id: 7,
    title: "Mail Accounts",
    category: "Mail Inventory",
  },
  {
    id: 8,
    title: "Brands",
    category: "Hardware Specs",
  },
];

export default function Navbar({
  collapsed,
  onMenuClick,
  onMobileMenuClick,
}) {
  const [profileOpen, setProfileOpen] =
    useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  /* =====================================================
     CLOSE DROPDOWNS
  ===================================================== */

  useEffect(() => {
    const handleOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setNotificationOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target
        )
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

  const unreadCount =
    notifications.filter(
      (item) => item.unread
    ).length;

  const filteredSearch = search
    ? searchItems.filter((item) => {
        const query =
          search.toLowerCase();

        return (
          item.title
            .toLowerCase()
            .includes(query) ||
          item.category
            .toLowerCase()
            .includes(query)
        );
      })
    : [];

  /* =====================================================
     MENU HANDLER
  ===================================================== */

  const handleMenuClick = () => {
    /*
     * CSS breakpoint is lg = 1024px.
     */
    if (window.innerWidth >= 1024) {
      onMenuClick();
    } else {
      onMobileMenuClick();
    }
  };

  return (
    <header
      className={`
        fixed
        top-0
        right-0
        left-0
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
          items-center
          justify-between
          px-[15px]
        "
      >

        {/* =================================================
            LEFT
        ================================================= */}

        <div className="flex h-full items-center">

          {/* HAMBURGER */}

          <button
            type="button"
            onClick={handleMenuClick}
            aria-label="Toggle sidebar"
            className="
              mr-[19px]

              flex
              h-[32px]
              w-[32px]

              items-center
              justify-center

              rounded-[6px]

              text-slate-500

              transition

              hover:bg-slate-50
              hover:text-slate-700
            "
          >
            <FiMenu
              size={19}
              strokeWidth={1.8}
            />
          </button>

          {/* =================================================
              SEARCH
          ================================================= */}

          <div
            ref={searchRef}
            className="relative"
          >

            <div
              className="
                flex
                h-[32px]
                w-[235px]
                items-center

                rounded-[7px]

                border
                border-slate-200

                bg-white

                px-[10px]

                transition

                focus-within:border-slate-300
                focus-within:ring-2
                focus-within:ring-slate-100
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
                  setSearch(
                    event.target.value
                  );

                  setSearchOpen(true);
                }}
                onFocus={() =>
                  setSearchOpen(true)
                }
                placeholder="Search across workspace..."
                className="
                  h-full
                  min-w-0
                  flex-1

                  bg-transparent

                  text-[12px]
                  text-slate-700

                  outline-none

                  placeholder:text-slate-400
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSearchOpen(false);
                  }}
                  className="text-slate-400"
                >
                  <FiX size={14} />
                </button>
              )}

            </div>

            {/* SEARCH DROPDOWN */}

            {searchOpen && search && (
              <div
                className="
                  absolute
                  left-0
                  top-[40px]
                  z-50

                  w-[300px]

                  overflow-hidden

                  rounded-[10px]

                  border
                  border-slate-200

                  bg-white

                  shadow-[0_8px_30px_rgba(15,23,42,0.12)]
                "
              >

                {filteredSearch.length > 0 ? (
                  <div className="py-[5px]">

                    <p
                      className="
                        px-[12px]
                        py-[7px]

                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wide

                        text-slate-400
                      "
                    >
                      Search Results
                    </p>

                    {filteredSearch.map(
                      (item) => (
                        <button
                          key={item.id}
                          type="button"
                          className="
                            flex
                            w-full
                            items-center
                            justify-between

                            px-[12px]
                            py-[9px]

                            text-left

                            hover:bg-slate-50
                          "
                        >

                          <div>

                            <p
                              className="
                                text-[12px]
                                font-medium
                                text-slate-700
                              "
                            >
                              {item.title}
                            </p>

                            <p
                              className="
                                mt-[2px]
                                text-[10px]
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
                              text-slate-300
                            "
                          />

                        </button>
                      )
                    )}

                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">

                    <FiSearch
                      size={20}
                      className="
                        mx-auto
                        text-slate-300
                      "
                    />

                    <p
                      className="
                        mt-2
                        text-[12px]
                        text-slate-500
                      "
                    >
                      No results found
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>
        </div>

        {/* =================================================
            RIGHT
        ================================================= */}

        <div className="flex h-full items-center">

          {/* MOON */}

          <button
            type="button"
            className="
              mr-[13px]
              flex
              h-[32px]
              w-[32px]
              items-center
              justify-center
              rounded-[6px]
              text-slate-500
              hover:bg-slate-50
            "
          >
            <FiMoon size={17} />
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
                  (prev) => !prev
                );

                setProfileOpen(false);
              }}
              className="
                relative
                mr-[12px]

                flex
                h-[32px]
                w-[32px]

                items-center
                justify-center

                rounded-[6px]

                text-slate-500

                hover:bg-slate-50
              "
            >

              <FiBell size={17} />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    right-[4px]
                    top-[3px]

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

            {notificationOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-[43px]
                  z-50

                  w-[330px]

                  overflow-hidden

                  rounded-[11px]

                  border
                  border-slate-200

                  bg-white

                  shadow-[0_8px_30px_rgba(15,23,42,0.12)]
                "
              >

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

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-[4px]

                      text-[10px]
                      font-medium
                      text-indigo-600
                    "
                  >
                    <FiCheck size={12} />
                    Mark all read
                  </button>

                </div>

                <div className="max-h-[320px] overflow-y-auto">

                  {notifications.map(
                    (notification) => (
                      <button
                        key={notification.id}
                        type="button"
                        className="
                          flex
                          w-full
                          gap-[10px]

                          border-b
                          border-slate-50

                          px-[14px]
                          py-[12px]

                          text-left

                          hover:bg-slate-50
                        "
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
                            <FiPackage
                              size={15}
                            />
                          )}
                        </div>

                        <div className="min-w-0">

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

                          <p
                            className="
                              mt-[3px]
                              text-[10px]
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
                  )}

                </div>

                <button
                  type="button"
                  className="
                    w-full
                    py-[10px]

                    text-center
                    text-[10px]
                    font-semibold
                    text-indigo-600

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
                  (prev) => !prev
                );

                setNotificationOpen(false);
              }}
              className="
                flex
                h-[49px]
                items-center
                gap-[8px]
              "
            >

              <div className="relative">

                <img
                  src={user.avatar}
                  alt={user.name}
                  className="
                    h-[30px]
                    w-[30px]
                    rounded-full
                    object-cover
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
                  z-50

                  w-[245px]

                  overflow-hidden

                  rounded-[11px]

                  border
                  border-slate-200

                  bg-white

                  shadow-[0_8px_30px_rgba(15,23,42,0.12)]
                "
              >

                {/* USER */}

                <div
                  className="
                    border-b
                    border-slate-100

                    px-[15px]
                    py-[14px]
                  "
                >

                  <div className="flex items-center gap-[10px]">

                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="
                        h-[38px]
                        w-[38px]
                        rounded-full
                        object-cover
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
                        ● Online
                      </p>

                    </div>

                  </div>

                </div>

                {/* MENU */}

                <div className="p-[6px]">

                  <button
                    type="button"
                    className="
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
                      text-slate-600

                      hover:bg-slate-50
                    "
                  >
                    <FiUser
                      size={15}
                      className="text-slate-400"
                    />
                    My Profile
                  </button>

                  <button
                    type="button"
                    className="
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
                      text-slate-600

                      hover:bg-slate-50
                    "
                  >
                    <FiSettings
                      size={15}
                      className="text-slate-400"
                    />
                    Account Settings
                  </button>

                  <button
                    type="button"
                    className="
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
                      text-slate-600

                      hover:bg-slate-50
                    "
                  >
                    <FiShield
                      size={15}
                      className="text-slate-400"
                    />
                    Security
                  </button>

                  <div className="my-[5px] border-t border-slate-100" />

                  <button
                    type="button"
                    className="
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
                      text-red-500

                      hover:bg-red-50
                    "
                  >
                    <FiLogOut size={15} />
                    Sign Out
                  </button>

                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}