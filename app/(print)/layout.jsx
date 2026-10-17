export const metadata = {
  title: "Print Preview | KKL Inventory",
};

export default function PrintRootLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 print:bg-white text-slate-800 antialiased font-sans">
      {children}
    </div>
  );
}