import { ArrowRight } from "lucide-react";
import CtaButton from "./CtaButton";

interface HeroProps {
  ctaText: string;
  userId: string;
  variationId: number;
}

export default function Hero({ ctaText, userId, variationId }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl"
      >
        <div className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-indigo-200 to-indigo-400 opacity-30" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-200">
          New · Flowly 2.0 is here
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Project management that finally{" "}
          <span className="text-indigo-500">flows</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Plan sprints, track work, and ship on time — without the chaos of
          endless tabs and status meetings. Flowly keeps your whole team in one
          calm, focused place.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CtaButton text={ctaText} userId={userId} variationId={variationId} />
          <a
            href="#features"
            className="inline-flex items-center gap-1 text-base font-semibold text-slate-700 transition hover:text-slate-900"
          >
            See how it works
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Trusted by 4,000+ teams at fast-moving companies.
        </p>
      </div>
    </section>
  );
}
