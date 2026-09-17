import Link from "next/link";
import type { Metadata } from "next";
import { commercialServices, site } from "@/content/site";
import { PageHero, Section, SectionHead, ServiceCard, CheckList, CTABand } from "@/components/ui";
import { IconPhone, IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Commercial Electrician in Murray, KY",
  description:
    "Commercial electrical contracting in West Kentucky: service calls, tenant build-outs, LED retrofits, parking lot lighting, three-phase power, and agricultural electrical.",
  alternates: { canonical: "/commercial" },
};

const industries = [
  "Restaurants and bars",
  "Retail and storefronts",
  "Offices and professional suites",
  "Medical and dental practices",
  "Churches and community buildings",
  "Warehouses and light industrial",
  "Rental and multi-unit property",
  "Farms and agricultural operations",
];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial & agricultural"
        title="Electrical contracting that keeps you open"
        lead="From a tripped three-phase breaker on a Monday morning to a full tenant build-out on a deadline. We bid from plans, document the work, and schedule around your hours."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/request-service" className="btn btn-primary text-[15px]">
            Request a bid
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
          title="What we do for businesses"
          lead="Service work, planned projects, and everything a building needs to pass inspection."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {commercialServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Who we work with" title="Buildings we know our way around" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {industries.map((ind) => (
                <div
                  key={ind}
                  className="rounded-lg border border-ink-200 bg-white px-4 py-3 text-[15px] text-ink-700"
                >
                  {ind}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHead
              eyebrow="What you get"
              title="The things property managers actually ask for"
            />
            <div className="mt-8">
              <CheckList
                items={[
                  "Certificate of insurance naming your entity as additional insured",
                  "Written bids with exclusions spelled out, not buried",
                  "After-hours and early-morning scheduling where the job allows",
                  "Photo documentation and written reports on maintenance visits",
                  "Direct line to the person who did the work, not a call center",
                  "Maintenance agreements for multi-building portfolios",
                  "Emergency response for tenants when something goes down",
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl bg-ink-950 p-8 md:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-volt-400">Out for bid?</p>
              <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
                Send us the electrical sheets
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-300">
                We bid plan-and-spec and design-build work across West Kentucky. Give us the plans,
                the schedule, and the inspection authority, and we&apos;ll come back with a written
                number and a realistic timeline.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "Attach or describe the plans in the request form",
                "Tell us the target start and the hard deadline",
                "Note any owner-furnished equipment",
                "We'll follow up with questions before we price it",
              ].map((line, i) => (
                <div key={i} className="flex gap-3 rounded-lg border border-ink-800 p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-volt-500 text-xs font-bold text-ink-950">
                    {i + 1}
                  </span>
                  <p className="text-[15px] leading-relaxed text-ink-300">{line}</p>
                </div>
              ))}
              <Link href="/request-service" className="btn btn-primary mt-3 w-full text-sm">
                Start a bid request
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Need a commercial electrician this week?"
        body="Tell us the building, the problem, and your hours. We'll work around them."
      />
    </>
  );
}
