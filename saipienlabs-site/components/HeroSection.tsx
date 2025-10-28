interface HeroSectionProps {
  onOpenContact: () => void;
}

export default function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background mesh (very subtle) */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,166,0.1),transparent_50%)]" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lattice" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 100 100 M 100 0 L 0 100" stroke="rgba(199,210,224,0.3)" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lattice)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-mist">
              Build real software,{' '}
              <span className="text-aurora">really fast.</span>
            </h1>

            <p className="text-xl lg:text-2xl text-mist/80 leading-relaxed max-w-2xl">
              AI-accelerated dev pods that ship production in weeks — with enterprise discipline,
              security controls, and budget guardrails.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onOpenContact}
                className="bg-aurora text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform duration-200 text-center focus:outline-none focus:ring-2 focus:ring-accentBlue focus:ring-offset-2 focus:ring-offset-obsidian"
              >
                Book Feasibility Readout
              </button>
              <a
                href="#timeline"
                className="border-2 border-mist/20 text-mist px-8 py-4 rounded-2xl font-semibold text-lg hover:border-mist/40 transition-colors duration-200 text-center"
              >
                See the 90-Day MVP Plan
              </a>
            </div>

            {/* Proof chips */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="px-4 py-2 rounded-full border border-accentTeal/30 bg-slate/40 backdrop-blur-sm">
                <span className="font-mono text-sm text-mist">2–4× faster cycle time</span>
              </div>
              <div className="px-4 py-2 rounded-full border border-accentBlue/30 bg-slate/40 backdrop-blur-sm">
                <span className="font-mono text-sm text-mist">90-day MVPs, fixed scope</span>
              </div>
              <div className="px-4 py-2 rounded-full border border-accentViolet/30 bg-slate/40 backdrop-blur-sm">
                <span className="font-mono text-sm text-mist">Quality gates: tests, security, AI evals</span>
              </div>
            </div>
          </div>

          {/* Right: Pod Dashboard Mock */}
          <div className="relative lg:block hidden">
            <div className="bg-slate border-t-2 border-aurora rounded-xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-mist/10">
                  <h3 className="font-mono text-sm text-mist/60">POD DASHBOARD</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2 py-1 rounded-full bg-accentTeal/20 text-accentTeal border border-accentTeal/30">[healthy]</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-mist/50">last deploy:</span>
                    <span className="font-mono text-sm text-accentTeal">14m ago</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-mist/50">eval score:</span>
                    <span className="font-mono text-sm text-accentBlue">92.4</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-mist/50">spend cap:</span>
                    <span className="font-mono text-sm text-accentViolet">$0.13 / conv</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-mist/50">latency p95:</span>
                    <span className="font-mono text-sm text-mist">242ms</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-mist/10">
                  <div className="text-xs font-mono text-mist/40">
                    // real-time observability + controls
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
