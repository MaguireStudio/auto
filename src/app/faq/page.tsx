import type { Metadata } from "next";
import { generalFaqs, services, site } from "@/content/site";
import { PageHero, Section, SectionHead, FaqList, CTABand } from "@/components/ui";
import { JsonLd, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about pricing, licensing, permits, scheduling, emergencies, and service area from NORS Electric in Murray, KY.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const allFaqs = [...generalFaqs, ...services.flatMap((s) => s.faqs)];

  return (
    <>
      <JsonLd data={faqSchema(allFaqs)} />
      <PageHero
        eyebrow="FAQ"
        title="Questions we get asked a lot"
        lead={`If yours isn't here, call the office at ${site.phone} and ask. We'd rather answer it than have you guess.`}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr]">
          <SectionHead eyebrow="General" title="Working with us" />
          <FaqList faqs={generalFaqs} />
        </div>
      </Section>

      {services.map((service, i) => (
        <Section key={service.slug} muted={i % 2 === 0}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr]">
            <SectionHead
              eyebrow={service.category === "residential" ? "Residential" : "Commercial"}
              title={service.name}
            />
            <FaqList faqs={service.faqs} />
          </div>
        </Section>
      ))}

      <CTABand
        title="Still have a question?"
        body="Ask it in the request form, or call the office. No obligation either way."
      />
    </>
  );
}
