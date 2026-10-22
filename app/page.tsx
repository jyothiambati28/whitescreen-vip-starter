import HomeClient from "@/components/HomeClient";
export default async function Home({searchParams}:{searchParams:Promise<{q?:string;category?:string}>}) { const params=await searchParams; return <HomeClient query={params.q||""} category={params.category||""}/> }
