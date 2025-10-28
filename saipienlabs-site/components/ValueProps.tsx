export default function ValueProps() {
  const props = [
    {
      title: "Outcome-Led",
      description: "We start at KPIs, not demos. Lead velocity, AHT, NRR, SLA — we define the targets your operators already care about.",
      gradient: "from-accentTeal/20 via-accentTeal/10 to-transparent"
    },
    {
      title: "Integration-First",
      description: "We wire AI into the systems you actually run: CRM, ERP, support desk, data warehouse, auth. No isolated science project.",
      gradient: "from-accentBlue/20 via-accentBlue/10 to-transparent"
    },
    {
      title: "Velocity Without Corners",
      description: "You get speed plus observability, tests, rollback plans, spend caps, and human-in-the-loop controls.",
      gradient: "from-accentViolet/20 via-accentViolet/10 to-transparent"
    }
  ];

  return (
    <section className="py-24 relative" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-mist/60 uppercase tracking-wider mb-2">
            why teams choose saipien [labs]
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <div
              key={index}
              className="bg-slate rounded-xl p-8 border-t-2 border-transparent bg-gradient-to-b hover:border-aurora transition-all duration-300 group"
              style={{
                borderImage: `linear-gradient(90deg, ${
                  index === 0 ? '#00BFA6' : index === 1 ? '#4C8DFF' : '#8B5CF6'
                } 0%, ${
                  index === 0 ? '#00BFA6' : index === 1 ? '#4C8DFF' : '#8B5CF6'
                } 100%) 1`,
                borderImageSlice: '1 0 0 0'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${prop.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />

              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-mist mb-4">
                  {prop.title}
                </h3>
                <p className="text-mist/70 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
