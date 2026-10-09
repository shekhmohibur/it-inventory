"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  Camera,
  Check,
  AlertCircle,
  Save,
  Loader2,
  ShieldCheck,
  CreditCard,
  Lock,
} from "lucide-react";
import { updateProfileAction } from "@/app/actions/profile";

export function ProfileEditor({ initialUser }) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [previewImage, setPreviewImage] = useState(initialUser?.image || null);
  const fileInputRef = useRef(null);

  const displayName = initialUser?.fullName || "not found";
  const displayRole = initialUser?.role || "not found";
  const displayDept = initialUser?.department || "Not Assigned";
  const displayStatus = initialUser?.status || "not found";
  const designation = initialUser?.designation || "not found";
  const cardNumber = initialUser?.cardNumber || "N/A";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "IT";

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("Image size exceeds 5MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const formData = new FormData(e.currentTarget);
      const res = await updateProfileAction(formData);

      if (res?.error) {
        // Enforce string type to prevent rendering objects as React children
        const message =
          typeof res.error === "object"
            ? res.error.message || JSON.stringify(res.error)
            : String(res.error);
        setErrorMsg(message);
      } else {
        setSuccessMsg("Profile details saved successfully.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      const fallbackErr =
        err?.message || "Failed to update profile. Please try again.";
      setErrorMsg(String(fallbackErr));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
      {/* Success Message Banner */}
      {Boolean(successMsg) && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{String(successMsg)}</span>
        </div>
      )}

      {/* Error Message Banner (Guaranteed String Output) */}
      {Boolean(errorMsg) && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{String(errorMsg)}</span>
        </div>
      )}

      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-[#161338] px-6 relative flex items-end">
          <div className="absolute -bottom-8 flex items-end gap-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md border-4 border-white overflow-hidden bg-cover bg-center">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={displayName}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/45 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-4 border-transparent"
                title="Change Photo"
              >
                <Camera className="w-5 h-5 drop-shadow" />
                <span className="text-[9px] font-semibold mt-0.5">Edit</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="pt-12 px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 capitalize">
                {displayName}
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                {designation} &bull; {displayDept}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {displayStatus}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                {displayRole}
              </span>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 text-xs">
            {/* Card / Employee ID Number (LOCKED) */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                  Card Number / Punch ID
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-normal">
                  <Lock className="w-3 h-3" /> System Locked
                </span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={cardNumber}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 focus:outline-none cursor-not-allowed select-none font-medium"
              />
            </div>

            {/* Official Email (LOCKED) */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Official Email
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-normal">
                  <Lock className="w-3 h-3" /> System Locked
                </span>
              </label>
              <input
                type="email"
                readOnly
                defaultValue={initialUser?.email || ""}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 focus:outline-none cursor-not-allowed select-none font-medium"
              />
            </div>

            {/* Full Name (EDITABLE) */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                defaultValue={displayName}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Phone Number (EDITABLE) */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                Phone Number / Extension
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={initialUser?.phone || ""}
                placeholder="e.g. 01849314613"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Department (LOCKED) */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Department
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-normal">
                  <Lock className="w-3 h-3" /> Assigned by Admin
                </span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={displayDept}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 focus:outline-none cursor-not-allowed select-none font-medium"
              />
            </div>

            {/* Official Designation (LOCKED) */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  Official Designation
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-normal">
                  <Lock className="w-3 h-3" /> Assigned by Admin
                </span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={designation}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 focus:outline-none cursor-not-allowed select-none font-medium"
              />
            </div>

            {/* Account Created (LOCKED) */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Account Created
              </label>
              <input
                type="text"
                readOnly
                defaultValue={
                  initialUser?.createdAt
                    ? new Date(initialUser.createdAt).toLocaleDateString()
                    : "Active"
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 focus:outline-none cursor-not-allowed select-none font-medium"
              />
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfileEditor;