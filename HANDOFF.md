# Handoff — NORS Electric website

Briefing for whoever picks this up next, human or AI. Written at commit `a8df0bb`.

Read the two **Critical context** sections before changing anything. They cover
decisions that look like unfinished work and are not.

---

## 1. What this is

A marketing site plus service-request lead intake system for **NORS Electric LLC**,
a licensed electrical contractor in Murray, Kentucky (Calloway County).

Built for the repo owner (`maddguire@gmail.com` / GitHub `MaguireStudio`), who is
building it *for* NORS Electric. The owner of NORS Electric has not been consulted
directly at any point — everything about the business came from public sources.

**Repos** (identical content, both current):

| Remote | Branch |
| --- | --- |
| `github.com/MaguireStudio/nors-electric-website` | `main` ← use this one |
| `github.com/MaguireStudio/auto` | `claude/nors-electric-website-dz21ij` |

**Stack:** Next.js 15.5.4 (App Router) · React 19.1.1 · TypeScript · Tailwind CSS
4.1.13 · Zod 3.25.76. No database. 36 source files.

```bash
npm install
npm run dev        # localhost:3000
npm run build      # must pass before any push
npm run typecheck
npm run lint       # eslint flat config; currently clean
```

---

## 2. Critical context — the Instagram was never readable

The original request was: *"look at this Instagram [@nors_electric] and see all content
it has and build a website based off their services."*

**That Instagram was never accessed.** The build environment blocks `instagram.com`,
`facebook.com` and `yelp.com` at the network egress proxy (HTTP 403 on CONNECT).
Routing around an egress policy was not appropriate, so it wasn't attempted.

What is actually verified, from web search of public listings:

| Fact | Value |
| --- | --- |
| Business name | NORS ELECTRIC / Nors Electric LLC |
| Location | Murray, KY 42071 |
| Phone | (270) 293-0069 |
| Years in business | ~9 (founded ≈2016) |
| Instagram | `@nors_electric` |
| Facebook | `facebook.com/p/NORS-Electric-61567710190102/` |

Everything else — **all twelve service descriptions, the process, the service area,
the About page** — was written from those facts plus standard practice for a
residential/commercial electrical contractor in west Kentucky. It is plausible and
regionally specific (Murray Electric System, Kentucky Lake dock wiring, grain bin
circuits, Federal Pacific panels) but **it is not sourced from the business.**

Every field in `src/content/site.ts` is tagged `VERIFIED` or `CONFIRM`.

**What this means for you:** if you get access to the Instagram, or the owner's own
description of the business, reconcile `src/content/site.ts` against it. That is the
highest-value work remaining. Do not treat the current service list as ground truth.

---

## 3. Critical context — withheld claims are deliberate

**The site omits several things on purpose. They are not TODOs to fill in with
plausible values.** An earlier version shipped placeholders, and they were removed
precisely because they were fabrications about a real, named business.

Everything below is null/false/empty in `src/content/site.ts`, and the UI is built to
render *nothing* (or a truthful fallback) rather than a placeholder:

| Withheld | Config | Fallback behaviour |
| --- | --- | --- |
| License number | `site.credentials.licenseNumber` | No license claim renders anywhere |
| Licensed/insured/bonded | `site.credentials.insured` / `.bonded` | Hero badge → "Serving Murray & Calloway County since 2016"; stat → service count |
| Email address | `site.email` | Every `mailto:` hidden; phone shown instead |
| Testimonials | `site.testimonials` (empty array) | Review sections hide; `/reviews` shows an honest empty state |
| Canonical domain | `NEXT_PUBLIC_SITE_URL` env | Site serves `noindex` + `Disallow: /` |
| After-hours service | `site.afterHoursNote` | No after-hours promise made |

### Do not

- **Do not invent a license number.** KRS 227A requires the real number on
  electrical contractor advertising. A placeholder like `#ME00000` shipped once and
  was removed.
- **Do not write testimonials.** Fabricated reviews violate the FTC Act
  (16 CFR Part 465, civil penalties per violation) and Kentucky's Consumer
  Protection Act. The empty array is correct until real, attributable reviews exist.
