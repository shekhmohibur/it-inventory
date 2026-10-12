"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Save,
  Check,
  AlertCircle,
  Loader2,
  Globe,
  Upload,
} from "lucide-react";
import { saveOrganizationAction } from "@/app/actions/organization";

export function OrganizationEditor({ initialData }) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const formData = new FormData(e.currentTarget);
      const res = await saveOrganizationAction(formData);

      if (res?.error) {
        setErrorMsg(String(res.error));
      } else {
        setSuccessMsg("Organization configuration saved successfully.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      setErrorMsg(err?.message || "Failed to submit configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-700">
      {/* Alert Messages */}
      {Boolean(successMsg) && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{String(successMsg)}</span>
        </div>
      )}
      {Boolean(errorMsg) && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{String(errorMsg)}</span>
        </div>
      )}

      {/* Main Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: 2 Cols Wide */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. General Information Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              General Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  defaultValue={initialData?.businessName !== "notfound" ? initialData.businessName : ""}
                  placeholder="Kaizer Knitwears Ltd."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Short Name</label>
                <input
                  type="text"
                  name="shortName"
                  defaultValue={initialData?.shortName !== "notfound" ? initialData.shortName : ""}
                  placeholder="KKL INVENTORY"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  name="emailAddress"
                  defaultValue={initialData?.emailAddress !== "notfound" ? initialData.emailAddress : ""}
                  placeholder="it@kaizerknitwear.com"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  defaultValue={initialData?.phoneNumber !== "notfound" ? initialData.phoneNumber : ""}
                  placeholder="01799925246"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Physical Address</label>
              <textarea
                name="physicalAddress"
                rows={2}
                defaultValue={initialData?.physicalAddress !== "notfound" ? initialData.physicalAddress : ""}
                placeholder="Nayapara, Kashimpur, Gazipur-1346, Bangladesh"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Working Hours</label>
              <textarea
                name="workingHours"
                rows={2}
                defaultValue={initialData?.workingHours !== "notfound" ? initialData.workingHours : ""}
                placeholder="24/7"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Footer Description</label>
              <textarea
                name="footerDescription"
                rows={2}
                defaultValue={initialData?.footerDescription !== "notfound" ? initialData.footerDescription : ""}
                placeholder="© 2026 All Rights Reserved."
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">System Timezone</label>
              <input
                type="text"
                name="systemTimezone"
                defaultValue={initialData?.systemTimezone !== "notfound" ? initialData.systemTimezone : "UTC"}
                placeholder="UTC"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          {/* 2. SEO & Metadata Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              SEO & Metadata
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Global Meta Title</label>
                <input
                  type="text"
                  name="globalMetaTitle"
                  defaultValue={initialData?.globalMetaTitle !== "notfound" ? initialData.globalMetaTitle : ""}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Meta Keywords</label>
                <input
                  type="text"
                  name="metaKeywords"
                  defaultValue={initialData?.metaKeywords !== "notfound" ? initialData.metaKeywords : ""}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Meta Description</label>
              <textarea
                name="metaDescription"
                rows={2}
                defaultValue={initialData?.metaDescription !== "notfound" ? initialData.metaDescription : ""}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Robots.txt Content</label>
              <textarea
                name="robotsTxt"
                rows={3}
                defaultValue={initialData?.robotsTxt !== "notfound" ? initialData.robotsTxt : "User-agent: *\nDisallow: /"}
                placeholder="Configure rules for search engine bots."
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-slate-800 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-y"
              />
            </div>
          </div>

          {/* 3. Social Media Links Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Social Media Links
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Facebook URL</label>
                <input
                  type="url"
                  name="facebookUrl"
                  defaultValue={initialData?.facebookUrl !== "notfound" ? initialData.facebookUrl : ""}
                  placeholder="https://facebook.com/..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Instagram URL</label>
                <input
                  type="url"
                  name="instagramUrl"
                  defaultValue={initialData?.instagramUrl !== "notfound" ? initialData.instagramUrl : ""}
                  placeholder="https://instagram.com/..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Twitter/X URL</label>
                <input
                  type="url"
                  name="twitterUrl"
                  defaultValue={initialData?.twitterUrl !== "notfound" ? initialData.twitterUrl : ""}
                  placeholder="https://x.com/..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">YouTube URL</label>
                <input
                  type="url"
                  name="youtubeUrl"
                  defaultValue={initialData?.youtubeUrl !== "notfound" ? initialData.youtubeUrl : ""}
                  placeholder="https://youtube.com/..."
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 1 Col Wide */}
        <div className="space-y-6">
          {/* Branding & Media Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Branding & Media
            </h2>

            {/* Main Logo */}
            <div className="space-y-2">
              <span className="font-semibold text-slate-700 block">Main Logo</span>
              <div className="w-16 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                {initialData?.mainLogo !== "notfound" ? (
                  <Image
                    src={initialData.mainLogo}
                    alt="Logo"
                    width={48}
                    height={36}
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  <Globe className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <input
                type="file"
                name="mainLogo"
                accept="image/png, image/jpeg, image/jpg"
                className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">
                Allowed file types: png, jpg, jpeg. Max 2MB.
              </span>
            </div>

            {/* Favicon */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-700 block">Favicon</span>
              <div className="w-12 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                {initialData?.favicon !== "notfound" ? (
                  <Image
                    src={initialData?.favicon}
                    alt="Favicon"
                    width={40}
                    height={32}
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  <Globe className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <input
                type="file"
                name="favicon"
                accept="image/*"
                className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">
                Best size: 32x32px or 16x16px.
              </span>
            </div>

            {/* OG Image */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-700 block">OG Image (Social Share)</span>
              <input
                type="file"
                name="ogImage"
                accept="image/*"
                className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
              />
            </div>

            {/* Official Signature */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-700 block">Official Signature</span>
              <input
                type="file"
                name="officialSignature"
                accept="image/*"
                className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
              />
            </div>

            {/* Theme Colors */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-700 block">Theme Colors</span>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500">
                <div>
                  <span className="block mb-1">Primary</span>
                  <input
                    type="color"
                    name="primaryColor"
                    defaultValue={initialData?.primaryColor !== "notfound" ? initialData.primaryColor : "#5046e5"}
                    className="w-full h-8 rounded-lg cursor-pointer border border-slate-200"
                  />
                </div>
                <div>
                  <span className="block mb-1">Secondary</span>
                  <input
                    type="color"
                    name="secondaryColor"
                    defaultValue={initialData?.secondaryColor !== "notfound" ? initialData.secondaryColor : "#161338"}
                    className="w-full h-8 rounded-lg cursor-pointer border border-slate-200"
                  />
                </div>
                <div>
                  <span className="block mb-1">Accent</span>
                  <input
                    type="color"
                    name="accentColor"
                    defaultValue={initialData?.accentColor !== "notfound" ? initialData.accentColor : "#f59e0b"}
                    className="w-full h-8 rounded-lg cursor-pointer border border-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Analytics
            </h2>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">GA4 ID</label>
              <input
                type="text"
                name="ga4Id"
                defaultValue={initialData?.ga4Id !== "notfound" ? initialData.ga4Id : ""}
                placeholder="Ex: G-XXXXXXXXXX"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Facebook Pixel ID</label>
              <input
                type="text"
                name="fbPixelId"
                defaultValue={initialData?.fbPixelId !== "notfound" ? initialData.fbPixelId : ""}
                placeholder="Ex: 123456789012345"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white font-mono"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Configuration...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Organization</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}