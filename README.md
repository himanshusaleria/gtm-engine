# GTM Engine

A Claude Code-powered sales system for 0-to-1 founders. Frameworks, daily rituals, and self-improving skills that run your entire GTM motion.

## What This Is

GTM Engine gives you a structured, repeatable sales process inside Claude Code. It combines:

- **11 sales frameworks** — battle-tested models for qualifying leads, positioning your product, and running deals
- **7 skills** — automated workflows for daily briefings, call analysis, lead validation, and cold outreach
- **Daily rituals** — a 3+2 system that forces daily intentionality (3 meaningful + 2 light tasks)
- **Self-improving learnings** — skills get better over time as you provide feedback
- **Linear integration** — two-team CRM workflow (pipeline tracking + action tasks)

Built for founders who are doing sales themselves for the first time.

## Quick Start

```bash
git clone https://github.com/your-username/gtm-engine.git
cd gtm-engine

# In Claude Code:
/setup
```

The setup wizard walks you through everything in ~15 minutes. [Full setup guide →](docs/setup-guide.md)

## Skills

| Skill | What It Does | Required Integrations |
|-------|-------------|----------------------|
| `/setup` | Interactive wizard to configure everything | Linear |
| `/whats-new` | Shows what changed after `git pull` | None |
| `/good-morning` | Daily briefing: calendar, tasks, pipeline, 3+2 plan | Linear, Calendar (optional) |
| `/good-night` | EOD wrap-up: score tasks, plan tomorrow, sync calls | Linear, Calendar (optional) |
| `/analyse-call` | Apply all frameworks to a call transcript | None (reads local files) |
| `/validate-lead` | Score a company against your ICP criteria | None (uses web search) |
| `/cold-email` | Write signal-based cold outreach emails | None (reads your context) |

**Start here:** `/setup` → `/good-morning` → `/analyse-call`

[Full skill catalog →](skills/README.md)

## Frameworks

Six active frameworks ship in v1:

| Framework | File | One-liner |
|-----------|------|-----------|
| Discovery Questions | [discovery-questions.md](frameworks/discovery-questions.md) | Ask questions that get honest answers (Mom Test) |
| Market Segments | [market-segments.md](frameworks/market-segments.md) | Where buyers sit in the buying pyramid |
| Customer Profile | [customer-profile.md](frameworks/customer-profile.md) | Three-layer ICP model (Market → Account → Person) |
| Intent Signals | [intent-signals.md](frameworks/intent-signals.md) | Six signal types to diagnose buyer interest |
| Messaging Structure | [messaging-structure.md](frameworks/messaging-structure.md) | Issue → Impact → Resolution → Outcome |
| Pipeline Scorecard | [pipeline-scorecard.md](frameworks/pipeline-scorecard.md) | Objective commitment scoring for your pipeline |

Five additional frameworks are coming soon (pending attribution approval).

[Framework guide →](docs/framework-guide.md)

## How It Works

### The Two-Team System

```
Pipeline Team ("Sales")          Action Team ("GTM")
═══════════════════════          ═══════════════════
Tracks leads & deals              Tracks tasks & follow-ups

SAL-42 "Acme Inc"         →     GTM-108 "Follow up with Acme CTO"
  Stage: Discovery                 Due: Tomorrow
  Next: Demo scheduled             Label: daily-3
```

Pipeline = where deals are. Action = what you do about them.

### Daily Rituals

**Morning** (`/good-morning`):
- See your calendar, tasks, and pipeline at a glance
- Confirm today's 3+2 plan (3 meaningful + 2 light tasks)
- Monday: parking lot review

**Evening** (`/good-night`):
- Score today's 3+2 completion
- Track your streak (consecutive days hitting 3/3 meaningful)
- Plan tomorrow's 3+2
- Optional: sync call recordings from Fathom

### Self-Improving Skills

Skills like `/validate-lead` and `/cold-email` have a `learnings.md` file. Every time you give feedback ("this verdict was wrong because..."), the learning is saved and applied to future runs.

```
/validate-lead Acme Corp
→ "Core ICP — Score 5/6"
→ "Any feedback?"
→ "Actually, they're a service company — missed it"
→ Saves learning: "Check for service company indicators more carefully"
→ Next time: applies this learning automatically
```

## Architecture

```
gtm-engine/
├── config/config.yaml          # Your settings (.gitignored)
├── CLAUDE.md                   # Generated instructions (.gitignored)
├── frameworks/                 # Teaching documents (git-tracked)
├── skills/                     # Skill source files (git-tracked)
├── templates/                  # Blank scaffolds (git-tracked)
├── my-context/                 # Your content (.gitignored)
│   ├── company-overview.md
│   ├── persona-pain-map.md
│   ├── icp-definition.md
│   └── call-transcripts/
├── memory/                     # Runtime state (.gitignored)
└── docs/                       # Guides (git-tracked)
```

**Upstream-managed** (updated via `git pull`): frameworks, skill templates, docs
**User-generated** (stays local): config, CLAUDE.md, my-context/, learnings files

## Integrations

| Integration | Required? | What It Powers |
|-------------|-----------|----------------|
| **Linear** | Required | Pipeline, tasks, 3+2 system |
| **Google Workspace** | Recommended | Calendar, Gmail, Sheets |
| **Fathom** | Optional | Call transcript sync |

[MCP setup guide →](docs/mcp-setup.md)

## Updating

```bash
git pull origin main
# Then in Claude Code:
/whats-new
```

The engine auto-detects updates and shows a banner on first interaction. `/whats-new` shows what changed and offers to update affected skills.

Your config, context files, and learnings are never overwritten.

## Documentation

- [Setup Guide](docs/setup-guide.md) — Getting started
- [Linear Setup](docs/linear-setup.md) — Two-team CRM workflow
- [MCP Setup](docs/mcp-setup.md) — Installing integrations
- [Framework Guide](docs/framework-guide.md) — Learning and using frameworks
- [Skill Catalog](skills/README.md) — All skills with usage guides

## License

MIT — see [LICENSE](LICENSE).
