import Link from "next/link";
import type { Metadata } from "next";
import { site, serviceArea } from "@/content/site";
import { PageHero, Section, SectionHead, CTABand } from "@/components/ui";
import { IconPin, IconPhone, IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Service Area",
  description: `${site.name} serves Murray, Kentucky and roughly ${serviceArea.radiusMiles} miles around it, covering ${serviceArea.counties.join(", ")}.`,
  alternates: { canonical: "/service-area" },
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title={`Murray, and about ${serviceArea.radiusMiles} miles in every direction`}
        lead="We're based in Murray, which puts most of Calloway and Marshall counties within a short drive. Kentucky Lake properties, farms, and small towns included."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHead eyebrow="Counties" title="Where we're licensed and working" />
            <ul className="mt-8 space-y-3">
              {serviceArea.counties.map((county) => (
                <li
                  key={county}
                  className="flex items-center gap-3 rounded-lg border border-ink-200 bg-white px-4 py-3.5 font-semibold text-ink-900"
                >
                  <IconPin className="h-4 w-4 shrink-0 text-volt-600" />
                  {county}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-ink-950 p-6 text-white">
              <h2 className="text-base font-bold">Just outside the line?</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-300">
                Call and ask. For larger projects we travel further, and we&apos;re often already
                working near you.
              </p>
              <a href={site.phoneHref} className="btn btn-primary mt-4 w-full text-sm">
                <IconPhone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </div>

          <div>
            <SectionHead
              eyebrow="Towns & communities"
              title="Places we work regularly"
              lead="Not an exhaustive list — if you're in the neighborhood of any of these, we cover you."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {serviceArea.towns.map((town) => (
                <div
                  key={town}
                  className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3 text-[15px] text-ink-700"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-volt-500" />
                  {town}
                </div>
              ))}
            </div>

            {/* Embedded map: swap the src for a Google Maps embed of the real
                business location once the address is confirmed. */}
            <div className="mt-10 overflow-hidden rounded-xl border border-ink-200">
              <iframe
                title={`Map of ${site.name} service area around Murray, Kentucky`}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-88.75%2C36.30%2C-87.90%2C36.95&layer=mapnik&marker=36.6103%2C-88.3148"
                className="h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3 text-sm text-ink-500">
              Approximate coverage centered on Murray, KY. Confirm exact travel for outlying
              addresses when you book.
            </p>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHead
          eyebrow="Local knowledge"
          title="Why working with a local contractor matters here"
          center
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "We know the utilities",
              d: "Murray Electric System, West Kentucky RECC, and the co-ops all have their own process for disconnects, reconnects, and new services. We handle that coordination.",
            },
            {
              t: "We know the inspectors",
              d: "Knowing what each inspection authority looks for means fewer re-inspections and fewer delays on your project.",
            },
            {
              t: "We know the housing stock",
              d: "Lake cabins converted to full-time homes, farmhouses with three generations of wiring, and 80s subdivisions all fail in predictable ways.",
            },
          ].map((item) => (
            <div key={item.t} className="rounded-xl border border-ink-100 bg-white p-7">
              <h3 className="text-lg font-bold text-ink-950">{item.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{item.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/request-service" className="btn btn-primary">
            Check if we cover your address
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
