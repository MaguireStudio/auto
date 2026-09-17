import { NextRequest, NextResponse } from "next/server";

/**
 * HTTP Basic Auth in front of /admin.
 *
 * This is deliberately simple — it is a shield over a small internal page, not
 * a user system. It only works when ADMIN_USER and ADMIN_PASSWORD are set; if
 * they are missing the route returns 404 rather than serving leads to the
 * public, so a misconfigured deploy fails closed.
 */
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!user || !password) {
    return new NextResponse("Not found", { status: 404 });
  }

  const header = req.headers.get("authorization");

  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(":");
      // No colon means a malformed credential, not a a username with an empty
      // password — reject rather than comparing against a truncated string.
      if (sep !== -1) {
        const givenUser = decoded.slice(0, sep);
        const givenPass = decoded.slice(sep + 1);

        if (safeEqual(givenUser, user) && safeEqual(givenPass, password)) {
          return NextResponse.next();
        }
      }
    } catch {
      // atob() throws on malformed base64. Fall through to the 401 challenge
      // below rather than surfacing a 500 to anyone who sends a bad header.
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="NORS Electric admin", charset="UTF-8"' },
  });
}

/** Constant-time-ish comparison so the check does not leak length or prefix. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export const config = {
  matcher: ["/admin/:path*"],
};
