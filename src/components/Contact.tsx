'use client';

import React, { useState } from 'react';
import { personalData } from '@/data/personal';
import {
  Mail,
  Send,
  Linkedin,
  Github,
  CheckCircle2,
  AlertCircle,
  Terminal,
  MapPin,
  Clock,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <section id="contact" className="py-24 border-t border-lab-border bg-lab-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates & Status */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-lab-accent tracking-widest">[07 // INITIATE TRANSMISSION]</span>
                <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-lab-text-primary tracking-tight">
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
                  <Terminal className="w-4 h-4 text-lab-accent" />
                  <span>DIRECT_COORDINATES</span>
                </span>
                <span className="text-lab-accent text-[10px]">VERIFIED</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-lab-text-secondary">
                  <Mail className="w-4 h-4 text-lab-accent shrink-0" />
                  <a
                    href={`mailto:${personalData.contact.email}`}
                    className="hover:text-lab-accent transition-colors truncate"
                  >
                    {personalData.contact.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-lab-text-secondary">
                  <MapPin className="w-4 h-4 text-lab-cyan shrink-0" />
                  <span>{personalData.location}</span>
                </div>

                <div className="flex items-center space-x-3 text-lab-text-secondary">
                  <Clock className="w-4 h-4 text-lab-amber shrink-0" />
                  <span>UTC+05:30 (Indian Standard Time)</span>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="pt-4 border-t border-lab-border/60 flex flex-wrap gap-2">
                <a
                  href="https://www.linkedin.com/in/gujuri-alekha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-lab-elevated border border-lab-border text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/alekha1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-lab-elevated border border-lab-border text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.kaggle.com/gujurialekha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-lab-elevated border border-lab-border text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors font-bold"
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
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-lab-text-muted ml-2">secure_dispatch_channel.sh</span>
                </div>
                <span className="font-mono text-[10px] text-lab-accent">256-BIT SSL</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-lab-text-muted block">
                      YOUR_NAME <span className="text-lab-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-lab-bg border border-lab-border text-sm font-mono text-lab-text-primary placeholder:text-lab-text-muted/60 focus:outline-none focus:border-lab-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-lab-text-muted block">
                      EMAIL_ADDRESS <span className="text-lab-accent">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-lab-bg border border-lab-border text-sm font-mono text-lab-text-primary placeholder:text-lab-text-muted/60 focus:outline-none focus:border-lab-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-lab-text-muted block">
                    PHONE_NUMBER <span className="text-[10px] text-lab-text-muted">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 / +1 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-lab-bg border border-lab-border text-sm font-mono text-lab-text-primary placeholder:text-lab-text-muted/60 focus:outline-none focus:border-lab-accent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-lab-text-muted block">
                    PROJECT_OR_INQUIRY_BRIEF <span className="text-lab-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your initiative, dataset challenge, or role details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-lab-bg border border-lab-border text-sm font-sans text-lab-text-primary placeholder:text-lab-text-muted/60 focus:outline-none focus:border-lab-accent transition-colors resize-y"
                  />
                </div>

                {status === 'success' && (
                  <div className="p-3 rounded bg-emerald-500/10 border border-lab-accent/40 text-lab-accent font-mono text-xs flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3 rounded bg-red-500/10 border border-red-500/40 text-red-400 font-mono text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 rounded font-mono text-xs font-semibold uppercase tracking-wider bg-lab-accent text-lab-bg hover:bg-emerald-400 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-lab-glow"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === 'submitting' ? 'Transmitting Data...' : 'Dispatch Transmission'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
