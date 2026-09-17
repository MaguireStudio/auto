"use client";

import { useSearchParams } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { services } from "@/content/site";

/**
 * Reads ?service=<slug> so "Request a quote" buttons on service pages land
 * with that service already selected. Split out into its own client component
 * because useSearchParams() forces the subtree into a Suspense boundary.
 */
export default function RequestServiceForm() {
  const params = useSearchParams();
  const requested = params.get("service");
  const valid = requested && services.some((s) => s.slug === requested) ? requested : undefined;

  return <LeadForm defaultService={valid} />;
}
