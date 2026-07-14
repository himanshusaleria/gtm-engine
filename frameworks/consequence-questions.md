# Consequence Questions — Discovery That Quantifies Pain

A two-question discipline for discovery calls: first understand how the prospect operates, then help them put a number on what it costs. The buyer should leave the call having said the pain number out loud — because if you said it, it doesn't stick.

## What Is It?

Most discovery is information transfer: the prospect tells you things, you write them down. Consequence-based discovery is **realization transfer**: the prospect discovers, in their own words, what their current way of working actually costs them.

It uses two question types in a strict order:

| Question Type | Purpose | Example |
|---------------|---------|---------|
| **Operating Question** | Baseline. Get objective facts about HOW they work today — systems, volumes, cadences, people, workflows. | "Walk me through how your team handles a release today." |
| **Consequence Question** | Quantification. Take an operating answer and turn it into a cost the buyer feels — in time, effort, money, or quality. | "If that manual step slips a day, what happens to the release?" |

Operating Questions discover the pain. Consequence Questions quantify it and create urgency.

## Why It Matters for 0-1 Sales

Early-stage founders run discovery like an intake form: ten questions, lots of notes, then a pitch. The prospect says "interesting!" and disappears.

The problem: understanding a prospect's pain isn't enough — **the prospect has to feel the size of it themselves**. A prospect who has just said "that's costing us about two engineer-days per sprint" has done something no pitch can do: they've built their own business case.

Two failure modes this framework prevents:

- **Pitching too early.** The prospect describes a problem, you get excited and demo. Without quantification, their "interesting" is curiosity, not commitment.
- **Requirements masquerading as needs.** A prospect emails "we need X, send a proposal." That's a stated requirement, not a validated need. Requirements get quoted and ghosted; needs commit. Until you've asked "what made you explore this NOW?", you don't have a need.

## The Framework

### The two guardrails

What keeps this from becoming an interrogation script:

| Guardrail | Rule | If you fail it |
|-----------|------|----------------|
| **Pain-relevance (for Operating Questions)** | An Operating Question only counts if the answer deepens your understanding of their pain — i.e., it moves you toward Painkiller territory (see [Positioning Levels](positioning-levels.md)). | You're collecting trivia. The prospect feels surveyed. |
| **Quantifiability (for Consequence Questions)** | Every Consequence Question must be answerable with something measurable: hours, headcount, money, defect counts, missed deadlines. | You're asking abstract "what does this mean to you" questions and getting vague answers. |

If you can't tie a Consequence Question to a measurable cost, it's a feature pitch wearing a question costume.

### The workflow (1 → N branching)

```
[1] Ask an Operating Question  → baseline how they work
[2] Listen                     → exact numbers, systems, processes, people
[3] Branch on the answer       → each answer variant sets up a different consequence
[4] Ask the Consequence Question → quantify the cost in time, effort, money, or quality
[5] Repeat                     → next Operating Question in a different dimension
```

One Operating Question yields multiple possible Consequence Questions depending on the answer. Early on, hold this discipline strictly: baseline first, quantify second, never pitch in between.

### Match the question to the role

Different people in the account can answer different questions:

| Role | What they can give you | How to use them |
|------|------------------------|-----------------|
| **Evaluator / technical lead** | Operating answers — they know the systems | Data source. Don't expect them to feel the cost. |
| **Pain owner / ops or eng leader** | Operating + Consequence answers — they own the impact | This is where you ask Consequence Questions. |
| **Decision-maker / founder** | Strategic consequences — cost of inaction, risk, reputation | Lead with quality/risk if they're growth-stage; lead with money if they're cost-conscious. |

**The stakeholder-expansion lever:** the moment someone on the call can't answer your Consequence Question ("I don't know the number, you'd have to ask Ops"), that's your invitation: "Would it make sense to bring them into the next call?" Their inability to answer is how you meet the pain owner.

## How to Apply It

### Step 1: Prepare 3-5 Operating Questions per call

Before every discovery call, write down the dimensions you need a baseline on: current tooling, team size and roles, volume and frequency, what triggered the conversation, who else is involved.

