/**
 * Field definitions and the validation schema for the service-request form.
 *
 * Kept free of Node built-ins so the browser bundle can import it — the
 * filesystem and notification code lives in ./leads.ts, which is server-only.
 */
import { z } from "zod";
import { services } from "@/content/site";

const serviceSlugs = services.map((s) => s.slug);

export const URGENCY_OPTIONS = [
  {
    value: "emergency",
    label: "Emergency — no power, smoke, or burning smell",
    hint: "Please call us instead. We answer the phone faster than the inbox.",
  },
  { value: "days", label: "Soon — within a few days" },
  { value: "weeks", label: "Planned — in the next few weeks" },
  { value: "planning", label: "Just planning and pricing for now" },
] as const;

export const PROPERTY_TYPES = [
  { value: "home", label: "My home" },
  { value: "rental", label: "Rental property I own" },
  { value: "business", label: "Business or commercial space" },
  { value: "new-construction", label: "New construction" },
  { value: "farm", label: "Farm or agricultural" },
] as const;

export const CONTACT_METHODS = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
] as const;

export const BUDGET_RANGES = [
  { value: "unsure", label: "Not sure yet — tell me what it costs" },
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "over-15k", label: "Over $15,000" },
] as const;

export const HEARD_ABOUT = [
  { value: "google", label: "Google search" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "referral", label: "Friend or family referral" },
  { value: "contractor", label: "A builder or contractor" },
  { value: "repeat", label: "I'm a returning customer" },
  { value: "other", label: "Somewhere else" },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [string, ...string[]];

/**
 * Server-side validation contract for an inbound lead.
 * The browser form mirrors these rules, but this is the one that counts.
 */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you at")
    .max(30)
    .regex(/^[0-9+().\-\s]+$/, "Phone numbers can only contain digits and + ( ) - ."),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  zip: z.string().trim().max(15).optional().or(z.literal("")),

  propertyType: z.enum(values(PROPERTY_TYPES)),
  serviceSlugs: z
    .array(z.string())
    .min(1, "Pick at least one service you're interested in")
    .max(serviceSlugs.length + 1)
    .refine((arr) => arr.every((s) => serviceSlugs.includes(s) || s === "other"), {
      message: "Unknown service selected",
    }),
  urgency: z.enum(values(URGENCY_OPTIONS)),
  budget: z.enum(values(BUDGET_RANGES)).optional().or(z.literal("")),
  preferredContact: z.enum(values(CONTACT_METHODS)),
  bestTime: z.string().trim().max(120).optional().or(z.literal("")),
  heardAbout: z.enum(values(HEARD_ABOUT)).optional().or(z.literal("")),

  details: z
    .string()
    .trim()
    .min(10, "Tell us a little about the job — even one sentence helps")
    .max(4000),

  consent: z
    .literal(true, { errorMap: () => ({ message: "Please agree to be contacted about your request" }) })
    .or(z.literal("true").transform(() => true as const)),

  // Honeypot — real people never fill this in, bots almost always do.
  // Deliberately permissive: the schema must ACCEPT a filled honeypot so the
  // route can silently discard it. Rejecting it here would hand a bot a field
  // error naming the exact input to leave blank next time.
  company: z.string().max(200).optional().or(z.literal("")),

  sourcePage: z.string().max(300).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
