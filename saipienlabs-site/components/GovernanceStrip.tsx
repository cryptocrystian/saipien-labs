export default function GovernanceStrip() {
  const badges = [
    "NIST AI RMF-aware",
    "ISO/IEC 42001-aligned",
    "EU AI Act readiness",
    "PII boundary controls",
    "Budget caps + eval loops"
  ];

  return (
    <section className="py-24 relative bg-graphite/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-mist mb-6">
            Velocity without security drama.
          </h2>
          <p className="text-xl text-mist/70 leading-relaxed mb-12">
            We build AI that Legal, Security, and Ops can actually say yes to. Every engagement
            bakes in monitoring, redaction, rollback paths, spend guardrails, and audit trails
            from day one.
          </p>

          {/* Compliance badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full bg-slate border border-accentTeal/30 backdrop-blur-sm hover:border-accentBlue/50 transition-colors"
              >
                <span className="font-mono text-sm text-mist">[ {badge} ]</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
