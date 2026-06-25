"use client";

import { useEffect } from "react";

interface EnsureUserCookieProps {
  userId: string;
  cookieName: string;
  isNew: boolean;
}

// Persists a first-time visitor's id (cookies can't be set during a server
// render). Renders nothing and never touches GrowthBook.
export default function EnsureUserCookie({
  userId,
  cookieName,
  isNew,
}: EnsureUserCookieProps) {
  useEffect(() => {
    if (!isNew) return;
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `${cookieName}=${userId}; path=/; max-age=${oneYear}; samesite=lax`;
  }, [userId, cookieName, isNew]);

  return null;
}
