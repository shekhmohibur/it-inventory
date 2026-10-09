"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Lock,
  Clock,
  ArrowLeft,
  Layers,
  AlertCircle,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { requestAccessAction } from "@/app/actions/auth";
import { DEPARTMENTS, DESIGNATIONS } from "@/lib/constants";

export default function RegisterPage() {
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await requestAccessAction(formData);

    setLoading(false);

    if (result.error) {
      setErrorMsg(result.error);
    } else if (result.success) {
      setIsPendingApproval(true);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative font-sans"
      style={{ backgroundImage: `url('/images/building-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-slate-900/15 backdrop-blur-[1px]" />

      <div className="w-full max-w-[430px] bg-white rounded-2xl shadow-2xl p-7 sm:p-8 relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
            <Layers className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {isPendingApproval ? (
          <div className="text-center py-4 animate-in fade-in duration-300">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 mb-3">
              Approval Pending
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Request Submitted
            </h2>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Your account registration request has been dispatched to the IT Administrator.
            </p>

            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-[11px] text-slate-500 space-y-1">
              <div>&bull; Verification usually completes within <strong>1–2 business hours</strong>.</div>
              <div>&bull; You will receive system access once authorized by the administrator.</div>
            </div>

            <div className="mt-6">
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Request Access
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your official employee details
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Employee Card / ID Number */}
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="cardNumber"
                  required
                  placeholder="Card Number / Punch ID"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              {/* Full Name */}
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Full Name"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              {/* Official Email */}
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Official Email"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              {/* Phone Number */}
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Contact / Extension"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              {/* Dropdowns: Department & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Department Dropdown */}
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="department"
                    required
                    defaultValue=""
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-8 pr-7 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Designation Dropdown */}
                <div className="relative">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="designation"
                    required
                    defaultValue=""
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-8 pr-7 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Designation</option>
                    {DESIGNATIONS.map((desig) => (
                      <option key={desig} value={desig}>
                        {desig}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Create Password"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-70"
              >
                <span>{loading ? "Submitting Request..." : "Request Access"}</span>
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 mt-5 pt-3 border-t border-slate-100">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Sign in.
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}