'use client';

import { motion } from 'framer-motion';

const CRITERIA = [
  'Painkiller problem, not vitamin',
  'Founder-market fit',
  'Clear ICP and distribution angle',
  'Feasible 90-day MVP scope',
  'Willingness to be data-driven',
  'Security & compliance-aware for target market'
];

export default function FP_Criteria() {
  return (
    <section className="py-24 bg-[#0D0F12]">
      <div className="container mx-auto px-6">
        <motion.h2 className="text-4xl lg:text-5xl font-bold text-[#E6EBF2] text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          What we look for
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-8">
          {CRITERIA.map((criterion, i) => (
            <motion.div key={i} className="px-6 py-3 bg-[#0D0F12] border border-[#00F5A0]/20 rounded-full text-[#E6EBF2]" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              {criterion}
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[#A8B2C1]/70 text-sm max-w-2xl mx-auto">
          We accept 2–3 projects per cohort to protect quality.
        </p>
      </div>
    </section>
  );
}