### Step 2: For each, sketch the likely answers and their Consequence Questions

"How do you test releases today?" → "Manually, two QA engineers" → "What happens to release day when one of them is out?" / "How many hours per release cycle is that?"

### Step 3: On the call, hold the order

Baseline → listen → quantify. When the prospect says something painful, resist the pitch. Ask the Consequence Question instead. Let them say the number.

### Step 4: Capture the numbers verbatim

The prospect's own quantified statements ("that's probably 30 hours a month") are the strongest material you have — for the proposal, the follow-up email, and the internal champion's business case.

## Workshop: Build Your Question Bank

Run this once a quarter against your won and lost deals:

1. Pull your last 10 deals (5 won, 5 lost).
2. For each, ask: "What information would have changed how I sold this — if I'd known it on call 1?"
3. Turn each gap into an Operating Question.
4. For each Operating Question, list 2-3 likely answer variants.
5. For each variant, write the Consequence Question that turns it into a measurable cost.

That's your starter bank. Refresh quarterly.

## Example: The Stalled Infrastructure Deal

A prospect emails: "We have 50 users across 2 offices, on-prem, want to move to cloud. Send us a migration plan."

The founder sends the plan. The prospect goes silent. Classic requirement-not-need.

**The Operating Questions that should have come first:**
- "How are the 50 users working day-to-day right now?"
- "What changed in the business that made this a priority now?"
- "What's your backup and disaster-recovery setup today?"
- "Who else is involved in this decision?"

**The Consequence Questions those set up:**
- "If your second office loses connectivity for four hours, what does that cost you?"
- "When the team grew from 30 to 50, what specifically broke?"
- "What would a full day of data unavailability mean for your operations team?"

Now the plan isn't a quote to compare against three others — it's the answer to a cost the prospect articulated themselves.

## Connection to Other Frameworks

- **[Discovery Questions](discovery-questions.md)** — This is the structured, at-scale version of Mom Test discipline. Mom Test says "ask about their life, not your idea"; Operating Questions ask about their operations, Consequence Questions ask about the cost of those operations.
- **[Pain Discovery](pain-discovery.md)** — Operating Questions map to SPIN's Situation/Problem questions; Consequence Questions are Implication questions with a quantifiability guardrail bolted on.
- **[Positioning Levels](positioning-levels.md)** — Consequence Questions are the mechanism that moves you from Vitamin to Painkiller. The pain-relevance guardrail keeps you on that path.
- **[Pipeline Scorecard](pipeline-scorecard.md)** — The quantified answers become your Problem Acknowledgment evidence. A prospect who has said the number scores differently from one who has nodded politely.
- **[Sales Playbook](sales-playbook.md)** — This framework IS the heart of the Discovery stage. Don't exit Discovery until the prospect has quantified at least one consequence.

## Anti-Patterns

### Interrogation tone
Fifteen rapid-fire questions makes the prospect feel surveyed, and closed answers follow. Frame Operating Questions as consultant curiosity: "Walk me through..." not "Do you have...".

### Skipping the Consequence Question
The buyer says something painful, you get excited and pitch. After every Operating answer, ask yourself: "What's the measurable cost here?" If you can't name it, you're not done — ask the Consequence Question.

### Asking the wrong person
The technical evaluator shrugs at "what's this costing the business?" — they genuinely don't know. Move Consequence Questions to the pain owner. The evaluator is a data source, not a consequence-bearer.

### Unquantifiable consequence questions
"How does that make you feel?" and "Is that a problem for you?" produce vague answers. Reframe to numbers: "How many hours a week?" "What's that costing?" "Is that count growing?"

### One static script
Asking the same five questions on every call means you're not branching on answers. Build the question bank (workshop above) and practice the 1 → N discipline: one baseline, multiple quantification paths.

### Mistaking excitement for commitment
A decision-maker getting excited at a demo without any quantified consequence is a deal that collapses later. Excitement is not commitment — the number is the commitment. Check it against the [Pipeline Scorecard](pipeline-scorecard.md).
