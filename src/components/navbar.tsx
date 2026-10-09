import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import BrowseMenu from "@/components/browse-menu";
import NavbarSearch, { SearchForm } from "@/components/navbar-search";

export default function Navbar() {
  return (
    <header className="relative z-20 border-b-2 border-[#132238] bg-[#dff3ff] text-[#132238]">
      <nav aria-label="Main navigation" className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-8">
        <Link href="/" className="flex w-fit items-center gap-2">
          <Image
            src="/astrobase-moon.svg"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
          />
          <span className="text-lg font-black tracking-tight sm:text-xl">AstroBase</span>
        </Link>

        <div className="relative col-span-2 row-start-2 flex min-w-0 items-center gap-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
          <Suspense fallback={<SearchForm />}>
            <NavbarSearch />
          </Suspense>
          <BrowseMenu />
        </div>

        <div className="col-start-2 row-start-1 flex items-center gap-3 text-sm font-semibold sm:gap-6 lg:col-start-3">
          <Link href="/commands" className="hover:text-[#2457d6]">Commands</Link>
          <Link href="/about" className="hover:text-[#2457d6]">About</Link>
        </div>
      </nav>
    </header>
  );
}
