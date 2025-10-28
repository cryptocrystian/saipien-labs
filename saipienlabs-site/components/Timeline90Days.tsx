export default function Timeline90Days() {
  const steps = [
    {
      days: "Day 0–10",
      phase: "Discovery & Prototype",
      description: "Working prototype, KPI baseline, acceptance criteria locked.",
      status: "scoped"
    },
    {
      days: "Day 11–30",
      phase: "Core Build v1",
      description: "Critical path flows running end-to-end in a sandbox.",
      status: "prod-candidate"
    },
    {
      days: "Day 31–60",
      phase: "Integrations & Hardening",
      description: "Your CRM / support / data layer wired in. Logging, tests, spend caps live.",
      status: "integrated"
    },
    {
      days: "Day 61–90",
      phase: "Beta & Launch",
      description: "Security review, performance tuning, rollout, runbook delivered.",
      status: "beta-ready"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="timeline">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-mist mb-4">
            How we get you live in 90 days
          </h2>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Animated gradient line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-accentTeal via-accentBlue to-accentViolet opacity-30 rounded-full">
            <div className="h-full bg-aurora-animated rounded-full" />
          </div>

          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Node */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate border-2 border-accentBlue flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-accentBlue" />
                </div>

                {/* Content */}
                <div className="pt-24">
                  <div className="bg-slate rounded-xl p-6 border border-mist/10 hover:border-accentBlue/30 transition-colors">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-graphite font-mono text-xs text-accentTeal border border-accentTeal/30">
                        [{step.status}]
                      </span>
                    </div>
                    <p className="font-mono text-sm text-mist/60 mb-2">
                      {step.days}
                    </p>
                    <h3 className="text-xl font-semibold text-mist mb-3">
                      {step.phase}
                    </h3>
                    <p className="text-mist/70 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accentTeal via-accentBlue to-accentViolet opacity-30" />

            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6 mb-8 last:mb-0">
                {/* Node */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-slate border-2 border-accentBlue flex items-center justify-center z-10">
                    <div className="w-4 h-4 rounded-full bg-accentBlue" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-slate rounded-xl p-6 border border-mist/10">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-graphite font-mono text-xs text-accentTeal border border-accentTeal/30">
                        [{step.status}]
                      </span>
                    </div>
                    <p className="font-mono text-sm text-mist/60 mb-2">
                      {step.days}
                    </p>
                    <h3 className="text-xl font-semibold text-mist mb-3">
                      {step.phase}
                    </h3>
                    <p className="text-mist/70 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
