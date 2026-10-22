import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Maximize2, Monitor, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { categories, tools } from "@/lib/tools";

const icons = [Palette, Sparkles, Clock3, Monitor];

export default function HomePage() {
  const popular = tools.filter((tool) => tool.popular);
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> FREE BROWSER-BASED UTILITIES</div>
          <h1>Simple tools for<br /><span>your screen.</span></h1>
          <p className="hero-description">Test display colours, use handy timers, and explore visual effects — all directly in your browser. No installation needed.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/white-screen">Open white screen <ArrowRight size={17} /></Link>
            <Link className="button button-secondary" href="#all-tools">Explore all tools</Link>
          </div>
          <div className="trust-row"><span><CheckCircle2 size={16} /> Free to use</span><span><ShieldCheck size={16} /> Runs in your browser</span><span><Maximize2 size={16} /> Fullscreen tools</span></div>
        </div>
        <div className="hero-preview" aria-label="Colour screen preview">
          <div className="preview-window">
            <div className="preview-top"><span className="window-dots"><i /><i /><i /></span><span>Screen preview</span><span className="preview-status">LIVE</span></div>
            <div className="preview-screen">
              <div className="preview-glow" />
              <span className="preview-screen-label">WHITE SCREEN</span>
              <span className="preview-screen-caption">Clean display · Simple test</span>
            </div>
            <div className="preview-bottom"><span><i className="status-dot" /> Ready to use</span><span>100% browser-based</span></div>
          </div>
          <div className="floating-colours" aria-label="Colour shortcuts">
            {["#ffffff", "#111827", "#ff4040", "#25bd75", "#3977ff", "#ffd43b", "#fa70b8", "#9a65ff"].map((color) => <span key={color} style={{ backgroundColor: color }} />)}
          </div>
        </div>
      </section>

      <section className="quick-colours">
        <div><p className="section-kicker">START WITH A COLOUR</p><h2>One click. Full screen.</h2><p className="muted">Choose a colour to open a simple display test.</p></div>
        <div className="colour-links">
          {tools.filter((tool) => tool.kind === "color").slice(0, 12).map((tool) => <Link href={`/${tool.slug}`} key={tool.slug} className="colour-link" title={tool.title}><span style={{ backgroundColor: tool.color }} />{tool.title.replace(" Screen", "")}</Link>)}
        </div>
      </section>

      <section className="popular-section">
        <div className="section-heading"><div><p className="section-kicker">QUICK ACCESS</p><h2>Popular tools</h2><p className="muted">Useful tools to get started in seconds.</p></div><Link className="text-link" href="#all-tools">View all tools <ArrowRight size={16} /></Link></div>
        <div className="tool-grid">
          {popular.map((tool) => <Link className="tool-card" href={`/${tool.slug}`} key={tool.slug}><span className="tool-card-icon" style={tool.color ? { backgroundColor: `${tool.color}22`, color: tool.color === "#ffffff" ? "#4b5563" : tool.color } : undefined}>{tool.kind === "timer" ? <Clock3 size={22} /> : tool.kind === "stopwatch" ? <Clock3 size={22} /> : <Monitor size={22} />}</span><h3>{tool.title}</h3><p>{tool.description}</p><span className="card-link">Open tool <ArrowRight size={15} /></span></Link>)}
        </div>
      </section>

      <section className="categories-section" id="all-tools">
        <div className="section-heading"><div><p className="section-kicker">BROWSE THE LIBRARY</p><h2>Find the right tool</h2><p className="muted">Explore the collection by category.</p></div><span className="tool-count">{tools.length} tools</span></div>
        {categories.map((category, index) => {
          const Icon = icons[index];
          const items = tools.filter((tool) => tool.category === category);
          return <div className="category-block" key={category}><div className="category-title"><span className="category-icon"><Icon size={20} /></span><div><h3>{category}</h3><p>{items.length} tools</p></div></div><div className="compact-tool-grid">{items.map((tool) => <Link href={`/${tool.slug}`} key={tool.slug} className="compact-tool"><span className="compact-dot" style={tool.color ? { backgroundColor: tool.color, border: tool.color === "#ffffff" ? "1px solid #d1d5db" : undefined } : undefined} /> <span>{tool.title}</span><ArrowRight size={14} /></Link>)}</div></div>;
        })}
      </section>

      <section className="how-section">
        <div className="how-intro"><p className="section-kicker">MADE TO BE SIMPLE</p><h2>Useful tools,<br />without the hassle.</h2><p className="muted">Open a tool, use it, and get back to what you were doing. Most tools work without an account or installation.</p></div>
        <div className="how-steps"><div><span>01</span><h3>Choose a tool</h3><p>Browse by category or use a popular shortcut.</p></div><div><span>02</span><h3>Use the controls</h3><p>Change colours, start timers, or enable fullscreen when available.</p></div><div><span>03</span><h3>Finish whenever</h3><p>Exit fullscreen or return home when you are done.</p></div></div>
      </section>
      <section className="notice-strip"><ShieldCheck size={22} /><p><strong>Your browser, your control.</strong> These tools run on your device. Screen tests are visual aids, not professional diagnostics. Fake screens are clearly labelled simulations.</p></section>
    </main>
  );
}
