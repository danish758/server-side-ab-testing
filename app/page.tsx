import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import EnsureUserCookie from "@/components/EnsureUserCookie";

import { heroCtaFlag } from "@/flags";
import { getUserId, USER_ID_COOKIE } from "@/lib/getUserId";
import { DEFAULT_CTA_TEXT } from "@/lib/growthbook";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Resolve the experiment on the server: identify → GrowthBook → CTA text.
  const ctaText = await heroCtaFlag();
  const { userId, isNew } = await getUserId();
  const variationId = ctaText === DEFAULT_CTA_TEXT ? 0 : 1;

  return (
    <main>
      <Navbar />
      <Hero ctaText={ctaText} userId={userId} variationId={variationId} />
      <Features />
      <Pricing />
      <Footer />
      <EnsureUserCookie
        userId={userId}
        cookieName={USER_ID_COOKIE}
        isNew={isNew}
      />
    </main>
  );
}
