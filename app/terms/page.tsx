import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use", description: "These tools are provided for general informational and entertainment purposes. Use them at your own discretion. Screen checks are visual aids and" };

export default function Page() {
  return <main className="policy-page"><p className="section-kicker">SCREEN TOOLS</p><h1>Terms of Use</h1><p>These tools are provided for general informational and entertainment purposes. Use them at your own discretion. Screen checks are visual aids and do not guarantee the detection of display faults. Timers require the page to remain open and may be affected by browser throttling or device sleep. Do not use fictional simulation pages to mislead others about real device status.</p><h2>Using this website</h2><p>Use the controls on each page responsibly and leave fullscreen whenever you want. If you have a hardware concern, consult the device manufacturer or a qualified technician. This page is a starter policy and should be reviewed and customized for the final website and its actual services.</p></main>;
}
