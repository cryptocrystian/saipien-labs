'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const FAQS = [
  { q: 'How much equity do you take?', a: 'Typically 5-15% depending on the model (build-for-equity, hybrid, or services SAFE). Final terms depend on stage, scope, and market.' },
  { q: 'Do you invest cash?', a: 'No, we provide engineering services for equity. We\'re builders, not investors—though we can connect you with funding partners.' },
  { q: 'Who owns the IP?', a: 'You (the founder) own 100% of the IP. We vest equity based on milestone delivery, but ownership stays with your company.' },
  { q: 'Can we spin out later?', a: 'Yes. If you raise a round and want to fully own the codebase, we support buyout or transition to advisory equity.' },
  { q: 'What if we need mobile + web?', a: 'We handle both. Typical stack: Next.js/TS for web, React Native for mobile, unified backend.' },
  { q: 'What stacks do you prefer?', a: 'Next.js/TS, Supabase/PostgreSQL, Vercel/Cloudflare, Python workers for AI. We adapt to your needs but prefer proven, scalable tech.' }
];

export default function FP_FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#0D0F12]">
      <div className="container mx-auto px-6">
        <motion.h2 className="text-4xl lg:text-5xl font-bold text-[#E6EBF2] text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div key={i} className="border border-[#A8B2C1]/10 rounded-xl overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#0D0F12]/50 transition-colors">
                <span className="font-semibold text-[#E6EBF2]">{faq.q}</span>
                <span className="text-[#00F5A0] text-xl">{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-[#A8B2C1]">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
