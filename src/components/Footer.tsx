import Link from "next/link";
import { site, residentialServices, commercialServices, serviceArea } from "@/content/site";
import { IconBolt, IconPhone, IconMail, IconPin, IconInstagram, IconFacebook } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const credentialLine = buildCredentialLine();

  return (
    <footer className="mt-24 bg-ink-950 text-ink-300">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-volt-500">
                <IconBolt className="h-5 w-5 text-ink-950" strokeWidth={2} />
              </span>
              <span className="text-[17px] font-extrabold tracking-tight text-white">{site.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.shortDescription}</p>
            {credentialLine && (
              <p className="mt-4 text-xs leading-relaxed text-ink-500">{credentialLine}</p>
            )}
            <div className="mt-5 flex gap-2">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-800 text-ink-300 transition-colors hover:border-volt-500 hover:text-volt-400"
                aria-label={`${site.name} on Instagram`}
              >
                <IconInstagram className="h-5 w-5" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-800 text-ink-300 transition-colors hover:border-volt-500 hover:text-volt-400"
                aria-label={`${site.name} on Facebook`}
              >
                <IconFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Residential</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {residentialServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-volt-400">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Commercial</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {commercialServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-volt-400">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xs font-bold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-volt-400">About us</Link></li>
              <li><Link href="/reviews" className="hover:text-volt-400">Reviews</Link></li>
              <li><Link href="/service-area" className="hover:text-volt-400">Service area</Link></li>
              <li><Link href="/faq" className="hover:text-volt-400">FAQ</Link></li>
              <li><Link href="/careers" className="hover:text-volt-400">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Get in touch</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a href={site.phoneHref} className="flex items-start gap-3 hover:text-volt-400">
                  <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-volt-500" />
                  <span className="font-semibold text-white">{site.phone}</span>
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-volt-400">
                    <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-volt-500" />
                    <span className="break-all">{site.email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-volt-500" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </li>
            </ul>

            <div className="mt-6 rounded-lg border border-ink-800 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-white">Office hours</p>
              <dl className="mt-3 space-y-1 text-[13px]">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt>{h.day.slice(0, 3)}</dt>
                    <dd className={h.open ? "" : "text-ink-500"}>
                      {h.open ? `${h.open} – ${h.close}` : "Closed"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <Link href="/request-service" className="btn btn-primary mt-5 w-full">
              Request service
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-ink-800 pt-8">
          <p className="text-xs leading-relaxed text-ink-500">
            <span className="font-semibold text-ink-400">Serving:</span>{" "}
            {serviceArea.towns.join(" · ")}
          </p>
          <div className="mt-6 flex flex-col justify-between gap-4 text-xs text-ink-500 sm:flex-row">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link href="/privacy" className="hover:text-volt-400">Privacy policy</Link>
              <Link href="/terms" className="hover:text-volt-400">Terms</Link>
              <Link href="/sitemap.xml" className="hover:text-volt-400">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Builds the license/insurance line from confirmed credentials only.
 * Returns null when nothing is confirmed, so the footer prints no claim at
 * all rather than an unverifiable one. See `site.credentials`.
 */
function buildCredentialLine(): string | null {
  const { licenseNumber, insured, bonded } = site.credentials;
  const status: string[] = [];
  if (insured) status.push("insured");
  if (bonded) status.push("bonded");

  const parts: string[] = [];
  if (status.length) {
    parts.push(
      `Licensed, ${status.join(" and ")} in the Commonwealth of Kentucky.`,
    );
  }
  if (licenseNumber) parts.push(`KY License #${licenseNumber}`);

  return parts.length ? parts.join(" ") : null;
}
