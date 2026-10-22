import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return <main className="policy-page not-found-page"><p className="section-kicker">404 · PAGE NOT FOUND</p><h1>We couldn't find that tool.</h1><p>The page may have moved, or the address may be incorrect. Return to the tool library to find what you need.</p><div className="hero-actions"><Link className="button button-primary" href="/"><ArrowLeft size={16} /> Back to home</Link><Link className="button button-secondary" href="/#all-tools"><Search size={16} /> Browse all tools</Link></div></main>;
}
