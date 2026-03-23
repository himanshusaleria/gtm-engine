# Skills Catalog

Skills are automated workflows that Claude Code executes. They're the engine in "GTM Engine."

## Start Here

1. **`/setup`** — Configure everything (run this first)
2. **`/good-morning`** — See your daily briefing
3. **`/analyse-call`** — Analyze a sales call

## All Skills

| Skill | What It Does | Integrations | Flags |
|-------|-------------|--------------|-------|
| [`/setup`](setup/) | Interactive config wizard | Linear | `--icp`, `--personas`, `--messaging`, `--signals`, `--reinstall` |
| [`/whats-new`](whats-new/) | Show updates after `git pull` | None | — |
| [`/good-morning`](good-morning/) | Daily morning briefing | Linear, Calendar (opt) | `--quick`, `--team` |
| [`/good-night`](good-night/) | End-of-day wrap-up | Linear, Calendar (opt) | `--quick`, `--calls` |
| [`/analyse-call`](analyse-call/) | Framework analysis of call transcripts | None | `--quick`, `--scorecard-only`, `--compare` |
| [`/validate-lead`](validate-lead/) | ICP lead scoring | None (web search) | `--batch`, `--improve` |
| [`/cold-email`](cold-email/) | Signal-based cold outreach | None | `--sequence`, `--improve` |
| [`/sync-calls`](sync-calls/) | Sync call recordings from any provider | Call recording API (opt) | `--all`, `--id` |

## Required vs Optional Integrations

**Works standalone** (no MCP needed):
- `/analyse-call` — reads local transcript files + frameworks
- `/validate-lead` — uses web search for research
- `/cold-email` — reads local context files
- `/whats-new` — reads local VERSION + CHANGELOG

**Needs Linear MCP:**
- `/setup` — configures Linear teams and labels
- `/good-morning` — reads tasks and pipeline
- `/good-night` — updates tasks and plans tomorrow

**Needs Google Workspace MCP (optional):**
- `/good-morning` — calendar section
- `/good-night` — calendar preview
- `/validate-lead --batch` — reads lead tracking sheet

**Needs call recording provider (optional):**
- `/sync-calls` — syncs call recordings (API-based providers need API key in `.env`)
- `/good-night --calls` — auto-syncs during evening routine

## Self-Improving Skills

These skills have a `learnings.md` file that accumulates feedback:

| Skill | Learnings File | How It Improves |
|-------|---------------|-----------------|
| `/validate-lead` | `validate-lead/learnings.md` | Better ICP scoring from verdict feedback |
| `/cold-email` | `cold-email/learnings.md` | Better emails from response feedback |

**How it works:**
1. Skill runs and produces output
2. You give feedback ("this was wrong because..." or "this worked well")
3. Feedback is saved to the learnings file
4. Next run, the skill reads learnings first and applies them

You can also add learnings directly: `/validate-lead --improve "service companies often have 'solutions' in the name"`

## Skill Installation

Skills are installed to `~/.claude/skills/` by `/setup`. The source of truth is the `skills/` directory in this repo.

- **Installed skills** — what Claude Code actually runs (in `~/.claude/skills/`)
- **Repo skills** — templates that get installed (in `skills/`)

After `git pull`, run `/whats-new` to check if installed skills need updating.

Learnings files are never overwritten during reinstall — your accumulated feedback is preserved.
