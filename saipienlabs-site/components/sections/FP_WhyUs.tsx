'use client';

import { motion } from 'framer-motion';
import type { WhyUsPoint } from '@/types/founder';

const WHY_US_POINTS: WhyUsPoint[] = [
  {
    title: 'AI-accelerated delivery',
    description: '2–4× faster cycle time with automated testing, evals, and guardrails.',
    icon: '⚡'
  },
  {
    title: 'Enterprise-grade discipline',
    description: 'Security controls, audit trails, SOC-aware patterns.',
    icon: '🛡️'
  },
  {
    title: 'Repeatable playbooks',
    description: '90-Day MVP plan, Pod charters, managed runbooks.',
    icon: '📋'
  },
  {
    title: 'PR + credibility',
    description: 'We help tell your story and showcase traction.',
    icon: '📢'
  }
];

export default function FP_WhyUs() {
  return (
    <section className="py-24 bg-[#0D0F12]">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-[#E6EBF2] text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Saipien Labs
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {WHY_US_POINTS.map((point, index) => (
            <motion.div
              key={point.title}
              className="p-8 bg-[#0D0F12] border border-[#A8B2C1]/10 rounded-xl hover:border-[#00F5A0]/30 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold text-[#E6EBF2] mb-3">
                {point.title}
              </h3>
              <p className="text-[#A8B2C1]">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
