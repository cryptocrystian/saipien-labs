'use client';

import { motion } from 'framer-motion';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyCardProps {
  study: CaseStudy;
  onClick: () => void;
}

export default function CaseStudyCard({ study, onClick }: CaseStudyCardProps) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="relative h-full rounded-2xl bg-[#11141A] border border-white/5 p-8 shadow-[0_0_40px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

        {/* Gradient ring on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00F5A0]/10 to-[#9A5CFF]/10" />
        </div>

        <div className="relative z-10 h-full flex flex-col">
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
          <h3 className="text-2xl font-bold text-[#E6EBF2] mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#00F5A0] group-hover:to-[#9A5CFF] group-hover:bg-clip-text transition-all duration-300">
            {study.title.split('—')[0].trim()}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-[#A8B2C1] mb-4">
            {study.subtitle}
          </p>

          {/* Summary */}
          <p className="text-[#E6EBF2]/80 leading-relaxed mb-6 flex-grow">
            {study.summary}
          </p>

          {/* Metrics */}
          {study.metrics.length > 0 && (
            <div className="mb-6">
              {study.metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-emerald-400">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {metric}
                </div>
              ))}
            </div>
          )}

          {/* View button */}
          <button
            className="flex items-center gap-2 text-[#00F5A0] font-semibold group-hover:gap-3 transition-all duration-200"
            aria-label={`View ${study.title} case study`}
          >
            <span>View Case Study</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
