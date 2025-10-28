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

    // Close modal
    onClose();

    // Reset form
    setFormData({ name: '', email: '', company: '', goal: '' });
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
      onClick={onClose}
    >
      <div
        className="bg-slate border border-mist/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-mist/60 hover:text-mist transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-mist mb-2">
            Book Feasibility Readout
          </h2>
          <p className="text-sm text-mist/70">
            Free 45-minute working session. We map ROI, integration points, and "done" criteria.
          </p>
        </div>

        {/* Form */}
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
      </div>
    </div>
  );
}
