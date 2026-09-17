import Link from "next/link";
import type { Metadata } from "next";
import {
  site,
  popularServices,
  residentialServices,
  commercialServices,
  serviceArea,
  generalFaqs,
  testimonials,
  testimonialsArePlaceholder,
} from "@/content/site";
import {
  Section,
  SectionHead,
  ServiceCard,
  ProcessSteps,
  CTABand,
  FaqList,
  CheckList,
  Stat,
} from "@/components/ui";
import { IconPhone, IconArrow, IconCheck, IconBolt, IconPin, IconClock } from "@/components/Icons";
import { JsonLd, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Electricians in Murray, KY | ${site.name}`,
  description:
    "Licensed residential and commercial electricians serving Murray, Kentucky and Calloway County. Panel upgrades, generators, EV chargers, repairs, and commercial electrical. Upfront pricing.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const yearsInBusiness = new Date().getFullYear() - site.foundedYear;

  return (
    <>
      <JsonLd data={faqSchema(generalFaqs.slice(0, 5))} />

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-ink-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-volt-500/15 blur-3xl"
        />

        <div className="container-x relative py-20 md:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-3.5 py-1.5 text-xs font-semibold text-volt-400">
                <IconBolt className="h-3.5 w-3.5" strokeWidth={2.2} />
                Licensed &amp; insured in Kentucky
              </p>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.4rem]">
                Electricians Murray
                <br />
                <span className="text-volt-400">actually calls back.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
                Panel upgrades, generators, EV chargers, troubleshooting, and full commercial
                electrical — across Calloway, Marshall, Graves, and Trigg counties. You get a real
                appointment window and a price you approve before we start.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/request-service" className="btn btn-primary text-base">
                  Request service
                  <IconArrow className="h-4 w-4" />
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost-light text-base">
                  <IconPhone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
                {["Upfront, approved pricing", "Permits pulled and inspected", "Clean, labeled work"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-ink-300">
                      <IconCheck className="h-4 w-4 shrink-0 text-volt-400" strokeWidth={2.4} />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Quick-start card */}
            <div className="rounded-2xl border border-ink-800 bg-ink-900/70 p-7 backdrop-blur">
              <h2 className="text-xl font-bold text-white">What do you need done?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">
                Pick the closest match and we&apos;ll start your request there.
              </p>
              <div className="mt-5 space-y-2">
                {popularServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/request-service?service=${s.slug}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-ink-800 bg-ink-950/60 px-4 py-3.5 text-[15px] font-medium text-ink-200 transition-colors hover:border-volt-500 hover:text-white"
                  >
                    {s.name}
                    <IconArrow className="h-4 w-4 shrink-0 text-volt-500" />
                  </Link>
                ))}
                <Link
                  href="/request-service"
                  className="flex items-center justify-between gap-4 rounded-lg border border-ink-800 bg-ink-950/60 px-4 py-3.5 text-[15px] font-medium text-ink-200 transition-colors hover:border-volt-500 hover:text-white"
                >
                  Something else
                  <IconArrow className="h-4 w-4 shrink-0 text-volt-500" />
                </Link>
              </div>
              <div className="mt-6 flex items-start gap-2.5 border-t border-ink-800 pt-5 text-xs leading-relaxed text-ink-400">
                <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-volt-500" />
                <span>
                  Requests sent during office hours usually get a reply the same day. Emergencies
                  should always be a phone call.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Trust bar ---------------- */}
      <div className="border-b border-ink-100 bg-white">
        <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          <Stat value={`${yearsInBusiness}+`} label="Years serving West Kentucky" />
          <Stat value={`${serviceArea.radiusMiles} mi`} label="Service radius from Murray" />
          <Stat value="5" label="Counties covered" />
          <Stat value="100%" label="Licensed &amp; insured" />
        </div>
      </div>

      {/* ---------------- Value props ---------------- */}
      <Section>
        <SectionHead
          eyebrow="Why NORS"
          title="Trade work done right, explained in plain English"
          lead="Electrical work is easy to hide and expensive to redo. We'd rather show you what we found and let you decide."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {site.valueProps.map((v) => (
            <div key={v.title} className="rounded-xl border border-ink-100 bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-950">
                <IconCheck className="h-5 w-5 text-volt-400" strokeWidth={2.4} />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink-950">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- Services ---------------- */}
      <Section muted>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="What we do"
            title="Electrical service for homes and businesses"
            lead="From a dead outlet to a full commercial build-out, it's the same crew and the same standard."
          />
          <Link href="/services" className="btn btn-outline shrink-0 text-sm">
            All services
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <h3 className="mt-14 text-xs font-bold uppercase tracking-wider text-ink-400">
          Residential
        </h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {residentialServices.slice(0, 4).map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>

        <h3 className="mt-14 text-xs font-bold uppercase tracking-wider text-ink-400">
          Commercial &amp; agricultural
        </h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commercialServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* ---------------- Process ---------------- */}
      <Section>
        <SectionHead
          eyebrow="How it works"
          title="No mystery pricing, no all-day windows"
          lead="Four steps, and you know where you stand at each one."
        />
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </Section>

      {/* ---------------- Split: residential / commercial ---------------- */}
      <Section muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-ink-100 bg-white p-8 md:p-10">
            <p className="eyebrow">For homeowners</p>
            <h3 className="mt-3 text-2xl font-extrabold">Your house, made safe and current</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              Most homes around Murray were wired for a different era of appliances. We bring them
              up to what your family actually plugs in.
            </p>
            <div className="mt-6 flex-1">
              <CheckList
                items={[
                  "200-amp service and panel upgrades",
                  "Whole-home generators and transfer switches",
                  "EV charger installation",
                  "Recessed lighting, fans, and fixtures",
                  "Troubleshooting that finds the real cause",
                ]}
              />
            </div>
            <Link href="/residential" className="btn btn-dark mt-8 self-start text-sm">
              Residential services
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col rounded-2xl border border-ink-100 bg-white p-8 md:p-10">
            <p className="eyebrow">For businesses</p>
            <h3 className="mt-3 text-2xl font-extrabold">Downtime costs more than the repair</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              Storefronts, restaurants, offices, rental portfolios, and farms. We schedule around
              your hours and document the work for your records.
            </p>
            <div className="mt-6 flex-1">
              <CheckList
                items={[
                  "Service calls and preventive maintenance",
                  "Tenant build-outs and new construction",
                  "LED retrofits and parking lot lighting",
                  "Three-phase power and equipment hookups",
                  "Code corrections and fire-marshal punch lists",
                ]}
              />
            </div>
            <Link href="/commercial" className="btn btn-dark mt-8 self-start text-sm">
              Commercial services
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ---------------- Service area ---------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHead
            eyebrow="Where we work"
            title={`Based in Murray, out to about ${serviceArea.radiusMiles} miles`}
            lead="If you're near the edge of the map, call and ask — we're often already headed that way."
          />
          <div>
            <div className="flex flex-wrap gap-2">
              {serviceArea.towns.map((town) => (
                <span
                  key={town}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm text-ink-700"
                >
                  <IconPin className="h-3.5 w-3.5 text-volt-600" />
                  {town}
                </span>
              ))}
            </div>
            <Link href="/service-area" className="btn btn-outline mt-7 text-sm">
              Full service area
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ---------------- Testimonials ---------------- */}
      <Section muted>
        <SectionHead eyebrow="Reviews" title="What customers say" center />
        {testimonialsArePlaceholder && (
          <p className="mx-auto mt-6 max-w-2xl rounded-lg border border-amber-300 bg-amber-50 p-4 text-center text-sm text-amber-900">
            <strong>Placeholder content.</strong> Replace these with real reviews in{" "}
            <code className="font-mono">src/content/site.ts</code> and set{" "}
            <code className="font-mono">testimonialsArePlaceholder</code> to{" "}
            <code className="font-mono">false</code> to remove this notice. Never publish invented
            testimonials.
          </p>
        )}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col rounded-xl border border-ink-100 bg-white p-6">
              <div className="flex gap-0.5 text-volt-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-ink-100 pt-4 text-sm">
                <span className="font-semibold text-ink-950">{t.name}</span>
                <span className="block text-ink-500">
                  {t.location} · {t.service}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHead eyebrow="Questions" title="Things people ask us" />
            <Link href="/faq" className="btn btn-outline mt-7 text-sm">
              All questions
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
          <FaqList faqs={generalFaqs.slice(0, 5)} />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
