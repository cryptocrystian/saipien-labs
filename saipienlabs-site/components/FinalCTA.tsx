interface FinalCTAProps {
  onOpenContact: () => void;
}

export default function FinalCTA({ onOpenContact }: FinalCTAProps) {
  return (
    <section className="py-24 relative" id="contact">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-mist mb-6">
            Your MVP in 90 days.{' '}
            <span className="text-aurora">Your ROI in 60.</span>
          </h2>
          <p className="text-xl text-mist/70 leading-relaxed mb-12">
            Free 45-minute working session. We map ROI, integration points, and "done" criteria.
            You keep the plan.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <button
              onClick={onOpenContact}
              className="bg-aurora text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accentBlue focus:ring-offset-2 focus:ring-offset-obsidian"
            >
              Book Feasibility Readout
            </button>
            <a
              href="mailto:hello@saipienlabs.com"
              className="text-accentBlue hover:text-accentTeal transition-colors font-mono text-lg"
            >
              hello@saipienlabs.com
            </a>
          </div>

          {/* Trust note */}
          <p className="font-mono text-xs text-mist/50 mt-4">
            NDA-friendly. We build, we don't spray your idea.
          </p>
        </div>
      </div>

      {/* Aurora gradient bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-aurora-animated" />
    </section>
  );
}
