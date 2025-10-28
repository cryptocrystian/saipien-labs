'use client';

import { motion } from 'framer-motion';
import { trackApplyClick, trackCTAView } from '@/lib/analytics';
import { useEffect } from 'react';
import Link from 'next/link';
import type { FounderCTAProps } from '@/types/founder';

const APPLY_URL = 'https://tally.so/r/YOUR_FORM'; // TODO: Replace with actual Tally form URL

export default function FounderCTA({ variant = 'wide', source, className = '' }: FounderCTAProps) {
  useEffect(() => {
    trackCTAView(source);
  }, [source]);

  const handleApply = () => {
    trackApplyClick(source as any);
    window.open(APPLY_URL, '_blank', 'noopener,noreferrer');
  };

  const padding = variant === 'wide' ? 'p-12' : 'p-8';

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl ${padding} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0D0F12 0%, #1a1a2e 100%)',
        border: '1px solid rgba(0, 245, 160, 0.2)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ boxShadow: '0 0 40px rgba(0, 245, 160, 0.2)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F5A0]/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
      </div>

      <div className="relative z-10 text-center">
        <h3 className="text-3xl lg:text-4xl font-bold text-[#E6EBF2] mb-4">
          Got a venture worth building?
        </h3>
        <p className="text-lg text-[#A8B2C1] mb-8 max-w-2xl mx-auto">
          Apply to our Founder Partnership—limited spots each quarter.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleApply}
            aria-label={`Apply to Founder Partnership from ${source}`}
            className="px-8 py-4 bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] text-white rounded-xl font-semibold text-lg hover:scale-105 transition-transform duration-200"
          >
            Apply Now
          </button>
          <Link
            href="/founder-partnership"
            className="px-8 py-4 border-2 border-[#A8B2C1]/20 text-[#E6EBF2] rounded-xl font-semibold text-lg hover:border-[#A8B2C1]/40 transition-colors duration-200 inline-block text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
