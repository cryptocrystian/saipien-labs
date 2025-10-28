import Timeline90Days from './Timeline90Days';
import GovernanceStrip from './GovernanceStrip';

export default function ApproachSection() {
  return (
    <section id="approach">
      {/* Intro Block */}
      <div className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <p className="font-mono text-sm text-accentTeal mb-4 uppercase tracking-wide">
              how we deliver
            </p>

            {/* Headline */}
            <h2 className="text-4xl lg:text-5xl font-bold text-mist mb-6">
              90 days to production — without getting blocked.
            </h2>

            {/* Body */}
            <p className="text-xl text-mist/80 leading-relaxed">
              Our approach is simple: align on the KPI, build the core workflow fast, integrate it into your stack, harden it, and hand you a governed production candidate with a rollback plan and spend controls.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline and Governance */}
      <Timeline90Days />
      <GovernanceStrip />
    </section>
  );
}
