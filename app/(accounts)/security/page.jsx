"use client";

import { useState } from "react";

import {
  FiShield,
  FiLock,
  FiKey,
  FiMonitor,
  FiCheckCircle,
} from "react-icons/fi";

export default function SecurityPage() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="min-h-[calc(100vh-49px)] bg-[#f7f9fc] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[900px]">

        {/* HEADER */}

        <div className="mb-5">
          <h1 className="text-[18px] font-semibold text-slate-800">
            Security
          </h1>

          <p className="mt-1 text-[11px] text-slate-400">
            Manage your account security and login protection.
          </p>
        </div>

        {/* SECURITY STATUS */}

        <div className="
          mb-4
          flex
          items-center
          gap-3
          rounded-[10px]
          border
          border-green-100
          bg-green-50
          px-5
          py-4
        ">
          <FiCheckCircle
            size={18}
            className="shrink-0 text-green-500"
          />

          <div>
            <p className="text-[11px] font-semibold text-green-700">
              Your account is secure
            </p>

            <p className="mt-1 text-[9px] text-green-600">
              No suspicious login activity has been detected.
            </p>
          </div>
        </div>

        {/* SECURITY SETTINGS */}

        <section className="overflow-hidden rounded-[10px] border border-slate-200 bg-white">

          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">

              <FiShield
                size={15}
                className="text-slate-400"
              />

              <h2 className="text-[12px] font-semibold text-slate-700">
                Security Settings
              </h2>

            </div>
          </div>

          <div className="divide-y divide-slate-100">

            <SecurityRow
              icon={FiLock}
              title="Change Password"
              description="Update your account password regularly."
              action="Change"
              onClick={() => {}}
            />

            <SecurityRow
              icon={FiKey}
              title="Two-Factor Authentication"
              description="Add an additional layer of protection to your account."
              toggle
              enabled={twoFactor}
              onClick={() =>
                setTwoFactor(
                  (current) => !current
                )
              }
            />

            <SecurityRow
              icon={FiMonitor}
              title="Active Sessions"
              description="Review devices currently signed in to your account."
              action="View"
              onClick={() => {}}
            />

          </div>
        </section>
      </div>
    </div>
  );
}

function SecurityRow({
  icon: Icon,
  title,
  description,
  action,
  toggle,
  enabled,
  onClick,
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

      {toggle ? (
        <button
          type="button"
          onClick={onClick}
          className={`
            relative
            h-[20px]
            w-[36px]
            shrink-0
            rounded-full
            transition-colors
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
              ${
                enabled
                  ? "translate-x-[3px]"
                  : "-translate-x-[15px]"
              }
            `}
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="
            rounded-[5px]
            border
            border-slate-200
            px-3
            py-[6px]
            text-[10px]
            font-medium
            text-slate-600
            transition
            hover:border-indigo-200
            hover:bg-indigo-50
            hover:text-indigo-600
          "
        >
          {action}
        </button>
      )}

    </div>
  );
}