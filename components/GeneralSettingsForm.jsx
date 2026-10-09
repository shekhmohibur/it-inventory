"use client";

import React, { useState } from "react";
import {
  Lock,
  Bell,
  Globe,
  Shield,
  Save,
  Check,
  AlertCircle,
  Loader2,
  KeyRound,
  Sliders,
  Laptop,
} from "lucide-react";
import { changePasswordAction } from "@/app/actions/settings";

export function GeneralSettingsForm({ user }) {
  // Password State
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState("");
  const [pwdError, setPwdError] = useState("");

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(false);
  const [prefSaved, setPrefSaved] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwdLoading(true);
    setPwdSuccess("");
    setPwdError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await changePasswordAction(formData);

    setPwdLoading(false);
    if (res?.error) {
      setPwdError(res.error);
    } else {
      setPwdSuccess("Your password has been updated successfully.");
      form.reset();
      setTimeout(() => setPwdSuccess(""), 4000);
    }
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Account Security & Password Change */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Password & Security
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Update your account credentials to keep your inventory access secure.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="p-5 sm:p-6 space-y-4">
          {pwdSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{pwdSuccess}</span>
            </div>
          )}

          {pwdError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{pwdError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                required
                placeholder="••••••••"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                required
                placeholder="At least 6 characters"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Re-type new password"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={pwdLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-70"
            >
              {pwdLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 2. System Notification Preferences */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Notification Preferences
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose which operational updates and system notices you wish to receive.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6 divide-y divide-slate-100 text-xs">
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-semibold text-slate-800">Email Notifications</div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Receive important inventory requisition updates and account notices.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                emailAlerts ? "bg-indigo-600" : "bg-slate-200"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  emailAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-semibold text-slate-800">Low Stock & Hardware Alerts</div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Alerts when consumables (toners, ethernet cables, routers) reach minimum levels.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setInventoryAlerts(!inventoryAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                inventoryAlerts ? "bg-indigo-600" : "bg-slate-200"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  inventoryAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-semibold text-slate-800">Maintenance & Service Reminders</div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Notifications for scheduled hardware servicing, UPS battery health, and warranty expirations.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMaintenanceAlerts(!maintenanceAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                maintenanceAlerts ? "bg-indigo-600" : "bg-slate-200"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  maintenanceAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Localization & Regional Settings */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Regional & Workspace Format
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Set standard date formats, default timezone, and system language.
            </p>
          </div>
        </div>

        <form onSubmit={handleSavePreferences} className="p-5 sm:p-6 space-y-4">
          {prefSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Workspace preferences saved.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">System Language</label>
              <select
                defaultValue="en"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white cursor-pointer"
              >
                <option value="en">English (US)</option>
                <option value="bn">Bengali (বাংলা)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Timezone</label>
              <select
                defaultValue="Asia/Dhaka"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white cursor-pointer"
              >
                <option value="Asia/Dhaka">(GMT+06:00) Dhaka</option>
                <option value="UTC">(GMT+00:00) UTC</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Date Format</label>
              <select
                defaultValue="DD/MM/YYYY"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white cursor-pointer"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 09/10/2026)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 10/09/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>

      {/* 4. Active Session Information */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
            <Laptop className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              Active Browser Session
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Current Device
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Authenticated via Enterprise JWT &bull; Expires in 7 days
            </div>
          </div>
        </div>

        <div className="text-right text-[11px] text-slate-400">
          User ID: <span className="font-mono text-slate-600">{user?.id || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}