import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://whitescreen.vip"),
  title: { default: "WhiteScreen.vip — Free Screen Tools & Display Tests", template: "%s | WhiteScreen.vip" },
  description: "Free online white, black and colour screens, monitor tests, screen effects, timers and fun simulated screens. Works in your browser.",
  robots: { index: true, follow: true },
  openGraph: { title: "WhiteScreen.vip — Free Screen Tools", description: "Browser-based screen tools, display tests and effects.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
