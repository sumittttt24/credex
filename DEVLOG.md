# DEVLOG — StackAudit Build Timeline

## Day 1: Architecture & Foundation

### Decision: Next.js 16 + App Router
Chose Next.js for three reasons that directly serve the product requirements:
1. **SSR for OG tags** — shareable URLs need server-rendered `<meta>` tags that crawlers can read. SPAs can't do this without a separate prerender service.
2. **API routes** — the audit engine, lead capture, and AI summary generation all need server-side processing. Next.js API routes eliminate the need for a separate backend.
3. **Vercel deployment** — zero-config deployment with edge functions for OG image generation.

Considered Vite + React, but the SSR requirement for shareable URLs made Next.js the clear winner.

### Decision: TypeScript
Non-negotiable for a pricing engine. The audit logic involves complex type relationships between tools, plans, and recommendations. A `ToolAuditResult` has 13 fields — getting one wrong in plain JS would be silent and catastrophic.

### Decision: Tailwind CSS v4
The spec requires visual quality that "gets screenshotted and shared." Tailwind's utility-first approach lets me build a polished dark-mode glassmorphic UI fast. v4's new CSS-first config is simpler than v3.

### Scaffolding
```bash
npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir
npm install @supabase/supabase-js resend @anthropic-ai/sdk nanoid clsx tailwind-merge
```

### Data Layer (types.ts, pricing-data.ts)
Built the type system first: `AITool`, `ToolEntry`, `AuditInput`, `ToolAuditResult`, `AuditResult`. Then populated `pricing-data.ts` with all 8 tools × their plan tiers. Every price sourced from official pricing pages — documented in PRICING_DATA.md.

---

## Day 2: Audit Engine & Rules

### Decision: Deterministic rules, not AI
The spec explicitly says "hardcoded rules are correct — knowing when not to use AI is part of the test." The audit engine is pure functions with no randomness.

### audit-rules.ts — Four evaluation categories
1. **Plan right-sizing**: "You have 2 seats on Cursor Teams ($40/seat). Pro ($20/seat) provides the same AI features."
2. **Same-vendor downgrade**: Compare features needed for the use case against cheaper plans from the same vendor.
3. **Cross-tool alternatives**: For each tool + use case combination, check if a cheaper tool provides comparable capability.
4. **API optimization**: Flag high API spend for Credex credits; suggest batch API and caching for medium spend.

Every recommendation includes a reasoning string with specific dollar amounts. A finance person should read "Teams plan ($40/seat) for 2 seats provides admin features most small teams don't need. Pro ($20/seat) saves $40/mo with the same AI capabilities" and agree.

### audit-engine.ts — Picks the best recommendation
For each tool, runs all four categories, collects all valid recommendations, sorts by savings descending, picks the best one. If no savings found, returns "keep" with a positive message.

### AI Summary (ai-summary.ts)
Uses Anthropic Claude Sonnet to generate a ~100-word personalized paragraph. System prompt constrains output to a single flowing paragraph, prohibits mentioning Credex (the CTA is handled by UI), and forbids making up numbers.

Fallback: `summary-template.ts` generates a natural paragraph using conditionals (zero/small/medium/large savings). Tested by removing the API key — fallback summary reads naturally.

---

## Day 3: UI Components & Pages

### Design System
Dark theme (#09090b base), glassmorphic cards (bg-white/[0.03] + backdrop-blur), violet-to-fuchsia gradients, Inter font. Custom animations: fadeSlideIn for card entrances, count-up animation for savings numbers.

### Components Built (9 total)
- `header.tsx` — Sticky with glassmorphic blur on scroll
- `footer.tsx` — Minimal with Credex attribution
- `tool-selector.tsx` — Modal grid with color-coded tool cards
- `spend-form.tsx` — Multi-tool form with localStorage persistence
- `audit-card.tsx` — Color-coded by action (keep/downgrade/switch/optimize)
- `savings-hero.tsx` — Animated counter with requestAnimationFrame
- `lead-capture.tsx` — Savings-aware messaging, optional company fields
- `share-buttons.tsx` — Copy URL, Twitter/X, LinkedIn
- `credex-cta.tsx` — Premium CTA for >$500/mo savings

### Pages
- Landing page: Hero + trust indicators + form + how-it-works + supported tools
- Results page: Server component (for OG tags) + client component (for interactivity)

### Decision: sessionStorage for immediate results
After submitting the form, the audit result is stored in sessionStorage before navigating to `/audit/[id]`. This means the results page loads instantly without waiting for a Supabase fetch. The server-side fetch is a fallback for when someone visits the shareable URL directly.

---

## Day 4: Backend, API Routes & Polish

### API Routes (3 endpoints)
- `POST /api/audit` — Runs engine, generates AI summary, stores in Supabase
- `POST /api/lead` — Captures email, stores in Supabase, sends Resend email
- `GET /api/og` — Edge function generating 1200×630 OG images with savings numbers

### Abuse Protection
- **Honeypot**: Hidden form field that bots fill. If populated, we return a fake 200 response (don't alert the bot that it failed).
- **Rate limiting**: In-memory store, 10 audits/IP/hour, 5 leads/IP/hour. Returns 429 with Retry-After header.
- **Why not CAPTCHA**: Adds friction to a zero-barrier tool. Honeypot + rate limiting is sufficient for an MVP.

### Best-effort external calls
All Supabase and Resend calls are wrapped in try/catch. If Supabase is down, the audit still returns results (from the engine). If Resend fails, the lead is still stored. Nothing blocks the critical path.

### Build verification
`npm run build` — compiles in 16s, zero TypeScript errors, all routes generated correctly.
