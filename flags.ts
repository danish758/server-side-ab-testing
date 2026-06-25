import { flag } from "flags/next";
import { growthbookAdapter } from "@flags-sdk/growthbook";
import { identify } from "@/lib/identify";
import { DEFAULT_CTA_TEXT } from "@/lib/growthbook";

export const heroCtaFlag = flag<string>({
  key: "hero-cta-text",
  adapter: growthbookAdapter.feature<string>(),
  defaultValue: DEFAULT_CTA_TEXT,
  identify,
});
