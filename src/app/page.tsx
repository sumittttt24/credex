import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SpendForm } from '@/components/spend-form';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-[120px]" />
            <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/6 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6 animate-in">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Free · No login required · Instant results
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-in" style={{ animationDelay: '100ms' }}>
              Are you overspending on{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                AI tools
              </span>
              ?
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in" style={{ animationDelay: '200ms' }}>
              Input your AI subscriptions. Get an instant audit showing where to
              downgrade, switch, or optimize — with exact savings calculated.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 text-xs text-zinc-600 mb-12 animate-in" style={{ animationDelay: '300ms' }}>
              <span className="flex items-center gap-1.5">
                <span className="text-violet-500">✦</span> Covers 8 major AI tools
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <span className="text-violet-500">✦</span> Current pricing data
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-violet-500">✦</span> Shareable results
              </span>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="relative pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <SpendForm />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Add your tools',
                  desc: 'Tell us what AI tools you pay for, which plan, and how many seats.',
                  icon: '📝',
                },
                {
                  step: '02',
                  title: 'Get your audit',
                  desc: 'Our engine analyzes each tool for right-sizing, downgrades, and alternatives.',
                  icon: '🔍',
                },
                {
                  step: '03',
                  title: 'Save money',
                  desc: 'See exact monthly and annual savings. Share the results with your team.',
                  icon: '💰',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white/[0.03] border border-white/5 rounded-xl p-6 hover:border-violet-500/20 hover:bg-violet-500/[0.02] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-mono text-violet-500/50">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools We Audit */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Tools We Audit</h2>
            <p className="text-zinc-500 mb-10">Pricing data verified and sourced from official pages</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                'Cursor', 'GitHub Copilot', 'Claude', 'ChatGPT',
                'Anthropic API', 'OpenAI API', 'Gemini', 'Windsurf',
              ].map((name) => (
                <div
                  key={name}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-zinc-400 hover:text-white hover:border-violet-500/20 transition-all duration-200"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
