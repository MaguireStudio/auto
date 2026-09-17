import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero, Section, SectionHead, CTABand } from "@/components/ui";
import { IconPhone, IconMail, IconPin, IconClock, IconAlert, IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} in Murray, KY. Call ${site.phone}, email us, or send a service request online.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        lead="Phone is fastest during business hours. The request form works any time and gets you a reference number right away."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <a href={site.phoneHref} className="card group p-7 transition-colors hover:border-volt-300">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-volt-50 text-volt-700 ring-1 ring-volt-100">
              <IconPhone className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-lg font-bold text-ink-950">Call the office</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
              Best for emergencies, scheduling, and anything easier to explain out loud.
            </p>
            <p className="mt-4 text-xl font-extrabold text-volt-700">{site.phone}</p>
          </a>

          <a href={`mailto:${site.email}`} className="card group p-7 transition-colors hover:border-volt-300">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-volt-50 text-volt-700 ring-1 ring-volt-100">
              <IconMail className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-lg font-bold text-ink-950">Email us</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
              Good for plans, invoices, insurance certificates, and anything with an attachment.
            </p>
            <p className="mt-4 break-all font-semibold text-volt-700">{site.email}</p>
          </a>

          <Link href="/request-service" className="card group p-7 transition-colors hover:border-volt-300">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-volt-50 text-volt-700 ring-1 ring-volt-100">
              <IconArrow className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-lg font-bold text-ink-950">Send a service request</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
              Takes about a minute and gives us everything we need to quote it properly.
            </p>
            <p className="mt-4 font-semibold text-volt-700">Start a request →</p>
          </Link>
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Details" title="Office and hours" />
            <dl className="mt-8 space-y-6">
              <div className="flex gap-4">
                <IconPin className="mt-1 h-5 w-5 shrink-0 text-volt-600" />
                <div>
                  <dt className="font-bold text-ink-950">Address</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-ink-600">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <IconClock className="mt-1 h-5 w-5 shrink-0 text-volt-600" />
                <div className="flex-1">
                  <dt className="font-bold text-ink-950">Office hours</dt>
                  <dd className="mt-2">
                    <ul className="max-w-xs space-y-1.5 text-[15px] text-ink-600">
                      {site.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-6">
                          <span>{h.day}</span>
                          <span className={h.open ? "font-medium text-ink-900" : "text-ink-400"}>
                            {h.open ? `${h.open} – ${h.close}` : "Closed"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-start gap-3">
                <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <div>
                  <h3 className="font-bold text-red-900">Electrical emergency</h3>
                  <p className="mt-2 text-sm leading-relaxed text-red-900">
                    Smoke, flame, sparking, a hot panel, or a burning smell — call 911 first if
                    there&apos;s any fire risk, then call us. Do not use the form.
                  </p>
                  <a
                    href={site.phoneHref}
                    className="btn mt-4 bg-red-600 text-sm text-white hover:bg-red-700"
                  >
                    <IconPhone className="h-4 w-4" />
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-xl border border-ink-200">
              <iframe
                title={`Map showing ${site.name} in Murray, Kentucky`}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-88.42%2C36.55%2C-88.21%2C36.67&layer=mapnik&marker=36.6103%2C-88.3148"
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3 text-sm text-ink-500">
              We work out of Murray and travel to you — most jobs happen at your property, not ours.
            </p>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
