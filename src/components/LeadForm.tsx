"use client";

import { useState, useMemo, useRef, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { site, services } from "@/content/site";
import {
  URGENCY_OPTIONS,
  PROPERTY_TYPES,
  CONTACT_METHODS,
  BUDGET_RANGES,
  HEARD_ABOUT,
} from "@/lib/lead-fields";
import { IconCheck, IconPhone, IconAlert, IconArrow, ServiceIcon } from "./Icons";

type Errors = Record<string, string>;

const initialState = {
  serviceSlugs: [] as string[],
  propertyType: "",
  urgency: "",
  details: "",
  address: "",
  city: "",
  zip: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  preferredContact: "phone",
  bestTime: "",
  heardAbout: "",
  consent: false,
  company: "", // honeypot
};

type State = typeof initialState;

const STEPS = ["What you need", "Job details", "Your contact info"] as const;

export default function LeadForm({ defaultService }: { defaultService?: string }) {
  const pathname = usePathname();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<State>(() => ({
    ...initialState,
    serviceSlugs: defaultService ? [defaultService] : [],
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const [errorSummary, setErrorSummary] = useState<string | null>(null);

  const set = <K extends keyof State>(key: K, value: State[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const toggleService = (slug: string) => {
    setForm((f) => ({
      ...f,
      serviceSlugs: f.serviceSlugs.includes(slug)
        ? f.serviceSlugs.filter((s) => s !== slug)
        : [...f.serviceSlugs, slug],
    }));
    setErrors((e) => {
      const next = { ...e };
      delete next.serviceSlugs;
      return next;
    });
  };

  const isEmergency = form.urgency === "emergency";

  const validateStep = (index: number): boolean => {
    const e: Errors = {};

    if (index === 0) {
      if (form.serviceSlugs.length === 0)
        e.serviceSlugs = "Pick at least one — choose “Something else” if none fit.";
      if (!form.propertyType) e.propertyType = "Let us know what kind of property this is.";
      if (!form.urgency) e.urgency = "How soon do you need this?";
    }

    if (index === 1) {
      if (form.details.trim().length < 10)
        e.details = "A sentence or two helps us quote it accurately.";
      if (form.zip && !/^\d{5}(-\d{4})?$/.test(form.zip.trim()))
        e.zip = "Enter a 5-digit ZIP code.";
    }

    if (index === 2) {
      if (form.name.trim().length < 2) e.name = "Please enter your name.";
      if (!/^[0-9+().\-\s]{7,}$/.test(form.phone.trim()))
        e.phone = "Enter a phone number we can reach you at.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
        e.email = "Enter a valid email address.";
      if (!form.consent) e.consent = "Please agree to be contacted about your request.";
    }

    setErrors(e);

    const ok = Object.keys(e).length === 0;
    if (!ok) {
      const count = Object.keys(e).length;
      setFormError(null);
      setErrorSummary(
        `${count} ${count === 1 ? "field needs" : "fields need"} attention before you continue.`,
      );
      requestAnimationFrame(() => headingRef.current?.focus());
    } else {
      setErrorSummary(null);
    }
    return ok;
  };

  /**
   * Moves to a step, scrolls the form into view, and puts focus on the step
   * heading. Without the focus move a screen-reader or keyboard user stays
   * parked on the Continue button while the content behind them changes.
   */
  const goToStep = (index: number) => {
    setStep(index);

    const form = document.getElementById("lead-form");
    if (form) {
      // Offset for the sticky header so the progress bar isn't hidden under it.
      const top = form.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }

    // After paint, so the new step's heading exists to receive focus.
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const next = () => {
    if (!validateStep(step)) return;
    goToStep(Math.min(step + 1, STEPS.length - 1));
  };

  const back = () => goToStep(Math.max(step - 1, 0));

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validateStep(2)) return;

    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sourcePage: pathname }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data.error || "Something went wrong. Please call us instead.");
        return;
      }

      setReference(data.reference);
    } catch {
      setFormError(
        "We couldn't reach the server. Check your connection, or call us and we'll take the details over the phone.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const grouped = useMemo(
    () => ({
      residential: services.filter((s) => s.category === "residential"),
      commercial: services.filter((s) => s.category === "commercial"),
    }),
    [],
  );

  if (reference) {
    return (
      <div id="lead-form" className="card p-8 text-center md:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-volt-100">
          <IconCheck className="h-7 w-7 text-volt-700" strokeWidth={2.4} />
        </span>
        <h2 className="mt-6 text-2xl font-extrabold">Request received</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
          Thanks, {form.name.split(" ")[0]}. We&apos;ve got your request and someone from the office
          will reach out
          {form.preferredContact === "email"
            ? " by email"
            : form.preferredContact === "text"
              ? " by text"
              : " by phone"}
          , usually within one business day.
        </p>
        <p className="mt-6 inline-block rounded-lg bg-ink-50 px-4 py-2 text-sm text-ink-600">
          Your reference number: <strong className="font-mono text-ink-950">{reference}</strong>
        </p>
        {isEmergency && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-left">
            <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm leading-relaxed text-red-900">
              You marked this as an emergency. <strong>Please call us now</strong> at{" "}
              <a href={site.phoneHref} className="font-bold underline">
                {site.phone}
              </a>{" "}
              rather than waiting on a reply.
            </p>
          </div>
        )}
        <a href={site.phoneHref} className="btn btn-outline mt-8">
          <IconPhone className="h-4 w-4" />
          Call {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form id="lead-form" onSubmit={onSubmit} noValidate className="card overflow-hidden">
      {/* Progress */}
      <div className="border-b border-ink-100 bg-ink-50 px-6 py-5 md:px-8">
        <div className="flex items-center justify-between">
          <p
            ref={headingRef}
            tabIndex={-1}
            aria-live="polite"
            className="text-sm font-semibold text-ink-950 outline-none"
          >
            Step {step + 1} of {STEPS.length}
            <span className="ml-2 font-normal text-ink-500">{STEPS[step]}</span>
          </p>
          <p className="text-xs text-ink-500">Takes about 60 seconds</p>
        </div>
        <p role="alert" className="mt-2 min-h-0 text-sm font-medium text-red-600 empty:mt-0">
          {errorSummary ?? ""}
        </p>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-200"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label="Form progress"
        >
          <div
            className="h-full rounded-full bg-volt-500 transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* ---------------- Step 1 ---------------- */}
        {step === 0 && (
          <div className="space-y-8">
            <fieldset>
              <legend className="field-label mb-1">
                What are you interested in? <span className="font-normal text-ink-500">(pick any)</span>
              </legend>
              {errors.serviceSlugs && <p className="mb-3 text-sm text-red-600">{errors.serviceSlugs}</p>}

              <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-ink-400">
                Home
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {grouped.residential.map((s) => (
                  <ServiceCheckbox
                    key={s.slug}
                    slug={s.slug}
                    name={s.name}
                    icon={s.icon}
                    checked={form.serviceSlugs.includes(s.slug)}
                    onToggle={toggleService}
                  />
                ))}
              </div>

              <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-ink-400">
                Business &amp; agricultural
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {grouped.commercial.map((s) => (
                  <ServiceCheckbox
                    key={s.slug}
                    slug={s.slug}
                    name={s.name}
                    icon={s.icon}
                    checked={form.serviceSlugs.includes(s.slug)}
                    onToggle={toggleService}
                  />
                ))}
                <ServiceCheckbox
                  slug="other"
                  name="Something else — I'll explain"
                  icon="bolt"
                  checked={form.serviceSlugs.includes("other")}
                  onToggle={toggleService}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="field-label">This work is for</legend>
              {errors.propertyType && <p className="mb-2 text-sm text-red-600">{errors.propertyType}</p>}
              <div className="grid gap-2 sm:grid-cols-2">
                {PROPERTY_TYPES.map((p) => (
                  <RadioPill
                    key={p.value}
                    name="propertyType"
                    value={p.value}
                    label={p.label}
                    checked={form.propertyType === p.value}
                    onChange={(v) => set("propertyType", v)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="field-label">How soon do you need it?</legend>
              {errors.urgency && <p className="mb-2 text-sm text-red-600">{errors.urgency}</p>}
              <div className="grid gap-2">
                {URGENCY_OPTIONS.map((u) => (
                  <RadioPill
                    key={u.value}
                    name="urgency"
                    value={u.value}
                    label={u.label}
                    checked={form.urgency === u.value}
                    onChange={(v) => set("urgency", v)}
                  />
                ))}
              </div>
              {isEmergency && (
                <div className="mt-3 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                  <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <p className="text-sm leading-relaxed text-red-900">
                    For a true emergency, please{" "}
                    <a href={site.phoneHref} className="font-bold underline">
                      call {site.phone}
                    </a>
                    . We answer the phone faster than the inbox. If you see smoke or flame, call 911
                    first.
                  </p>
                </div>
              )}
            </fieldset>
          </div>
        )}

        {/* ---------------- Step 2 ---------------- */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="details" className="field-label">
                Tell us about the job
              </label>
              <p className="mb-2 text-sm text-ink-500">
                What&apos;s happening, how old is the home or building, and anything you&apos;ve
                already tried. Details here mean a more accurate price.
              </p>
              <textarea
                id="details"
                rows={6}
                className="field"
                value={form.details}
                onChange={(e) => set("details", e.target.value)}
                aria-invalid={!!errors.details}
                aria-describedby={errors.details ? "details-error" : undefined}
                placeholder="e.g. 1990s house on Wildwood, breakers trip whenever the microwave and coffee maker run together. Panel is a 100A with no open slots."
              />
              {errors.details && (
                <p id="details-error" className="mt-1.5 text-sm text-red-600">
                  {errors.details}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="field-label">
                Service address <span className="font-normal text-ink-500">(optional)</span>
              </label>
              <input
                id="address"
                className="field"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                autoComplete="street-address"
                placeholder="Street address"
              />
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input
                  className="field"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  autoComplete="address-level2"
                  placeholder="City"
                  aria-label="City"
                />
                <div>
                  <input
                    className="field"
                    value={form.zip}
                    onChange={(e) => set("zip", e.target.value)}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    placeholder="ZIP code"
                    aria-label="ZIP code"
                    aria-invalid={!!errors.zip}
                  />
                  {errors.zip && <p className="mt-1.5 text-sm text-red-600">{errors.zip}</p>}
                </div>
              </div>
              <p className="mt-2 text-sm text-ink-500">
                Helps us confirm you&apos;re inside our service area before we call.
              </p>
            </div>

            <fieldset>
              <legend className="field-label">
                Budget in mind? <span className="font-normal text-ink-500">(optional)</span>
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {BUDGET_RANGES.map((b) => (
                  <RadioPill
                    key={b.value}
                    name="budget"
                    value={b.value}
                    label={b.label}
                    checked={form.budget === b.value}
                    onChange={(v) => set("budget", v)}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-ink-500">
                No wrong answer — it just tells us whether to quote the full fix or a phased
                approach.
              </p>
            </fieldset>
          </div>
        )}

        {/* ---------------- Step 3 ---------------- */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="field-label">
                  Name
                </label>
                <input
                  id="name"
                  className="field"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="field-label">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="field"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(270) 555-0123"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="field"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
                inputMode="email"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
            </div>

            <fieldset>
              <legend className="field-label">Best way to reach you</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {CONTACT_METHODS.map((c) => (
                  <RadioPill
                    key={c.value}
                    name="preferredContact"
                    value={c.value}
                    label={c.label}
                    checked={form.preferredContact === c.value}
                    onChange={(v) => set("preferredContact", v)}
                  />
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bestTime" className="field-label">
                  Best time to reach you <span className="font-normal text-ink-500">(optional)</span>
                </label>
                <input
                  id="bestTime"
                  className="field"
                  value={form.bestTime}
                  onChange={(e) => set("bestTime", e.target.value)}
                  placeholder="Mornings before 10, or after 4"
                />
              </div>
              <div>
                <label htmlFor="heardAbout" className="field-label">
                  How did you hear about us? <span className="font-normal text-ink-500">(optional)</span>
                </label>
                <select
                  id="heardAbout"
                  className="field"
                  value={form.heardAbout}
                  onChange={(e) => set("heardAbout", e.target.value)}
                >
                  <option value="">Select one</option>
                  {HEARD_ABOUT.map((h) => (
                    <option key={h.value} value={h.value}>
                      {h.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Honeypot — visually and semantically hidden from real users */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company (leave blank)</label>
              <input
                id="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink-200 p-4 transition-colors hover:bg-ink-50">
                <input
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink-300 accent-volt-600"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                />
                <span className="text-sm leading-relaxed text-ink-600">
                  I agree that {site.name} may contact me by phone, text, or email about this
                  request. Message and data rates may apply. We never sell your information — see
                  our{" "}
                  <a href="/privacy" className="font-semibold text-volt-700 underline">
                    privacy policy
                  </a>
                  .
                </span>
              </label>
              {errors.consent && <p className="mt-1.5 text-sm text-red-600">{errors.consent}</p>}
            </div>

            {formError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
              >
                <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm leading-relaxed text-red-900">
                  {formError}{" "}
                  <a href={site.phoneHref} className="font-bold underline">
                    {site.phone}
                  </a>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between gap-3 border-t border-ink-100 bg-ink-50 px-6 py-5 md:px-8">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn btn-outline text-sm">
            Back
          </button>
        ) : (
          <a href={site.phoneHref} className="text-sm font-semibold text-ink-600 hover:text-ink-950">
            Rather just call? {site.phone}
          </a>
        )}

        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="btn btn-primary text-sm">
            Continue
            <IconArrow className="h-4 w-4" />
          </button>
        ) : (
          <button type="submit" disabled={submitting} className="btn btn-primary text-sm disabled:opacity-60">
            {submitting ? "Sending…" : "Send my request"}
          </button>
        )}
      </div>
    </form>
  );
}

function ServiceCheckbox({
  slug,
  name,
  icon,
  checked,
  onToggle,
}: {
  slug: string;
  name: string;
  icon: string;
  checked: boolean;
  onToggle: (slug: string) => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-[15px] transition-colors ${
        checked
          ? "border-volt-500 bg-volt-50 text-ink-950"
          : "border-ink-200 text-ink-700 hover:border-ink-300 hover:bg-ink-50"
      }`}
    >
      <input
        type="checkbox"
        className="h-4.5 w-4.5 shrink-0 rounded border-ink-300 accent-volt-600"
        checked={checked}
        onChange={() => onToggle(slug)}
      />
      <ServiceIcon name={icon} className={`h-4.5 w-4.5 shrink-0 ${checked ? "text-volt-700" : "text-ink-400"}`} />
      <span className="leading-snug">{name}</span>
    </label>
  );
}

function RadioPill({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-[15px] transition-colors ${
        checked
          ? "border-volt-500 bg-volt-50 text-ink-950"
          : "border-ink-200 text-ink-700 hover:border-ink-300 hover:bg-ink-50"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-4.5 w-4.5 shrink-0 accent-volt-600"
      />
      <span className="leading-snug">{label}</span>
    </label>
  );
}
