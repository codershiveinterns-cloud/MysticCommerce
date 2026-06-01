import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/auth/AuthProvider";
import StoreProvider from "@/components/storefront/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "MysticCommerce | Premium Tech Marketplace",
  description:
    "MysticCommerce is a premium ecommerce storefront for trending electronics, creator gear, gaming accessories, smart gadgets, and lifestyle tech.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#09090b] text-zinc-100 selection:bg-white/10 selection:text-white">
        <AuthProvider>
          <StoreProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
            </div>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
