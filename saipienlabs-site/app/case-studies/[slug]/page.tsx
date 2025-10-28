'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import HeaderNav from '@/components/HeaderNav';
import ContactModal from '@/components/ContactModal';
import Footer from '@/components/Footer';
import FounderCTA from '@/components/cta/FounderCTA';
import { getCaseStudyBySlug } from '@/content/case-studies';
import { generateCaseStudyJSONLD } from '@/lib/seo/caseStudiesSEO';
import { use } from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CaseStudyDetailPage(props: PageProps) {
  const params = use(props.params);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const study = getCaseStudyBySlug(params.slug);

  if (!study) {
    notFound();
  }

  const jsonLD = generateCaseStudyJSONLD(study);

  const handleBookReadout = () => {
    if (typeof window !== 'undefined' && window.saipien?.track) {
      window.saipien.track('apply_click', { source: 'case_study_page', study: study.slug });
    }
    setIsContactModalOpen(true);
  };

  return (
    <>
      <HeaderNav onOpenContact={() => setIsContactModalOpen(true)} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />

      <main className="bg-obsidian min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {study.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-slate/40 border border-mist/10 text-sm text-mist/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-mist mb-6 leading-tight">
              {study.title}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl text-mist/80 mb-8 leading-relaxed">
              {study.subtitle}
            </p>

            {/* Summary */}
            <p className="text-xl text-mist/70 leading-relaxed mb-12 pb-12 border-b border-mist/10">
              {study.summary}
            </p>
          </motion.div>

          {/* Challenge & Approach */}
          <motion.div
            className="grid md:grid-cols-2 gap-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-accentTeal/10 border border-accentTeal/30 text-sm font-semibold text-accentTeal mb-4">
                Challenge
              </div>
              <p className="text-lg text-mist/80 leading-relaxed">
                {study.challenge}
              </p>
            </div>
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-accentViolet/10 border border-accentViolet/30 text-sm font-semibold text-accentViolet mb-4">
                Approach
              </div>
              <p className="text-lg text-mist/80 leading-relaxed">
                {study.approach}
              </p>
            </div>
          </motion.div>

          {/* Solution Highlights */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-mist mb-8">Solution Highlights</h2>
            <div className="grid gap-6">
              {study.solution.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-6 rounded-xl bg-slate/20 border border-mist/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-lg text-mist/90">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Results Table */}
          {study.resultsTable.length > 0 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-mist mb-8">Results</h2>
              <div className="rounded-2xl bg-slate/20 border border-mist/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-mist/10 bg-graphite/30">
                        <th className="text-left py-4 px-6 text-sm font-semibold text-mist/80">Metric</th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-mist/80">Before</th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-emerald-400">After</th>
                      </tr>
                    </thead>
                    <tbody>
                      {study.resultsTable.map((row, i) => (
                        <motion.tr
                          key={i}
                          className="border-b border-mist/5 last:border-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <td className="py-4 px-6 text-mist font-medium">{row[0]}</td>
                          <td className="py-4 px-6 text-mist/60">{row[1]}</td>
                          <td className="py-4 px-6 text-emerald-400 font-bold text-lg">{row[2]}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Metrics */}
              {study.metrics.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4">
                  {study.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30"
                    >
                      <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-emerald-400 font-medium">{metric}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <FounderCTA source={`case_study_${study.slug}`} variant="wide" />
          </motion.div>
        </div>
      </main>

      <Footer />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
