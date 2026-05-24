import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StackAudit — Free AI Spend Audit | by Credex',
  description:
    'Find out if you\'re overspending on AI tools. Get instant recommendations to optimize your Cursor, Copilot, Claude, ChatGPT, and API spend. Free, no login required.',
  keywords: [
    'AI spend audit',
    'AI tools cost optimization',
    'Cursor pricing',
    'GitHub Copilot pricing',
    'Claude pricing',
    'ChatGPT pricing',
    'AI budget optimization',
    'developer tools cost',
  ],
  openGraph: {
    title: 'StackAudit — Free AI Spend Audit',
    description: 'Find out if you\'re overspending on AI tools. Instant audit, no login required.',
    type: 'website',
    siteName: 'StackAudit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackAudit — Free AI Spend Audit',
    description: 'Find out if you\'re overspending on AI tools. Instant audit, no login required.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
