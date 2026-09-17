import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService, site, serviceArea } from "@/content/site";
import { Section, CheckList, FaqList, CTABand, ProcessSteps, ServiceCard } from "@/components/ui";
import { ServiceIcon, IconPhone, IconArrow, IconAlert } from "@/components/Icons";
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: `${service.name} in Murray, KY`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${site.name}`,
      description: service.summary,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={serviceSchema(service.slug)} />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: `/services/${service.slug}` },
        ])}
      />

      <section className="border-b border-ink-100 bg-ink-50">
        <div className="container-x py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
            <Link href="/" className="hover:text-ink-900">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-ink-900">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-900">{service.name}</span>
          </nav>

          <div className="mt-8 flex items-start gap-5">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ink-950 sm:flex">
              <ServiceIcon name={service.icon} className="h-7 w-7 text-volt-400" />
            </span>
            <div>
              <p className="eyebrow">
                {service.category === "residential" ? "Residential" : "Commercial"} · Murray, KY
              </p>
              <h1 className="mt-2 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl">
                {service.name}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{service.summary}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/request-service?service=${service.slug}`}
              className="btn btn-primary text-[15px]"
            >
              Request a quote
              <IconArrow className="h-4 w-4" />
            </Link>
            <a href={site.phoneHref} className="btn btn-outline text-[15px]">
              <IconPhone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="prose-body max-w-none">
              <p className="text-lg leading-relaxed text-ink-700">{service.intro}</p>
            </div>

            <h2 className="mt-12 text-2xl font-extrabold">What&apos;s included</h2>
            <div className="mt-6">
              <CheckList items={service.includes} columns={2} />
            </div>

            <h2 className="mt-14 text-2xl font-extrabold">How the job goes</h2>
            <div className="mt-6">
              <ProcessSteps />
            </div>

            {service.faqs.length > 0 && (
              <>
                <h2 className="mt-14 text-2xl font-extrabold">Common questions</h2>
                <div className="mt-6">
                  <FaqList faqs={service.faqs} />
                </div>
              </>
            )}
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <div className="flex items-start gap-3">
                <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-volt-600" />
                <h2 className="text-lg font-bold text-ink-950">Signs you need this</h2>
              </div>
              <ul className="mt-4 space-y-3">
                {service.signs.map((sign) => (
                  <li key={sign} className="flex gap-3 text-[15px] leading-relaxed text-ink-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt-500" />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-ink-950 p-6 text-white">
              <h2 className="text-lg font-bold">Get a price for this</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-300">
                Send the details and we&apos;ll come back with a real number — not a range designed
                to get us in the door.
              </p>
              <Link
                href={`/request-service?service=${service.slug}`}
                className="btn btn-primary mt-5 w-full text-sm"
              >
                Request a quote
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-light mt-2.5 w-full text-sm">
                <IconPhone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-bold text-ink-950">Service area</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                We handle {service.name.toLowerCase()} across {serviceArea.counties.slice(0, 4).join(", ")}{" "}
                counties, roughly {serviceArea.radiusMiles} miles from Murray.
              </p>
              <Link
                href="/service-area"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-volt-700"
              >
                See the full area
                <IconArrow className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section muted>
          <h2 className="text-2xl font-extrabold">Related services</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Section>
      )}

      <CTABand />
    </>
  );
}
