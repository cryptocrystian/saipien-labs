'use client';

import { useState } from 'react';
import Link from "next/link";
import HeaderNav from '@/components/HeaderNav';
import ContactModal from '@/components/ContactModal';

const resources = [
  {
    slug: "90-day-mvps",
    title: "Why 90-Day MVPs Work (And When They Don't)",
    description: "How to scope, build, and launch a production-ready AI workflow in 90 days — and the red flags that mean \"don't start yet.\"",
  },
  {
    slug: "secure-ai-integration",
    title: "Shipping AI Without Getting Blocked by Legal or Security",
    description: "How to integrate AI into real systems (CRM, support desk, internal ops) with audit trails, guardrails, and budget caps.",
  },
];

export default function ResourcesPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian text-mist">
      <HeaderNav onOpenContact={() => setIsContactModalOpen(true)} />

      <main className="max-w-6xl mx-auto px-6 py-16 pt-32">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6">Resources</h1>
          <p className="text-xl text-mist/80 max-w-3xl">
            Practical guidance for teams that need AI in production — not just in slides. Use these to align stakeholders, calm Security, and get budget unlocked.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="group"
            >
              <div className="bg-slate border-t-2 border-aurora rounded-xl p-8 h-full hover:bg-slate/80 transition-all duration-200">
                <h2 className="text-2xl font-bold mb-4 group-hover:text-aurora transition-colors">
                  {resource.title}
                </h2>
                <p className="text-mist/70 mb-6 leading-relaxed">
                  {resource.description}
                </p>
                <div className="flex items-center gap-2 text-accentTeal font-semibold group-hover:gap-4 transition-all">
                  Read
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
