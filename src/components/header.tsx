'use client';

import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-violet-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/25">
            S
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            StackAudit
          </span>
          <span className="text-xs text-zinc-600 font-medium hidden sm:inline">by Credex</span>
        </a>

        <a
          href="#audit-form"
          className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-105"
        >
          Start Free Audit
        </a>
      </div>
    </header>
  );
}
