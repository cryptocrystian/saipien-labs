import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your MVP in 90 Days – Saipien [LABS]",
  description: "How Saipien Labs designs, ships, integrates, hardens, and hands off production AI systems in 90 days.",
};

export default function MvpPlanPage() {
  return (
    <div className="min-h-screen bg-obsidian text-mist">
      {/* Header */}
      <header className="border-b border-slate">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <a href="/" className="text-sm text-mist/60 hover:text-accentTeal transition-colors font-mono">
            ← Back to home
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Cover Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-slate to-graphite border-t-2 border-aurora rounded-xl p-12 text-center">
            <h1 className="text-5xl font-bold mb-4">
              Your MVP in <span className="text-aurora">90 Days</span>
            </h1>
            <p className="text-xl text-mist/80 mb-8 max-w-2xl mx-auto">
              How Saipien [LABS] designs, ships, integrates, hardens, and hands off production AI systems.
            </p>
            <div className="bg-obsidian/60 border border-accentTeal/30 rounded-lg p-6 font-mono text-sm max-w-md mx-auto">
              <div className="text-accentTeal">Integration-first. Governed. Budget-capped.</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/assets/saipien-90-day-mvp-plan.pdf"
              download
              className="inline-flex items-center gap-2 bg-aurora text-obsidian font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
        </section>

        {/* Phase Overview */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">The 4-Phase Timeline</h2>

          <div className="space-y-8">
            {/* Phase 1 */}
            <div className="bg-slate border-l-4 border-accentTeal rounded-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Phase 1 — Day 0–10</h3>
                  <p className="text-xl text-accentTeal font-semibold">Discovery & Prototype</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-accentTeal/20 text-accentTeal border border-accentTeal/30 whitespace-nowrap">
                  [scoped]
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-mist/80 mb-2">Output:</h4>
                  <ul className="list-disc list-inside space-y-1 text-mist/70">
                    <li>Clickable prototype of the core workflow</li>
                    <li>KPI baseline and success criteria locked</li>
                    <li>Acceptance criteria for 'what done means'</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-mist/80 mb-2">Risk removed:</h4>
                  <p className="text-mist/70">Stakeholders aligned on value and scope</p>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-slate border-l-4 border-accentBlue rounded-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Phase 2 — Day 11–30</h3>
                  <p className="text-xl text-accentBlue font-semibold">Core Build v1</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-accentBlue/20 text-accentBlue border border-accentBlue/30 whitespace-nowrap">
                  [prod-candidate]
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-mist/80 mb-2">Output:</h4>
                  <ul className="list-disc list-inside space-y-1 text-mist/70">
                    <li>Critical path flows running end-to-end in a controlled sandbox</li>
                    <li>Early instrumentation and logging</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-mist/80 mb-2">Risk removed:</h4>
                  <p className="text-mist/70">"It works" isn't theoretical anymore</p>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-slate border-l-4 border-accentViolet rounded-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Phase 3 — Day 31–60</h3>
                  <p className="text-xl text-accentViolet font-semibold">Integrations & Hardening</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-accentViolet/20 text-accentViolet border border-accentViolet/30 whitespace-nowrap">
                  [integrated]
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-mist/80 mb-2">Output:</h4>
                  <ul className="list-disc list-inside space-y-1 text-mist/70">
                    <li>Integrated with your CRM / support / data layer</li>
                    <li>Tests, rollback plan, budget caps, eval loops</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-mist/80 mb-2">Risk removed:</h4>
                  <p className="text-mist/70">Legal, Security, and Ops don't block go-live</p>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="bg-slate border-l-4 border-accentTeal rounded-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Phase 4 — Day 61–90</h3>
                  <p className="text-xl text-accentTeal font-semibold">Beta & Launch</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-accentTeal/20 text-accentTeal border border-accentTeal/30 whitespace-nowrap">
                  [beta-ready]
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-mist/80 mb-2">Output:</h4>
                  <ul className="list-disc list-inside space-y-1 text-mist/70">
                    <li>Beta in the real environment</li>
                    <li>Security review + performance tuning</li>
                    <li>Handoff runbook, on-call / monitoring plan</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-mist/80 mb-2">Risk removed:</h4>
                  <p className="text-mist/70">Execs can say "Ship it"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Need From You */}
        <section className="mb-20">
          <div className="bg-graphite border border-slate rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">What We Need From You</h2>
            <ul className="space-y-3 text-mist/80">
              <li className="flex items-start gap-3">
                <span className="text-accentTeal mt-1">→</span>
                <span>Access to relevant systems (CRM, ticketing, knowledge base, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accentTeal mt-1">→</span>
                <span>1-2 internal stakeholders who can confirm "this solves the pain"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accentTeal mt-1">→</span>
                <span>Agreement on the KPI that defines success (AHT, lead response, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accentTeal mt-1">→</span>
                <span>A named data/security contact so we bake in governance early</span>
              </li>
            </ul>
          </div>
        </section>

        {/* What You Get */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-slate to-graphite border-t-2 border-aurora rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">What You Get</h2>
            <ul className="space-y-3 text-mist/80">
              <li className="flex items-start gap-3">
                <span className="text-accentTeal mt-1">✓</span>
                <span>A working production candidate (not slides)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accentTeal mt-1">✓</span>
                <span>A runbook your team can operate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accentTeal mt-1">✓</span>
                <span>Cost controls and eval loops in-place</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accentTeal mt-1">✓</span>
                <span>A partner who stays on for Managed Run if you want continuity</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center">
          <div className="border-t border-slate pt-12">
            <p className="font-mono text-sm text-mist/60 mb-4">
              saipien [labs] — AI dev pod · integration-first · governed
            </p>
            <a
              href="/"
              className="inline-block bg-aurora text-obsidian font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Book Your Feasibility Readout
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
