'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import type { CaseStudy } from '@/content/case-studies';
import Link from 'next/link';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function CaseStudyModal({ study, isOpen, onClose, onOpenContact }: CaseStudyModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!study) return null;

  const handleBookReadout = () => {
    if (typeof window !== 'undefined' && window.saipien?.track) {
      window.saipien.track('apply_click', { source: 'case_study_modal', study: study.slug });
    }
    onClose();
    onOpenContact();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-labelledby="modal-title" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#11141A] border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] opacity-70" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-[#A8B2C1] hover:text-[#E6EBF2] z-10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Content */}
            <div className="p-8 sm:p-12">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {study.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#A8B2C1]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 id="modal-title" className="text-3xl lg:text-4xl font-bold text-[#E6EBF2] mb-4">
                {study.title}
              </h2>
              <p className="text-xl text-[#A8B2C1] mb-8">
                {study.subtitle}
              </p>

              {/* Challenge & Approach */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-[#00F5A0] mb-3 font-semibold">Challenge</h3>
                  <p className="text-[#E6EBF2]/80 leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-[#9A5CFF] mb-3 font-semibold">Approach</h3>
                  <p className="text-[#E6EBF2]/80 leading-relaxed">
                    {study.approach}
                  </p>
                </div>
              </div>

              {/* Solution Highlights */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#E6EBF2] mb-4">Solution Highlights</h3>
                <ul className="space-y-3">
                  {study.solution.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#E6EBF2]/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results Table */}
              {study.resultsTable.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#E6EBF2] mb-4">Results</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[#A8B2C1]">Metric</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[#A8B2C1]">Before</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-400">After</th>
                        </tr>
                      </thead>
                      <tbody>
                        {study.resultsTable.map((row, i) => (
                          <tr key={i} className="border-b border-white/5">
                            <td className="py-3 px-4 text-[#E6EBF2]">{row[0]}</td>
                            <td className="py-3 px-4 text-[#A8B2C1]">{row[1]}</td>
                            <td className="py-3 px-4 text-emerald-400 font-semibold">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Footer CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-white/10 text-center text-[#E6EBF2] font-semibold hover:border-white/20 transition-colors"
                  onClick={onClose}
                >
                  View Full Case Study →
                </Link>
                <button
                  onClick={handleBookReadout}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] text-white font-semibold hover:scale-105 transition-transform"
                >
                  Book Feasibility Readout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
