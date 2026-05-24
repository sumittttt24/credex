'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

interface ShareButtonsProps {
  auditId: string;
  savings: number;
}

export function ShareButtons({ auditId, savings }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/audit/${auditId}`;
    }
    return `/audit/${auditId}`;
  };

  const shareText = `I just found ${formatCurrency(savings)}/yr in AI tool savings with StackAudit. Run your free audit:`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = getUrl();
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(getUrl())}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-600 mr-1">Share:</span>

      {/* Copy URL */}
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
          copied
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white'
        }`}
      >
        {copied ? '✓ Copied' : '🔗 Copy Link'}
      </button>

      {/* Twitter/X */}
      <button
        onClick={handleTwitter}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200"
      >
        𝕏 Post
      </button>

      {/* LinkedIn */}
      <button
        onClick={handleLinkedIn}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200"
      >
        in Share
      </button>
    </div>
  );
}
