import Link from "next/link";
import type { Metadata } from "next";
import { site, serviceArea } from "@/content/site";
import { PageHero, Section, SectionHead, CheckList, CTABand, Stat } from "@/components/ui";
import { IconInstagram, IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.name} is a licensed electrical contractor based in Murray, Kentucky, serving Calloway County and the surrounding area since ${site.foundedYear}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const years = new Date().getFullYear() - site.foundedYear;

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A Murray electrical contractor, not a franchise"
        lead={`${site.name} has been wiring homes, businesses, and farms around Calloway County since ${site.foundedYear}. When you call, you get the people who do the work.`}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div className="prose-body max-w-none">
            {/* CONTENT NOTE: replace the three paragraphs below with the owner's
                own story — how the company started, who's on the crew, and what
                they're known for locally. This is the highest-value page to make
                specific, and the placeholder text is deliberately generic. */}
            <h2 className="text-2xl font-extrabold">Who we are</h2>
            <p>
              We&apos;re a licensed electrical contractor working out of Murray, Kentucky. Most of
              what we do is within a half-hour drive: service calls and panel upgrades for
              homeowners, build-outs and maintenance for local businesses, and the shop, barn, and
              irrigation work that keeps farms running.
            </p>
            <p>
              The trade has a reputation problem, and most of it comes down to two things —
              companies that quote a number and bill a different one, and work that looks finished
              but isn&apos;t code-correct behind the cover. We built this business to be the
              opposite of both. You approve the price before we start. Panels get labeled. Permits
              get pulled. The inspector gets met.
            </p>
            <p>
              We&apos;re also honest about what you don&apos;t need. If the fix is a twenty-dollar
              breaker instead of a service upgrade, we&apos;ll tell you that, even though it&apos;s
              the smaller ticket. We would rather be the company you call again than the one that
              got one big invoice out of you.
            </p>

            <h2 className="mt-12 text-2xl font-extrabold">How we work</h2>
            <div className="mt-6">
              <CheckList
                items={[
                  "Written, approved pricing before any work begins",
                  "Permits pulled and inspections met wherever code requires it",
                  "Labeled panels and documented circuits when we leave",
                  "Jobsites swept and materials hauled off",
                  "The same crew from the estimate through the final walkthrough",
                ]}
              />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-7">
              <div className="grid grid-cols-2 gap-6">
                <Stat value={`${years}+`} label="Years in business" />
                <Stat value={String(serviceArea.counties.length)} label="Counties served" />
                <Stat value={`${serviceArea.radiusMiles} mi`} label="Service radius" />
                <Stat value="KY" label="Licensed contractor" />
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="border-b border-ink-100 p-6">
                <div className="flex items-center gap-3">
                  <IconInstagram className="h-5 w-5 text-volt-600" />
                  <h2 className="font-bold text-ink-950">See the work</h2>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                  We post finished panels, rough-ins, and job progress on Instagram. It&apos;s the
                  fastest way to see what our work actually looks like behind the cover.
                </p>
              </div>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-5 text-sm font-semibold text-volt-700 transition-colors hover:bg-ink-50"
              >
                @nors_electric on Instagram
                <IconArrow className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-xl bg-ink-950 p-7 text-white">
              <h2 className="text-lg font-bold">Working with us</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-300">
                Start with the request form and we&apos;ll come back with a plan, or call the office
                during business hours and talk it through.
              </p>
              <Link href="/request-service" className="btn btn-primary mt-5 w-full text-sm">
                Request service
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section muted>
        <SectionHead
          eyebrow="Standards"
          title="What &ldquo;done right&rdquo; means to us"
          lead="Three things we won't compromise on, because they're the ones nobody can see after the cover goes back on."
          center
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Code is the floor, not the goal",
              d: "The NEC is a minimum safety standard. Where it's cheap to do better — a larger conductor, an extra circuit, a better device — we do better and tell you why.",
            },
            {
              t: "Permits protect you, not us",
              d: "Unpermitted work can void an insurance claim and stall a home sale. Anyone offering to skip the permit is saving themselves time at your expense.",
            },
            {
              t: "You should understand your own house",
              d: "We label the panel, walk you through what changed, and answer questions until they're actually answered.",
            },
          ].map((item) => (
            <div key={item.t} className="rounded-xl border border-ink-100 bg-white p-7">
              <h3 className="text-lg font-bold text-ink-950">{item.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{item.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
