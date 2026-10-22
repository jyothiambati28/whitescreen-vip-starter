import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

const baseUrl = "https://whitescreen-vip-starter.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...tools.map((tool) => ({ url: `${baseUrl}/${tool.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: tool.popular ? 0.8 : 0.6 })),
    ...["about", "contact", "privacy", "terms", "disclaimer"].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 }))
  ];
}
