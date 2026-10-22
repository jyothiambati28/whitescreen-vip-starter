import Link from "next/link";
export default function NotFound(){return <main className="wrap" style={{padding:"100px 22px",textAlign:"center"}}><h1>Page not found</h1><p className="sub">This tool may have moved or the URL may be incorrect.</p><p><Link className="primary" href="/">Return to homepage</Link></p></main>}
