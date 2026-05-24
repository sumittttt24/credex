# METRICS.md — Success Metrics Framework

> KPIs, tracking plan, and success criteria for StackAudit across product, growth, and business dimensions.

---

## Table of Contents

- [Metrics Philosophy](#metrics-philosophy)
- [North Star Metric](#north-star-metric)
- [Metric Categories](#metric-categories)
- [Product Metrics](#product-metrics)
- [Growth Metrics](#growth-metrics)
- [Business Metrics](#business-metrics)
- [Technical Metrics](#technical-metrics)
- [Dashboards & Tracking](#dashboards--tracking)
- [Reporting Cadence](#reporting-cadence)
- [Anti-Metrics](#anti-metrics)

---

## Metrics Philosophy

### Principles

1. **Measure outcomes, not outputs** — "Credex consultations booked" matters more than "audits run"
2. **Leading over lagging** — Track audit completion rate (leading) to predict lead volume (lagging)
3. **Actionable over vanity** — Page views are interesting; audit-to-lead conversion is actionable
4. **Simple over comprehensive** — A handful of well-tracked metrics beats 50 dashboards nobody checks

### The One Question

> "Is StackAudit generating qualified leads for Credex at near-zero cost?"

Every metric should help answer this question.

---

## North Star Metric

### **Qualified Leads per Month**

A **qualified lead** is defined as:

| Criteria | Threshold |
|----------|-----------|
| Audit completed | Yes |
| Email captured | Yes |
| Monthly savings identified | > $500/mo |
| Email domain | Not free (gmail, yahoo, hotmail) |

**Target**: 50 qualified leads/month by Month 3

**Why this metric**:
- Directly maps to Credex revenue opportunity
- Combines product usage (audit), engagement (email), and business value (savings threshold)
- Not gameable by vanity traffic

---

## Metric Categories

### Overview Table

| Category | Key Metric | Target (Month 1) | Target (Month 3) |
|----------|-----------|-------------------|-------------------|
| **Product** | Audit completion rate | 50% | 60% |
| **Growth** | Monthly unique visitors | 5,000 | 15,000 |
| **Business** | Qualified leads/month | 20 | 50 |
| **Technical** | API response time (P95) | < 3s | < 2s |

---

## Product Metrics

### Funnel Metrics

| Metric | Definition | Target | Measurement |
|--------|-----------|--------|-------------|
| **Visitor → Form Engagement** | % of visitors who add at least 1 tool | 60% | Analytics event |
| **Form Engagement → Audit Completion** | % of engaged users who submit the form | 70% | API call count |
| **Audit Completion → Results View** | % of audits where user views results page | 95% | Page view on /audit/[id] |
| **Results View → Email Capture** | % of results viewers who enter email | 20% | Lead API call count |
| **Results View → Share** | % of results viewers who click a share button | 10% | Click event |

### Engagement Metrics

| Metric | Definition | Target | Why It Matters |
|--------|-----------|--------|---------------|
| **Tools per audit** | Avg number of tools entered per audit | 2.5 | More tools = deeper engagement, better data |
| **Time to complete** | Median time from first tool add to submission | < 3 min | Longer = friction, shorter = may be too simple |
| **Return rate** | % of users who run a second audit within 30 days | 5% | Indicates ongoing value |
| **Form abandonment rate** | % who add 1+ tool but don't submit | < 30% | High rate = UX friction |
| **localStorage resume rate** | % of returning visitors whose form state was restored | Track | Validates persistence feature value |

### Results Page Metrics

| Metric | Definition | Target | Why It Matters |
|--------|-----------|--------|---------------|
| **Avg savings found** | Mean totalMonthlySavings across all audits | $200/mo | Validates audit engine value |
| **Zero-savings rate** | % of audits with $0 savings | < 30% | Too high = engine too conservative |
| **AI summary generation rate** | % of audits with Claude-generated (not template) summary | > 80% | Template fallback should be rare |
| **Scroll depth on results** | How far users scroll on /audit/[id] | 75%+ | Ensures all content is seen |

---

## Growth Metrics

### Acquisition Metrics

| Metric | Definition | Target (Month 1) | Target (Month 3) |
|--------|-----------|-------------------|-------------------|
| **Unique visitors** | Unique visitors to stackaudit.com | 5,000 | 15,000 |
| **Traffic sources breakdown** | % from organic, social, direct, referral, paid | — | 40% organic by M3 |
| **Referral rate** | % of visitors arriving via shared /audit/[id] links | 5% | 15% |
| **Social shares** | Total share button clicks (Twitter, LinkedIn, Copy URL) | 200 | 1,000 |
| **OG image impressions** | Social media preview views (estimated) | — | Track via URL embeds |

### Viral Coefficient

| Component | Value | Notes |
|-----------|-------|-------|
| Users who complete an audit | 100 | Base |
| % who share results | 10% | 10 shares |
| Clicks per share (avg) | 3 | 30 new visitors |
| % of new visitors who complete audit | 50% | 15 new audits |
| **Viral coefficient (k)** | **0.15** | Below 1 = not viral, but still significant growth amplifier |

### Channel Performance

| Channel | Metric | Target |
|---------|--------|--------|
| Product Hunt | Day-1 visitors | 1,000 |
| Hacker News | Front-page visitors | 3,000 |
| Twitter/X | Click-through rate | 2% |
| LinkedIn | Engagement rate | 3% |
| Direct/Type-in | Monthly visitors | 500 (brand awareness indicator) |

---

## Business Metrics

### Lead Metrics

| Metric | Definition | Target | Measurement |
|--------|-----------|--------|-------------|
| **Total leads/month** | Emails captured via lead form | 500 | Supabase leads count |
| **Qualified leads/month** | Leads with savings > $500/mo + business email | 50 | Supabase query |
| **Lead-to-consultation rate** | % of qualified leads who book Credex call | 20% | CRM tracking |
| **Cost per lead (CPL)** | Total monthly cost ÷ leads | < $0.05 | Cost model calculation |
| **Cost per qualified lead (CPQL)** | Total monthly cost ÷ qualified leads | < $0.50 | Cost model calculation |

### Revenue Attribution

| Metric | Definition | Target | Measurement |
|--------|-----------|--------|-------------|
| **Credex deals from StackAudit** | Closed deals attributable to StackAudit leads | 3/month | CRM source tracking |
| **Revenue from StackAudit leads** | Total revenue from StackAudit-sourced deals | $10K/month | CRM |
| **Average deal size** | Mean revenue per StackAudit-sourced deal | $3,000 | CRM |
| **StackAudit ROI** | Revenue ÷ StackAudit operating cost | > 500x | Monthly calculation |

### Lead Quality Signals

| Signal | Weight | Why |
|--------|--------|-----|
| Savings > $1,000/mo | High | Large optimization opportunity |
| Business email domain | High | B2B intent |
| Team size > 10 | Medium | Scale opportunity |
| Multiple tools (3+) | Medium | Complex stack = consulting value |
| API spend included | Medium | Volume credits opportunity |
| Company name provided | Low | Extra intent signal |

---

## Technical Metrics

### Performance

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **Audit API response time (P50)** | < 1.5s | > 3s |
| **Audit API response time (P95)** | < 3s | > 5s |
| **Landing page LCP** | < 2.5s | > 4s |
| **Results page FCP** | < 1.5s | > 3s |
| **Lighthouse Performance** | > 85 | < 70 |

### Reliability

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **API error rate (5xx)** | < 0.1% | > 1% |
| **Supabase write success rate** | > 99% | < 95% |
| **AI summary success rate** (Claude, not template) | > 80% | < 60% |
| **Resend delivery rate** | > 95% | < 80% |
| **Uptime** | 99.9% | < 99% |

### Abuse Protection

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **Rate-limited requests/day** | < 50 | > 500 (attack) |
| **Honeypot catches/day** | < 20 | > 200 (bot wave) |
| **Fake/disposable email rate** | < 10% | > 30% |

---

## Dashboards & Tracking

### Recommended Analytics Stack

| Tool | Purpose | Cost |
|------|---------|------|
| **Plausible** or **PostHog** | Page analytics, funnel tracking, events | Free tier / $0–$25/mo |
| **Supabase Dashboard** | Audit counts, lead counts, DB metrics | Free (included) |
| **Vercel Analytics** | Web Vitals, serverless function metrics | Free tier |
| **Custom Supabase Queries** | Business metrics (qualified leads, savings distribution) | Free |

### Key Events to Track

| Event | Trigger | Properties |
|-------|---------|------------|
| `page_view` | Page load | `path`, `referrer` |
| `tool_added` | User adds a tool to form | `tool_name` |
| `tool_removed` | User removes a tool from form | `tool_name` |
| `audit_submitted` | Form submitted successfully | `tool_count`, `team_size`, `use_case` |
| `audit_completed` | Results page viewed | `audit_id`, `total_savings`, `tools_count` |
| `lead_captured` | Email submitted | `audit_id`, `savings_tier` |
| `share_clicked` | Share button clicked | `audit_id`, `platform` (twitter/linkedin/copy) |
| `credex_cta_clicked` | Credex CTA clicked | `audit_id`, `savings_amount` |

---

## Reporting Cadence

### Daily (Automated)

| Metric | Check |
|--------|-------|
| Audits completed | Count |
| Leads captured | Count |
| API error rate | < 1% |
| Rate-limited requests | Anomaly detection |

### Weekly (Manual Review)

| Metric | Check |
|--------|-------|
| Funnel conversion rates | Trending up/down |
| Traffic source breakdown | Channel performance |
| Avg savings per audit | Engine calibration |
| AI summary success rate | Claude API health |

### Monthly (Business Review)

| Metric | Check |
|--------|-------|
| Qualified leads | vs. target |
| Credex deals sourced | vs. target |
| CPL / CPQL | vs. industry benchmarks |
| Feature requests | Prioritize roadmap |
| Pricing data accuracy | Monthly verification pass |

---

## Anti-Metrics

Things we intentionally do **NOT** optimize for:

| Anti-Metric | Why We Ignore It |
|-------------|-----------------|
| **Total page views** | Vanity — doesn't predict leads |
| **Time on site** | Longer isn't better; fast audits = good UX |
| **Bounce rate** | Single-page app with form; "bounce" is meaningless |
| **Email open rate** | Depends on Resend deliverability, not our product |
| **Social media followers** | Brand metric, not product metric |
| **Number of tools in DB** | More tools ≠ more value; depth > breadth |

---

*Last updated: May 2026*
