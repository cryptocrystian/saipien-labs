/**
 * Analytics tracking helpers
 * No-op if window.saipien not present
 */

import type { ApplySource } from '@/types/founder';

declare global {
  interface Window {
    saipien?: {
      track: (event: string, properties?: Record<string, any>) => void;
    };
  }
}

/**
 * Initialize analytics tracking (no-op if not configured)
 */
export function initAnalytics() {
  if (typeof window !== 'undefined' && !window.saipien) {
    window.saipien = {
      track: () => {
        // No-op: Replace with actual analytics provider
        // console.log('Analytics not configured');
      }
    };
  }
}

/**
 * Track apply button click
 */
export function trackApplyClick(source: ApplySource) {
  if (typeof window !== 'undefined') {
    initAnalytics();
    window.saipien?.track('apply_click', {
      source,
      timestamp: Date.now(),
      page: window.location.pathname
    });
  }
}

/**
 * Track CTA view (for conversion funnel)
 */
export function trackCTAView(source: string) {
  if (typeof window !== 'undefined') {
    initAnalytics();
    window.saipien?.track('cta_view', {
      source,
      timestamp: Date.now(),
      page: window.location.pathname
    });
  }
}
