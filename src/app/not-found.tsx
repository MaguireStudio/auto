import Link from "next/link";
import { site } from "@/content/site";
import { IconPhone } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-extrabold">That page isn&apos;t here</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-600">
        The link may be old or mistyped. The services page is probably what you&apos;re after — or
        just call us and we&apos;ll point you the right way.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/services" className="btn btn-primary">
          Browse services
        </Link>
        <a href={site.phoneHref} className="btn btn-outline">
          <IconPhone className="h-4 w-4" />
          {site.phone}
        </a>
      </div>
    </div>
  );
}
