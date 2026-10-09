"use client";

import { useEffect } from "react";

export function HydrationFix() {
  useEffect(() => {
    // Clean up any attributes injected prior to or during hydration
    const elements = document.querySelectorAll("[bis_skin_checked]");
    elements.forEach((el) => el.removeAttribute("bis_skin_checked"));
  }, []);

  return null;
}