import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Learn how to share feedback about the ScreenTools website."
};

export default function FeedbackPage() {
  return <main className="policy-page"><p className="section-kicker">HELP US IMPROVE</p><h1>Feedback</h1><p>Feedback helps identify confusing controls, broken pages, and useful new tools. This starter project does not yet include a connected feedback submission service, so it does not collect or send messages from this page.</p><h2>What to include</h2><p>If you share feedback with the site owner through their chosen support channel, include the tool page URL, the device and browser you use, what you expected to happen, and what actually happened. Avoid including passwords or other sensitive information.</p><p><Link className="text-link" href="/#all-tools">Browse all tools →</Link></p></main>;
}
