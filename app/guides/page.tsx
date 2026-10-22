import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Palette, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Screen Testing Guides",
  description: "Practical guides to visual screen checks, colour tests, fullscreen use, and the limits of browser-based display tools."
};

const guides = [
  { title: "How to check your screen for dead pixels", description: "Cycle through solid colours and inspect your display carefully. Learn what this visual check can and cannot tell you.", href: "/dead-pixel-test", icon: Monitor },
  { title: "How to use a white screen to inspect your monitor", description: "Use a clean white field to look for visible dust, smudges, and uneven brightness.", href: "/white-screen", icon: Palette },
  { title: "Understanding screen uniformity tests", description: "Compare solid colour and gray fields while keeping viewing angle and room lighting in mind.", href: "/screen-uniformity-test", icon: ShieldCheck }
];

export default function GuidesPage() {
  return <main className="policy-page"><p className="section-kicker">LEARN & EXPLORE</p><h1>Screen testing guides</h1><p>Use these practical starting points to understand browser-based display checks. These guides support visual inspection but cannot replace professional diagnostics or calibration.</p><div className="guide-grid">{guides.map((guide) => { const Icon = guide.icon; return <Link href={guide.href} className="tool-card" key={guide.title}><span className="tool-card-icon"><Icon size={22} /></span><h3>{guide.title}</h3><p>{guide.description}</p><span className="card-link">Open tool <ArrowRight size={15} /></span></Link>; })}</div></main>;
}
