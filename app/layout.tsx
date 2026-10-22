import type { Metadata } from "next";
import Link from "next/link";
import { Monitor, Github, Search } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whitescreen-vip-starter.vercel.app"),
  title: {
    default: "Free Online Screen Tools",
    template: "%s | Screen Tools"
  },
  description: "Free browser-based screen colour tests, display utilities, timers, screensavers, and clearly labelled visual simulations.",
  openGraph: {
    title: "Free Online Screen Tools",
    description: "Simple browser-based screen tests and visual tools.",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="brand" aria-label="Screen Tools home">
              <span className="brand-mark"><Monitor size={21} /></span>
              <span>Screen<span className="brand-accent">Tools</span></span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/white-screen">Screen Tests</Link>
              <Link href="/static-screen">Effects</Link>
              <Link href="/countdown-timer">Timers</Link>
              <Link href="/fake-windows-11-update">Fake Screens</Link>
            </nav>
            <Link href="/#all-tools" className="header-search"><Search size={17} /><span>Explore tools</span></Link>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div>
              <Link href="/" className="brand footer-brand"><span className="brand-mark"><Monitor size={19} /></span><span>Screen<span className="brand-accent">Tools</span></span></Link>
              <p>Simple, free screen utilities that run in your browser.</p>
            </div>
            <div className="footer-links">
              <Link href="/about">About</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/disclaimer">Disclaimer</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <p className="copyright">© {new Date().getFullYear()} ScreenTools. Free browser utilities.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
