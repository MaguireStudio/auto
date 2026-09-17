import type { Metadata } from "next";
import { site, testimonials } from "@/content/site";
import { PageHero, Section, SectionHead, CTABand } from "@/components/ui";
import { IconInstagram, IconFacebook, IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Reviews",
  description: `What customers in Murray and Calloway County say about working with ${site.name}.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What our customers say"
        lead={
          testimonials.length > 0
            ? "What customers around Murray and Calloway County tell us about the work."
            : "Where to read what customers say about us, and how to leave one yourself."
        }
      />

      <Section>
        {testimonials.length === 0 ? (
          /* Honest empty state. Better than inventing quotes, and it still
             gives the visitor somewhere real to go and read about the work. */
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold">Reviews are on our social pages</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
              We haven&apos;t collected our reviews onto this page yet. In the meantime, the
              Facebook and Instagram pages below are where customers have left them, and where we
              post the work itself — finished panels, rough-ins, and jobs in progress.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
              If we&apos;ve done work for you and you&apos;d be willing to leave one, it genuinely
              helps — a local trade business lives on them.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure key={i} className="flex flex-col rounded-xl border border-ink-100 bg-white p-7">
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
                <figcaption className="mt-6 border-t border-ink-100 pt-4 text-sm">
                  <span className="font-semibold text-ink-950">{t.name}</span>
                  <span className="block text-ink-500">
                    {t.location} · {t.service}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>

      <Section muted>
        <SectionHead
          eyebrow="More"
          title="Read and leave reviews"
          lead="If we've done work for you, a review is the single most helpful thing you can do for a local trade business."
          center
        />
        <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center justify-between gap-4 p-6 transition-colors hover:border-volt-300"
          >
            <span className="flex items-center gap-3">
              <IconFacebook className="h-6 w-6 text-volt-600" />
              <span className="font-bold text-ink-950">Facebook</span>
            </span>
            <IconArrow className="h-4 w-4 text-ink-400" />
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center justify-between gap-4 p-6 transition-colors hover:border-volt-300"
          >
            <span className="flex items-center gap-3">
              <IconInstagram className="h-6 w-6 text-volt-600" />
              <span className="font-bold text-ink-950">Instagram</span>
            </span>
            <IconArrow className="h-4 w-4 text-ink-400" />
          </a>
        </div>
        {/* TODO: add the Google Business Profile review link here once the
            listing URL is confirmed — Google reviews carry the most SEO weight. */}
      </Section>

      <CTABand />
    </>
  );
}
