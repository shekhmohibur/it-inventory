"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { MdInventory2 } from "react-icons/md";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://it.kaizerknitwear.com/static/assets/images/auth/Slaid-1.webp')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/[0.02]" />

      {/* Login container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className="
            w-full max-w-[390px]
            rounded-xl
            border border-white/70
            bg-white/95
            px-8 py-9
            shadow-[0_25px_70px_rgba(0,0,0,0.18)]
            backdrop-blur-sm
          "
        >
          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0edff] to-[#ddd7ff] shadow-sm">
                <img
                src="https://it.kaizerknitwear.com/media/core/branding/logo_IcoB1kA_blIXCOD.png"
                alt="IT Inventory Logo"
                width={30}
                height={30}
                className="object-contain"
                />
            </div>
            </div>


          {/* Header */}
          <div className="text-center">
            <h1 className="text-[25px] font-bold tracking-[-0.5px] text-[#171725]">
              Welcome Back
            </h1>

            <p className="mt-1 text-sm text-[#777783]">
              Sign in to IT Inventory
            </p>
          </div>

          {/* Form */}
          <form className="mt-7">
            {/* Email */}
            <div className="relative">
              <FiMail
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-[#a0a0aa]
                "
                size={17}
              />

              <input
                type="text"
                placeholder="Email or Phone"
                autoComplete="username"
                className="
                  h-12 w-full
                  rounded-xl
                  border border-[#dedee6]
                  bg-white
                  pl-11 pr-4
                  text-sm text-[#25252d]
                  outline-none
                  transition
                  placeholder:text-[#a0a0aa]
                  focus:border-[#654ce4]
                  focus:ring-4 focus:ring-[#654ce4]/10
                "
              />
            </div>

            {/* Password */}
            <div className="relative mt-4">
              <FiLock
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-[#a0a0aa]
                "
                size={17}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                className="
                  h-12 w-full
                  rounded-xl
                  border border-[#dedee6]
                  bg-white
                  pl-11 pr-12
                  text-sm text-[#25252d]
                  outline-none
                  transition
                  placeholder:text-[#a0a0aa]
                  focus:border-[#654ce4]
                  focus:ring-4 focus:ring-[#654ce4]/10
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-4 top-1/2
                  -translate-y-1/2
                  text-[#9999a4]
                  transition
                  hover:text-[#5b45d9]
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FiEyeOff size={17} />
                ) : (
                  <FiEye size={17} />
                )}
              </button>
            </div>

            {/* Remember / Forgot */}
            <div className="mt-4 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-[#70707c]">
                <input
                  type="checkbox"
                  className="
                    h-4 w-4
                    cursor-pointer
                    appearance-none
                    rounded-[4px]
                    border border-[#cfcfd8]
                    bg-white
                    checked:border-[#5b45d9]
                    checked:bg-[#5b45d9]
                  "
                />

                <span>Remember me</span>
              </label>

              <a
                href="#"
                className="
                  text-xs font-semibold
                  text-[#5b45d9]
                  hover:underline
                "
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="
                group
                relative mt-6
                flex h-12 w-full
                items-center justify-center
                rounded-xl
                bg-gradient-to-r
                from-[#6248e8]
                to-[#5135d5]
                text-sm font-semibold
                text-white
                shadow-[0_8px_20px_rgba(91,67,220,0.25)]
                transition-all
                hover:-translate-y-[1px]
                hover:shadow-[0_12px_25px_rgba(91,67,220,0.32)]
                active:translate-y-0
              "
            >
              <span>Sign In</span>

              <FiArrowRight
                size={17}
                className="
                  absolute right-5
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-7 text-center text-xs text-[#9999a3]">
            Don't have an account?

            <a
              href="#"
              className="
                ml-1
                font-semibold
                text-[#5b45d9]
                hover:underline
              "
            >
              Request access
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
