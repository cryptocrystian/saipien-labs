'use client';

import { motion, useAnimation, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroShipConsoleProps {
  onOpenContact: () => void;
}

// Inline SVG icons
const SparkIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
    <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
    <path d="M6 2V10M6 10L3 7M6 10L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReplayIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C10.3 2 12.3 3.2 13.4 5M13 2V5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * KPI Stat Component with number animation
 */
interface KPIStatProps {
  label: string;
  from: number;
  to: number;
  currency?: boolean;
  unit?: string;
  isActive: boolean;
  showArrow?: boolean;
}

function KPIStat({ label, from, to, currency, unit, isActive, showArrow }: KPIStatProps) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isActive) {
      setValue(from);
      return;
    }

    const startTime = Date.now();
    const duration = 800;
    const diff = to - from;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = from + diff * easeOutCubic;
      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [from, to, isActive]);

  const formatValue = () => {
    if (currency) return `$${value.toFixed(2)}`;
    if (unit === 'ms') return `${Math.round(value)}ms`;
    return value.toFixed(1);
  };

  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#A8B2C1] mb-1">
        {label}
        {showArrow && (
          <span className="text-emerald-400">
            <ArrowDownIcon />
          </span>
        )}
      </div>
      <div className="text-xl font-bold text-emerald-400 font-mono">
        {formatValue()}
      </div>
    </div>
  );
}

/**
 * Main Console Component
 */
