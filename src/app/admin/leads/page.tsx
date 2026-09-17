import type { Metadata } from "next";
import { readLeads, serviceNames, PROPERTY_TYPES, URGENCY_OPTIONS, BUDGET_RANGES, CONTACT_METHODS, HEARD_ABOUT } from "@/lib/leads";
import { site } from "@/content/site";
import { IconPhone, IconMail, IconAlert } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Lead inbox",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function label(opts: readonly { value: string; label: string }[], v?: string) {
  if (!v) return "—";
  return opts.find((o) => o.value === v)?.label ?? v;
}

export default async function AdminLeadsPage() {
  const leads = await readLeads();

  const today = new Date().toDateString();
  const todayCount = leads.filter((l) => new Date(l.receivedAt).toDateString() === today).length;
  const emergencyCount = leads.filter((l) => l.urgency === "emergency").length;

  return (
    <div className="container-x py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Internal</p>
          <h1 className="mt-2 text-3xl font-extrabold">Lead inbox</h1>
          <p className="mt-2 text-[15px] text-ink-600">
            Every request submitted through the website, newest first.
          </p>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="text-2xl font-extrabold text-ink-950">{leads.length}</p>
            <p className="text-xs text-ink-500">Total</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-ink-950">{todayCount}</p>
            <p className="text-xs text-ink-500">Today</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-red-600">{emergencyCount}</p>
            <p className="text-xs text-ink-500">Emergency</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        <strong>Where these are stored:</strong> this page reads{" "}
        <code className="font-mono">data/leads.jsonl</code> on the server&apos;s disk. On a
        serverless host (Vercel, Netlify) that file is wiped on every deploy, so this list will look
        empty even though leads went out by email. Treat the notification email and the CRM webhook
        as the system of record; this page is a convenience view for self-hosted deployments.
      </div>

      {leads.length === 0 ? (
        <div className="card mt-8 p-12 text-center">
          <p className="text-ink-500">No leads recorded on this server yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className={`card p-6 ${lead.urgency === "emergency" ? "border-red-300 bg-red-50/40" : ""}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-lg font-bold text-ink-950">{lead.name}</h2>
                    {lead.urgency === "emergency" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold text-white">
                        <IconAlert className="h-3 w-3" />
                        Emergency
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink-500">
                    {new Date(lead.receivedAt).toLocaleString("en-US", {
                      timeZone: "America/Chicago",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}{" "}
                    Central · <span className="font-mono">{lead.id}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} className="btn btn-outline text-sm">
                    <IconPhone className="h-4 w-4" />
                    {lead.phone}
                  </a>
                  <a href={`mailto:${lead.email}`} className="btn btn-outline text-sm">
                    <IconMail className="h-4 w-4" />
                    Email
                  </a>
                </div>
              </div>

              <dl className="mt-5 grid gap-x-8 gap-y-3 border-t border-ink-100 pt-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <Row k="Interested in" v={serviceNames(lead.serviceSlugs)} />
                <Row k="Property" v={label(PROPERTY_TYPES, lead.propertyType)} />
                <Row k="Timeline" v={label(URGENCY_OPTIONS, lead.urgency)} />
                <Row k="Budget" v={label(BUDGET_RANGES, lead.budget || undefined)} />
                <Row k="Contact by" v={label(CONTACT_METHODS, lead.preferredContact)} />
                <Row k="Best time" v={lead.bestTime || "—"} />
                <Row
                  k="Address"
                  v={[lead.address, lead.city, lead.zip].filter(Boolean).join(", ") || "—"}
                />
                <Row k="Heard about us" v={label(HEARD_ABOUT, lead.heardAbout || undefined)} />
                <Row k="From page" v={lead.sourcePage || "—"} />
              </dl>

              <div className="mt-5 rounded-lg bg-ink-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Details</p>
                <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-ink-700">
                  {lead.details}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-10 text-sm text-ink-500">
        {site.name} internal page. Not linked from the site and excluded from search engines.
      </p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">{k}</dt>
      <dd className="mt-0.5 text-ink-800">{v}</dd>
    </div>
  );
}
