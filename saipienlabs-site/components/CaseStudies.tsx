export default function CaseStudies() {
  const cases = [
    {
      name: "Pravado",
      tagline: "Revenue ops automation wired into their CRM.",
      metrics: [
        { label: "Lead response", value: "18h → 2.3h" },
        { label: "Sales ops cost / lead", value: "−34%" },
        { label: "Deployed in", value: "42 days" }
      ],
      schema: "CRM → AI Assist → Sales Team"
    },
    {
      name: "aivery",
      tagline: "AI workflow engine for repetitive support + internal requests.",
      metrics: [
        { label: "Avg handle time", value: "−27%" },
        { label: "Human-in-the-loop routing", value: "Yes" },
        { label: "Compliance", value: "SOC-aware & auditable" }
      ],
      schema: "Support Inbox → AI Router → Human Approver"
    },
    {
      name: "Wellstead",
      tagline: "Intelligent intake + triage for a complex backend process.",
      metrics: [
        { label: "Higher throughput", value: "No new headcount" },
        { label: "Integration", value: "Existing stack" },
        { label: "Reporting", value: "Weekly exec summaries" }
      ],
      schema: "Intake → AI Triage → Ops System"
    }
  ];

  return (
    <section className="py-24 relative" id="work">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-mist mb-4">
            Selected Work
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((case_, index) => (
            <div
              key={index}
              className="bg-slate rounded-xl p-8 border border-mist/10 hover:border-accentBlue/30 transition-all duration-300 group"
            >
              {/* Schematic diagram placeholder */}
              <div className="mb-6 p-6 bg-graphite/50 rounded-lg border border-mist/5">
                <svg
                  className="w-full h-24"
                  viewBox="0 0 200 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* System A */}
                  <rect x="10" y="25" width="40" height="30" rx="4" stroke="#C7D2E0" strokeWidth="1" opacity="0.4" />
                  <text x="30" y="45" fill="#C7D2E0" fontSize="8" textAnchor="middle" opacity="0.6">SYS</text>

                  {/* AI Layer */}
                  <rect x="80" y="15" width="40" height="50" rx="4" stroke="#00BFA6" strokeWidth="1.5" opacity="0.6" />
                  <text x="100" y="43" fill="#00BFA6" fontSize="8" textAnchor="middle" opacity="0.8">AI</text>

                  {/* System B */}
                  <rect x="150" y="25" width="40" height="30" rx="4" stroke="#C7D2E0" strokeWidth="1" opacity="0.4" />
                  <text x="170" y="45" fill="#C7D2E0" fontSize="8" textAnchor="middle" opacity="0.6">SYS</text>

                  {/* Arrows */}
                  <path d="M 50 40 L 80 40" stroke="#4C8DFF" strokeWidth="1" opacity="0.4" markerEnd="url(#arrowhead)" />
                  <path d="M 120 40 L 150 40" stroke="#4C8DFF" strokeWidth="1" opacity="0.4" markerEnd="url(#arrowhead)" />

                  <defs>
                    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <polygon points="0 0, 6 3, 0 6" fill="#4C8DFF" opacity="0.4" />
                    </marker>
                  </defs>
                </svg>
              </div>

              {/* Case info */}
              <h3 className="text-2xl font-semibold text-mist mb-3">
                {case_.name}
              </h3>
              <p className="text-mist/70 mb-3 leading-relaxed">
                {case_.tagline}
              </p>
              <p className="font-mono text-xs text-mist/50 mb-6">
                {case_.schema}
              </p>

              {/* KPI chips */}
              <div className="space-y-2">
                {case_.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-2 rounded-full bg-graphite/50 border border-mist/10"
                  >
                    <span className="font-mono text-xs text-mist/60">{metric.label}</span>
                    <span className="font-mono text-xs text-accentTeal">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
