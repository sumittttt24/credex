'use client';

import { useState } from 'react';

interface LeadCaptureProps {
  auditId: string;
  savings: number;
}

export function LeadCapture({ auditId, savings }: LeadCaptureProps) {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showOptional, setShowOptional] = useState(false);

  const getMessage = () => {
    if (savings > 500) {
      return {
        headline: 'Get your report + free Credex consultation',
        subtext: 'At your savings level, a Credex specialist can unlock additional savings through volume credits and vendor management.',
        cta: 'Get Report & Book Consultation',
      };
    }
    if (savings > 100) {
      return {
        headline: 'Get your detailed report emailed',
        subtext: 'We\'ll send a complete breakdown with step-by-step instructions to implement these savings.',
        cta: 'Email My Report',
      };
    }
    return {
      headline: 'Stay ahead of AI pricing changes',
      subtext: 'Get notified when new optimizations apply to your stack — vendors update pricing frequently.',
      cta: 'Notify Me',
    };
  };

  const msg = getMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId,
          email,
          companyName: companyName || undefined,
          role: role || undefined,
          teamSize: teamSize ? parseInt(teamSize) : undefined,
          honeypot,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 text-center animate-[fadeSlideIn_0.4s_ease-out]">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✉️</span>
        </div>
        <h3 className="text-xl font-semibold text-emerald-400 mb-2">You&apos;re all set!</h3>
        <p className="text-zinc-400 text-sm">
          {savings > 500
            ? 'Check your inbox — a Credex specialist will reach out within 24 hours.'
            : 'Check your inbox for your audit report.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-white mb-1">{msg.headline}</h3>
      <p className="text-sm text-zinc-500 mb-6">{msg.subtext}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from humans */}
        <input
          type="text"
          name="company_url"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors"
          />
        </div>

        {!showOptional ? (
          <button
            type="button"
            onClick={() => setShowOptional(true)}
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            + Add company details (optional)
          </button>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-[fadeSlideIn_0.3s_ease-out]">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company name"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Your role"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="Team size"
              min={1}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
        )}

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-40 transition-all duration-300 shadow-lg shadow-violet-500/20 relative overflow-hidden group"
        >
          <span className={loading ? 'opacity-0' : ''}>{msg.cta}</span>
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </span>
          )}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </button>
      </form>
    </div>
  );
}
