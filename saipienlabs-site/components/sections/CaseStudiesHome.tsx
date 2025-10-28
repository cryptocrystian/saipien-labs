'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import CaseStudyModal from '@/components/case-studies/CaseStudyModal';
import { caseStudies } from '@/content/case-studies';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudiesHomeProps {
  onOpenContact: () => void;
}

export default function CaseStudiesHome({ onOpenContact }: CaseStudiesHomeProps) {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (study: CaseStudy) => {
    setSelectedStudy(study);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStudy(null), 300);
  };

  return (
    <section className="py-24 relative" id="work">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm text-[#00F5A0] uppercase tracking-wider mb-4">
            Selected Work
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#E6EBF2] mb-4">
            Real launches. Measurable results.
          </h2>
          <p className="text-xl text-[#A8B2C1] max-w-2xl mx-auto">
            AI-powered production systems shipped in 90 days with enterprise discipline.
          </p>
        </motion.div>

        {/* Filter tags (visual only for now) */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00F5A0]/10 to-[#9A5CFF]/10 border border-[#00F5A0]/30 text-sm text-[#E6EBF2] font-medium">
            All Projects
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#A8B2C1] hover:text-[#E6EBF2] transition-colors">
            AI Automation
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#A8B2C1] hover:text-[#E6EBF2] transition-colors">
            Revenue Ops
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#A8B2C1] hover:text-[#E6EBF2] transition-colors">
            Support
          </button>
        </motion.div>

        {/* Case study cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.slug}
              study={study}
              onClick={() => handleCardClick(study)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <CaseStudyModal
        study={selectedStudy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOpenContact={onOpenContact}
      />
    </section>
  );
}
