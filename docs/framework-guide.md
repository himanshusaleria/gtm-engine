# Framework Guide

The GTM Engine includes battle-tested sales frameworks that help you run structured, repeatable sales — even if you've never sold before.

## How Frameworks Work in the Engine

Frameworks aren't just reference docs — they're actively used by skills:

| Skill | Frameworks Used |
|-------|----------------|
| `/analyse-call` | All 11 frameworks applied to call transcripts |
| `/validate-lead` | Customer Profile (ICP) for scoring |
| `/cold-email` | Messaging Structure for email writing |
| `/good-morning` | Pipeline Scorecard for deal status |
| `/setup --icp` | Customer Profile for ICP workshop |

## Available Frameworks

### Foundation (defining your market and prospects)

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

### Engagement (running conversations and outreach)

#### 5. Messaging Structure
**File:** `frameworks/messaging-structure.md`

Issue → Impact → Current Resolution → Outcome. Structure every outreach message for maximum impact.

**Use when:** Writing cold emails, crafting LinkedIn messages, preparing pitch narratives.

#### 6. Pain Discovery (SPIN Selling)
**File:** `frameworks/pain-discovery.md`
**Based on:** Neil Rackham's *SPIN Selling*

Four question types — Situation, Problem, Implication, Need-payoff — that progress a conversation from understanding to urgency. Heavy emphasis on Implication questions, the type most founders skip.

**Use when:** Running discovery calls, preparing question banks, reviewing call transcripts for question quality.

#### 7. Positioning Levels (Vitamin vs Painkiller)
**File:** `frameworks/positioning-levels.md`

Three tiers of how prospects perceive your product: Vitamin (nice-to-have) → Painkiller (must-have) → Life Support (can't live without). How to diagnose your level and reposition through better discovery.

**Use when:** After every prospect interaction — are you selling a vitamin or a painkiller? During call analysis to spot feature-dumping moments.

### Assessment (evaluating deals and pipeline)

#### 8. Pipeline Scorecard
**File:** `frameworks/pipeline-scorecard.md`

Objective scoring system for where each prospect stands. Separates words from actions.

**Use when:** Pipeline reviews, deciding where to invest time, forecasting.

#### 9. Prospect Qualification (BANT)
**File:** `frameworks/prospect-qualification.md`
**Based on:** IBM's BANT methodology (widely public)

Score prospects on Budget, Authority, Need, and Timeline — each rated 1-3. Total score determines Hot (10-12), Warm (7-9), or Cool (4-6) classification.

**Use when:** After discovery calls to decide if a deal is worth pursuing. During pipeline reviews to prioritize.

#### 10. Selling Window
**File:** `frameworks/selling-window.md`

Five stages of organizational pain awareness: Unaware → Annoyed → Hurting → Desperate → Solved. The sweet spot is "Hurting" — they feel it, they're looking, they haven't committed to a competitor yet.

**Use when:** Before engaging any prospect — is the org ready? Helps you time outreach for maximum impact and avoid wasting time on Unaware or Solved orgs.

### Operations (running the full deal cycle)

#### 11. Sales Playbook
**File:** `frameworks/sales-playbook.md`

Seven-stage deal checklist: Research → Outreach → Discovery → Demo → Proof → Close → Handoff. Each stage has objectives, key activities, exit criteria, and common mistakes.

**Use when:** Managing every deal end-to-end. Diagnosing where deals stall. Ensuring no stage gets skipped.

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

**Week 4:** Pain Discovery + Positioning Levels
- Prepare SPIN questions for your next 3 discovery calls
- Review past calls: were you selling vitamins or painkillers?

**Week 5:** Prospect Qualification + Selling Window
- Score your current pipeline with BANT
- Assess each prospect's org pain stage
- Drop or nurture anything that's Unaware/Annoyed with a Cool BANT score

**Week 6:** Sales Playbook
- Map every active deal to the 7-stage checklist
- Identify which exit criteria are unmet for each deal
- Build your own question bank, demo flow, and POC template

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

Pain Discovery ──→ Positioning Levels (SPIN elevates vitamin → painkiller)
        │
        └──→ Prospect Qualification (SPIN answers feed BANT scores)

Selling Window ──→ Sales Playbook (Stage 1 Research includes window assessment)
        │
        └──→ Intent Signals (signals reveal which window stage)

Messaging Structure ──→ /cold-email (email structure)
        │
        └──→ Pipeline Scorecard (are they responding to your messaging?)

Sales Playbook ──→ All frameworks (each stage uses specific frameworks)
```
