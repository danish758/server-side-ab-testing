import { cookies } from "next/headers";
import { dedupe } from "flags/next";
import { randomUUID } from "crypto";

export const USER_ID_COOKIE = "flowly_uid";

export interface UserIdResult {
  userId: string;
  isNew: boolean;
}

// Stable anonymous id used for bucketing. Deduped so identify() and the page
// resolve the same id within a request. New ids are persisted client-side
export const getUserId = dedupe(async (): Promise<UserIdResult> => {
  const cookieStore = await cookies();
  const existing = cookieStore.get(USER_ID_COOKIE)?.value;

  if (existing) {
    return { userId: existing, isNew: false };
  }

  return { userId: randomUUID(), isNew: true };
});
