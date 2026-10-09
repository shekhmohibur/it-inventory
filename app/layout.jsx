import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "KKL Inventory",
  description: "IT Asset Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`} suppressHydrationWarning>
      <head>
        <Script id="hydration-cleaner" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              const origError = console.error;
              console.error = function (...args) {
                if (typeof args[0] === 'string' && (args[0].includes('bis_skin_checked') || args[0].includes('hydration-mismatch'))) {
                  return;
                }
                origError.apply(console, args);
              };
            }
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} min-h-screen m-0 p-0 antialiased bg-[#f8fafc] text-slate-800`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}