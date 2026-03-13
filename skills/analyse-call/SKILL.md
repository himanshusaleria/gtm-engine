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

Read all framework files from `frameworks/` in the project root. Skip any that are marked "Coming Soon" or are placeholder files.

Available frameworks (read each that exists):
- `frameworks/customer-profile.md` (ICP / Customer Profile)
- `frameworks/market-segments.md` (Buyer's Pyramid / Market Segments)
- `frameworks/discovery-questions.md` (Mom Test / Discovery Questions)
- `frameworks/intent-signals.md` (Intent Diagnostic / Intent Signals)
- `frameworks/messaging-structure.md` (Outcome Messaging)
- `frameworks/pipeline-scorecard.md` (Commitment Scorecard)
- `frameworks/positioning-model.md` (Value Positioning — e.g., VPP)
- `frameworks/commitment-matrix.md` (TEMQ Commitment Matrix)
- `frameworks/deal-stages.md` (Causal Law / Deal Stages)
- `frameworks/pain-validation.md` (Pain Framework)
- `frameworks/sales-process.md` (7S Sales Process)

Also read user context if available:
- `my-context/icp-definition.md` (user's ICP details)
- `my-context/company-overview.md` (product context)

**Note:** Some frameworks may not yet exist or may be placeholders. Only apply frameworks that have real content. For missing frameworks, note: "Additional frameworks will be available in future updates."

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
(Requires `pipeline-scorecard.md` or `commitment-matrix.md`)
- Score the prospect on engagement, problem acknowledgment, timeline, resources.
- Words vs Actions assessment, scored 1-3 each where applicable.
- Flag gaps between what the prospect said and what they did.

#### G. Value Positioning Analysis
(Requires `positioning-model.md`)
- Where did the team position during the call?
- Quote specific moments where positioning was strong.
- Quote moments where positioning was weak.

#### H. Deal Stage Assessment
(Requires `deal-stages.md`)
- Which stage is this deal at?
- What evidence from the call supports this assessment?
- What's needed to move to the next stage?

#### I. Pain Validation
(Requires `pain-validation.md`)
- What pain was identified during the call?
- Was it validated with impact questions?
- Pain = Problem + Impact? Or just Problem with no validated impact?

#### J. Sales Process Progress
(Requires `sales-process.md`)
- Which stages have been completed for this deal?
- Checklist of completed vs remaining stages.

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
