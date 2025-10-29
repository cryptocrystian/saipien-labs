export default function StudioSection() {
  const principles = [
    {
      badge: "[ops]",
      title: "Operators, not slide-makers.",
      description: "We measure success in hours saved, tickets deflected, revenue captured — not decks delivered."
    },
    {
      badge: "[integrations]",
      title: "Integration-first.",
      description: "We plug into the CRM, ERP, support desk, and data warehouse you already live in. No orphaned prototype."
    },
    {
      badge: "[governance]",
      title: "Governed from day one.",
      description: "Logging, eval loops, rollback plan, and spend caps are baked in — so Security and Legal say yes instead of killing you at launch."
    }
  ];

  return (
    <section id="studio" className="py-24 relative bg-graphite/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <p className="font-mono text-sm text-accentTeal mb-4 uppercase tracking-wide">
            who you're working with
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Headline + Narrative */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-mist mb-6">
                We're not "AI consultants." We're your delivery pod.
              </h2>
              <div className="space-y-4 text-lg text-mist/80 leading-relaxed">
                <p>
                  Saipien [LABS] is a senior, AI-accelerated development pod.
                  We audit workflows, map high-leverage automation, and then build, integrate, harden, and hand off production systems — usually inside 90 days.
                </p>
                <p>
                  No junior waterfall team. No 8-week discovery theater.
                  You work directly with people who ship.
                </p>
              </div>
            </div>

            {/* Right Column: Principles */}
            <div className="space-y-6">
              {principles.map((principle, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="font-mono text-sm text-aurora">
                      {principle.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-mist mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-mist/70 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