- **Do not assert "licensed, bonded and insured"** without a certificate of
  insurance in hand. It's a deceptive trade practice otherwise.
- **Do not set `NEXT_PUBLIC_SITE_URL`** to a domain the owner doesn't control just
  to switch indexing on.

To turn any of these on, fill in the real value in `src/content/site.ts` and the UI
picks it up automatically. No component changes needed.

---

## 4. Architecture

### `src/content/site.ts` — single source of truth

Business facts, 12 services, service area, booking process, testimonials, FAQs. **No
page hard-codes a phone number or service name.** Adding a service to the `services`
array automatically produces: a `/services/<slug>` page with schema markup, an entry
in the services index and footer, a checkbox in the lead form, and a sitemap entry.

Keep `slug` values stable once live — changing one breaks indexed URLs.

Note: this file exports `bookingProcess`, not `process`. The latter shadowed the Node
global for the whole module and broke `process.env` reads inside it.

### Lead intake

```
/request-service  →  LeadForm.tsx  →  POST /api/leads  →  persist + notify
```

- `src/lib/lead-fields.ts` — field options + Zod schema. **Client-safe, no Node
  built-ins.** Keep it that way; the browser bundle imports it.
- `src/lib/leads.ts` — server only: filesystem, Resend email, webhook, rate limiter.
  Re-exports everything from `lead-fields.ts`.
- `src/app/api/leads/route.ts` — rate limit → validate → honeypot → persist → notify.

Three-step form: service interest (multi-select) → job details → contact info.
Service pages deep-link with `?service=<slug>` to preselect. Emergency-flagged
requests are surfaced in the UI, the email subject and the admin inbox, and the
customer is pushed toward calling instead.

### Storage and notification

Leads append to `data/leads.jsonl`. **On Vercel this is `/tmp/nors-leads/` and does
not survive a deploy** — the durable record is the notification email and/or the
webhook. The API route logs a loud error when a lead arrives with neither
configured.

### Admin inbox

`/admin/leads`, behind HTTP Basic Auth in `src/middleware.ts`. **Returns 404 when
`ADMIN_USER`/`ADMIN_PASSWORD` are unset** — fails closed so a misconfigured deploy
never exposes customer data. Also `noindex` and disallowed in robots.

### SEO

