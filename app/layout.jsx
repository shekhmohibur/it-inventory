import { Inter } from "next/font/google";
import { getOrganizationData } from "@/lib/getOrg";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const org = await getOrganizationData();

  const title =
    org.globalMetaTitle && org.globalMetaTitle !== "notfound"
      ? org.globalMetaTitle
      : org.shortName && org.shortName !== "notfound"
      ? `${org.shortName} | Inventory System`
      : "KKL Inventory";

  const description =
    org.metaDescription && org.metaDescription !== "notfound"
      ? org.metaDescription
      : org.businessName && org.businessName !== "notfound"
      ? `${org.businessName} IT Asset Management`
      : "notfound";

  const hasFavicon =
    org.favicon && org.favicon !== "notfound" && org.favicon.trim() !== "";
  const faviconUrl = hasFavicon ? `${org.favicon}?v=${Date.now()}` : "/favicon.ico";

  return {
    title,
    description,
    icons: {
      icon: [{ url: faviconUrl, href: faviconUrl }],
      shortcut: [faviconUrl],
      apple: [faviconUrl],
    },
  };
}

export default async function RootLayout({ children }) {
  const org = await getOrganizationData();

  const primaryColor =
    org?.primaryColor && org.primaryColor !== "notfound"
      ? org.primaryColor
      : "#5046e5";

  const secondaryColor =
    org?.secondaryColor && org.secondaryColor !== "notfound"
      ? org.secondaryColor
      : "#161338";

  const accentColor =
    org?.accentColor && org.accentColor !== "notfound"
      ? org.accentColor
      : "#f59e0b";

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Dynamic theme colors passed from database */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --brand-primary: ${primaryColor};
                --brand-secondary: ${secondaryColor};
                --brand-accent: ${accentColor};
              }
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen m-0 p-0 antialiased bg-[#f8fafc] text-slate-800"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}