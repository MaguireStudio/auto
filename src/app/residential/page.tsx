import Link from "next/link";
import type { Metadata } from "next";
import { residentialServices, site } from "@/content/site";
import { PageHero, Section, SectionHead, ServiceCard, CheckList, CTABand, ProcessSteps } from "@/components/ui";
import { IconPhone, IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Residential Electrician in Murray, KY",
  description:
    "Home electrical services in Murray and Calloway County: panel upgrades, generators, EV chargers, lighting, rewiring, hot tubs, safety inspections, and repairs.",
  alternates: { canonical: "/residential" },
};

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Residential"
        title="Home electrical, done to code and explained to you"
        lead="Whether it's one stubborn circuit or a whole-house rewire, we diagnose it properly, price it clearly, and leave the place clean."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/request-service" className="btn btn-primary text-[15px]">
            Request service
            <IconArrow className="h-4 w-4" />
          </Link>
          <a href={site.phoneHref} className="btn btn-outline text-[15px]">
            <IconPhone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="Services"
          title="What we do for homeowners"
          lead="Click through for what's included, what it costs to skip, and how the job usually goes."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {residentialServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Older homes"
              title="What we find in West Kentucky houses"
              lead="Murray has a lot of housing stock from the 50s through the 80s, plus lake properties that were built as seasonal cabins and became year-round homes."
            />
            <div className="mt-8">
              <CheckList
                items={[
                  "100-amp services feeding houses that added central air and a shop",
                  "Federal Pacific and Zinsco panels that insurers no longer accept",
                  "Two-prong outlets with no equipment ground",
                  "Aluminum branch circuits from the mid-70s",
                  "Lake cabins with undersized feeds to docks and outbuildings",
                  "DIY additions wired without a permit",
                ]}
              />
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Get ahead of it" title="What we'd fix first" />
            <div className="mt-8 space-y-4">
              {[
                {
                  n: "1",
                  t: "Anything hot, buzzing, or scorched",
                  d: "A warm outlet or a burning smell is an active fire risk, not a someday item.",
                },
                {
                  n: "2",
                  t: "The panel, if it's a known bad brand",
                  d: "Federal Pacific Stab-Lok and Zinsco breakers have a documented history of failing to trip.",
                },
                {
                  n: "3",
                  t: "Missing GFCI protection",
                  d: "Kitchens, baths, garages, outdoors, and anywhere near water.",
                },
                {
                  n: "4",
                  t: "Grounding and bonding",
                  d: "Cheap to correct, and it's what makes every other protective device actually work.",
                },
              ].map((item) => (
                <div key={item.n} className="flex gap-4 rounded-xl border border-ink-100 bg-white p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-volt-100 text-sm font-bold text-volt-800">
                    {item.n}
                  </span>
                  <div>
                    <h3 className="font-bold text-ink-950">{item.t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-600">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="How it works" title="What to expect when you book" center />
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </Section>

      <CTABand
        title="Got something electrical on your list?"
        body="Send it over. We'll tell you what it takes and what it costs, with no pressure to book."
      />
    </>
  );
}
