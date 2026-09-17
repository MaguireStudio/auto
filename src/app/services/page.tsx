import type { Metadata } from "next";
import { residentialServices, commercialServices } from "@/content/site";
import { PageHero, Section, ServiceCard, CTABand, SectionHead } from "@/components/ui";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Electrical Services",
  description:
    "Residential and commercial electrical services in Murray, KY — panel upgrades, generators, EV chargers, lighting, rewiring, commercial build-outs, and agricultural electrical.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />
      <PageHero
        eyebrow="Services"
        title="Everything we do, in one place"
        lead="One licensed crew for the small repairs, the big upgrades, and the commercial jobs in between. Pick a service to see what's included and what it typically involves."
      />

      <Section>
        <SectionHead
          eyebrow="Residential"
          title="For your home"
          lead="Safety, capacity, and the conveniences that make a house work the way you live in it."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {residentialServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHead
          eyebrow="Commercial & agricultural"
          title="For your business or farm"
          lead="Scheduled around your hours, documented for your records, and built for the conditions."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {commercialServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <CTABand
        title="Not sure which one you need?"
        body="Describe the problem and we'll tell you what it is. That's the part we're good at."
      />
    </>
  );
}
