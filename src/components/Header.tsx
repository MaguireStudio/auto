"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { IconPhone, IconBolt, IconAlert } from "./Icons";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/residential", label: "Residential" },
  { href: "/commercial", label: "Commercial" },
  { href: "/service-area", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {site.emergencyService && (
        <div className="bg-ink-950 text-ink-100">
          <div className="container-x flex items-center justify-center gap-2 py-2 text-center text-[13px]">
            <IconAlert className="hidden h-4 w-4 shrink-0 text-volt-400 sm:block" />
            <span>
              Power out, sparks, or a burning smell?{" "}
              <a href={site.phoneHref} className="font-semibold text-volt-400 underline underline-offset-2">
                Call {site.phone}
              </a>{" "}
              <span className="hidden sm:inline">— don&apos;t wait on the form.</span>
            </span>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/95 backdrop-blur">
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-950">
              <IconBolt className="h-5 w-5 text-volt-400" strokeWidth={2} />
            </span>
            <span className="leading-tight">
              <span className="block text-[17px] font-extrabold tracking-tight text-ink-950">
                {site.name}
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-ink-400">
                Murray, Kentucky
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-[15px] font-medium transition-colors ${
                    active ? "text-volt-700" : "text-ink-600 hover:text-ink-950"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-[15px] font-bold text-ink-950 hover:text-volt-700 md:flex"
            >
              <IconPhone className="h-4 w-4" />
              {site.phone}
            </a>
            <Link href="/request-service" className="btn btn-primary hidden text-sm sm:inline-flex">
              Request Service
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink-200 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-5 bg-ink-900 transition-transform ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-ink-900 transition-opacity ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 bg-ink-900 transition-transform ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-nav" className="border-t border-ink-100 bg-white lg:hidden">
            <nav className="container-x flex flex-col py-3" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-ink-50 py-3.5 text-[17px] font-medium text-ink-900"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/reviews" className="border-b border-ink-50 py-3.5 text-[17px] font-medium text-ink-900">
                Reviews
              </Link>
              <Link href="/contact" className="border-b border-ink-50 py-3.5 text-[17px] font-medium text-ink-900">
                Contact
              </Link>
              <div className="flex flex-col gap-2.5 pt-4 pb-2">
                <Link href="/request-service" className="btn btn-primary w-full">
                  Request Service
                </Link>
                <a href={site.phoneHref} className="btn btn-outline w-full">
                  <IconPhone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
