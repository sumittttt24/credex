# ECONOMICS.md — Unit Economics Analysis

> Cost structure, revenue model, and financial viability of StackAudit as a Credex lead-gen tool.

---

## Table of Contents

- [Cost Structure](#cost-structure)
- [Revenue Model](#revenue-model)
- [Unit Economics per Audit](#unit-economics-per-audit)
- [Scaling Economics](#scaling-economics)
- [Break-Even Analysis](#break-even-analysis)
- [Comparison: Build vs. Buy](#comparison-build-vs-buy)

---

## Cost Structure

### Fixed Costs (Monthly)

| Item | Cost | Notes |
|------|------|-------|
| **Vercel Hosting** (Hobby) | $0 | Free tier: 100 GB bandwidth, serverless functions, edge functions |
| **Supabase** (Free tier) | $0 | 500 MB database, 50K monthly active users, 2 GB bandwidth |
| **Domain** (stackaudit.com) | ~$1/mo | $12/yr amortized |
| **Total Fixed** | **~$1/mo** | |

### Variable Costs (Per Unit)

| Item | Cost Per Unit | Volume Trigger | Notes |
|------|-------------|---------------|-------|
| **Anthropic API** (Claude Haiku 4.5) | ~$0.001/audit | Every audit | ~400 input + 150 output tokens |
| **Resend** (transactional email) | $0/email | First 3,000/mo free | $0.40/1K emails after free tier |
| **Vercel** (serverless invocations) | $0/invocation | First 100K/mo free | $0.60/1M after free tier |
| **Supabase** (storage) | $0/row | First 500 MB free | ~0.5 KB per audit record |

### Cost at Scale

| Monthly Audits | Anthropic | Resend | Vercel | Supabase | Total |
|---------------|-----------|--------|--------|----------|-------|
| 100 | $0.10 | $0 | $0 | $0 | **$0.10** |
| 1,000 | $1.00 | $0 | $0 | $0 | **$1.00** |
| 5,000 | $5.00 | $0.80 | $0 | $0 | **$5.80** |
| 10,000 | $10.00 | $2.80 | $0 | $0 | **$12.80** |
| 50,000 | $50.00 | $18.80 | $0 | $25 | **$93.80** |

> **Key Insight**: StackAudit costs essentially nothing to run at MVP scale. Even at 10K audits/month, total infrastructure cost is under $15.

---

## Revenue Model

StackAudit is **not a standalone revenue product** — it's a **lead generation funnel** for Credex's consulting and AI spend management services.

### Revenue Sources (Indirect)

| Source | Description | Estimated Value |
|--------|-----------|----------------|
| **Credex Consulting** | High-savings leads ($500+/mo) booked for AI spend optimization | $2,000–$10,000/engagement |
| **Credex Volume Credits** | API spend optimization through Credex credit platform | 10–20% margin on managed spend |
| **Credex Managed Services** | Ongoing AI vendor management for enterprise teams | $500–$2,000/mo recurring |

### Lead Quality Tiers

| Tier | Criteria | Expected % of Leads | Credex Value |
|------|----------|--------------------| -------------|
| **Hot** | Savings > $1,000/mo + Enterprise email + Team > 20 | 5% | $5,000–$10,000 |
| **Warm** | Savings > $500/mo + Business email | 15% | $2,000–$5,000 |
| **Cool** | Savings > $100/mo | 30% | $500–$2,000 |
| **Nurture** | Savings < $100/mo or personal email | 50% | $0 (brand awareness) |

---

## Unit Economics per Audit

### Cost Side

| Component | Cost | Calculation |
|-----------|------|-------------|
| Infrastructure per audit | $0.001 | Anthropic API call |
| Amortized hosting | $0.0001 | $1/mo ÷ 10,000 audits |
| **Total cost per audit** | **$0.0011** | |

### Value Side

| Component | Value | Calculation |
|-----------|-------|-------------|
| Average lead value | $3.50 | Blended across all tiers |
| Lead capture rate | 20% | Of completed audits |
| **Value per audit** | **$0.70** | $3.50 × 20% |

### ROI

| Metric | Value |
|--------|-------|
| Cost per audit | $0.001 |
| Value per audit | $0.70 |
| **ROI per audit** | **700x** |
| Cost per lead | $0.005 |
| Value per lead | $3.50 |
| **ROI per lead** | **700x** |

> **Note**: These are conservative estimates. A single Credex enterprise engagement ($10K+) pays for years of StackAudit infrastructure.

---

## Scaling Economics

### When Free Tiers Run Out

| Service | Free Tier Limit | Paid Tier Starts | Monthly Cost at 50K Audits |
|---------|----------------|-----------------|---------------------------|
| **Vercel** | 100K invocations | $20/mo (Pro) | $20 |
| **Supabase** | 500 MB / 50K MAU | $25/mo (Pro) | $25 |
| **Resend** | 3K emails/mo | $20/mo (10K emails) | $20 |
| **Anthropic** | Pay-per-use | N/A | $50 |
| **Total at scale** | | | **$115/mo** |

### Cost Per Lead at Scale

| Audits/Month | Leads (20%) | Total Cost | Cost Per Lead |
|-------------|-------------|-----------|--------------|
| 1,000 | 200 | $1 | $0.005 |
| 5,000 | 1,000 | $6 | $0.006 |
| 10,000 | 2,000 | $13 | $0.007 |
| 50,000 | 10,000 | $115 | $0.012 |

> **Comparison**: Average B2B SaaS CPL (cost per lead) ranges from $30–$200. StackAudit's CPL is **under $0.02** at any scale.

---

## Break-Even Analysis

### Scenario: StackAudit as Standalone SaaS (hypothetical)

If StackAudit were monetized directly (e.g., premium audits at $9.99/report):

| Metric | Value |
|--------|-------|
| Monthly cost at 5K audits | $6 |
| Price per premium report | $9.99 |
| Reports needed to break even | 1 |
| Conversion rate needed | 0.02% |

But this misses the point — StackAudit's value is as a **$0 lead gen tool** that feeds high-value consulting engagements.

### Scenario: Credex ROI

| Metric | Value |
|--------|-------|
| Monthly StackAudit cost | $6 (at 5K audits) |
| Leads generated | 1,000 |
| Qualified leads (15%) | 150 |
| Credex consultations (20% of qualified) | 30 |
| Closed deals (25%) | 7–8 |
| Average deal value | $3,000 |
| **Monthly revenue from StackAudit leads** | **$21,000–$24,000** |
| **ROI** | **3,500–4,000x** |

---

## Comparison: Build vs. Buy

### Alternative Lead Gen Options for Credex

| Approach | Setup Cost | Monthly Cost | CPL | Lead Quality | Time to Market |
|----------|-----------|-------------|-----|-------------|---------------|
| **StackAudit (built)** | ~40 hrs dev | $1–$15 | $0.005 | High (intent-qualified) | 4 days |
| Google Ads | $0 | $2,000+ | $25–$50 | Medium | 1 week |
| LinkedIn Ads | $0 | $3,000+ | $40–$80 | High | 1 week |
| Content marketing | 80+ hrs | $0 (time cost) | $5–$15 | Medium | 3–6 months |
| Cold outreach | 10 hrs setup | $500 (tools) | $15–$30 | Low–Medium | 2 weeks |
| Webinars | 20 hrs prep | $200 | $20–$40 | High | 3–4 weeks |

### Verdict

StackAudit is the **highest-ROI lead gen channel available** because:

1. **Near-zero marginal cost** — every free tier covers MVP traffic
2. **Self-qualifying leads** — users who run the audit demonstrate intent and reveal their spend
3. **Rich lead data** — we know exactly which tools they use, what they spend, and how much they could save
4. **Shareable virality** — OG images and shareable URLs drive organic acquisition
5. **Evergreen** — works 24/7, no ongoing campaign management

---

## Key Assumptions & Risks

| Assumption | Risk | Mitigation |
|-----------|------|------------|
| 20% lead capture rate | May be lower without incentive | A/B test CTA copy and positioning |
| 15% qualified lead rate | Depends on traffic source quality | Focus on channels that attract engineering managers |
| 25% close rate on consultations | Depends on Credex sales process | Not controlled by StackAudit |
| Pricing data stays current | Tools change pricing frequently | Monthly price verification process (documented in PRICING_DATA.md) |
| AI summary adds value | May not influence conversion | Template fallback ensures feature never fails |

---

*Last updated: May 2026*
