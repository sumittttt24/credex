# LANDING_COPY.md — Landing Page Copy Decisions

> Copy strategy, messaging hierarchy, and rationale for every text element on the StackAudit landing page.

---

## Table of Contents

- [Copy Philosophy](#copy-philosophy)
- [Messaging Hierarchy](#messaging-hierarchy)
- [Section-by-Section Breakdown](#section-by-section-breakdown)
- [Microcopy Decisions](#microcopy-decisions)
- [CTA Strategy](#cta-strategy)
- [Tone & Voice Guidelines](#tone--voice-guidelines)
- [A/B Testing Roadmap](#ab-testing-roadmap)
- [Rejected Alternatives](#rejected-alternatives)

---

## Copy Philosophy

### Core Principles

1. **Specificity over claims** — "8 tools, 30+ plans" beats "comprehensive coverage"
2. **Value before ask** — Show the audit results before asking for an email
3. **Honest over hype** — If savings are $0, celebrate that instead of inventing waste
4. **Numbers over adjectives** — "$240/year" beats "significant savings"
5. **Action-oriented** — Every section drives toward the form

### Target Reading Level

- **Flesch-Kincaid Grade**: 8–10 (accessible to a broad professional audience)
- **Avg. sentence length**: 12–18 words
- **Jargon**: Tool names are used freely (audience knows them), but plan names are explained

---

## Messaging Hierarchy

The landing page follows a deliberate information architecture:

```
1. Badge        → Eliminate friction fear (free, no login, instant)
2. Headline     → State the problem as a question
3. Subheadline  → Describe the solution in one sentence
4. Trust bar    → Credibility signals (tool count, data freshness, shareability)
5. Form         → The product IS the landing page (value before capture)
6. How It Works → Reassure on process for scrollers
7. Tools Grid   → Social proof via recognized brand names
8. Footer       → Minimal, brand attribution
```

---

## Section-by-Section Breakdown

### 1. Badge

**Copy**: `Free · No login required · Instant results`

**Rationale**: The three biggest conversion barriers for SaaS tools are cost, signup friction, and delayed gratification. The badge addresses all three in 6 words. The green pulse dot signals "live" — the tool is active and working right now.

**Alternatives considered**:
- "Try it free" — implies there's a paid version
- "No credit card needed" — implies payment is expected eventually
- "Get started" — too generic, doesn't address fear

### 2. Headline

**Copy**: `Are you overspending on AI tools?`

**Rationale**: This is a **question headline** — one of the highest-performing headline formats because it:
- Creates curiosity (the reader doesn't know the answer)
- Implies a problem the reader might have
- Doesn't claim they ARE overspending (which could feel accusatory)
- The gradient on "AI tools" draws the eye to the subject

**Why a question, not a statement**:
- Statement: "You're overspending on AI tools" → Feels presumptuous
- Command: "Stop overspending on AI tools" → Assumes they know they are
- Question: "Are you overspending on AI tools?" → Invites them to find out

### 3. Subheadline

**Copy**: `Input your AI subscriptions. Get an instant audit showing where to downgrade, switch, or optimize — with exact savings calculated.`

**Rationale**: Three key elements:
1. **What to do**: "Input your AI subscriptions" (low effort, clear action)
2. **What you get**: "instant audit" (speed) + "downgrade, switch, or optimize" (three specific action types)
3. **Why it's valuable**: "exact savings calculated" (specific, not vague)

The em-dash creates a pause before the strongest value prop (exact savings), giving it emphasis.

### 4. Trust Indicators

**Copy**:
- `✦ Covers 8 major AI tools`
- `✦ Current pricing data`
- `✦ Shareable results`

**Rationale**: Each indicator addresses a specific concern:
- "8 major tools" → "Does it cover MY tools?" → Yes
- "Current pricing data" → "Is this outdated?" → No
- "Shareable results" → "Can I show my team?" → Yes

The violet star (✦) adds visual consistency with the brand without using heavy icons.

### 5. Form Section

The form itself IS the product — it appears on the landing page, not behind a signup wall.

**Design decisions**:
- "Add Tool" button is prominent and inviting
- Each tool row shows the tool name with color coding
- Plan and seat dropdowns pre-populated from pricing data
- Total spend updates in real-time
- "Run My Audit" CTA uses "My" for ownership ("your audit" is less personal)

**CTA Button Copy**: `Run My Audit →`

**Why "Run My Audit"**:
- "My" creates ownership — the user feels this is personalized to them
- "Run" implies speed and automation (vs. "Get" which implies waiting)
- "Audit" is specific (vs. "Report" or "Analysis" which are generic)
- The arrow (→) creates forward momentum

### 6. How It Works

**3-Step Process**:

| Step | Title | Description | Emoji |
|------|-------|-------------|-------|
| 01 | Add your tools | Tell us what AI tools you pay for, which plan, and how many seats. | 📝 |
| 02 | Get your audit | Our engine analyzes each tool for right-sizing, downgrades, and alternatives. | 🔍 |
| 03 | Save money | See exact monthly and annual savings. Share the results with your team. | 💰 |

**Rationale**: The 3-step pattern is universally understood. Step count matters:
- 1 step = "Too simple, is this legit?"
- 3 steps = "Simple enough, I trust the process"
- 5+ steps = "Too much work"

Each step has a concrete noun ("tools", "audit", "money") to keep it tangible.

### 7. Tools We Audit

**Copy**: `Tools We Audit` / `Pricing data verified and sourced from official pages`

**Tool List**: Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic API, OpenAI API, Gemini, Windsurf

**Rationale**: Showing recognizable brand names provides instant credibility. The subtext "verified and sourced" reassures that the data is reliable. Each tool is displayed as a hover-interactive chip, making the grid feel alive and explorable.

### 8. Footer

**Copy**: Minimal — Credex attribution + copyright

**Rationale**: The footer should not distract from the CTA. It exists for brand attribution only.

---

## Microcopy Decisions

### Form Labels & Helpers

| Element | Copy | Rationale |
|---------|------|-----------|
| Team size label | "Team Size" | Short, clear |
| Team size placeholder | "Number of people" | Helps understand the input |
| Use case label | "Primary Use Case" | "Primary" signals they don't need to pick all |
| Tool selector title | "Select AI Tool" | Direct, no ambiguity |
| Spend input label | "Monthly Spend ($)" | Including unit prevents confusion |
| Seats label | "Seats" | Industry-standard term |

### Results Page Microcopy

| Element | Copy | Rationale |
|---------|------|-----------|
| Savings hero | "You could save $X/month" | "Could" is honest — not a guarantee |
| Annual callout | "That's $X per year" | Anchoring effect — annual sounds bigger |
| Keep badge | "Well optimized ✓" | Positive reinforcement, not "no change" |
| Downgrade badge | "Right-size ↓" | "Right-size" is less negative than "downgrade" |
| Switch badge | "Better alternative →" | "Better" implies improvement, not loss |
| Optimize badge | "Optimize ⚡" | Energy emoji suggests efficiency |

### Lead Capture Microcopy

| Element | Copy | Rationale |
|---------|------|-----------|
| High savings CTA | "Get your full report + save $X/year with Credex" | Specific savings + Credex mention |
| Low savings CTA | "Get notified when prices change" | Value proposition for low-savings users |
| Email placeholder | "work@company.com" | Hints at business email preference |
| Submit button | "Send My Report" | "My" maintains ownership |
| Privacy note | "No spam. One email with your results." | Explicit anti-spam promise |

---

## CTA Strategy

### Primary CTA: "Run My Audit →"

| Attribute | Value |
|-----------|-------|
| Placement | Below form, above fold on desktop |
| Color | Violet-to-fuchsia gradient (brand colors) |
| Size | Full-width on mobile, prominent on desktop |
| State changes | Idle → Loading ("Analyzing...") → Redirect |

### Secondary CTA: Lead Capture (results page)

The lead capture CTA **adapts based on savings**:

| Savings Level | CTA Headline | CTA Description | Urgency |
|-------------|-------------|-----------------|---------|
| > $500/mo | "Your team could save $X/year" | "Get a personalized optimization plan from Credex" | High — prominent card |
| $100–$500/mo | "Save $X/year on AI tools" | "We'll email you the full report" | Medium — visible but not aggressive |
| < $100/mo | "Your stack is well-optimized!" | "Get notified when pricing changes" | Low — celebratory tone |
| $0 | "Congratulations! 🎉" | "You're running a tight AI stack" | None — pure celebration |

---

## Tone & Voice Guidelines

### Brand Voice: "Smart Colleague"

| Attribute | Do | Don't |
|-----------|-----|-------|
| **Tone** | Direct, specific, warm | Corporate, vague, salesy |
| **Register** | Professional-casual | Formal or overly casual |
| **Numbers** | "$47/mo" | "significant savings" |
| **Claims** | "Could save" | "Will save" / "Guaranteed" |
| **Self-reference** | "Our engine analyzes" | "Our revolutionary AI-powered platform" |
| **User address** | "Your tools", "your team" | "Users", "customers" |

### Examples

| ❌ Bad | ✅ Good |
|--------|---------|
| "Unlock the power of AI spend optimization" | "See if you're overspending on AI tools" |
| "Our proprietary algorithm" | "Our audit engine" |
| "Trusted by thousands of teams" | "Covers 8 major AI tools" |
| "Sign up to get started" | "Free · No login required" |
| "Your comprehensive report is ready" | "Here's your audit" |

---

## A/B Testing Roadmap

### Tests to Run Post-Launch

| Priority | Element | Variant A (Current) | Variant B | Hypothesis |
|---------|---------|---------------------|-----------|------------|
| 1 | Headline | "Are you overspending on AI tools?" | "How much are you wasting on AI tools?" | More direct language may increase urgency |
| 2 | CTA button | "Run My Audit →" | "See My Savings →" | Savings-focused CTA may convert higher |
| 3 | Badge | "Free · No login · Instant" | "Join 2,000+ teams who saved $X" | Social proof vs. friction reduction |
| 4 | Credex CTA threshold | $500/mo | $300/mo | Lower threshold may capture more qualified leads |
| 5 | Results page email timing | After full results shown | After 10-second delay | Delayed ask may feel less transactional |

---

## Rejected Alternatives

### Headlines That Were Considered and Rejected

| Rejected Headline | Reason |
|-------------------|--------|
| "Audit Your AI Stack" | Too vague — what does an "audit" give me? |
| "Save Money on AI Tools" | Assumes they know they're overspending |
| "The AI Tool Cost Calculator" | "Calculator" undersells the analysis depth |
| "Stop Wasting Money on AI Subscriptions" | Aggressive — implies they're being stupid |
| "StackAudit: AI Spend Optimization" | Jargon-heavy, sounds like enterprise software |
| "How much should your AI tools really cost?" | Good but too long for a H1 |

### CTAs That Were Considered and Rejected

| Rejected CTA | Reason |
|--------------|--------|
| "Get Started" | Generic, no specificity |
| "Analyze My Stack" | "Analyze" feels slow |
| "Free Audit" | Sounds like an ad |
| "Calculate Savings" | Calculator framing undersells the AI summary |
| "Submit" | The worst CTA word in existence |

---

*Last updated: May 2026*
