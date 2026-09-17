import { NextRequest, NextResponse } from "next/server";
import {
  leadSchema,
  persistLead,
  notifyNewLead,
  rateLimit,
  newLeadId,
  hasDurableDestination,
  type StoredLead,
} from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const limit = rateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests from this connection. Please call us instead.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot: silently accept so the bot believes it succeeded, but store nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, reference: newLeadId() });
  }

  const { company: _company, ...rest } = parsed.data;

  const lead: StoredLead = {
    ...rest,
    consent: true,
    id: newLeadId(),
    receivedAt: new Date().toISOString(),
    status: "new",
  };

  try {
    await persistLead(lead);
  } catch (err) {
    // If we cannot write to disk we can still try to notify — but the customer
    // deserves to know if we cannot record their request at all.
    console.error("[leads] persist failed:", err);
    try {
      await notifyNewLead(lead);
      return NextResponse.json({ ok: true, reference: lead.id });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: "We could not save your request. Please call us so it doesn't get lost.",
        },
        { status: 500 },
      );
    }
  }

  await notifyNewLead(lead);

  // Loud warning for a deploy where nothing durable is configured. On a
  // serverless host the file write above does not survive the deploy, so this
  // lead exists nowhere the office will ever see it.
  if (!hasDurableDestination()) {
    console.error(
      `[leads] ${lead.id} was accepted but NO notification destination is ` +
        `configured. Set RESEND_API_KEY + LEAD_NOTIFICATION_EMAIL + ` +
        `LEAD_FROM_EMAIL, or LEAD_WEBHOOK_URL, or this lead is lost.`,
    );
  }

  return NextResponse.json({ ok: true, reference: lead.id });
}
