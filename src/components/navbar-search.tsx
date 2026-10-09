"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function SearchForm({ query = "" }: { query?: string }) {
  return (
    <form action="/commands" method="get" role="search" className="flex min-w-0 flex-1 border-2 border-[#132238] bg-white shadow-[2px_2px_0_#132238]">
      <label htmlFor="command-search" className="sr-only">Search commands</label>
      <input
        key={query}
        id="command-search"
        name="q"
        type="search"
        defaultValue={query}
        placeholder="Search commands..."
        className="w-full min-w-0 bg-transparent px-3 py-2 text-base outline-none placeholder:text-[#71859a] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2457d6]"
      />
      <button type="submit" aria-label="Search commands" className="shrink-0 border-l-2 border-[#132238] bg-[#2457d6] px-3 text-white hover:bg-[#1744b2]">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 5 5" />
        </svg>
      </button>
    </form>
  );
}

export default function NavbarSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = pathname === "/commands" ? searchParams.get("q") ?? "" : "";

  return <SearchForm key={`${pathname}?${searchParams.toString()}`} query={query} />;
}
