'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderNav from '@/components/HeaderNav';
import ContactModal from '@/components/ContactModal';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import CaseStudyModal from '@/components/case-studies/CaseStudyModal';
import Footer from '@/components/Footer';
import { caseStudies } from '@/content/case-studies';
import type { CaseStudy } from '@/content/case-studies';

export default function CaseStudiesPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);

  const handleCardClick = (study: CaseStudy) => {
    setSelectedStudy(study);
    setIsCaseStudyModalOpen(true);
  };

  const handleCloseCaseStudyModal = () => {
    setIsCaseStudyModalOpen(false);
    setTimeout(() => setSelectedStudy(null), 300);
  };

  return (
    <>
      <HeaderNav onOpenContact={() => setIsContactModalOpen(true)} />

      <main className="bg-obsidian min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm text-aurora uppercase tracking-wider mb-4">
              Case Studies
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-mist mb-6">
              Real launches. Measurable results.
            </h1>
            <p className="text-xl text-mist/80 max-w-3xl mx-auto leading-relaxed">
              Selected work with outcomes. See how we ship AI-powered production systems in 90 days
              with enterprise discipline, security controls, and budget guardrails.
            </p>
          </motion.div>

          {/* Filter tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-accentTeal/10 to-accentBlue/10 border border-accentTeal/30 text-sm text-mist font-medium">
              All Projects
            </button>
            <button className="px-4 py-2 rounded-full bg-slate/40 border border-mist/10 text-sm text-mist/60 hover:text-mist transition-colors">
              AI Automation
            </button>
            <button className="px-4 py-2 rounded-full bg-slate/40 border border-mist/10 text-sm text-mist/60 hover:text-mist transition-colors">
              Revenue Ops
            </button>
            <button className="px-4 py-2 rounded-full bg-slate/40 border border-mist/10 text-sm text-mist/60 hover:text-mist transition-colors">
              Support
            </button>
            <button className="px-4 py-2 rounded-full bg-slate/40 border border-mist/10 text-sm text-mist/60 hover:text-mist transition-colors">
              Operations
            </button>
          </motion.div>

          {/* Case study cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <CaseStudyCard
                  study={study}
                  onClick={() => handleCardClick(study)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <CaseStudyModal
        study={selectedStudy}
        isOpen={isCaseStudyModalOpen}
        onClose={handleCloseCaseStudyModal}
        onOpenContact={() => {
          handleCloseCaseStudyModal();
          setIsContactModalOpen(true);
        }}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
