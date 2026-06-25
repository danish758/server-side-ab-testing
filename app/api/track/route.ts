import { NextRequest, NextResponse } from "next/server";

// Records the "cta_clicked" conversion. In production, forward this to your
// analytics/warehouse (the data source GrowthBook reads to measure the test).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, userId, variationId, ctaText } = body ?? {};

    if (event === "cta_clicked") {
      console.log("[Conversion] cta_clicked", {
        userId,
        variationId,
        ctaText,
        at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
