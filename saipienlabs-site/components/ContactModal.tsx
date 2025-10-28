'use client';

import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    goal: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link with form data
    const subject = 'Book Feasibility Readout';
    const body = `
Name: ${formData.name}
Work Email: ${formData.email}
Company: ${formData.company}

What are you trying to ship in 90 days?
${formData.goal}
    `.trim();

    const mailtoLink = `mailto:hello@saipienlabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    // Show thank you screen
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset state after modal animation
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', goal: '' });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-slate border border-mist/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-mist/60 hover:text-mist transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          /* Thank You Screen */
          <div className="text-center py-4">
            {/* Success icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-accentTeal/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-accentTeal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-mist mb-3">
              Request Sent!
            </h2>
            <p className="text-mist/70 mb-6">
              Your email client should have opened. We'll get back to you within 1 business day.
            </p>

            {/* MVP Plan CTA */}
            <div className="bg-graphite border border-accentTeal/30 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-mist mb-2">
                While you wait, see how we work:
              </h3>
              <p className="text-sm text-mist/70 mb-4">
                Download our 90-day MVP plan to understand our integration-first approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/assets/saipien-90-day-mvp-plan.pdf"
                  download
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-aurora text-obsidian font-semibold px-4 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
                <a
                  href="/mvp-plan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-slate border border-mist/20 text-mist font-semibold px-4 py-3 rounded-lg hover:bg-graphite transition-colors"
                >
                  View Online
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="text-sm text-mist/60 hover:text-mist transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form */
          <>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-mist mb-2">
                Book Feasibility Readout
              </h2>
              <p className="text-sm text-mist/70">
                Free 45-minute working session. We map ROI, integration points, and "done" criteria.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-mist mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-graphite border border-mist/20 text-mist placeholder-mist/40 focus:outline-none focus:ring-2 focus:ring-accentBlue focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-mist mb-2">
              Work Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-graphite border border-mist/20 text-mist placeholder-mist/40 focus:outline-none focus:ring-2 focus:ring-accentBlue focus:border-transparent transition-all"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-mist mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-graphite border border-mist/20 text-mist placeholder-mist/40 focus:outline-none focus:ring-2 focus:ring-accentBlue focus:border-transparent transition-all"
              placeholder="Your company"
            />
          </div>

          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-mist mb-2">
              What are you trying to ship in 90 days?
            </label>
            <textarea
              id="goal"
              name="goal"
              required
              value={formData.goal}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-graphite border border-mist/20 text-mist placeholder-mist/40 focus:outline-none focus:ring-2 focus:ring-accentBlue focus:border-transparent transition-all resize-none"
              placeholder="Brief description of your MVP goals..."
            />
          </div>

          {/* Privacy note */}
          <p className="text-xs font-mono text-mist/50 pt-2">
            We'll review and get back within 1 business day. No spam. NDA-friendly.
          </p>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-aurora text-white px-6 py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
              >
                Send Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
