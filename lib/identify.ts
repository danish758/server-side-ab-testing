import type { Identify } from "flags";
import type { Attributes } from "@flags-sdk/growthbook";
import { getUserId } from "./getUserId";

// Supplies the GrowthBook attributes used for per-visitor bucketing.
export const identify: Identify<Attributes> = async () => {
  const { userId } = await getUserId();
  return { id: userId };
};
