# Framework Guide

The GTM Engine includes battle-tested sales frameworks that help you run structured, repeatable sales — even if you've never sold before.

## How Frameworks Work in the Engine

Frameworks aren't just reference docs — they're actively used by skills:

| Skill | Frameworks Used |
|-------|----------------|
| `/analyse-call` | All available frameworks applied to call transcripts |
| `/validate-lead` | Customer Profile (ICP) for scoring |
| `/cold-email` | Messaging Structure for email writing |
| `/good-morning` | Pipeline Scorecard for deal status |
| `/setup --icp` | Customer Profile for ICP workshop |

## Available Frameworks

### Active (v1)

#### 1. Discovery Questions
**File:** `frameworks/discovery-questions.md`
**Based on:** Rob Fitzpatrick's *The Mom Test*

How to ask questions that get honest answers. Stop asking "Would you use...?" and start asking "How do you currently handle...?"

**Use when:** Preparing for discovery calls, reviewing call transcripts, training yourself to ask better questions.

#### 2. Market Segments
**File:** `frameworks/market-segments.md`
**Based on:** Chet Holmes' *The Ultimate Sales Machine*

The buyer's pyramid: only 3% of the market is buying right now. Learn to reach the other 97%.

**Use when:** Planning market strategy, deciding where to focus outreach, understanding why most prospects aren't "ready to buy."

#### 3. Customer Profile (ICP)
**File:** `frameworks/customer-profile.md`

Three-layer model for defining who to sell to: Market (IMP) → Account (ICP) → Person (IPP).

**Use when:** Qualifying leads, setting up `/validate-lead` scoring, defining your target market.

#### 4. Intent Signals
**File:** `frameworks/intent-signals.md`

Six types of signals that indicate a company might need your product. Scoring system for signal strength.

**Use when:** Building outreach lists, prioritizing leads, training your SDR on what to look for.

#### 5. Messaging Structure
**File:** `frameworks/messaging-structure.md`

Issue → Impact → Current Resolution → Outcome. Structure every outreach message for maximum impact.

**Use when:** Writing cold emails, crafting LinkedIn messages, preparing pitch narratives.

#### 6. Pipeline Scorecard
**File:** `frameworks/pipeline-scorecard.md`

Objective scoring system for where each prospect stands. Separates words from actions.

**Use when:** Pipeline reviews, deciding where to invest time, forecasting.

### Coming Soon (pending attribution approval)

These frameworks will be added in a future update:

- **Commitment Matrix** — Four-factor commitment scoring
- **Positioning Levels** — Value provider → problem solver → painkiller hierarchy
- **Deal Stages** — Six stages of deal maturity
- **Pain Validation** — Creating and validating prospect pain
- **Sales Process** — Seven-stage operational sales process

Run `/whats-new` after updating to see when they become available.

## How to Learn a Framework

Each framework document follows this structure:

1. **What Is It?** — The concept in plain language
2. **Why It Matters for 0-1 Sales** — Why you should care
3. **The Framework** — The actual model/matrix
4. **How to Apply It** — Step-by-step for your situation
5. **Workshop: Build Yours** — Interactive questions to fill in your context
6. **Example** — Generic B2B SaaS example
7. **Connection to Other Frameworks** — How frameworks relate
8. **Anti-Patterns** — Common mistakes to avoid

## Recommended Learning Path

**Week 1:** Customer Profile + Discovery Questions
- Define your ICP (`/setup --icp`)
- Practice Mom Test questions on your next 3 calls

**Week 2:** Intent Signals + Market Segments
- Build your signal playbook (`/setup --signals`)
- Map your market to the buyer's pyramid

**Week 3:** Messaging Structure + Pipeline Scorecard
- Write messages for each persona (`/setup --messaging`)
- Score your current pipeline

## Customizing Frameworks

Frameworks are in the `frameworks/` directory and tracked by git. To customize:

1. **Don't edit framework files directly** — they'll be overwritten on `git pull`
2. **Put your personalized versions in `my-context/`** — that's gitignored
3. **Use the workshop sections** — they generate personalized context files
4. **The ICP framework is special** — your `my-context/icp-definition.md` feeds into `/validate-lead` scoring

## Framework Interactions

```
Customer Profile ──→ /validate-lead (scoring criteria)
        │
        ├──→ Intent Signals (what signals to look for in ICP companies)
        │
        ├──→ Market Segments (which pyramid tier your ICP falls in)
        │
        └──→ Discovery Questions (what to ask ICP prospects)

Messaging Structure ──→ /cold-email (email structure)
        │
        └──→ Pipeline Scorecard (are they responding to your messaging?)
```
