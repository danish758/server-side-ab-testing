"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface CtaButtonProps {
  text: string;
  userId: string;
  variationId: number;
  className?: string;
}

export default function CtaButton({
  text,
  userId,
  variationId,
  className = "",
}: CtaButtonProps) {
  const [clicked, setClicked] = useState(false);

  async function handleClick() {
    setClicked(true);

    // Report the conversion to our server, which records/forwards it.
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "cta_clicked",
          userId,
          variationId,
          ctaText: text,
        }),
        keepalive: true,
      });
    } catch {
      // Never let analytics break the UX.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        "inline-flex items-center justify-center rounded-lg bg-indigo-500 px-6 py-3 " +
        "text-base font-semibold text-white shadow-sm transition " +
        "hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 " +
        "focus:ring-offset-2 " +
        className
      }
    >
      {text}
      {clicked && <span className="ml-2 text-indigo-100"> <Check /> </span>}
    </button>
  );
}
