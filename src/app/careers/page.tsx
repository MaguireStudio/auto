import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero, Section, SectionHead, CheckList, CTABand } from "@/components/ui";
import { IconMail, IconPhone } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Careers",
  description: `Electrician jobs at ${site.name} in Murray, KY. Journeyman, apprentice, and helper positions.`,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Looking for electricians who care about the work"
        lead="If you take pride in a clean panel and you'd rather do it right than do it twice, we should talk."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHead eyebrow="Open roles" title="Who we're hiring" />
            {/* CONTENT NOTE: update these to the roles actually open. An empty
                careers page that says "always accepting applications" still
                beats no page — good electricians check. */}
            <div className="mt-8 space-y-4">
              {[
                {
                  t: "Journeyman Electrician",
                  d: "Residential and light commercial service and installation. Kentucky journeyman license required, clean driving record, own hand tools.",
                },
                {
                  t: "Apprentice Electrician",
                  d: "Working toward your hours and your license. We'll put you with experienced crews and sign off on real, varied work.",
                },
                {
                  t: "Helper / Laborer",
                  d: "No experience needed. Show up, work hard, and learn the trade from the ground up.",
                },
              ].map((role) => (
                <div key={role.t} className="rounded-xl border border-ink-100 bg-white p-6">
                  <h3 className="text-lg font-bold text-ink-950">{role.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{role.d}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-extrabold">What we offer</h2>
            <div className="mt-6">
              <CheckList
                items={[
                  "Steady local work — you're home at night",
                  "Pay based on what you can actually do",
                  "Real training and sign-off toward your license",
                  "Varied work: service, new construction, and commercial",
                  "Tools and equipment that aren't held together with tape",
                ]}
                columns={1}
              />
            </div>
          </div>

          <aside>
            <div className="card p-7 lg:sticky lg:top-28">
              <h2 className="text-lg font-bold text-ink-950">How to apply</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                Send us your experience and your license status. No formal application, no portal —
                just tell us what you&apos;ve worked on.
              </p>
              {site.email && (
                <a
                  href={`mailto:${site.email}?subject=Application`}
                  className="btn btn-primary mt-5 w-full text-sm"
                >
                  <IconMail className="h-4 w-4" />
                  Email us
                </a>
              )}
              <a
                href={site.phoneHref}
                className={`btn ${site.email ? "btn-outline mt-2.5" : "btn-primary mt-5"} w-full text-sm`}
              >
                <IconPhone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <CTABand
        title="Not looking for a job — need an electrician?"
        body="Head to the request form and tell us what's going on."
      />
    </>
  );
}
