# /validate-lead — ICP Lead Validation

Scores companies against your ICP criteria using web research and your custom scoring rules.

## What It Does

Researches a company online, checks it against your no-go rules, scores it on your ICP criteria, and gives a clear Go / No Go verdict with reasoning. Learns from your feedback over time.

## Usage

```
/validate-lead Acme Corp                          # Validate a single company
/validate-lead "Acme Corp" https://jobs.lever.co/acme/12345  # Include a job listing URL for extra signal
/validate-lead --batch                             # Validate unreviewed companies from your outreach sheet
/validate-lead --improve "learning text"           # Add a learning to improve future validations
```

## Prerequisites

- `config/config.yaml` with the ICP section filled (scoring criteria, no-go rules, tiers)
- Recommended: `my-context/icp-definition.md` filled via `/setup --icp`
- For batch mode: outreach sheet enabled in config

## How Scoring Works

1. **No-go rules** are checked first. If any match, the company is auto-rejected before scoring.
2. Each ICP criterion from your config is scored 0 or 1.
3. The total score maps to a tier:
   - **Core ICP** — strong fit, prioritize
   - **Broader ICP** — decent fit, worth pursuing
   - **Not ICP** — does not meet threshold

## The Learnings Loop

After every validation, the skill asks for feedback. Your corrections accumulate in `learnings.md` and are applied to all future validations. Over time, the skill aligns more closely with your judgment.

Use `--improve` to add a learning directly without running a validation.

## Outreach Sheet Integration

If you have an outreach tracking spreadsheet configured, the skill outputs values formatted for manual copy-paste into the verdict and action columns. Batch mode reads unreviewed rows directly from the sheet.

## Tips

- When uncertain, the skill defaults to "Go ahead with caveats" — better to review than miss
- Job listing URLs provide strong signal (tech stack, team size, role requirements)
- Run `--batch` periodically to clear your outreach queue
