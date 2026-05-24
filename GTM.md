# GTM.md — Go-to-Market Strategy

> How StackAudit acquires users, converts leads, and feeds the Credex sales pipeline.

---

## Table of Contents

- [Positioning](#positioning)
- [Target Audience](#target-audience)
- [Distribution Channels](#distribution-channels)
- [Launch Sequence](#launch-sequence)
- [Conversion Funnel](#conversion-funnel)
- [Content Strategy](#content-strategy)
- [Partnership Opportunities](#partnership-opportunities)
- [Success Criteria](#success-criteria)

---

## Positioning

### One-Liner

> **Free AI spend audit for dev teams** — find out if you're overspending on Cursor, Copilot, Claude, ChatGPT, and APIs in 60 seconds.

### Positioning Statement

For **engineering managers and tech leads** who manage AI tool subscriptions across their team, **StackAudit** is a **free, instant audit tool** that identifies overspending and recommends exact optimizations — unlike spreadsheets or manual reviews, it uses hardcoded pricing intelligence across 8 tools and 30+ plans to deliver actionable savings in under a minute with no login required.

### Key Differentiators

| StackAudit | Manual Review | Competitors |
|-----------|---------------|-------------|
| Free, no login | Free but time-consuming | Often paid or gated |
| 8 tools, 30+ plans | Limited to what you know | Narrow tool coverage |
| Instant results | Hours of research | Varies |
| Shareable URL with OG images | Spreadsheet or PDF | Rarely shareable |
| AI-personalized summary | N/A | Generic advice |

---

## Target Audience

### Primary: Engineering Managers / Tech Leads (B2B)

| Attribute | Detail |
|-----------|--------|
| **Title** | Engineering Manager, VP Engineering, Tech Lead, CTO |
| **Company Size** | 5–200 engineers |
| **Pain Point** | Managing 3–6 AI tool subscriptions across the team, no visibility into whether plans are right-sized |
| **Budget Authority** | Controls or influences $5K–$50K/mo in AI tool spend |
| **Discovery** | LinkedIn, Hacker News, dev communities, peer recommendations |

### Secondary: Individual Developers

| Attribute | Detail |
|-----------|--------|
| **Title** | Senior Developer, Staff Engineer, Freelancer |
| **Pain Point** | Paying for Cursor Pro + ChatGPT Plus + Claude Pro and wondering if there's overlap |
| **Budget** | $40–$200/mo personal AI spend |
| **Discovery** | Twitter/X, Reddit r/programming, dev blogs |
| **Value** | Lower conversion to Credex, but high shareability drives awareness |

### Anti-Persona (Not targeting)

- Enterprise procurement teams (too long a sales cycle for this tool)
- Non-technical founders (don't understand the tool landscape)
- Students/hobbyists (no budget to optimize)

---

## Distribution Channels

### Tier 1 — Owned (Free, High Control)

| Channel | Tactic | Expected Impact |
|---------|--------|-----------------|
| **Product Hunt** | Launch with "Free AI Spend Audit — Save $1000s/yr" | 500–2,000 day-one visitors |
| **Hacker News** | "Show HN: I built a free audit tool for AI subscriptions" | 1,000–5,000 visitors if front page |
| **Twitter/X** | Thread: "Most dev teams overspend 30%+ on AI tools. Here's a free audit" | 200–1,000 clicks |
| **LinkedIn** | Personal post from Credex founders targeting eng managers | 500–2,000 impressions |
| **Dev.to / Hashnode** | "How we audited our AI spend and saved $3K/year" blog post | 300–800 visitors |

### Tier 2 — Community (Free, Medium Control)

| Channel | Tactic | Expected Impact |
|---------|--------|-----------------|
| **Reddit** | r/programming, r/webdev, r/SaaS — value-first posts | 200–500 visitors per post |
| **Discord communities** | AI coding tool Discords (Cursor, Windsurf) | 50–200 visitors |
| **Slack communities** | Engineering leadership Slacks | 100–300 visitors |

### Tier 3 — Paid (Post-Validation)

| Channel | Tactic | Budget | Expected CPA |
|---------|--------|--------|-------------|
| **LinkedIn Ads** | Sponsored posts targeting VP Eng + 50-500 employees | $500/mo test | $15–25/lead |
| **Google Ads** | "AI tool cost comparison", "Cursor vs Copilot pricing" | $300/mo test | $10–20/lead |
| **Newsletter sponsorships** | TLDR, Bytes, The Pragmatic Engineer | $200–500/placement | $20–40/lead |

---

## Launch Sequence

### Week 0: Pre-Launch

- [ ] Deploy to Vercel production
- [ ] Set up analytics (PostHog or Plausible)
- [ ] Prepare PH listing (screenshots, description, maker comment)
- [ ] Draft HN Show post
- [ ] Create social media assets (OG image screenshots, thread drafts)
- [ ] Seed 10 test audits for social proof

### Week 1: Launch

| Day | Action | Target |
|-----|--------|--------|
| Mon | Product Hunt launch | 200 upvotes target |
| Mon | Twitter/X thread from founder | 50 retweets |
| Tue | Hacker News "Show HN" post | Front page attempt |
| Wed | LinkedIn post from CEO/founder | 100 reactions |
| Thu | Reddit posts (r/programming, r/SaaS) | 50 upvotes |
| Fri | Week 1 metrics review | 2,000 audits target |

### Week 2–4: Sustained

- Daily social posts featuring anonymized audit results
- Respond to all comments/feedback across channels
- Iterate on tool based on user feedback
- Begin outreach to newsletter sponsors

### Month 2+: Scale

- Launch paid channels with validated messaging
- Add benchmark feature ("Your AI spend vs. companies your size")
- Implement referral mechanism
- Begin content marketing cadence (bi-weekly blog posts)

---

## Conversion Funnel

```
Visitor → Audit → Lead → Qualified Lead → Credex Customer

  Visitor:        lands on stackaudit.com
     ↓             (target: 100% of traffic)
  Audit Run:       fills form, runs audit
     ↓             (target: 40–60% of visitors)
  Lead Capture:    enters email after seeing results
     ↓             (target: 15–25% of audit completions)
  Qualified Lead:  savings > $500/mo + enterprise signals
     ↓             (target: 10–20% of leads)
  Credex Customer: books consultation, becomes client
                   (target: 5–10% of qualified leads)
```

### Funnel Math (Monthly Projections)

| Stage | Count | Conversion | Notes |
|-------|-------|-----------|-------|
| Visitors | 10,000 | — | Across all channels |
| Audits completed | 5,000 | 50% | No login friction helps |
| Emails captured | 1,000 | 20% of audits | After value is shown |
| Qualified leads ($500+/mo savings) | 150 | 15% of leads | High API spend + large teams |
| Credex consultations booked | 30 | 20% of qualified | Via CTA + email follow-up |
| Closed customers | 5–10 | 20–30% of consultations | Depends on Credex sales process |

### Key Conversion Levers

1. **Zero friction to value** — no login, no signup, instant results
2. **Savings-aware messaging** — lead capture CTA adapts: "$X/mo savings" for high-savings, "Stay updated" for low-savings
3. **Shareable results** — OG images make results screenshot-worthy, driving organic referrals
4. **Credex CTA threshold** — only shown when savings > $500/mo, preventing low-intent leads

---

## Content Strategy

### Pillar Content (SEO-Focused)

| Topic | Target Keywords | Format |
|-------|----------------|--------|
| "AI Tool Pricing Comparison 2026" | ai tool pricing, cursor vs copilot cost | Long-form blog |
| "How to Audit Your Team's AI Spend" | ai spend audit, ai tool cost optimization | Guide + tool CTA |
| "Cursor vs GitHub Copilot vs Windsurf" | cursor vs copilot, windsurf pricing | Comparison + tool CTA |
| "Claude vs ChatGPT for Dev Teams" | claude vs chatgpt, ai assistant comparison | Comparison + tool CTA |
| "How We Saved $15K/yr on AI Tools" | case study, ai spend reduction | Case study |

### Social Content (Awareness-Focused)

| Type | Frequency | Channel |
|------|-----------|---------|
| Anonymized audit highlights | 2x/week | Twitter/X, LinkedIn |
| Pricing update alerts | When vendors change | Twitter/X, blog |
| Tips for AI cost optimization | 1x/week | LinkedIn, Dev.to |
| Feature announcements | As shipped | All channels |

---

## Partnership Opportunities

| Partner Type | Value to StackAudit | Value to Partner |
|-------------|---------------------|-----------------|
| **AI tool vendors** (Cursor, Windsurf) | Co-marketing, pricing data access | Recommend their tool as "best value" in certain segments |
| **Dev tool newsletters** | Distribution to target audience | Quality content for their readers |
| **Engineering communities** | Organic distribution | Useful free tool for members |
| **SaaS management platforms** (Zylo, Productiv) | Integration referrals | Complementary offering for AI-specific tools |

---

## Success Criteria

### Launch (Month 1)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Total audits run | 2,000 | Supabase count |
| Unique visitors | 10,000 | Analytics |
| Emails captured | 400 | Supabase leads count |
| Qualified leads ($500+/mo) | 60 | Manual review |
| Product Hunt rank | Top 10 of the day | PH dashboard |

### Growth (Month 3)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Monthly audits | 5,000 | Supabase |
| Monthly leads | 1,000 | Supabase |
| Credex consultations from StackAudit | 15/month | CRM tracking |
| Organic traffic share | 40%+ | Analytics |
| Share/referral rate | 10% of audit completers share | URL tracking |

---

*Last updated: May 2026*
