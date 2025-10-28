'use client';

import { motion } from 'framer-motion';
import AnimatedPipeline from './AnimatedPipeline';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export default function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background mesh (very subtle) */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,166,0.1),transparent_50%)]" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lattice" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 100 100 M 100 0 L 0 100" stroke="rgba(199,210,224,0.3)" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lattice)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-mist">
              Build{' '}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                real
              </motion.span>{' '}
              software,{' '}
              <motion.span
                className="text-aurora inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                really fast.
              </motion.span>
            </h1>

            <motion.p
              className="text-xl lg:text-2xl text-mist/80 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              AI-accelerated dev pods that ship production in weeks — with enterprise discipline,
              security controls, and budget guardrails.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <button
                onClick={onOpenContact}
                className="bg-aurora text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform duration-200 text-center focus:outline-none focus:ring-2 focus:ring-accentBlue focus:ring-offset-2 focus:ring-offset-obsidian"
              >
                Book Feasibility Readout
              </button>
              <a
                href="/mvp-plan"
                className="border-2 border-mist/20 text-mist px-8 py-4 rounded-2xl font-semibold text-lg hover:border-mist/40 transition-colors duration-200 text-center"
              >
                See the 90-Day MVP Plan
              </a>
            </motion.div>

            {/* Proof chips */}
            <motion.div
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="px-4 py-2 rounded-full border border-accentTeal/30 bg-slate/40 backdrop-blur-sm">
                <span className="font-mono text-sm text-mist">2–4× faster cycle time</span>
              </div>
              <div className="px-4 py-2 rounded-full border border-accentBlue/30 bg-slate/40 backdrop-blur-sm">
                <span className="font-mono text-sm text-mist">90-day MVPs, fixed scope</span>
              </div>
              <div className="px-4 py-2 rounded-full border border-accentViolet/30 bg-slate/40 backdrop-blur-sm">
                <span className="font-mono text-sm text-mist">Quality gates: tests, security, AI evals</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Animated Pipeline */}
          <motion.div
            className="relative lg:block hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <AnimatedPipeline />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
