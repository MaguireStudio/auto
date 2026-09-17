import Link from "next/link";
import { site } from "@/content/site";
import { IconPhone } from "./Icons";

/** Thumb-reachable call/quote bar on phones, where most service leads come from. */
export default function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white/95 p-3 backdrop-blur sm:hidden">
      <div className="flex gap-2">
        <a href={site.phoneHref} className="btn btn-dark flex-1 text-[15px]">
          <IconPhone className="h-4 w-4" />
          Call now
        </a>
        <Link href="/request-service" className="btn btn-primary flex-1 text-[15px]">
          Get a quote
        </Link>
      </div>
    </div>
  );
}
