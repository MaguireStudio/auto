import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects the information you send through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        lead={`How ${site.name} handles the information you send us through this website.`}
      />

      <Section>
        <div className="prose-body max-w-3xl">
          {/* LEGAL NOTE: this is a plain-language starting point, not legal
              advice. Have it reviewed before launch, especially the SMS consent
              language if you plan to text customers — TCPA rules apply. */}
          <p className="text-sm text-ink-500">Last updated: {new Date().getFullYear()}</p>

          <h2 className="mt-8 text-2xl font-extrabold">What we collect</h2>
          <p>
            When you send a service request, we collect the name, phone number, email address, and
            property address you give us, along with the description of the work, your timeline, and
            your preferred way of being contacted. We do not ask for and do not want payment card
            numbers, Social Security numbers, or any other sensitive identifier through this site.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Why we collect it</h2>
          <p>
            We use it for exactly one thing: responding to your request, quoting the work, and
            scheduling it. If you become a customer, we keep enough of a record to service the work
            we performed and honor any warranty on it.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Who we share it with</h2>
          <p>
            We do not sell your information. We do not rent it, trade it, or hand it to lead
            brokers. The only third parties who touch it are the service providers that run this
            website and our email — for example, our web host and our email delivery provider — and
            they only process it on our behalf. If a job requires coordination with your utility,
            an inspector, or a general contractor, we share only what that job requires.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Calls, texts, and email</h2>
          <p>
            When you check the consent box on the request form, you are agreeing that we may contact
            you by phone, text message, or email about that request. Message and data rates may
            apply. You can opt out of texts at any time by replying STOP, and you can ask us to stop
            contacting you entirely by calling or emailing the office.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Cookies and analytics</h2>
          <p>
            This site does not set advertising or tracking cookies. If we add website analytics
            later, we will update this policy first and describe what is measured.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Keeping it secure</h2>
          <p>
            Form submissions are transmitted over an encrypted connection. Access to the requests we
            receive is limited to the people at {site.name} who need it to do the work. No system is
            perfectly secure, and we will not pretend otherwise.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Your choices</h2>
          <p>
            You can ask us what we have about you, ask us to correct it, or ask us to delete it.
            Call {site.phone} or email{" "}
            <ContactLink />{" "}
            and we&apos;ll take care of it. We may keep records we are required to keep for tax,
            permitting, or warranty reasons.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Children</h2>
          <p>This site is meant for adults arranging work on a property. We do not knowingly collect information from children.</p>

          <h2 className="mt-10 text-2xl font-extrabold">Changes</h2>
          <p>
            If this policy changes, the updated version will be posted here with a new date at the
            top.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold">Contact</h2>
          <p>
            {site.legalName}
            <br />
            {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            <br />
            {site.phone} ·{" "}
            <ContactLink />
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
