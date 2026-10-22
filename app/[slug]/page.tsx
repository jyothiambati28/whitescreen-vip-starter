import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Info, Maximize2, Monitor, ShieldCheck } from "lucide-react";
import { getRelatedTools, toolBySlug, tools } from "@/lib/tools";
import { ToolExperience } from "@/components/tool-experience";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (!tool) return { title: "Tool not found" };
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `/${tool.slug}` },
    openGraph: { title: `${tool.title} | Screen Tools`, description: tool.description, type: "website" }
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (!tool) notFound();
  const related = getRelatedTools(tool);
  const isSimulation = tool.kind === "simulation";
  return (
    <main className="tool-page">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{tool.category}</span><span>/</span><strong>{tool.title}</strong></div>
      <div className="tool-heading"><div><p className="section-kicker">{tool.category.toUpperCase()}</p><h1>{tool.title}</h1><p>{tool.description}</p></div><Link href="/" className="back-link"><ArrowLeft size={16} /> All tools</Link></div>
      {isSimulation && <div className="simulation-warning"><Info size={19} /><span><strong>Simulation for entertainment only.</strong> This is not a real system update or live call and does not change your device.</span></div>}
      <ToolExperience tool={tool} />
      <div className="tool-info-grid">
        <section className="info-card"><div className="info-title"><Monitor size={19} /><h2>About {tool.title}</h2></div><p>{tool.details}</p><p>For the best experience, use a current browser and close other overlays or pop-ups that cover the display. Fullscreen mode is optional and can be exited at any time.</p></section>
        <section className="info-card"><div className="info-title"><CheckCircle2 size={19} /><h2>How to use it</h2></div><ol className="steps-list"><li>Open this page in your browser.</li><li>Use the on-screen controls to adjust the tool.</li><li>Select fullscreen if you want the effect to fill your display.</li><li>Press Escape or use the exit control to leave fullscreen.</li></ol></section>
      </div>
      <section className="faq-section"><p className="section-kicker">HELP & TIPS</p><h2>Frequently asked questions</h2><div className="faq-list"><details><summary>Is {tool.title} free to use?</summary><p>Yes. This browser-based tool is free to use and does not require an account.</p></details><details><summary>Do I need to install anything?</summary><p>No installation is required. Open the page in a modern browser and use the available controls.</p></details><details><summary>Can I use fullscreen mode?</summary><p>Yes, where supported. Click the fullscreen control and press Escape or use the exit button to leave fullscreen.</p></details><details><summary>Does this tool diagnose hardware problems?</summary><p>No. Screen test pages are visual aids only and cannot automatically diagnose or confirm hardware faults. For persistent issues, check your device manufacturer's guidance.</p></details><details><summary>Does this page collect my screen contents?</summary><p>This tool does not need to capture your screen contents to display its visual effects. Your browser may still process standard site and hosting requests.</p></details></div></section>
      {related.length > 0 && <section className="related-section"><div className="section-heading"><div><p className="section-kicker">KEEP EXPLORING</p><h2>Related tools</h2></div><Link href="/#all-tools" className="text-link">All tools <ArrowRight size={16} /></Link></div><div className="related-grid">{related.map((item) => <Link href={`/${item.slug}`} key={item.slug} className="related-card"><span className="related-dot" style={item.color ? { background: item.color, border: item.color === "#ffffff" ? "1px solid #d1d5db" : undefined } : undefined} /><span><strong>{item.title}</strong><small>{item.description}</small></span><ArrowRight size={16} /></Link>)}</div></section>}
      <p className="tool-disclaimer"><ShieldCheck size={16} /> ScreenTools provides browser utilities for general use. Screen test results are not professional diagnostics; simulations are fictional and for entertainment.</p>
    </main>
  );
}
