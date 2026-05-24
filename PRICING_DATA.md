# StackAudit — Pricing Data Reference

> Canonical pricing reference for all AI tools supported by the StackAudit audit engine.
> This document is mirrored in code at `src/lib/pricing-data.ts`. When updating prices, **update both files**.

**Last verified: May 2026**

---

## Table of Contents

- [AI Code Editors](#ai-code-editors)
  - [Cursor](#cursor)
  - [GitHub Copilot](#github-copilot)
  - [Windsurf](#windsurf)
- [AI Assistants (Consumer)](#ai-assistants-consumer)
  - [Claude](#claude)
  - [ChatGPT](#chatgpt)
  - [Gemini](#gemini)
- [AI APIs (Usage-Based)](#ai-apis-usage-based)
  - [Anthropic API](#anthropic-api)
  - [OpenAI API](#openai-api)
  - [Google Gemini API](#google-gemini-api)

---

## AI Code Editors

### Cursor

> **Source**: [https://cursor.com/pricing](https://cursor.com/pricing)

| Plan | Monthly Price / Seat | Key Features |
|------|---------------------|--------------|
| **Hobby** | Free | Limited agent requests, tab completions, basic models |
| **Pro** | $20/user/mo | Unlimited tab completions, extended agent mode, all frontier models (Claude, GPT-4, Gemini) |
| **Pro+** | $60/user/mo | 3× Pro agent credits, priority model access |
| **Ultra** | $200/user/mo | 20× Pro agent credits, priority access, highest usage limits |
| **Teams** | $40/user/mo | Everything in Pro + centralized billing, SSO, RBAC, admin dashboard |
| **Enterprise** | Custom | Pooled usage across org, invoice billing, SCIM provisioning, priority support, SLA |

**Notes:**
- Pro is the most common plan for individual developers
- Teams plan is effectively Pro + admin features at a $20/seat premium
- Ultra is typically only justified for power users running 50+ agent sessions/day

---

### GitHub Copilot

> **Source**: [https://github.com/features/copilot](https://github.com/features/copilot)

| Plan | Monthly Price / Seat | Key Features |
|------|---------------------|--------------|
| **Free** | $0 | Limited completions, limited chat, basic models only |
| **Pro** | $10/user/mo | $10 in AI credits included, full chat access, all models, MCP support |
| **Pro+** | $39/user/mo | $39 in AI credits, higher usage limits, advanced agent mode |
| **Business** | $19/user/mo | $19 in AI credits, pooled usage, admin controls, IP indemnity, policy management |
| **Enterprise** | $39/user/mo | $39 in AI credits, requires GitHub Enterprise Cloud (~$21/user/mo extra), SAML SSO, audit logs, SCIM |

**Notes:**
- Enterprise total cost is ~$60/user/mo when including GitHub Enterprise Cloud subscription
- Business plan is the sweet spot for teams that don't need full Enterprise Cloud
- AI credits system means actual cost depends on model usage; credits cover completions, chat, and agent mode

---

### Windsurf

> **Source**: [https://windsurf.com/pricing](https://windsurf.com/pricing)

| Plan | Monthly Price / Seat | Key Features |
|------|---------------------|--------------|
| **Free** | $0 | Light agent quota, basic models, limited completions |
| **Pro** | $20/user/mo | Increased agent quotas, frontier model access, unlimited completions |
| **Max** | $200/user/mo | Significantly higher agent quotas, priority access |
| **Teams** | $40/user/mo | Everything in Pro + admin panel, team management, centralized billing |
| **Enterprise** | Custom | RBAC, SSO/SCIM, dedicated support, custom SLA, data residency options |

**Notes:**
- Pricing structure mirrors Cursor almost exactly (Pro at $20, Teams at $40)
- Max tier is comparable to Cursor Ultra in positioning and price
- Teams plan adds organizational features on top of Pro-level usage

---

## AI Assistants (Consumer)

### Claude

> **Source**: [https://claude.ai/pricing](https://claude.ai/pricing) · [https://www.anthropic.com/pricing](https://www.anthropic.com/pricing)

| Plan | Monthly Price / Seat | Key Features |
|------|---------------------|--------------|
| **Free** | $0 | Sonnet & Haiku models, daily usage limits, basic features |
| **Pro** | $20/mo | All models including Opus, Claude Code, Projects, extended context |
| **Max 5×** | $100/mo | 5× Pro usage limits, all Pro features |
| **Max 20×** | $200/mo | 20× Pro usage limits, highest individual tier |
| **Team Standard** | $25/seat/mo | Collaboration features, admin controls, minimum 5 members |
| **Team Premium** | $125/seat/mo | Full Claude Code for teams, highest team-level usage |
| **Enterprise** | Custom | SSO/SAML, audit logs, annual contract, dedicated support, data retention controls |

**Notes:**
- Pro is the standard recommendation for individual developers
- Team Standard is often underutilized — only justified if collaboration features (shared Projects, admin panel) are actively used
- Max tiers are for heavy daily users; most developers don't exhaust Pro limits

---

### ChatGPT

> **Source**: [https://openai.com/chatgpt/pricing](https://openai.com/chatgpt/pricing)

| Plan | Monthly Price / Seat | Key Features |
|------|---------------------|--------------|
| **Free** | $0 | Basic model access, limited usage, no advanced features |
| **Plus** | $20/mo | Full model access (GPT-4o, o3), Deep Research, Agent Mode, image generation |
| **Pro 5×** | $100/mo | 5× Plus usage limits, all Plus features |
| **Pro 20×** | $200/mo | 20× Plus usage limits, 1M token context window, highest individual tier |
| **Business** | $25/user/mo | Minimum 2 seats, SAML SSO, shared workspaces, admin console |
| **Enterprise** | Custom (~$40–60/seat) | Minimum 150 seats, SCIM provisioning, RBAC, data residency, dedicated CSM |

**Notes:**
- Enterprise pricing is not publicly listed; $40–60/seat is based on industry estimates for 150+ seat contracts
- Plus vs Pro distinction: most developers are well-served by Plus unless they hit daily limits regularly
- Business plan is the entry point for team management features

---

### Gemini

> **Source**: [https://gemini.google.com](https://gemini.google.com) · [https://one.google.com/about/ai-premium](https://one.google.com/about/ai-premium)

| Plan | Monthly Price / Seat | Key Features |
|------|---------------------|--------------|
| **AI Plus** | $7.99/mo | 200 GB Google One storage, daily Gemini usage limits, basic models |
| **AI Pro** | $19.99/mo | 2 TB storage, Deep Research, NotebookLM Plus, extended limits |
| **AI Ultra ($100)** | $100/mo | 20 TB storage, 5× Pro usage limits, all models |
| **AI Ultra ($200)** | $200/mo | 20 TB storage, 20× Pro limits, Deep Think, highest individual tier |

**Notes:**
- Gemini pricing is bundled with Google One storage, making direct comparison complex
- AI Plus at $7.99/mo is the cheapest paid AI assistant option
- AI Pro at $19.99/mo is competitive with Claude Pro and ChatGPT Plus at $20/mo
- Ultra tiers mirror the industry-standard 5×/20× multiplier pattern

---

## AI APIs (Usage-Based)

### Anthropic API

> **Source**: [https://www.anthropic.com/pricing](https://www.anthropic.com/pricing)

| Model | Input / 1M Tokens | Output / 1M Tokens |
|-------|-------------------|---------------------|
| **Claude Opus 4.7** | $5.00 | $25.00 |
| **Claude Sonnet 4.6** | $3.00 | $15.00 |
| **Claude Haiku 4.5** | $1.00 | $5.00 |

**Discounts:**
- **Batch API**: 50% discount on all models (async processing, results within 24 hours)
- **Prompt Caching**: Up to 90% savings on repeated input prefixes (system prompts, few-shot examples)
- **Extended Thinking**: Thinking tokens billed at standard output rates

**Notes:**
- Haiku is the cost-optimized model for high-volume, low-complexity tasks
- Prompt Caching is particularly effective for applications with long, repeated system prompts
- StackAudit uses Haiku for summary generation to minimize per-audit cost

---

### OpenAI API

> **Source**: [https://openai.com/api/pricing](https://openai.com/api/pricing)

| Model | Input / 1M Tokens | Output / 1M Tokens |
|-------|-------------------|---------------------|
| **GPT-4o** | $2.50 | $10.00 |
| **GPT-4.1** | $2.00 | $8.00 |
| **GPT-4.1 Mini** | $0.40 | $1.60 |
| **GPT-4.1 Nano** | $0.10 | $0.40 |
| **o3** | $2.00 | $8.00 |
| **o4-mini** | $0.55 | $2.20 |

**Discounts:**
- **Cached Inputs**: 50% off input token costs for repeated prefixes
- **Batch API**: 50% discount on all models (async, results within 24 hours)

**Notes:**
- GPT-4.1 is the latest flagship, replacing GPT-4o for most use cases
- GPT-4.1 Nano at $0.10/1M input is the cheapest frontier-adjacent model available
- o3 and o4-mini are reasoning models with extended thinking capabilities

---

### Google Gemini API

> **Source**: [https://ai.google.dev/pricing](https://ai.google.dev/pricing)

| Model | Input / 1M Tokens | Output / 1M Tokens |
|-------|-------------------|---------------------|
| **Gemini 3.1 Pro** | $2.00 | $12.00 |
| **Gemini 3 Flash** | $0.50 | $3.00 |
| **Gemini 3.1 Flash-Lite** | $0.25 | $1.50 |

**Notes:**
- Gemini 3 Flash is the cost-performance sweet spot for most applications
- Flash-Lite at $0.25/1M input is competitive with GPT-4.1 Nano for budget workloads
- All models include a generous free tier for low-volume usage (check Google AI Studio for current limits)

---

## Pricing Update Procedures

When AI tool pricing changes (which happens frequently), follow this process:

1. **Verify the change** against the official pricing page (URLs listed above for each tool)
2. **Update this document** (`PRICING_DATA.md`) with the new prices
3. **Update the code** in `src/lib/pricing-data.ts` to match
4. **Update the "Last verified" date** at the top of both files
5. **Test the audit engine** to ensure recommendations still make sense with new pricing

> [!IMPORTANT]
> The audit engine in `src/lib/pricing-data.ts` is the **runtime source of truth**. This markdown file is the **human-readable reference**. They must always be in sync.

---

*Last verified: May 2026*
