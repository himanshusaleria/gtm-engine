# /analyse-call — Analyse Sales Calls Using Frameworks

Analyse a customer call transcript by applying your sales frameworks. Produces a structured evaluation with coaching insights and next steps.

## Usage

- `/analyse-call {filepath}` — Full analysis of a call transcript
- `/analyse-call --quick {filepath}` — Summary + next steps only (skip framework breakdown)
- `/analyse-call --scorecard-only {filepath}` — Commitment scorecard only
- `/analyse-call --compare {filepath1} {filepath2}` — Compare two calls for same prospect

## Prerequisites

- At least one framework file exists in `frameworks/`
- `config/config.yaml` exists with Linear and team settings

## Instructions

When the user invokes `/analyse-call`, follow these steps:

### Step 1: Read the Transcript

Read the call transcript file. Identify:
- **Participants** — Who from your team, who from the prospect? Use config.team names to identify your team members.
- **Company** — Which prospect/customer?
- **Stage** — Where is this deal in the pipeline? (Check Linear {config.linear.pipeline_team} if needed)
- **Call type** — Discovery, demo, POC review, follow-up, closing?

### Step 2: Read the Frameworks

Read all framework files from `frameworks/` in the project root.

Available frameworks (read each that exists):
- `frameworks/customer-profile.md` (Customer Profile / ICP)
- `frameworks/market-segments.md` (Market Segments / Buyer's Pyramid)
- `frameworks/discovery-questions.md` (Discovery Questions / Mom Test)
- `frameworks/intent-signals.md` (Intent Signals)
- `frameworks/messaging-structure.md` (Messaging Structure)
- `frameworks/pipeline-scorecard.md` (Pipeline Scorecard)
- `frameworks/prospect-qualification.md` (Prospect Qualification / BANT)
- `frameworks/positioning-levels.md` (Positioning Levels / Vitamin vs Painkiller)
- `frameworks/selling-window.md` (Selling Window / Org Pain Stages)
- `frameworks/pain-discovery.md` (Pain Discovery / SPIN Selling)
- `frameworks/sales-playbook.md` (Sales Playbook / 7-Stage Deal Checklist)
- `frameworks/consequence-questions.md` (Consequence Questions / Quantified Discovery)
- `frameworks/buyer-readiness.md` (Buyer Readiness / Actions vs Words)
- `frameworks/category-language.md` (Category Language / Default Filter)
- `frameworks/revenue-visibility.md` (Revenue Visibility / Cash-Flow Scoring)

Also read user context if available:
- `my-context/icp-definition.md` (user's ICP details)
- `my-context/company-overview.md` (product context)

**Note:** Only apply frameworks that have real content.

### Step 3: Apply Frameworks

For each available framework with real content, analyse the call. Use as many of the following sections as your frameworks support:

#### A. ICP Fit Analysis
- Does this prospect match your ICP? Score using `customer-profile.md` criteria.
- Cross-reference with `my-context/icp-definition.md` if it exists.
- Which tier? Core / Broader / Universe (or equivalent from config.icp.tiers)
- Any disqualifying factors?

#### B. Buyer's Pyramid Position
(Requires `market-segments.md`)
- Where is this buyer in the pyramid?
  - 3% buying now
  - 7% open to buying
  - 30% not thinking about it
  - 30% don't think they're interested
  - 30% know they're not interested
- What stage of the buyer's journey are they at?

#### C. Discovery Quality
(Requires `discovery-questions.md`)
- Were questions structured well? Did the team get real data or just compliments?
- Which discovery techniques were used effectively?
- Which were missed?

#### D. Intent Signals Observed
(Requires `intent-signals.md`)
- Map signals from the call against the intent signals framework.
- What validated signals emerged?
- What signals are still missing?

#### E. Messaging Effectiveness
(Requires `messaging-structure.md`)
- Did the team use Issue -> Impact -> Resolution -> Outcome structure?
- Was the positioning painkiller or vitamin?
- Where did they fall into feature-selling mode?

#### F. Commitment Scorecard
(Requires `pipeline-scorecard.md` and/or `prospect-qualification.md`)
- Score the prospect on engagement, problem acknowledgment, timeline, resources.
- Words vs Actions assessment, scored 1-3 each where applicable.
- BANT score: Budget, Authority, Need, Timeline — each rated 1-3.
- Flag gaps between what the prospect said and what they did.

#### G. Positioning Analysis
(Requires `positioning-levels.md`)
- What positioning level was the team selling at? Vitamin, Painkiller, or Life Support?
- Quote specific moments where positioning was at the Painkiller level (strong).
- Quote moments where the team slipped into Vitamin territory (feature-listing, no pain connection).
- What questions could have elevated positioning?

#### H. Selling Window Assessment
(Requires `selling-window.md`)
- Which org pain awareness stage is this prospect at? Unaware / Annoyed / Hurting / Desperate / Solved.
- What evidence from the call supports this assessment?
- Are there buying triggers visible (scaling, incidents, new leadership, compliance)?
- Is the selling window open? Is the team's approach matched to the org's stage?

#### I. Pain Discovery (SPIN Analysis)
(Requires `pain-discovery.md`)
- Which SPIN question types were used during the call? (Situation / Problem / Implication / Need-payoff)
- What was the ratio? (Ideal: 10-15% S, 20-25% P, 40-50% I, 15-20% N)
- Were Implication questions asked? (The type most founders skip.)
- Did the prospect quantify the cost of their problem in their own words?
- Did the prospect articulate what solving it would mean? (Need-payoff)

#### J. Sales Playbook Progress
(Requires `sales-playbook.md`)
- Which of the 7 stages has this deal completed? Research / Outreach / Discovery / Demo / Proof / Close / Handoff
- Checklist of exit criteria met vs remaining for the current stage.
- What's the next stage and what needs to happen to get there?

#### K. Consequence Question Discipline
(Requires `consequence-questions.md`)
- Which Operating Questions (baseline: how they work today) were asked? Which Consequence Questions (quantification: what it costs)?
- Did the prospect say a pain number OUT LOUD in their own words? Quote it if so.
- Where did the team get an operating answer and pitch instead of asking the consequence question?
- Were Consequence Questions directed at someone who can actually feel the cost (pain owner), or at an evaluator?
- Any "you'd have to ask X for that number" moments? (Those are stakeholder-expansion levers — flag them.)

#### L. Buyer Readiness Diagnosis
(Requires `buyer-readiness.md`)
- Score the buyer's behavioral signals: time invested / effort invested / money signals / quality of problem definition.
- Which journey stage does the BEHAVIOR put them at? (Awareness / Interest / Consideration / Purchase) — versus what their WORDS claimed.
- Which readiness type are they? (Emotionally ready / Intellectually ready / Champion needing ammunition / Conceptually aware without urgency / Curious not pained)
- Is the team's response mode matched to that type? What's the prescribed mode?

#### M. Category Language Check
(Requires `category-language.md`)
- Did the team introduce themselves with a distinctive term or a generic category label?
- Did the prospect ask "what do you mean by that?" at any point — or auto-categorize ("so you're like [competitor]")?
- If the prospect filed the product under an existing category, what filter did it trigger and how could the intro have avoided it?

#### N. Revenue Visibility Score
(Requires `revenue-visibility.md`)
- Based on this call's evidence, what visibility score (1-5) does this opportunity deserve? (Words never move it past 2 — only actions do.)
- Did the score go up, down, or stay flat versus before the call?
- What is the single visibility-raising action for this deal this week?

### Step 4: What Went Right / Wrong

Based on the framework analysis, highlight:

**Went right:**
- Moments where positioning was strong
- Pain that was properly identified AND validated
- Strong commitment signals (actions matching words)
- Good questions asked

**Went wrong:**
- Moments where the team fell into feature-selling mode
- Pain identified but NOT validated with impact
- Premature solutioning (selling before diagnosing)
- Commitment signals missed or misread
- Questions that should have been asked but weren't

### Step 5: Where to Improve

Specific, actionable coaching points:
- What to do differently next call based on framework gaps
- Which commitment factors need elevation and how
- How to move from current deal stage to next
- Specific questions to ask next time

### Step 6: Next Steps

Concrete actions:
- Follow-up actions identified from the call
- Commitment elevation moves for next interaction
- Preparation needed before next call
- Ask: **"Want me to create any of these as tasks in Linear?"**

If user says yes, create tasks in {config.linear.action_team} with:
- Label: {config.linear.default_label}
- Assigned to appropriate team member from config.team (match by role)
- Reference the pipeline ticket if one exists
- Include due dates based on urgency

---

## Mode: `--quick`

Skip the framework-by-framework breakdown. Output:
1. One-paragraph call summary
2. Commitment scorecard (if framework available)
3. Top 3 things that went well
4. Top 3 things to improve
5. Next steps with option to create Linear tasks

## Mode: `--scorecard-only`

Output only:
1. Commitment scorecard table with scores and justifications
2. Words vs Actions gap analysis
3. Which factors to elevate next and how

## Mode: `--compare`

Read both transcripts. Output:
1. Side-by-side scores showing change over time
2. What improved between calls
3. What regressed or stalled
4. Trend assessment: is this deal gaining or losing momentum?
5. Recommendations for next interaction
