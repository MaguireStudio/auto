import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${site.name} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" lead="The ground rules for using this website." />

      <Section>
        <div className="prose-body max-w-3xl">
          {/* LEGAL NOTE: plain-language starting point. Have counsel review
              before launch, particularly the estimates and liability sections. */}
          <p className="text-sm text-ink-500">Last updated: {new Date().getFullYear()}</p>

          <h2 className="mt-8 text-2xl font-extrabold">Using this site</h2>
          <p>
            This website is provided by {site.legalName} for information about our services and to
            let you request work. By using it, you agree to these terms.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Information is not a quote</h2>
          <p>
            Service descriptions, timelines, and any general pricing language on this site are for
            information only. They are not an offer, a bid, or a binding quote. A price becomes
            binding only when we give it to you in writing for your specific job and you accept it.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">This is not electrical advice</h2>
          <p>
            Nothing here is instruction to perform electrical work yourself. Electrical work is
            dangerous and, in Kentucky, much of it must be performed by a licensed electrician and
            inspected. If you have an active hazard, turn the circuit off if you safely can and call
            a licensed electrician. If you see smoke or flame, call 911.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Requests you send us</h2>
          <p>
            Submitting the request form does not create a contract and does not guarantee we will
            take the job or meet a particular schedule. We will respond and tell you what we can do.
            Please don&apos;t send us confidential or sensitive personal information through the
            form.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Accuracy</h2>
          <p>
            We keep this site as accurate as we can, but we do not warrant that every detail is
            current or error-free. Code requirements, licensing rules, and our own service offerings
            change.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Third-party links</h2>
          <p>
            Links to other sites — our social media profiles, map providers, manufacturers — are
            provided for convenience. We don&apos;t control them and aren&apos;t responsible for
            their content.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Limitation of liability</h2>
          <p>
            To the extent permitted by law, {site.legalName} is not liable for indirect or
            consequential damages arising from your use of this website. This does not limit our
            responsibility for the electrical work we actually perform, which is governed by your
            contract with us and by Kentucky law.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Governing law</h2>
          <p>These terms are governed by the laws of the Commonwealth of Kentucky.</p>

          <h2 className="mt-10 text-2xl font-extrabold">Contact</h2>
          <p>
            Questions about these terms: {site.phone} or{" "}
            <ContactLink />
            .
          </p>
        </div>
      </Section>
    </>
  );
}

/** Email address when one is confirmed, otherwise the phone number. */
function ContactLink() {
  if (site.email) {
    return (
      <a href={`mailto:${site.email}`} className="font-semibold text-volt-700 underline">
        {site.email}
      </a>
    );
  }
  return (
    <a href={site.phoneHref} className="font-semibold text-volt-700 underline">
      {site.phone}
    </a>
  );
}