`src/lib/schema.tsx` generates `Electrician` LocalBusiness, `Service`, `FAQPage` and
`BreadcrumbList` JSON-LD. Generated `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
(Satori), `manifest.ts`.

---

## 5. Where deployment is stuck

The site is **not live**. Status as of this handoff:

- ✅ Code pushed to both repos
- ✅ Vercel project created (`nors-electric-website-ppjh`, Hobby plan), importing
  from `main`
- ❌ **First deploy failed.** Log stopped after `Cloning completed`, never reached
  install.

Two causes identified:

1. **`"regions": ["iad1"]` in `vercel.json`** — Pro/Enterprise only; fails config
   validation on Hobby before the install step. **Already fixed and pushed** in
   `a8df0bb`.
2. **Framework Preset was set to "Other"** in the Vercel project, so no build command
   runs. The user needs to set it to **Next.js** in Settings → General, then redeploy
   with the build cache unticked. *Unconfirmed whether they have done this.*

Ask the user for the current deploy status and the **full** build log before
diagnosing further — the log shared previously was truncated to 5 lines and the
second cause above is inferred from the "Other" preset, not from an error message.

### Required environment variables

Set in the Vercel dashboard (see `.env.example` for the full annotated list):

| Variable | Consequence if unset |
| --- | --- |
| `RESEND_API_KEY` + `LEAD_NOTIFICATION_EMAIL` + `LEAD_FROM_EMAIL` | Leads accepted, nobody notified, record lost on next deploy |
| `LEAD_WEBHOOK_URL` | Alternative to the above; either one suffices |
| `ADMIN_USER` + `ADMIN_PASSWORD` | `/admin/leads` returns 404 |
| `NEXT_PUBLIC_SITE_URL` | Site stays `noindex` (deliberate) |

**Tell the user to submit one real test request on the live URL and confirm the email
arrives.** With Resend misconfigured the form still says "Request received" and the
lead vanishes — it looks completely fine from outside. This is the highest-risk
failure mode in the project.

---

## 6. Open work, roughly prioritised

1. **Get the deploy green** (see above).
2. **Reconcile content against the real business** — Instagram, or the owner's own
   words. Highest value.
3. **Collect the withheld facts** from the owner: license number, COI, working email,
   final domain, real reviews.
4. **Rewrite `/about`** — the body copy is generic and marked with a content note.
   Best page to put in the owner's voice.
5. **Legal review** of `/privacy` and `/terms` — plain-language starting points, not
   legal advice. Particularly the SMS consent language (TCPA).
6. **Photos.** There is no gallery or portfolio because no images were available.
   Instagram is the obvious source. Real photos of the crew and trucks outperform
   anything stock.
7. **Google Business Profile** — claim it, make name/address/phone identical across
   Google, Facebook, Instagram and Yelp, and add the review link to `/reviews`.

---

## 7. Gotchas learned the hard way

Each of these cost a debugging cycle. Don't rediscover them.

- **`vercel.json` `regions` is Pro-only.** Caused the failed deploy above.
- **Serverless filesystems are read-only except `/tmp`.** `process.cwd()/data` threw
  `EROFS` on Vercel and returned a 500 to every customer. Handled in `leads.ts`;
  don't undo it.
- **The honeypot schema must *accept* a filled `company` field.** Zod originally had
  `.max(0)`, which returned a field error naming the exact input for a bot to leave
  blank next time. The route silently discards instead.
- **Satori (OG image generation) ships no emoji font** — emoji render as empty boxes.
  Use inline SVG. It also requires explicit `display: flex` on any `div` with more
  than one child, and interpolated text counts as multiple children.
- **Never commit `output: "export"`** to `next.config.ts`. A static export was used
  once to build a preview, in a throwaway copy outside the repo. Committing it would
  break the API route, middleware and the entire lead system.
- **Tailwind v4 generates fractional spacing** from `--spacing`, so `h-4.5` is valid
  and emits real CSS. It looks like a typo and isn't.
- **`git push -u` retargets the branch upstream.** Pushing to the new repo silently
  left `MaguireStudio/auto` a commit behind. Push both, or check.

---

## 8. Verifying a change

`npm run build`, `npm run typecheck` and `npm run lint` must all pass. Beyond that,
the checks that have caught real regressions:

```bash
# Start a production build with admin creds
ADMIN_USER=x ADMIN_PASSWORD=y npx next start -p 3000

# No fabricated claims anywhere
for t in ME00000 norselectricky "Replace this with a real review" "Licensed, bonded"; do
  for p in / /about /contact /reviews /privacy /terms /careers /request-service; do
    curl -s localhost:3000$p; done | grep -c "$t"; done      # all must be 0

# noindex while NEXT_PUBLIC_SITE_URL is unset
curl -s localhost:3000/ | grep -o 'name="robots" content="[^"]*"'   # noindex, nofollow

# Lead pipeline + honeypot (second must not increase the stored count)
curl -s -X POST localhost:3000/api/leads -H 'Content-Type: application/json' \
  -d '{"name":"Test","phone":"2705550100","email":"t@example.com","propertyType":"home",
       "serviceSlugs":["panel-upgrades"],"urgency":"days","preferredContact":"phone",
       "details":"Regression check of the lead pipeline.","consent":true}'
# same again with "company":"X" appended → returns ok:true, stores nothing

# Admin fails closed and survives a malformed header
curl -s -o /dev/null -w '%{http_code}\n' -H 'Authorization: Basic !!!' localhost:3000/admin/leads  # 401
```

Also verify `npm run build` with `VERCEL=1` set — that's the code path that decides
where leads are written.

---

## 9. A preview exists

A static export of all 26 pages is published at
**https://claude.ai/artifact/9LMKpGdQYFUSs7feYAVKjQ** (private to the repo owner;
shareable from the page's share menu).

Design and content only — the form, admin inbox and lead emails are server features
and don't run there. Page JavaScript was stripped so links navigate as plain HTML,
which also makes the mobile menu inert. Every page carries a banner saying so.

It reflects commit `4408833`, one commit before the `vercel.json` fix — no visible
difference, since that change was config only.
