"use client";

import { useState } from "react";
import {
  FiSettings,
  FiBell,
  FiMoon,
  FiMail,
  FiSave,
} from "react-icons/fi";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [systemNotifications, setSystemNotifications] =
    useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-49px)] bg-[#f7f9fc] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[900px]">

        {/* HEADER */}

        <div className="mb-5">
          <h1 className="text-[18px] font-semibold text-slate-800">
            Account Settings
          </h1>

          <p className="mt-1 text-[11px] text-slate-400">
            Configure your account and notification preferences.
          </p>
        </div>

        {/* GENERAL */}

        <section className="mb-4 overflow-hidden rounded-[10px] border border-slate-200 bg-white">

          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <FiSettings
                size={15}
                className="text-slate-400"
              />

              <h2 className="text-[12px] font-semibold text-slate-700">
                General Settings
              </h2>
            </div>
          </div>

          <div className="divide-y divide-slate-100">

            <SettingRow
              icon={FiMoon}
              title="Dark Mode"
              description="Use a darker appearance throughout the application."
              enabled={darkMode}
              onChange={() =>
                setDarkMode((current) => !current)
              }
            />

            <SettingRow
              icon={FiBell}
              title="System Notifications"
              description="Receive notifications about inventory and system activity."
              enabled={systemNotifications}
              onChange={() =>
                setSystemNotifications(
                  (current) => !current
                )
              }
            />

            <SettingRow
              icon={FiMail}
              title="Email Notifications"
              description="Receive important system updates by email."
              enabled={emailNotifications}
              onChange={() =>
                setEmailNotifications(
                  (current) => !current
                )
              }
            />

          </div>
        </section>

        {/* SAVE */}

        <div className="flex items-center justify-end gap-3">

          {saved && (
            <span className="text-[10px] font-medium text-green-600">
              Settings saved successfully.
            </span>
          )}

          <button
            type="button"
            onClick={saveSettings}
            className="
              flex
              h-[36px]
              items-center
              gap-2
              rounded-[6px]
              bg-orange-500
              px-4
              text-[11px]
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-orange-600
              active:scale-[0.98]
            "
          >
            <FiSave size={14} />
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">

      <div className="flex min-w-0 items-center gap-3">

        <div className="
          flex
          h-[32px]
          w-[32px]
          shrink-0
          items-center
          justify-center
          rounded-[6px]
          bg-slate-50
          text-slate-400
        ">
          <Icon size={15} />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-slate-700">
            {title}
          </p>

          <p className="mt-1 text-[9px] text-slate-400">
            {description}
          </p>
        </div>

      </div>

      <button
        type="button"
        onClick={onChange}
        aria-label={`Toggle ${title}`}
        className={`
          relative
          h-[20px]
          w-[36px]
          shrink-0
          rounded-full
          transition-colors
          duration-200
          ${
            enabled
              ? "bg-indigo-600"
              : "bg-slate-200"
          }
        `}
      >
        <span
          className={`
            absolute
            top-[3px]
            h-[14px]
            w-[14px]
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            duration-200
            ${
              enabled
                ? "translate-x-[3px]"
                : "-translate-x-[15px]"
            }
          `}
        />
      </button>

    </div>
  );
}