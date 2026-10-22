import type { Metadata } from "next";

export const metadata: Metadata = { title: "Disclaimer", description: "ScreenTools is an independent utility website. Any operating-system-style screens are fictional simulations and are not affiliated with or endors" };

export default function Page() {
  return <main className="policy-page"><p className="section-kicker">SCREEN TOOLS</p><h1>Disclaimer</h1><p>ScreenTools is an independent utility website. Any operating-system-style screens are fictional simulations and are not affiliated with or endorsed by the owners of third-party brands. A visual screen test cannot confirm a hardware defect or replace advice from your device manufacturer.</p><h2>Using this website</h2><p>Use the controls on each page responsibly and leave fullscreen whenever you want. If you have a hardware concern, consult the device manufacturer or a qualified technician. This page is a starter policy and should be reviewed and customized for the final website and its actual services.</p></main>;
}
