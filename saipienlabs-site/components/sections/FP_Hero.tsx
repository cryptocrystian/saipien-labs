'use client';

import { motion } from 'framer-motion';
import { trackApplyClick } from '@/lib/analytics';

// TODO: Replace with actual Tally form URL
const APPLY_URL = 'https://tally.so/r/YOUR_FORM';

export default function FP_Hero() {
  const handleApplyClick = () => {
    trackApplyClick('hero');
    window.open(APPLY_URL, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToDetails = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0D0F12]">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,160,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <motion.h1
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-[#E6EBF2]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Partner with us to{' '}
              <span className="bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] bg-clip-text text-transparent">
                build it—fast.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl lg:text-2xl text-[#A8B2C1] leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              We select a handful of founders each quarter and co-build AI products for equity.
              Real engineering. Real velocity. Shared upside.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <button
                onClick={handleApplyClick}
                aria-label="Apply to Founder Partnership program"
                className="bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform duration-200 text-center focus:outline-none focus:ring-2 focus:ring-[#00F5A0] focus:ring-offset-2 focus:ring-offset-[#0D0F12]"
              >
                Apply Now
              </button>
              <button
                onClick={handleScrollToDetails}
                aria-label="View program details"
                className="border-2 border-[#A8B2C1]/20 text-[#E6EBF2] px-8 py-4 rounded-xl font-semibold text-lg hover:border-[#A8B2C1]/40 transition-colors duration-200 text-center"
              >
                Program Details
              </button>
            </motion.div>
          </div>

          {/* Right: Animated Pipeline */}
          <motion.div
            className="relative lg:block hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <PipelineAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Lightweight pipeline animation for hero
 */
function PipelineAnimation() {
  return (
    <div className="relative w-full h-80 bg-[#0D0F12] border border-[#00F5A0]/20 rounded-xl p-8 shadow-2xl overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="fp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5A0" />
            <stop offset="100%" stopColor="#9A5CFF" />
          </linearGradient>
          <filter id="fp-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Pipeline line */}
        <line
          x1="50" y1="150" x2="350" y2="150"
          stroke="url(#fp-gradient)"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Animated dots */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="4"
            fill="url(#fp-gradient)"
            filter="url(#fp-glow)"
            initial={{ cx: 50, cy: 150, opacity: 0 }}
            animate={{
              cx: [50, 200, 350],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2.3,
            }}
          />
        ))}

        {/* Deploy success */}
        <motion.text
          x="350"
          y="130"
          textAnchor="end"
          fill="#00F5A0"
          fontSize="14"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4,
          }}
        >
          Deployed ✓
        </motion.text>
      </svg>

      <div className="absolute bottom-6 left-8 text-xs font-mono text-[#A8B2C1]/60">
        // AI-accelerated delivery
      </div>
    </div>
  );
}
