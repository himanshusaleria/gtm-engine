# Setup Guide

Get your GTM Engine running in ~15 minutes.

## Prerequisites

1. **Claude Code** installed and working ([install guide](https://docs.anthropic.com/en/docs/claude-code))
2. **Linear** account (free tier works) — this is your CRM backbone
3. **Git** installed

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/gtm-engine.git
cd gtm-engine

# Run the setup wizard
# (In Claude Code, type:)
/setup
```

The `/setup` wizard walks you through everything interactively. Below is what each step does if you want to understand or do it manually.

## What /setup Does

### Step 1: Stack Discovery

The wizard asks what tools you use:
- **CRM:** Linear (required)
- **Call recording:** Fathom, Fireflies, or none
- **Docs/email:** Google Workspace or none

Based on your answers, it determines which MCP servers to install and which skills to activate.

### Step 2: MCP Installation

MCP (Model Context Protocol) servers let Claude Code interact with your tools. See [mcp-setup.md](mcp-setup.md) for detailed installation instructions.

| MCP Server | Required? | What It Powers |
|------------|-----------|----------------|
| Linear | Required | Pipeline tracking, task management, 3+2 system |
| Google Workspace | Recommended | Gmail, Calendar, Sheets, Docs |

### Step 3: Company Context

You provide:
- Company name, product, website, one-liner
- Linear team names (defaults: "Sales" for pipeline, "GTM" for tasks)
- Team members with their Linear user IDs and roles

### Step 4: ICP Workshop (optional)

Interactive session to define your Ideal Customer Profile:
- Market profile (industry, geography, company size)
- Account profile (revenue, team size, signals)
- Prospect profile (title, role, authority)
- Scoring criteria and no-go rules

**Skip this if you're not ready** — you can run `/setup --icp` later.

### Step 5: Pain & Persona Mapping (optional)

Define 2-3 buyer personas and their pain points. Run `/setup --personas` later if skipped.

### Step 6: Messaging & Objections (optional)

Build your messaging structure and objection playbook. Run `/setup --messaging` later if skipped.

### Step 7: Signal Playbook (optional)

Catalog intent signals for your product. Run `/setup --signals` later if skipped.

### Step 8: Finalize

The wizard generates:
- `config/config.yaml` — your configuration
- `CLAUDE.md` — instructions for Claude Code
- Skills installed to `~/.claude/skills/`
- `my-context/` directory with your generated files

## After Setup

1. **Try `/good-morning`** — see your first daily briefing
2. **Save a call transcript** to `my-context/call-transcripts/` and run `/analyse-call`
3. **Try `/validate-lead SomeCompany`** — test lead scoring
4. **Run `/good-night`** at end of day — plan tomorrow's work

## Re-running Setup

- `/setup` — full wizard again (preserves existing my-context/ files)
- `/setup --icp` — just the ICP workshop
- `/setup --personas` — just persona mapping
- `/setup --messaging` — just messaging/objections
- `/setup --signals` — just signal playbook
- `/setup --reinstall` — regenerate config, CLAUDE.md, and reinstall skills

## Updating

```bash
git pull origin main
```

Then run `/whats-new` to see what changed and update affected skills.

## File Structure After Setup

```
gtm-engine/
├── CLAUDE.md                    # Generated — Claude Code reads this
├── config/config.yaml           # Generated — your settings
├── my-context/                  # Generated — your sales context
│   ├── company-overview.md
│   ├── persona-pain-map.md
│   ├── objections-playbook.md
│   ├── signal-playbook.md
│   ├── icp-definition.md
│   └── call-transcripts/
├── memory/
│   └── daily_streak.md
├── frameworks/                  # From repo — teaching docs
├── templates/                   # From repo — blank scaffolds
├── skills/                      # From repo — skill source
└── docs/                        # From repo — guides
```

Files in `my-context/`, `memory/`, `config/config.yaml`, and `CLAUDE.md` are gitignored — they stay local and never get pushed upstream.
