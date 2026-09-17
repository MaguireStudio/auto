import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/content/site";
import RequestServiceForm from "./RequestServiceForm";
import { IconPhone, IconClock, IconCheck, IconMail, IconAlert } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Request Service",
  description:
    "Tell NORS Electric what you need. Pick your services, describe the job, and we'll get back to you with scheduling and pricing — usually within one business day.",
  alternates: { canonical: "/request-service" },
};

export default function RequestServicePage() {
  return (
    <>
      <section className="border-b border-ink-100 bg-ink-50">
        <div className="container-x py-12 md:py-16">
          <p className="eyebrow">Request service</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl">
            Tell us what you need
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            The more you tell us up front, the closer our first number is to the final one. It takes
            about a minute, and a real person reads every one of these.
          </p>
        </div>
      </section>

      <div className="container-x py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Suspense
              fallback={
                <div className="card p-8">
                  <p className="text-ink-500">Loading form…</p>
                </div>
              }
            >
              <RequestServiceForm />
            </Suspense>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-start gap-3">
                <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <div>
                  <h2 className="text-base font-bold text-red-900">Is this an emergency?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-red-900">
                    Smoke, burning smells, sparking, a hot panel, or a total loss of power — call,
                    don&apos;t type. If you see smoke or flame, call 911 first.
                  </p>
                  <a
                    href={site.phoneHref}
                    className="btn mt-4 w-full bg-red-600 text-sm text-white hover:bg-red-700"
                  >
                    <IconPhone className="h-4 w-4" />
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-base font-bold text-ink-950">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {[
                  "You'll get a confirmation on screen with a reference number.",
                  "We review the details and check the schedule against your timeline.",
                  "We reach out the way you asked us to — phone, text, or email.",
                  "You get a scheduled window and an approved price before any work starts.",
                ].map((line, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink-600">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-950 text-xs font-bold text-volt-400">
                      {i + 1}
                    </span>
                    {line}
                  </li>
                ))}
              </ol>
            </div>

            <div className="card p-6">
              <h2 className="text-base font-bold text-ink-950">Other ways to reach us</h2>
              <ul className="mt-4 space-y-4 text-[15px]">
                <li>
                  <a href={site.phoneHref} className="flex items-center gap-3 font-semibold text-ink-900 hover:text-volt-700">
                    <IconPhone className="h-4 w-4 text-volt-600" />
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-ink-700 hover:text-volt-700">
                    <IconMail className="h-4 w-4 shrink-0 text-volt-600" />
                    <span className="break-all">{site.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-ink-600">
                  <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-volt-600" />
                  <span>
                    {site.hours
                      .filter((h) => h.open)
                      .map((h) => `${h.day.slice(0, 3)} ${h.open}–${h.close}`)
                      .join(" · ")}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-ink-950 p-6 text-white">
              <h2 className="text-base font-bold">Your information</h2>
              <ul className="mt-4 space-y-3">
                {[
                  "We use it to quote and schedule your job — nothing else.",
                  "We never sell or share it with third parties.",
                  "You can ask us to delete it at any time.",
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink-300">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-volt-400" strokeWidth={2.4} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
