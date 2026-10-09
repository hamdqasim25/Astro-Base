"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories, environments } from "@/data/filters";

export default function BrowseMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function dismissOutside(event: PointerEvent | FocusEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function dismissEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", dismissOutside);
    // Dismiss only when focus reaches an outside element. A blur with no
    // related target can occur during a tap and must not cancel its click.
    document.addEventListener("focusin", dismissOutside);
    document.addEventListener("keydown", dismissEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("focusin", dismissOutside);
      document.removeEventListener("keydown", dismissEscape);
    };
  }, [open]);

  function focusLink(last = false) {
    const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    if (links?.length) links[last ? links.length - 1 : 0].focus();
  }

  const linkClass = "block px-3 py-2 text-sm font-bold hover:bg-[#fff4a8] focus-visible:bg-[#fff4a8] focus-visible:outline-2 focus-visible:outline-[#2457d6]";

  return (
    <div
      ref={containerRef}
      className="shrink-0"
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="browse-links"
        className="border-2 border-[#132238] bg-[#fff4a8] px-3 py-2 text-sm font-black shadow-[2px_2px_0_#132238] hover:bg-[#ffcf70]"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
            const last = event.key === "ArrowUp";
            requestAnimationFrame(() => focusLink(last));
          }
        }}
      >
        Browse <span aria-hidden="true">▾</span>
      </button>

      <div
        ref={panelRef}
        id="browse-links"
        hidden={!open}
        className="absolute right-0 top-full mt-3 max-h-[70vh] w-full max-w-md overflow-y-auto border-2 border-[#132238] bg-[#fffdf7] p-3 shadow-[4px_4px_0_#132238]"
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) {
            setOpen(false);
            buttonRef.current?.focus();
          }
        }}
        onKeyDown={(event) => {
          const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
          const index = links.indexOf(document.activeElement as HTMLAnchorElement);
          let next: number;
          if (event.key === "ArrowDown") next = (index + 1) % links.length;
          else if (event.key === "ArrowUp") next = (index - 1 + links.length) % links.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = links.length - 1;
          else return;
          event.preventDefault();
          links[next]?.focus();
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <h2 className="px-3 py-2 text-xs font-black uppercase tracking-wider text-[#59728c]">Environments</h2>
            <ul>
              {environments.map((environment) => (
                <li key={environment.slug}><Link href={`/commands/environment/${environment.slug}`} className={linkClass}>{environment.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="px-3 py-2 text-xs font-black uppercase tracking-wider text-[#59728c]">Categories</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.slug}><Link href={`/commands/category/${category.slug}`} className={linkClass}>{category.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <Link href="/commands" className={`${linkClass} mt-3 border-t-2 border-[#132238] text-[#2457d6]`}>View all commands</Link>
      </div>
    </div>
  );
}
