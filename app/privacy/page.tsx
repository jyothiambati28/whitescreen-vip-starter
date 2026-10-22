import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "The tools are designed to run in your browser and do not need to capture your screen contents. Standard hosting infrastructure may process techni" };

export default function Page() {
  return <main className="policy-page"><p className="section-kicker">SCREEN TOOLS</p><h1>Privacy Policy</h1><p>The tools are designed to run in your browser and do not need to capture your screen contents. Standard hosting infrastructure may process technical request data such as IP address, browser information, and request logs. If you add analytics, advertising, forms, or third-party services, update this policy to accurately describe those services before launch.</p><h2>Using this website</h2><p>Use the controls on each page responsibly and leave fullscreen whenever you want. If you have a hardware concern, consult the device manufacturer or a qualified technician. This page is a starter policy and should be reviewed and customized for the final website and its actual services.</p></main>;
}
