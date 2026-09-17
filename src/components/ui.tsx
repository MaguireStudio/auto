import Link from "next/link";
import type { ReactNode } from "react";
import { site, bookingProcess as steps } from "@/content/site";
import { ServiceIcon, IconCheck, IconArrow, IconPhone } from "./Icons";
import type { Service } from "@/content/site";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-ink-100 bg-ink-50">
      <div className="container-x py-14 md:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section className={`${muted ? "bg-ink-50" : ""} ${className}`}>
      <div className="container-x py-16 md:py-24">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-ink-600">{lead}</p>}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-volt-300 hover:shadow-[var(--shadow-lift)]"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-volt-50 text-volt-700 ring-1 ring-volt-100">
        <ServiceIcon name={service.icon} className="h-5.5 w-5.5" />
      </span>
      <h3 className="mt-4 text-lg font-bold leading-snug text-ink-950">{service.name}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-volt-700">
        Learn more
        <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function CheckList({ items, columns = 1 }: { items: readonly string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-700">
          <IconCheck className="mt-1 h-4 w-4 shrink-0 text-volt-600" strokeWidth={2.2} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProcessSteps() {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <li key={s.step} className="relative rounded-xl border border-ink-100 bg-white p-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-950 text-sm font-bold text-volt-400">
            {s.step}
          </span>
          <h3 className="mt-4 text-base font-bold text-ink-950">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function CTABand({
  title = "Need an electrician in Murray?",
  body = "Tell us what's going on and we'll get you a straight answer on scheduling and price.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-ink-950">
      <div className="container-x py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-300">{body}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/request-service" className="btn btn-primary text-[15px]">
              Request service
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost-light text-[15px]">
              <IconPhone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink-100 border-y border-ink-100">
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
            <h3 className="text-[17px] font-semibold leading-snug text-ink-950">{f.q}</h3>
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-transform group-open:rotate-45">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl pr-12 text-[15px] leading-relaxed text-ink-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-extrabold text-ink-950 md:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-ink-500">{label}</p>
    </div>
  );
}
