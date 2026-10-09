import { Inter } from "next/font/google";
import { getOrganizationData } from "@/lib/getOrg";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata() {
  const org = await getOrganizationData();
  console.log(org);
  
  const title =
    org.globalMetaTitle !== "notfound"
      ? org.globalMetaTitle
      : org.shortName !== "notfound"
      ? `${org.shortName} | Inventory System`
      : "notfound";

  const description =
    org.metaDescription !== "notfound"
      ? org.metaDescription
      : org.businessName !== "notfound"
      ? `${org.businessName} IT Asset Management`
      : "notfound";

  return {
    title,
    description,
    icons: {
      icon: org.favicon !== "notfound" ? org.favicon : "/favicon.ico",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className="min-h-screen m-0 p-0 antialiased bg-[#f8fafc] text-slate-800"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}