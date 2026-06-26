import { Check } from "lucide-react";

const includedFeatures = [
  "Unlimited boards & projects",
  "Up to 25 team members",
  "Sprint planning & reports",
  "Automations & integrations",
  "Priority email support",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-indigo-500">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </p>
          <p className="mt-4 text-lg text-slate-600">
            One plan with everything included. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-lg rounded-3xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
          <div className="rounded-[1.25rem] bg-white p-8 sm:p-10">
            <h3 className="text-lg font-semibold text-indigo-500">
              Flowly Pro
            </h3>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight text-slate-900">
                $12
              </span>
              <span className="text-slate-500">/ user / month</span>
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Billed annually. 14-day free trial.
            </p>

            <ul className="mt-8 space-y-3">
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 block w-full rounded-lg bg-indigo-500 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-indigo-600"
            >
              Choose Flowly Pro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