function LiveShipConsole({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const [currentStep, setCurrentStep] = useState<'idle' | 'commit' | 'ai' | 'tests' | 'deploy' | 'kpis'>('idle');
  const [isHovered, setIsHovered] = useState(false);
  const [testsPassed, setTestsPassed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDeployed, setIsDeployed] = useState(false);
  const [diffScroll, setDiffScroll] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const speedMultiplier = isHovered ? 0.8 : 1;

  /**
   * Cursor blink effect during idle
   */
  useEffect(() => {
    if (currentStep === 'idle' || currentStep === 'commit') {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  /**
   * Orchestrate the animation sequence
   */
  const runSequence = async () => {
    // Reset state
    setCurrentStep('idle');
    setTestsPassed(0);
    setProgress(0);
    setIsDeployed(false);
    setDiffScroll(0);

    await new Promise(resolve => setTimeout(resolve, 300 * speedMultiplier));

    // STEP 1: COMMIT
    setCurrentStep('commit');
    await new Promise(resolve => setTimeout(resolve, 1800 * speedMultiplier));

    // STEP 2: AI ASSIST
    setCurrentStep('ai');
    await new Promise(resolve => setTimeout(resolve, 1400 * speedMultiplier));

    // STEP 3: TESTS
    setCurrentStep('tests');

    // Animate progress bar
    const progressDuration = 1600 * speedMultiplier;
    const progressSteps = 60;
    const progressInterval = progressDuration / progressSteps;

    for (let i = 0; i <= progressSteps; i++) {
      setProgress((i / progressSteps) * 100);
      if (i % 8 === 0 && i > 0 && testsPassed < 23) {
        setTestsPassed(prev => Math.min(prev + 3, 23));
      }
      await new Promise(resolve => setTimeout(resolve, progressInterval));
    }

    setTestsPassed(23);
    await new Promise(resolve => setTimeout(resolve, 500 * speedMultiplier));

    // STEP 4: DEPLOY
    setCurrentStep('deploy');
    await new Promise(resolve => setTimeout(resolve, 900 * speedMultiplier));
    setIsDeployed(true);
    await new Promise(resolve => setTimeout(resolve, 700 * speedMultiplier));

    // STEP 5: KPIs
    setCurrentStep('kpis');
    await new Promise(resolve => setTimeout(resolve, 1800 * speedMultiplier));

    // IDLE: Pause then micro-scroll
    await new Promise(resolve => setTimeout(resolve, 1500 * speedMultiplier));

    // Subtle diff scroll animation
    for (let i = 0; i < 3; i++) {
      setDiffScroll(12);
      await new Promise(resolve => setTimeout(resolve, 200));
      setDiffScroll(0);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    await new Promise(resolve => setTimeout(resolve, 300 * speedMultiplier));

    // Loop
    if (!prefersReducedMotion) {
      runSequence();
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      // Show final state
      setCurrentStep('kpis');
      setTestsPassed(23);
      setProgress(100);
      setIsDeployed(true);
    } else {
      runSequence();
    }
  }, [prefersReducedMotion]);

  const fadeSlideIn: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const childFadeIn: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div
      className="relative w-full h-[480px] rounded-2xl bg-[#11141A] shadow-[0_0_40px_rgba(0,0,0,0.25)] border border-white/5 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Live release simulation"
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] opacity-70" />

      {/* Replay button */}
      {!prefersReducedMotion && (
        <button
          onClick={() => runSequence()}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-[#A8B2C1] hover:text-[#E6EBF2] z-10"
          aria-label="Replay animation"
        >
          <ReplayIcon />
        </button>
      )}

      {/* Console content */}
      <div className="p-8 h-full flex flex-col justify-between">
        {/* Main sequence area */}
        <div className="space-y-6 flex-grow overflow-hidden">
          {/* STEP 1: COMMIT */}
          {currentStep !== 'idle' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeSlideIn}
              aria-label="Commit step"
            >
              <div className="font-mono text-xs text-[#A8B2C1] mb-2 flex items-center gap-2">
                <span>commit 64b2c7e · feat: intake router + eval hooks</span>
                {currentStep === 'commit' && showCursor && (
                  <span className="w-1.5 h-3 bg-[#00F5A0] inline-block" />
                )}
              </div>
              <div className="space-y-1" style={{ transform: `translateY(-${diffScroll}px)`, transition: 'transform 0.2s ease-out' }}>
                <div className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border-l-2 border-emerald-400/60 pl-2 py-0.5">
                  + function evaluateIntent(message, context)
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border-l-2 border-emerald-400/60 pl-2 py-0.5">
                  +   const score = await llm.classify(...)
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border-l-2 border-emerald-400/60 pl-2 py-0.5">
                  +   return score {'>'} 0.85 ? route : fallback
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: AI ASSIST */}
          {currentStep !== 'idle' && currentStep !== 'commit' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              aria-label="AI Assist step"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00F5A0]/10 to-[#9A5CFF]/10 border border-[#00F5A0]/20">
                <span className="text-[#00F5A0]">
                  <SparkIcon />
                </span>
                <span className="text-xs font-semibold text-[#E6EBF2]">AI Assist</span>
              </div>
              <div className="mt-2 text-xs text-[#A8B2C1]">
                generated tests + security checks
                <motion.div
                  className="h-px bg-gradient-to-r from-[#00F5A0] to-transparent mt-1"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: TESTS */}
          {currentStep !== 'idle' && currentStep !== 'commit' && currentStep !== 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
              aria-label="Tests step"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#E6EBF2]">Running tests...</span>
                <span className="text-xs font-mono text-emerald-400">{testsPassed}/23 passed</span>
              </div>

              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {progress === 100 && (
                <motion.div
                  className="flex gap-1 flex-wrap"
                  variants={staggerChildren}
                  initial="hidden"
                  animate="visible"
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={childFadeIn}
                      className="text-emerald-400"
                    >
                      <CheckIcon />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 4: DEPLOY */}
          {currentStep !== 'idle' && currentStep !== 'commit' && currentStep !== 'ai' && currentStep !== 'tests' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              aria-label="Deploy step"
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#00F5A0]/5 to-[#9A5CFF]/5 border border-[#00F5A0]/20">
                <div className="text-2xl">
                  {isDeployed ? '✅' : '→'}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#E6EBF2]">
                    {isDeployed ? 'Deployed' : 'Deploying...'}
                  </div>
                  {isDeployed && (
                    <div className="text-xs text-[#A8B2C1]">production • v1.2.4</div>
                  )}
                </div>
              </div>

              {isDeployed && (
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-[#00F5A0] pointer-events-none"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              )}
            </motion.div>
          )}

          {/* STEP 5: KPIs */}
          {currentStep === 'kpis' && (
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-3"
              aria-label="KPIs step"
            >
              <motion.div variants={childFadeIn}>
                <KPIStat
                  label="eval score"
                  from={88.3}
                  to={92.4}
                  isActive={currentStep === 'kpis'}
                />
              </motion.div>

              <motion.div variants={childFadeIn}>
                <KPIStat
                  label="cost / conv"
                  from={0.18}
                  to={0.13}
                  currency
                  isActive={currentStep === 'kpis'}
                  showArrow
                />
              </motion.div>

              <motion.div variants={childFadeIn}>
                <KPIStat
                  label="latency p95"
                  from={380}
                  to={242}
                  unit="ms"
                  isActive={currentStep === 'kpis'}
                  showArrow
                />
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Footer caption */}
        <div className="text-[10px] font-mono text-[#A8B2C1]/40 mt-4">
          // AI dev pod: code → test → deploy → metrics
        </div>
      </div>
    </div>
  );
}

/**
 * Main Hero Component
 */
export default function HeroShipConsole({ onOpenContact }: HeroShipConsoleProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handlePrimaryCTA = () => {
    if (typeof window !== 'undefined' && window.saipien?.track) {
      window.saipien.track('cta_click', { source: 'hero', type: 'primary' });
    }
    onOpenContact();
  };

  const handleSecondaryCTA = () => {
    if (typeof window !== 'undefined' && window.saipien?.track) {
      window.saipien.track('cta_click', { source: 'hero', type: 'secondary' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0D0F12]">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,160,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE: Text content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-[#E6EBF2]">
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
                className="inline-block relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] bg-clip-text text-transparent">
                  really fast.
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    delay: 1,
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                  style={{ mixBlendMode: 'overlay' }}
                />
              </motion.span>
            </h1>

            <motion.p
              className="text-xl lg:text-2xl text-[#A8B2C1] leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              AI-accelerated dev pods and automation strategy.
              <br />
              We design, build, and integrate production AI into your workflows — with security, compliance, and budget guardrails.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <button
                onClick={handlePrimaryCTA}
                aria-label="Book Feasibility Readout"
                className="bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform duration-200 text-center focus:outline-none focus:ring-2 focus:ring-[#00F5A0] focus:ring-offset-2 focus:ring-offset-[#0D0F12]"
              >
                Book Feasibility Readout
              </button>

              <a
                href="/mvp-plan"
                onClick={handleSecondaryCTA}
                aria-label="See the 90-Day MVP Plan"
                className="border-2 border-[#A8B2C1]/20 text-[#E6EBF2] px-8 py-4 rounded-2xl font-semibold text-lg hover:border-[#A8B2C1]/40 transition-colors duration-200 text-center"
              >
                See the 90-Day MVP Plan
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Console */}
          <motion.div
            className="relative lg:block lg:pl-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <LiveShipConsole prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function HeroShipConsoleSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0D0F12]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-[#E6EBF2]">
              Build real software, really fast.
            </h1>
            <p className="text-xl lg:text-2xl text-[#A8B2C1] leading-relaxed max-w-2xl">
              AI-accelerated dev pods and automation strategy.
              <br />
              We design, build, and integrate production AI into your workflows — with security, compliance, and budget guardrails.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="bg-gradient-to-r from-[#00F5A0] to-[#9A5CFF] px-8 py-4 rounded-2xl h-14 animate-pulse" />
              <div className="border-2 border-[#A8B2C1]/20 px-8 py-4 rounded-2xl h-14 animate-pulse" />
            </div>
          </div>
          <div className="w-full h-[480px] rounded-2xl bg-[#11141A] border border-white/5 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
