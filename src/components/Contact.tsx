'use client';

import React, { useState, useEffect } from 'react';
import { personalData } from '@/data/personal';
import { FormField, Input, Textarea, Button } from '@/components/ui';
import {
  Mail,
  Send,
  Linkedin,
  Github,
  CheckCircle2,
  AlertCircle,
  Terminal,
  MapPin,
  X,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auto-close success modal after 2 seconds
  useEffect(() => {
    if (!showSuccessModal) return;

    const timer = setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSuccessModal) {
        setShowSuccessModal(false);
      }
    };
    if (showSuccessModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSuccessModal]);

  const handleFieldChange = (field: 'name' | 'email' | 'phone' | 'message', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string; message?: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    // Phone validation (optional)
    if (formData.phone.trim()) {
      const digits = formData.phone.replace(/\D/g, '');
      const validPhoneChars = /^[+\d\s\-()]+$/;
      if (!validPhoneChars.test(formData.phone.trim()) || digits.length < 7 || digits.length > 15) {
        newErrors.phone = 'Please enter a valid phone number (7-15 digits).';
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide an inquiry or project brief.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setResponseMsg('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: personalData.contact.web3FormsKey,
          Name: formData.name,
          email: formData.email,
          Phone: formData.phone,
          Message: formData.message,
          subject: `Data Science Inquiry from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setResponseMsg('Transmission dispatched successfully. I will review and reply within 24 hours.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
        setShowSuccessModal(true);
      } else {
        setStatus('error');
        setResponseMsg(result.message || 'Dispatch error occurred. Please email directly to gujurialekha@gmail.com.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('Network connection error. Please email directly to gujurialekha@gmail.com.');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 border-t border-lab-border bg-lab-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates & Status */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-lab-accent tracking-widest">[07 // INITIATE TRANSMISSION]</span>
                <div className="h-[1px] bg-lab-border flex-1 max-w-xs" aria-hidden="true" />
              </div>
              <h2 id="contact-heading" className="font-display font-bold text-3xl sm:text-4xl text-lab-text-primary tracking-tight">
                Let’s Discuss Data Science & AI Opportunities
              </h2>
              <p className="text-sm text-lab-text-secondary leading-relaxed font-sans pt-2">
                Whether you have an applied machine learning project, an engineering role, or a technical inquiry, my inbox is always open.
              </p>
            </div>

            {/* Direct Coordinates Card */}
            <div className="rounded-lg border border-lab-border bg-lab-surface p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-lab-border pb-3">
                <span className="text-lab-text-muted flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-lab-accent" aria-hidden="true" />
                  <span>DIRECT_COORDINATES</span>
                </span>
                <span className="text-lab-accent text-[10px] font-semibold">VERIFIED</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-lab-text-secondary">
                  <Mail className="w-4 h-4 text-lab-accent shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${personalData.contact.email}`}
                    className="hover:text-lab-accent transition-colors truncate focus-ring rounded"
                    aria-label={`Send email to ${personalData.contact.email}`}
                  >
                    {personalData.contact.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-lab-text-secondary">
                  <MapPin className="w-4 h-4 text-lab-cyan shrink-0" aria-hidden="true" />
                  <span>{personalData.location}</span>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="pt-4 border-t border-lab-border/60 flex flex-wrap gap-2">
                <a
                  href="https://www.linkedin.com/in/gujuri-alekha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-lab-elevated border border-lab-border text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors focus-ring"
                  aria-label="Connect with Alekha Gujuri on LinkedIn (opens in new tab)"
                >
                  <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/alekha1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-lab-elevated border border-lab-border text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors focus-ring"
                  aria-label="View Alekha Gujuri GitHub Profile (opens in new tab)"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.kaggle.com/gujurialekha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-lab-elevated border border-lab-border text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors font-bold focus-ring"
                  aria-label="View Alekha Gujuri Kaggle Competitions (opens in new tab)"
                >
                  <span>Kaggle</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-lab-border bg-lab-surface p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-lab-border pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" aria-hidden="true" />
                  <span className="font-mono text-xs text-lab-text-muted ml-2">secure_dispatch_channel.sh</span>
                </div>
                <span className="font-mono text-[10px] text-lab-accent font-semibold">256-BIT SSL</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="YOUR_NAME" id="contact-name" required error={errors.name}>
                    <Input
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Dr. Jane Doe"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                    />
                  </FormField>

                  <FormField label="EMAIL_ADDRESS" id="contact-email" required error={errors.email}>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="jane@organization.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                    />
                  </FormField>
                </div>

                <FormField label="PHONE_NUMBER" id="contact-phone" optionalLabel="Optional" error={errors.phone}>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 / +1 ..."
                    value={formData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                  />
                </FormField>

                <FormField label="PROJECT_OR_INQUIRY_BRIEF" id="contact-message" required error={errors.message}>
                  <Textarea
                    rows={4}
                    placeholder="Describe your initiative, dataset challenge, or role details..."
                    value={formData.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                  />
                </FormField>

                {/* Status Feedback with ARIA live region */}
                <div aria-live="polite" aria-atomic="true">
                  {status === 'error' && (
                    <div className="p-3 rounded bg-red-500/10 border border-red-500/40 text-red-400 font-mono text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{responseMsg}</span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={status === 'submitting'}
                  leftIcon={<Send className="w-4 h-4" aria-hidden="true" />}
                  className="w-full uppercase tracking-wider font-semibold"
                >
                  {status === 'submitting' ? 'Transmitting Data...' : 'Dispatch Transmission'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Confirmation Popup Modal — Compact & Auto-Closing in 2s */}
      {showSuccessModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-popup-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="relative w-full max-w-[320px] rounded-xl border border-lab-accent/50 bg-lab-surface p-5 shadow-2xl text-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Icon */}
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-3 right-3 p-1 rounded border border-lab-border text-lab-text-secondary hover:text-lab-text-primary hover:bg-lab-elevated transition-colors focus-ring"
              aria-label="Close message sent popup"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            {/* Success Icon */}
            <div className="w-10 h-10 rounded-full bg-lab-accent/10 border border-lab-accent/40 flex items-center justify-center mx-auto text-lab-accent">
              <CheckCircle2 className="w-5 h-5 text-lab-accent" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[9px] text-lab-accent tracking-widest uppercase font-semibold">
                [TRANSMISSION_DELIVERED]
              </span>
              <h3 id="success-popup-title" className="font-display font-bold text-base text-lab-text-primary">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-lab-text-secondary font-sans leading-relaxed">
                Thank you! Your message was sent. I will reply within 24 hours.
              </p>
            </div>

            {/* 2-Second Auto-Close Progress Bar */}
            <div className="w-full bg-lab-border/40 h-1 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-lab-accent animate-shrink2s" />
            </div>

            <div className="pt-1 flex items-center justify-between font-mono text-[10px] text-lab-text-muted">
              <span>Auto-closing in 2s</span>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="text-lab-accent hover:underline font-semibold"
              >
                Close Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

