"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { tools } from "@/lib/tools";

export function ToolSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools.filter((tool) => tool.popular).slice(0, 5);
    return tools.filter((tool) => `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <div className="search-wrap">
      <button className="header-search" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close tool search" : "Search tools"}>
        {open ? <X size={17} /> : <Search size={17} />}<span>{open ? "Close" : "Search tools"}</span>
      </button>
      {open && <div className="search-popover">
        <label htmlFor="tool-search">Find a screen tool</label>
        <input id="tool-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try white screen or timer…" />
        <div className="search-results">
          {results.map((tool) => <Link href={`/${tool.slug}`} key={tool.slug} onClick={() => setOpen(false)}><span><strong>{tool.title}</strong><small>{tool.description}</small></span><ArrowRight size={15} /></Link>)}
          {results.length === 0 && <p className="search-empty">No matching tools. Try another search.</p>}
        </div>
      </div>}
    </div>
  );
}
