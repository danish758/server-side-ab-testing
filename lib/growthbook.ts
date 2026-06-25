import { growthbookAdapter } from "@flags-sdk/growthbook";

export const DEFAULT_CTA_TEXT = "Start Free Trial";

// Log experiment exposures (fired when a visitor is bucketed). In production,
// forward these to your analytics/warehouse so GrowthBook can measure results.
growthbookAdapter.setTrackingCallback((experiment, result) => {
  console.log("[GrowthBook] exposure", {
    experiment: experiment.key,
    variationId: result.variationId,
    value: result.value,
  });
});
