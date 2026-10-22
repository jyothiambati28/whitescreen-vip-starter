import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool, tools } from "@/lib/tools";
import ToolClient from "@/components/ToolClient";
export function generateStaticParams(){return tools.map(t=>({slug:t.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const tool=getTool(slug);if(!tool)return {};return {title:tool.title,description:tool.description,alternates:{canonical:`/${tool.slug}`},openGraph:{title:`${tool.title} | WhiteScreen.vip`,description:tool.description}}}
export default async function ToolPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const tool=getTool(slug);if(!tool)notFound();return <ToolClient tool={tool}/>}
