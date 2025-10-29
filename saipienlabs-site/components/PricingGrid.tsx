export default function PricingGrid() {
  const offerings = [
    {
      name: "AI Workflow & Automation Audit",
      price: "$15k–$40k",
      features: [
        "Automation map + ROI",
        "Compliance / data boundary plan",
        "Exec-ready rollout path"
      ],
      cta: "See Automation Brief →",
      ctaLink: "mailto:hello@saipienlabs.com?subject=Automation%20Audit%20Brief",
      footer: "// blueprint before you build"
    },
    {
      name: "AI Feasibility Audit",
      price: "$5k–$10k",
      features: [
        "Viability & ROI model",
        "Architecture sketch & risk analysis",
        "Dataset readiness & cost-to-serve",
        "Feasibility Readout Deck + 90-Day roadmap"
      ],
      cta: "Book Feasibility Readout",
      ctaLink: "#contact",
      footer: "// de-risk before you invest"
    },
    {
      name: "Sprint Zero",
      price: "$12k–$25k",
      features: [
        "ROI model",
        "Clickable prototype",
        "Acceptance criteria"
      ],
      cta: "See SOW",
      ctaLink: "mailto:hello@saipienlabs.com?subject=Sprint%20Zero%20SOW",
      footer: "// includes KPI baseline + success definition"
    },
    {
      name: "90-Day MVP",
      price: "$60k–$180k",
      features: [
        "Core features shipped",
        "Integrated into your stack",
        "Hardening + launch plan"
      ],
      cta: "View Roadmap",
      ctaLink: "mailto:hello@saipienlabs.com?subject=90-Day%20MVP%20Roadmap",
      footer: "// ship a production candidate in 90 days"
    },
    {
      name: "AI Dev Pod (Monthly)",
      price: "$35k–$70k/mo",
      features: [
        "Dedicated AI pod",
        "2–3 production increments/month",
        "Your backlog, our velocity"
      ],
      cta: "Pod Charter",
      ctaLink: "mailto:hello@saipienlabs.com?subject=AI%20Dev%20Pod%20Charter",
      footer: "// ongoing delivery without headcount"
    },
    {
      name: "Managed Run",
      price: "$8k–$20k/mo + usage",
      features: [
        "Monitoring & on-call",
        "Eval loops / regression alerts",
        "Spend management"
      ],
      cta: "Runbook",
      ctaLink: "mailto:hello@saipienlabs.com?subject=Managed%20Run%20Runbook",
      footer: "// we watch it so you don't"
    },
    {
      name: "CoE-in-a-Box",
      price: "$120k–$300k setup + $20k–$60k/mo",
      features: [
        "Governance aligned to NIST / ISO / EU AI rules",
        "Security review & audit trails",
        "Playbooks, training, handoff"
      ],
      cta: "Deliverables",
      ctaLink: "mailto:hello@saipienlabs.com?subject=CoE-in-a-Box%20Deliverables",
      footer: "// make legal + security say yes"
    }
  ];

  return (
    <section className="py-24 relative" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-mist mb-4">
            Productized, not vague.
          </h2>
          <p className="font-mono text-sm text-mist/60 max-w-2xl mx-auto">
            Clear scope. Clear price band. Clear handoff.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="relative bg-slate rounded-xl p-8 border-t-2 hover:shadow-2xl hover:shadow-accentBlue/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden"
              style={{
                borderImage: `linear-gradient(90deg, #00BFA6 0%, #4C8DFF 50%, #8B5CF6 100%) 1`,
                borderImageSlice: '1 0 0 0'
              }}
            >
              {/* Gradient ring on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-accentTeal/20 to-accentViolet/20" />
              </div>

              <div className="relative flex-grow">
                {/* AI-accelerated pill */}
                <div className="absolute top-0 right-0 px-3 py-1 rounded-full bg-gradient-to-r from-accentTeal/10 to-accentBlue/10 border border-accentTeal/30">
                  <span className="text-[10px] uppercase tracking-wider text-accentTeal font-semibold">AI-accelerated</span>
                </div>

                <h3 className="text-2xl font-semibold text-mist mb-2 pr-32">
                  {offering.name}
                </h3>
                <p className="text-accentTeal font-mono text-lg mb-6">
                  {offering.price}
                </p>

                <ul className="space-y-3 mb-6">
                  {offering.features.map((feature, idx) => (
                    <li key={idx} className="text-mist/70 leading-relaxed flex items-start">
                      <span className="text-accentBlue mr-2 mt-1">→</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-auto pt-6 border-t border-mist/10">
                <a
                  href={offering.ctaLink}
                  className="inline-flex items-center gap-2 text-accentBlue hover:text-accentTeal transition-colors font-mono text-sm group-hover:gap-3 transition-all"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.saipien?.track) {
                      window.saipien.track('pricing_click', { source: 'pricing_grid', offering: offering.name });
                    }
                  }}
                >
                  {offering.cta} →
                </a>
                <p className="text-xs font-mono text-mist/40 mt-3">
                  {offering.footer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
