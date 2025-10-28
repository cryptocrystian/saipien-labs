'use client';

import { motion } from 'framer-motion';
import { trackApplyClick } from '@/lib/analytics';

const APPLY_URL = 'https://tally.so/r/YOUR_FORM'; // TODO: Replace

const STEPS = [
  {
    step: 1,
    title: 'Apply',
    description: 'Submit your project with problem, proof, and goals.',
    hasButton: true
  },
  {
    step: 2,
    title: 'Feasibility Readout',
    description: '2-week discovery → ROI model, risk, scope.',
    hasButton: false
  },
  {
    step: 3,
    title: 'Build & Launch',
    description: 'Dedicated AI pod ships a production candidate in ~90 days; then continue with Managed Run or internal team handoff.',
    hasButton: false
  }
];

export default function FP_HowItWorks() {
  const handleApply = () => {
    trackApplyClick('how_it_works');
    window.open(APPLY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="how-it-works" className="py-24 bg-[#0D0F12]">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-[#E6EBF2] text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How it works
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative p-8 bg-[#0D0F12] border border-[#A8B2C1]/10 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-[#E6EBF2] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#A8B2C1] mb-4">{step.description}</p>
                  {step.hasButton && (
                    <button
                      onClick={handleApply}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                    >
                      Start Application
                    </button>
                  )}
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div className="absolute left-11 top-full h-8 w-0.5 bg-gradient-to-b from-[#00F5A0] to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
