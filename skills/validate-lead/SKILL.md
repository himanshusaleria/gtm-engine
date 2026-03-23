# /validate-lead — ICP Lead Validation

Validate whether a company is an ICP fit based on research and your ICP scoring criteria.

## Usage

- `/validate-lead {company} [job_url]` — Validate a single company
- `/validate-lead --batch` — Validate unreviewed companies from your outreach sheet
- `/validate-lead --improve "learning"` — Add a learning to improve future validations

## Prerequisites

- `config/config.yaml` with ICP section filled (scoring criteria, no-go rules, tiers)
- Recommended: `my-context/icp-definition.md` filled (via `/setup --icp`)

---

## Default Mode Flow

### Step 1: Load Context (parallel reads)

Read these files in parallel:
- `~/.claude/skills/validate-lead/learnings.md`
- `my-context/icp-definition.md` (if exists)
- `config/config.yaml` -> icp section

### Step 2: Research the Company (parallel where possible)

- **If job URL provided:** WebFetch the listing -> extract role title, tech stack, requirements, company description
- **WebSearch** `"{company} what they do product"` -> understand what they build
- **WebSearch** `"{company} employees team size"` -> estimate headcount
- **If LinkedIn URL provided:** WebFetch it

### Step 3: Apply No-Go Rules (check FIRST before scoring)

Read `config.icp.no_go_rules`. Auto-reject if ANY rule matches.

If No-Go triggered -> output verdict immediately with reason. Skip scoring.

### Step 4: Score on ICP Scale

Use `config.icp.scoring_criteria` for criteria. Each criterion scored 0 or 1.
Sum scores and apply tier thresholds from `config.icp.tiers`:
- Score >= `config.icp.tiers.core` = **Core ICP**
- Score >= `config.icp.tiers.broader` = **Broader ICP**
- Below broader threshold = **Not ICP**

### Step 5: Output

Present results in this format:

```
## {Company Name} — Lead Validation

### Verdict
| Field | Value |
|-------|-------|
| ICP Fit? | Yes / No |
| Action | Go ahead / No go |
| Summary | {one-line summary} |

### Research Summary
- **What they do:** ...
- **Headcount:** ...
- **Geography:** ...
- **Product type:** ...
- **Job listing signals:** ... (if applicable)

### ICP Scorecard ({X}/{max})
| # | Criterion | Score | Reasoning |
|---|-----------|-------|-----------|
| 1 | {criteria from config} | 0/1 | ... |
| 2 | ... | 0/1 | ... |

### Caveats
- ...
```

If `config.integrations.outreach_sheet.enabled` is true:
- Map verdict to the configured columns: "Copy these values to the sheet: {column}={value}, ..."
- Include the sheet link: `https://docs.google.com/spreadsheets/d/{config.integrations.outreach_sheet.spreadsheet_id}/edit`

### Step 6: Ask for Feedback

After output, ask: **"Any feedback on this verdict? I'll save it for future validations."**

If user provides feedback -> append to `~/.claude/skills/validate-lead/learnings.md` with date and company context.

---

## Batch Mode Flow

### Step 1: Read the Sheet

Requires `config.integrations.outreach_sheet.enabled: true`.

```
sheets_getText(spreadsheetId: "{config.integrations.outreach_sheet.spreadsheet_id}")
```

### Step 2: Find Unreviewed Rows

Filter for rows where the verdict column and action column are blank/empty (using column letters from config).

### Step 3: Present List

Show the unreviewed companies with their signal/URL columns. Ask user which ones to validate (all, or specific ones).

### Step 4: Validate Sequentially

Run the default validation flow for each selected company. Pause briefly between web searches to be rate-limit friendly.

### Step 5: Summary Table

After all validations, output a summary:

```
| Company | Score | Tier | Verdict | Action | Comment |
|---------|-------|------|---------|--------|---------|
| ... | X/{max} | Core/Broader/No | Yes/No | Go ahead/No go | ... |
```

---

## Improve Mode Flow

When user runs `/validate-lead --improve "learning text"`:

1. Read `~/.claude/skills/validate-lead/learnings.md`
2. Append the learning under `## User Feedback & Learnings` with today's date
3. Confirm: "Saved learning. This will be applied to future validations."
4. Do NOT run any validation

---

## Important Notes

- Google Sheets MCP is **read-only** — always output values for manual copy-paste
- When uncertain about a company, default to **"Go ahead with caveats"** — better to review than miss
- Always check learnings.md first — past feedback may override default scoring
- The skill improves over time as feedback accumulates in learnings.md
