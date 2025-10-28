'use client';

import { useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import ContactModal from '@/components/ContactModal';

export default function SecureAIIntegrationPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian text-mist">
      <HeaderNav onOpenContact={() => setIsContactModalOpen(true)} />

      <main className="max-w-4xl mx-auto px-6 py-16 pt-32">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-16">
          Shipping AI Without Getting Blocked by Legal or Security
        </h1>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Security Kills AI Pilots</h2>
            <div className="space-y-6 text-lg text-mist/80 leading-relaxed">
              <p>
                Most pilots die because nobody baked in access control, data boundaries, or audit trails.
              </p>
              <p>
                Legal doesn't say "no to AI". Legal says "no to surprises."
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">What Security Actually Wants</h2>
            <div className="bg-slate border-l-4 border-accentBlue rounded-lg p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-accentBlue mb-2">Clear data boundary</h3>
                <p className="text-lg text-mist/80 leading-relaxed">
                  What the model can and can't see.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-accentBlue mb-2">Logged decisions</h3>
                <p className="text-lg text-mist/80 leading-relaxed">
                  Why the system answered that way.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-accentBlue mb-2">Rollback / shutdown path</h3>
                <p className="text-lg text-mist/80 leading-relaxed">
                  A clear way to stop it if things go wrong.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">What We Deliver By Default</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-graphite border border-mist/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-accentTeal">Spend caps and budget alerts</h3>
                <p className="text-mist/70">
                  No runaway costs. You set the limit, we enforce it.
                </p>
              </div>
              <div className="bg-graphite border border-mist/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-accentTeal">Redaction / PII handling</h3>
                <p className="text-mist/70">
                  Data that shouldn't leave stays locked down.
                </p>
              </div>
              <div className="bg-graphite border border-mist/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-accentTeal">Eval loops</h3>
                <p className="text-mist/70">
                  Did the model do what it was supposed to do?
                </p>
              </div>
              <div className="bg-graphite border border-mist/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-accentTeal">Runbook</h3>
                <p className="text-mist/70">
                  So an exec can answer: "What happens if this goes wrong?"
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">How to Get to Yes Internally</h2>
            <div className="bg-slate border-l-4 border-accentViolet rounded-lg p-8 space-y-6">
              <div className="flex gap-4">
                <span className="font-mono text-accentViolet text-2xl flex-shrink-0">1.</span>
                <p className="text-lg text-mist/80 leading-relaxed">
                  Bring Security in at Day 10, not Day 89.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-accentViolet text-2xl flex-shrink-0">2.</span>
                <p className="text-lg text-mist/80 leading-relaxed">
                  Give them guardrails and auditability language, not "trust us."
                </p>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-accentViolet text-2xl flex-shrink-0">3.</span>
                <p className="text-lg text-mist/80 leading-relaxed">
                  Show them the rollback plan.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* CTA Section */}
        <div className="mt-20 border-t border-slate pt-12">
          <div className="bg-gradient-to-br from-slate to-graphite border-t-2 border-aurora rounded-xl p-12 text-center">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-aurora text-obsidian font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity text-lg mb-4"
            >
              Book Feasibility Readout
            </button>
            <p className="font-mono text-sm text-mist/60 max-w-2xl mx-auto">
              Security-safe by design. EU AI Act-ready mindset. We make Legal comfortable.
            </p>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
