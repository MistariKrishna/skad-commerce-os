import { NextResponse } from "next/server";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // honeypot: real people never fill this hidden field
  if (typeof body.trap === "string" && body.trap.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!name || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "validation_failed" }, { status: 422 });
  }

  // TODO (backend team): save to database, email the team, send auto-reply. See roadmap Phase 1.
  console.info("[enquiry received]", { name, email, business: body.businessType, page: body.page });

  return NextResponse.json({ ok: true });
}