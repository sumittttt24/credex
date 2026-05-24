# StackAudit — Free AI Spend Audit Tool

> **Stop overspending on AI tools.** Input your subscriptions, get an instant audit with exact savings — free, no login required.

Built by [Credex](https://credex.com) · [Live Demo →](https://stackaudit.vercel.app)

---

## What It Does

1. **Input** your AI tool subscriptions (Cursor, Copilot, Claude, ChatGPT, Gemini, Windsurf, APIs)
2. **Get instant audit** — where you're overspending, what to switch or downgrade, total savings
3. **Capture the report** via email — high-savings cases get a Credex consultation offer
4. **Share results** via unique public URL with Open Graph previews

No login. Email captured after value is shown, never before.

---

## Supported Tools

| IDE Tools | AI Assistants | APIs |
|-----------|--------------|------|
| Cursor (Hobby/Pro/Pro+/Ultra/Teams/Enterprise) | Claude (Free/Pro/Max/Team/Enterprise) | Anthropic API (Opus/Sonnet/Haiku) |
| GitHub Copilot (Free/Pro/Pro+/Business/Enterprise) | ChatGPT (Free/Plus/Pro/Business/Enterprise) | OpenAI API (GPT-4o/4.1/o3/o4-mini) |
| Windsurf (Free/Pro/Max/Teams/Enterprise) | Gemini (AI Plus/Pro/Ultra) | |

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 16** (App Router) | SSR for OG tags, API routes, Vercel deployment |
| Language | **TypeScript** | Type safety for pricing data & audit logic |
| Styling | **Tailwind CSS v4** | Rapid premium UI, dark theme, animations |
| Database | **Supabase** (PostgreSQL) | Free tier, RLS, real-time capable |
| Email | **Resend** | 3k emails/mo free, clean API |
| AI Summary | **Anthropic Claude API** | Personalized summaries with template fallback |
| Deployment | **Vercel** | Zero-config Next.js hosting |

Full rationale in [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Quick Start

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your keys (see below)

# Run database schema
# → Copy supabase/schema.sql into Supabase SQL Editor and run it

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Source |
|----------|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Same page |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Same page (secret) |
| `ANTHROPIC_API_KEY` | No | console.anthropic.com → API Keys |
| `RESEND_API_KEY` | No | resend.com → API Keys |
| `NEXT_PUBLIC_BASE_URL` | Yes | Your deployment URL |

> The app works without optional keys — AI summary falls back to template, email is skipped.

---

## Project Structure

```
├── ARCHITECTURE.md        # Tech decisions & data flow
├── PRICING_DATA.md        # All pricing with source URLs
├── PROMPTS.md             # AI prompt & design rationale
├── DEVLOG.md              # Development timeline
├── REFLECTION.md          # Post-build reflection
├── TESTS.md               # Testing strategy & results
├── GTM.md                 # Go-to-market strategy
├── ECONOMICS.md           # Unit economics analysis
├── USER_INTERVIEWS.md     # User research insights
├── LANDING_COPY.md        # Landing page copy decisions
├── METRICS.md             # Success metrics framework
├── supabase/schema.sql    # Database schema
├── src/
│   ├── app/               # Pages & API routes
│   ├── components/        # React UI components
│   └── lib/               # Core logic, types, utilities
└── public/                # Static assets
```

---

## Deploy

```bash
# Build
npm run build

# Deploy to Vercel
npx vercel --prod
```

Set all environment variables in Vercel Dashboard → Settings → Environment Variables.

---

## Lighthouse Scores

| Metric | Target | Status |
|--------|--------|--------|
| Performance | ≥ 85 | ✅ |
| Accessibility | ≥ 90 | ✅ |
| Best Practices | ≥ 90 | ✅ |

---

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Tech stack, data flow, abuse protection
- [PRICING_DATA.md](./PRICING_DATA.md) — Every price with source URL
- [PROMPTS.md](./PROMPTS.md) — AI prompt design & fallback strategy
- [DEVLOG.md](./DEVLOG.md) — Build timeline & decisions
- [REFLECTION.md](./REFLECTION.md) — What went well, what I'd change
- [TESTS.md](./TESTS.md) — Testing approach & coverage
- [GTM.md](./GTM.md) — Go-to-market strategy
- [ECONOMICS.md](./ECONOMICS.md) — Unit economics
- [USER_INTERVIEWS.md](./USER_INTERVIEWS.md) — User research
- [LANDING_COPY.md](./LANDING_COPY.md) — Copy strategy
- [METRICS.md](./METRICS.md) — Success metrics

---

## License

MIT — built for the Credex take-home project.
