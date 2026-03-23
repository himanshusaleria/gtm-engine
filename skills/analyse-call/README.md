# /analyse-call — Sales Call Analysis

Applies your sales frameworks to a call transcript and produces a structured evaluation with coaching insights.

## What It Does

Reads a call transcript, identifies participants and deal context, then runs all 11 frameworks against it: ICP fit, buyer's pyramid position, discovery quality, intent signals, messaging effectiveness, commitment scoring, BANT qualification, vitamin vs painkiller positioning, selling window stage, SPIN pain discovery, and sales playbook progress. Ends with concrete next steps and optional Linear task creation.

## Usage

```
/analyse-call path/to/transcript.md              # Full framework analysis
/analyse-call --quick path/to/transcript.md       # Summary + top 3 wins/improvements + next steps
/analyse-call --scorecard-only path/to/transcript.md  # Commitment scorecard only
/analyse-call --compare call1.md call2.md         # Compare two calls for the same prospect
```

## Prerequisites

- At least one framework file in `frameworks/`
- `config/config.yaml` with Linear and team settings
- A saved call transcript (import via `/fathom-calls` or add manually to `my-context/call-transcripts/`)

## What the Analysis Covers

| Section | Framework Used |
|---------|---------------|
| ICP Fit | Customer Profile + your ICP definition |
| Buyer Position | Buyer's Pyramid / Market Segments |
| Discovery Quality | Mom Test / Discovery Questions |
| Intent Signals | Intent Diagnostic |
| Messaging | Outcome Messaging |
| Commitment Score | Pipeline Scorecard + BANT Qualification |
| Positioning | Vitamin vs Painkiller / Positioning Levels |
| Selling Window | Org Pain Stages (Unaware → Solved) |
| Pain Discovery | SPIN Selling (Situation → Need-payoff) |
| Process Progress | Founder's Sales Playbook (7 stages) |

Only frameworks with real content are applied. Missing frameworks are noted.

## After the Analysis

The skill highlights what went right, what went wrong, and where to improve with specific coaching points. It then lists concrete next steps and asks:

> "Want me to create any of these as tasks in Linear?"

Tasks are created in your action team with appropriate labels, assignees, and due dates.

## Tips

- Use `--quick` for a fast post-call debrief when you are short on time
- Use `--compare` to track momentum between calls with the same prospect
- The more frameworks you have filled in, the richer the analysis
