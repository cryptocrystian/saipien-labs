'use client';

import { useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import ContactModal from '@/components/ContactModal';

export default function NinetyDayMVPsPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian text-mist">
      <HeaderNav onOpenContact={() => setIsContactModalOpen(true)} />

      <main className="max-w-4xl mx-auto px-6 py-16 pt-32">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-16">
          Why 90-Day MVPs Work <span className="text-mist/60">(And When They Don't)</span>
        </h1>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">The Point of a 90-Day MVP</h2>
            <div className="space-y-4 text-lg text-mist/80 leading-relaxed">
              <p>
                A 90-day MVP is not a hackathon toy.
              </p>
              <p>
                It is a production candidate that can be put in front of real operators.
              </p>
              <p>
                It forces you to agree on "done" instead of endless discovery.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">When 90 Days Works</h2>
            <div className="bg-slate border-l-4 border-accentTeal rounded-lg p-8 space-y-4">
              <div>
                <p className="text-lg text-mist/80 leading-relaxed">
                  You already know the pain (e.g. "our handle time is killing us", "leads sit untouched 18 hours").
                </p>
              </div>
              <div>
                <p className="text-lg text-mist/80 leading-relaxed">
                  You control or can access the systems that matter (CRM, ticketing, warehouse).
                </p>
              </div>
              <div>
                <p className="text-lg text-mist/80 leading-relaxed">
                  You can name the KPI that defines success and who owns it.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">When 90 Days Fails</h2>
            <div className="bg-graphite border border-mist/10 rounded-lg p-8 space-y-4">
              <div>
                <p className="text-lg text-mist/80 leading-relaxed">
                  Nobody can say, out loud, what "good" looks like.
                </p>
              </div>
              <div>
                <p className="text-lg text-mist/80 leading-relaxed">
                  You don't have access to data/systems and you're hoping we'll "figure it out later."
                </p>
              </div>
              <div>
                <p className="text-lg text-mist/80 leading-relaxed">
                  You're really asking for research, not delivery.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">What Happens After Day 90</h2>
            <div className="space-y-6 text-lg text-mist/80 leading-relaxed">
              <p>
                You either go live under <span className="font-semibold text-mist">Managed Run</span> (we operate + monitor + cost control),
              </p>
              <p>
                or we hand you a runbook and pod charter so you can run it yourself.
              </p>
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
            <p className="font-mono text-sm text-mist/60">
              We'll tell you in the first call if you're not a 90-day fit. Zero fluff.
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
