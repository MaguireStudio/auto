# NORS Electric — website

Multi-page marketing site with a service-request lead intake system for
NORS Electric LLC, a licensed electrical contractor in Murray, Kentucky.

Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4.

---

## ⚠️ Read this before launching

Two things need a human before this site goes public.

### 1. The Instagram account could not be read

The build environment blocks `instagram.com`, `facebook.com`, and `yelp.com` at
the network proxy, so the content of [@nors_electric](https://www.instagram.com/nors_electric/)
was never visible to the person who wrote this site. The services, process, and
copy were written from what public search results confirm about the business
plus standard practice for a residential/commercial electrical contractor in
West Kentucky.

**Go through `src/content/site.ts` and reconcile it against the real Instagram
and the owner's own description of the business.** Every field is tagged
`VERIFIED` or `CONFIRM`.

Verified from public listings:

| Fact | Value |
| --- | --- |
| Business name | NORS Electric (Nors Electric LLC) |
| Location | Murray, KY 42071 |
| Phone | (270) 293-0069 |
| Years in business | ~9 (founded ≈2016) |
| Instagram | @nors_electric |

Needs confirmation: the street address, email, domain, exact office hours
(listings disagree about Friday/Saturday), the Kentucky license number,
whether emergency service is offered, and the full service-area list.

### 2. Placeholder content that must not ship

- **Testimonials** in `src/content/site.ts` are labelled placeholders. Replace
  them with real, attributable reviews, then set `testimonialsArePlaceholder`
  to `false`. An on-page warning banner shows until you do. Publishing invented
  reviews is an FTC violation.
- **License number** — `site.licenseNumber` is `#ME00000`. Kentucky requires
  the real license number on advertising.
- **About page** — the three body paragraphs are generic. This is the highest
  -value page to rewrite in the owner's own words.
- **Privacy policy and terms** are plain-language starting points, not legal
  advice. Have them reviewed, especially the SMS consent language (TCPA).

---

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — see below
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, value props, services, process, area, reviews, FAQ |
| `/services` | All services, split residential / commercial |
| `/services/[slug]` | 12 individual service pages, each with what's included, warning signs, and FAQs |
| `/residential` | Homeowner landing page |
| `/commercial` | Business and agricultural landing page |
| `/request-service` | **Lead intake** — 3-step form |
| `/service-area` | Counties, towns, map |
| `/about` | Company story and standards |
| `/reviews` | Testimonials and review links |
| `/faq` | Every FAQ on the site, with FAQPage schema |
| `/contact` | Phone, email, hours, map, emergency callout |
| `/careers` | Hiring page for electricians |
| `/privacy`, `/terms` | Legal |
| `/admin/leads` | **Internal** lead inbox (password protected, noindex) |

---

## The lead intake system

### How it works

The form at `/request-service` is a three-step flow:

1. **What you need** — multi-select service interest, property type, urgency
2. **Job details** — free-text description, service address, budget range
3. **Contact info** — name, phone, email, preferred contact method, best time,
   how they heard about you, consent checkbox

Service pages link in with `?service=<slug>`, which pre-selects that service.

On submit it POSTs to `/api/leads`, which:

1. Rate-limits by IP (5 per 10 minutes)
2. Validates against the zod schema in `src/lib/lead-fields.ts`
3. Silently discards honeypot hits (bots get a fake success response)
4. Appends the lead to `data/leads.jsonl`
5. Fans out notifications — email via Resend, and a webhook POST — without
   letting either failure lose the lead

The customer gets a confirmation with a reference number like `NE-2026-3958C6CE`.

### Getting notified

Set these in your host's environment (see `.env.example`):

- `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `LEAD_FROM_EMAIL` — emails a
  formatted lead to the office, with the customer's address as reply-to.
  Emergency-flagged leads get a red banner and `[EMERGENCY]` in the subject.
- `LEAD_WEBHOOK_URL` — POSTs the lead as JSON to Zapier / Make / Jobber /
  Housecall Pro / anything that takes a webhook.

**Set at least one of these before launch.** Without them, leads land on disk
and nobody is told they arrived.

### Where leads are stored

`data/leads.jsonl`, one JSON object per line, gitignored.

On **serverless hosts (Vercel, Netlify)** the filesystem is ephemeral — this
file survives the request but not the deploy. There, treat the notification
email and the webhook as your system of record. `/admin/leads` will look empty.

On a **VPS or container with a mounted volume**, set `LEADS_DATA_DIR` to that
volume and the file is durable; `/admin/leads` reads it back.

### The admin inbox

`/admin/leads` lists every stored lead, newest first, with click-to-call and
click-to-email, emergency flagging, and counts for today and total.

It is protected by HTTP Basic Auth (`src/middleware.ts`) using `ADMIN_USER`
and `ADMIN_PASSWORD`. **If either is unset the route returns 404** — it fails
closed so a misconfigured deploy never exposes customer data. It is also
excluded in `robots.txt` and carries `noindex`.

---

## Editing content

**`src/content/site.ts` is the single source of truth.** Business facts,
services, service area, process steps, testimonials, and FAQs all live there.
No page hard-codes a phone number or a service name.

To add a service, append to the `services` array. Everything follows
automatically — the services index, the footer, the form checkboxes, the
sitemap, and a new `/services/<slug>` page with schema markup.

Keep `slug` values stable once the site is live; changing one breaks any link
Google has indexed.

---

## SEO

- Per-page metadata, canonical URLs, and Open Graph tags
- `Electrician` LocalBusiness JSON-LD with hours, geo, service area, and a
  full service catalog
- `Service`, `FAQPage`, and `BreadcrumbList` schema on the relevant pages
- Generated `sitemap.xml` and `robots.txt`

**Set `site.url` to the real domain before launch** — canonical URLs, the
sitemap, and schema all derive from it.

Still worth doing by hand: claim the Google Business Profile, get the NAP
(name/address/phone) identical across Google, Facebook, Instagram, and Yelp,
and add the Google review link to `/reviews`.

---

## Deploying

Standard Next.js. Vercel is the least-effort option:

1. Push this repo, import it in Vercel
2. Add the environment variables from `.env.example`
3. Point the domain, and set `site.url` to match

Any Node host works too — `npm run build && npm start`. If you self-host,
mount a volume and set `LEADS_DATA_DIR` so the lead file persists.

---

## Still to add

- Real photos. There is no `/gallery` or project portfolio yet because there
  were no images available — the Instagram feed is the obvious source. A photo
  of the actual crew and truck outperforms any stock image.
- A favicon and an Open Graph share image.
- Google Analytics or Plausible, if you want it. Nothing is tracking right now,
  which is why the privacy policy says there are no tracking cookies — update
  it if that changes.
