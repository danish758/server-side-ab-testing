const features = [
  {
    title: "Visual boards",
    description:
      "Drag-and-drop kanban boards that update in real time, so everyone always knows what's next.",
    icon: "🗂️",
  },
  {
    title: "Sprint planning",
    description:
      "Plan, estimate, and prioritize work in minutes. Flowly handles the math so you can focus on the work.",
    icon: "🚀",
  },
  {
    title: "Automations",
    description:
      "Replace busywork with rules. Move cards, assign owners, and ping the right people automatically.",
    icon: "⚡",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-indigo-500">
            Everything in one place
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The tools your team actually uses
          </p>
          <p className="mt-4 text-lg text-slate-600">
            No bloat, no 40-tab setup. Just the essentials, done exceptionally
            well.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
