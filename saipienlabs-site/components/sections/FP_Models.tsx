'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const MODELS = [
  { id: 'equity', title: 'Build-for-Equity', description: 'Fixed build credit for a minority equity stake.', example: 'ex: $60k credit → 10% SAFE' },
  { id: 'hybrid', title: 'Hybrid Cash + Equity', description: 'Lower cash outlay plus smaller equity.', example: 'ex: $30k + 5%' },
  { id: 'safe', title: 'Services SAFE', description: 'Services convert at next round at discount.', example: 'Details vary by stage' }
];

export default function FP_Models() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <section className="py-24 bg-[#0D0F12]">
      <div className="container mx-auto px-6">
        <motion.h2 className="text-4xl lg:text-5xl font-bold text-[#E6EBF2] text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Partnership models
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {MODELS.map((model, i) => (
            <motion.div key={model.id} className="p-8 bg-[#0D0F12] border border-[#A8B2C1]/10 rounded-xl hover:border-[#00F5A0]/30 hover:-translate-y-1 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <h3 className="text-xl font-semibold text-[#E6EBF2] mb-3">{model.title}</h3>
              <p className="text-[#A8B2C1] mb-3">{model.description}</p>
              <p className="text-sm text-[#00F5A0] font-mono">{model.example}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button onClick={() => setShowDisclaimer(!showDisclaimer)} className="text-sm text-[#A8B2C1]/60 underline hover:text-[#00F5A0]">
            View disclaimer
          </button>
          {showDisclaimer && (
            <p className="text-xs text-[#A8B2C1]/60 mt-4 max-w-2xl mx-auto">
              Illustrative only. Final terms vary by stage and scope. All partnerships subject to mutual agreement and legal documentation.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
