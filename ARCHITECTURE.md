# StackAudit — Architecture

> AI Spend Audit Tool for Dev Teams | Built by [Credex](https://credex.so)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Data Flow](#data-flow)
- [Abuse Protection](#abuse-protection)
- [File Structure](#file-structure)

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | SSR for OG tags on shareable audit URLs, API routes as serverless backend for audit engine + lead capture, React ecosystem, seamless Vercel deployment |
| **Language** | TypeScript | Type safety across pricing data structures, audit logic, and API request/response contracts |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Rapid premium UI development with accessible, composable components and design tokens |
| **Database** | Supabase (PostgreSQL) | Free tier provides 500 MB storage, 50k MAUs, Row Level Security for secure anonymous inserts from the client |
| **Email** | Resend | 3,000 emails/month on the free tier, clean REST API, excellent deliverability and DX |
| **AI Summary** | Anthropic Claude API | Generates personalized ~100-word audit summaries; graceful fallback to deterministic templates on API failure |
| **Deployment** | Vercel | Zero-config Next.js hosting with edge functions, automatic preview deployments, and OG image generation at the edge |

### Why These Choices

- **Next.js 15 App Router** was selected over Pages Router for its native support for React Server Components, nested layouts, and streaming — all of which simplify the SSR-first architecture required for OG meta tags on shareable audit URLs. API routes double as a lightweight serverless backend, eliminating the need for a separate API service.

- **Supabase** over raw PostgreSQL or Firebase because it provides a managed Postgres instance with built-in Row Level Security (RLS). RLS is critical: audit results are inserted by unauthenticated users, and RLS policies ensure anonymous inserts are allowed only on the `audits` and `leads` tables — no other operations are possible without a service role key.

- **Resend** over SendGrid/Mailgun for its developer-first API design and free tier that comfortably covers MVP traffic. Transactional emails (audit report delivery) benefit from Resend's high deliverability without requiring domain warm-up.

- **Anthropic Claude** over OpenAI for summary generation because the system prompt + user prompt pattern produces consistently well-structured single-paragraph output with Claude. The prompt is designed to prevent hallucination (see [PROMPTS.md](./PROMPTS.md)). A deterministic template fallback ensures the feature never blocks on API availability.

---

## Data Flow

The following diagram illustrates the end-to-end flow from user input to shareable audit report:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                            │
│                                                                     │
│  1. User fills spend input form                                     │
│     └─ Form state persisted to localStorage (resume on refresh)     │
│                                                                     │
│  2. Form submitted ──────────────────────────────────┐              │
│                                                      ▼              │
│                                              POST /api/audit        │
│                                                      │              │
└──────────────────────────────────────────────────────┼──────────────┘
                                                       │
┌──────────────────────────────────────────────────────┼──────────────┐
│                         SERVER (Vercel)              │              │
│                                                      ▼              │
│  3. Deterministic Audit Engine                                      │
│     └─ Hardcoded pricing rules + lookup tables                      │
│     └─ No AI involved — pure business logic                        │
│     └─ Computes per-tool recommendations + savings                  │
│                                                                     │
│  4. Anthropic Claude API call                                       │
│     └─ Sends audit data to Claude for personalized summary          │
│     └─ On failure → fallback to template-generated paragraph        │
│                                                                     │
│  5. Store audit in Supabase                                         │
│     └─ `audits` table, keyed by unique nanoid (e.g., `a_xK9mP2`)   │
│     └─ Includes: input data, results, summary, timestamps           │
│                                                                     │
│  6. Return audit ID to client → redirect to /audit/[id]             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                                       │
┌──────────────────────────────────────────────────────┼──────────────┐
│                    RESULTS PAGE (SSR)                 │              │
│                                                      ▼              │
│  6. /audit/[id]/page.tsx                                            │
│     └─ Server-side rendered with full OG meta tags                  │
│     └─ Fetches audit from Supabase at request time                  │
│     └─ Renders: savings breakdown, tool cards, AI summary           │
│                                                                     │
│  7. Lead Capture (optional)                                         │
│     └─ User enters email → POST /api/lead                          │
│     └─ Stored in Supabase `leads` table (linked to audit_id)       │
│     └─ Triggers Resend transactional email with audit report        │
│                                                                     │
│  8. Shareable URL                                                   │
│     └─ /audit/[id] is the permanent shareable link                  │
│     └─ OG image generated dynamically via /api/og edge function     │
│     └─ OG tags include: title, description, savings amount, image   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Breakdown

| Step | Action | Details |
|------|--------|---------|
| **1** | User fills spend input form | Team size, use case, and per-tool current plan/spend. State is persisted to `localStorage` so users can resume if they navigate away. |
| **2** | Form submitted to `POST /api/audit` | Client-side validation runs first (Zod schema). Honeypot field checked on server. |
| **3** | Deterministic audit engine runs | No AI involved. Hardcoded pricing rules from [PRICING_DATA.md](./PRICING_DATA.md) compute per-tool recommendations, savings, and reasoning. |
| **4** | Anthropic API called for summary | Claude generates a personalized ~100-word paragraph (see [PROMPTS.md](./PROMPTS.md)). If the API call fails or times out, a template-based fallback generates a comparable summary deterministically. |
| **5** | Audit stored in Supabase | Inserted into the `audits` table with a unique `nanoid` as the public identifier. Contains all input data, computed results, and the AI/template summary. |
| **6** | Results page rendered with SSR | `/audit/[id]` fetches the audit record server-side and renders the full results page with proper `<meta>` OG tags for social sharing. |
| **7** | Optional lead capture | User can enter their email to receive the report. `POST /api/lead` stores the lead in Supabase and triggers a Resend transactional email. |
| **8** | OG image generated at the edge | `/api/og?id=[id]` is a Vercel Edge Function that generates a dynamic Open Graph image with the team's savings headline. |

---

## Abuse Protection

StackAudit is a public-facing tool with no authentication. Abuse protection is designed to be **zero-friction for real users** while deterring bots and abuse.

### Honeypot Field

A hidden form field (e.g., `<input name="website" style="display:none">`) is included in the audit form. Legitimate users never see or fill it. Bots that auto-fill all form fields will populate it.

- **Server behavior**: If the honeypot field contains any value, the API returns a `200 OK` with a fake success response. The submission is silently discarded.
- **Why silent success**: Returning an error would signal to bot operators that their submission was detected. A fake success makes honeypot evasion harder.

### Rate Limiting

In-memory rate limiting is applied to all API routes using a sliding-window counter keyed by client IP (`x-forwarded-for` header on Vercel).

| Endpoint | Limit | Window |
|----------|-------|--------|
| `POST /api/audit` | 10 requests | per hour per IP |
| `POST /api/lead` | 5 requests | per hour per IP |

- Returns `429 Too Many Requests` with a `Retry-After` header.
- In-memory store resets on cold starts (acceptable for MVP — distributed rate limiting via Upstash Redis can be added later).

### Why Not CAPTCHA?

| Approach | Friction | Conversion Impact | Protection Level |
|----------|----------|-------------------|------------------|
| **hCaptcha / reCAPTCHA** | High — user must solve a challenge | Significant drop-off, especially on mobile | High |
| **Honeypot + Rate Limit** | Zero — invisible to users | No impact | Moderate |

For an MVP lead-capture tool where **conversion rate is the primary metric**, honeypot + rate limiting provides sufficient protection without any UX degradation. If abuse becomes significant post-launch, hCaptcha can be added behind a feature flag as a secondary layer.

---

## File Structure

```
credex/
├── ARCHITECTURE.md              # This document — system architecture & design decisions
├── PRICING_DATA.md              # Pricing data for all supported AI tools (with sources)
├── PROMPTS.md                   # AI prompt templates and design rationale
├── .env.example                 # Environment variable template
├── supabase/
│   └── schema.sql               # Database schema — audits, leads tables + RLS policies
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout — Inter font, ThemeProvider, global meta
│   │   ├── page.tsx             # Landing page + spend input form
│   │   ├── globals.css          # Tailwind v4 config + custom design tokens
│   │   ├── audit/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # SSR results page — savings breakdown, AI summary
│   │   └── api/
│   │       ├── audit/
│   │       │   └── route.ts     # POST — run audit engine, store results, return ID
│   │       ├── lead/
│   │       │   └── route.ts     # POST — capture email, send report via Resend
│   │       └── og/
│   │           └── route.tsx    # GET — dynamic OG image generation (Edge Function)
│   ├── components/              # Reusable UI components (shadcn/ui based)
│   │   ├── ui/                  # shadcn/ui primitives (Button, Card, Input, etc.)
│   │   └── ...                  # App-specific components (AuditForm, ResultsCard, etc.)
│   ├── hooks/                   # Custom React hooks (useLocalStorage, useAuditForm, etc.)
│   └── lib/                     # Core logic, types, and utilities
│       ├── audit-engine.ts      # Deterministic audit computation logic
│       ├── pricing-data.ts      # Structured pricing data (mirrors PRICING_DATA.md)
│       ├── types.ts             # TypeScript type definitions (AuditInput, AuditResult, etc.)
│       ├── schemas.ts           # Zod validation schemas for API inputs
│       ├── supabase.ts          # Supabase client initialization
│       ├── rate-limit.ts        # In-memory rate limiter
│       ├── anthropic.ts         # Claude API client + fallback summary generator
│       └── utils.ts             # General utilities (formatCurrency, nanoid, etc.)
└── public/                      # Static assets (favicon, logos, social images)
```

### Key Architectural Boundaries

- **`src/lib/audit-engine.ts`** — The audit engine is a pure function: `(input: AuditInput) => AuditResult`. It has no side effects, no API calls, and no database access. This makes it trivially testable and ensures audit results are 100% deterministic.

- **`src/lib/pricing-data.ts`** — Single source of truth for all pricing data used by the audit engine. Mirrors [PRICING_DATA.md](./PRICING_DATA.md) in a TypeScript-native format. When pricing changes, update both files.

- **`src/app/api/`** — API routes are thin orchestration layers. They validate input (Zod), call the audit engine, handle AI summary generation with fallback, persist to Supabase, and return responses. No business logic lives here.

- **`src/components/`** — Presentation layer only. Components receive data via props or server component data fetching. No direct API calls or business logic in components.

---

## Key Design Decisions

| Decision | Choice | Alternative Considered | Rationale |
|----------|--------|----------------------|-----------|
| Audit engine | Deterministic (hardcoded rules) | AI-powered recommendations | Predictable, testable, no API dependency for core feature |
| Audit ID | nanoid (URL-safe) | UUID v4 | Shorter URLs for sharing, URL-safe by default |
| State persistence | localStorage | URL params, cookies | Survives page refresh, no server round-trip, privacy-friendly |
| OG images | Edge Function (Satori) | Pre-generated static images | Dynamic content (savings amount) per audit, generated on-demand |
| Rate limiting | In-memory | Redis (Upstash) | Zero infrastructure cost for MVP; Redis upgrade path exists |
| Email provider | Resend | SendGrid, AWS SES | Best DX, generous free tier, no domain warm-up needed |
| Summary fallback | Template-based paragraph | No summary on failure | Core feature must never fail; template produces acceptable output |

---

*Last updated: May 2026*
