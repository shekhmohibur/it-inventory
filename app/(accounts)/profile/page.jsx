"use client";

import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiShield,
} from "react-icons/fi";

const user = {
  name: "Sheikh Mohibur Rahman",
  email: "sheikhmohibur01@gmail.com",
  role: "Trainee (IT)",
  department: "Information & Technology",
  employeeId: "600136",
  avatar: "https://i.pravatar.cc/150?img=12",
};

export default function ProfilePage() {
  return (
    <div className="min-h-[calc(100vh-49px)] bg-[#f7f9fc] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[1100px]">

        {/* PAGE HEADER */}

        <div className="mb-5">
          <h1 className="text-[18px] font-semibold text-slate-800">
            My Profile
          </h1>

          <p className="mt-1 text-[11px] text-slate-400">
            View and manage your personal profile information.
          </p>
        </div>

        {/* PROFILE CARD */}

        <div className="overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm">

          {/* TOP */}

          <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="relative shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="
                    h-[76px]
                    w-[76px]
                    rounded-full
                    object-cover
                    ring-2
                    ring-slate-100
                  "
                />

                <span
                  className="
                    absolute
                    bottom-1
                    right-1
                    h-[13px]
                    w-[13px]
                    rounded-full
                    border-2
                    border-white
                    bg-green-500
                  "
                />
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-slate-800">
                  {user.name}
                </h2>

                <p className="mt-1 text-[11px] text-slate-400">
                  {user.email}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="
                    rounded-[5px]
                    bg-indigo-50
                    px-2
                    py-1
                    text-[9px]
                    font-semibold
                    text-indigo-600
                  ">
                    {user.role}
                  </span>

                  <span className="
                    rounded-[5px]
                    bg-green-50
                    px-2
                    py-1
                    text-[9px]
                    font-semibold
                    text-green-600
                  ">
                    Active
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* INFORMATION */}

          <div className="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2">

            <InfoItem
              icon={FiUser}
              label="Full Name"
              value={user.name}
            />

            <InfoItem
              icon={FiMail}
              label="Email Address"
              value={user.email}
            />

            <InfoItem
              icon={FiBriefcase}
              label="Department"
              value={user.department}
            />

            <InfoItem
              icon={FiShield}
              label="Employee ID"
              value={user.employeeId}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="bg-white px-5 py-5 sm:px-7">
      <div className="flex items-start gap-3">

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
          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-[11px] font-medium text-slate-700">
            {value}
          </p>
        </div>

      </div>
    </div>
  );
}