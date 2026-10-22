import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
export default function sitemap():MetadataRoute.Sitemap { const base="https://whitescreen.vip";return [{url:base,changeFrequency:"weekly",priority:1},...tools.map(t=>({url:`${base}/${t.slug}`,changeFrequency:"monthly" as const,priority:t.category==="Screen Tests"?0.8:0.6}))] }
