# GTM Engine

**GTM Engine turns Claude Code into your sales team.** Eight opinionated slash-command skills that run your entire go-to-market motion — pipeline tracking, daily rituals, call analysis, lead scoring, cold outreach — all from your terminal.

Built for 0-to-1 founders doing sales for the first time.

## Without GTM Engine

- You forget to follow up with prospects because nothing tracks it
- Pipeline lives in your head or a messy spreadsheet
- Every discovery call ends with vague "let's circle back" and no structured analysis
- Cold emails take 30 minutes each and sound like every other SaaS pitch
- You don't know if a lead is worth pursuing until you've wasted 3 calls on them
- No daily system — you work on whatever feels urgent, not what moves deals

## With GTM Engine

| Skill | Role | What It Does |
|-------|------|-------------|
| `/setup` | Onboarding | Interactive wizard: company context → Linear CRM → ICP definition → persona mapping → messaging |
| `/good-morning` | Chief of Staff | Daily briefing: calendar, pipeline, tasks, 3+2 plan, team audit, overdue alerts |
| `/good-night` | Chief of Staff | EOD wrap-up: score today's tasks, sync call recordings, plan tomorrow's 3+2, draft EOD message |
| `/analyse-call` | Sales Coach | Apply 15 frameworks to any call transcript — positioning, commitment scoring, discovery quality, next steps |
| `/validate-lead` | Research Analyst | Score any company against your ICP in 30 seconds — web research, no-go rules, tier classification |
| `/cold-email` | Outreach Writer | Signal-based cold emails that lead with pain, not features. Gets better with every feedback loop. |
| `/whats-new` | Release Manager | After `git pull`, shows what changed and offers to update your skills |
| `/sync-calls` | Call Librarian | Sync recordings from any call tool (Fathom, Fireflies, Otter, Grain), save formatted transcripts |

## Demo: A Typical Day

```
Morning:
  /good-morning
  → Calendar: 2 calls today (Acme discovery, Beta demo)
  → Pipeline: 3 deals in POC, 1 in Agreement
  → Today's 3+2: 3 meaningful (follow-up Acme, prep Beta demo, cold email batch) + 2 light (update CRM, review outreach)
  → Streak: 5 days with 3/3 meaningful ✓

After a call:
  /analyse-call my-context/call-transcripts/acme_mar13_discovery.md
  → ICP Fit: Core (5/6)
  → Commitment Scorecard: Engagement 3, Problem 2, Timeline 1, Resources 1 — Words ahead of Actions
  → Discovery Quality: Good questions on pain, missed budget qualification
  → Next steps: "Send case study, book technical deep-dive, ask about timeline"
  → "Want me to create these as Linear tasks?" → Yes

Lead comes in:
  /validate-lead "Nexus Corp" https://jobs.lever.co/nexus/qa-engineer
  → Score: 4/6 (Broader ICP)
  → Verdict: "Go ahead with caveats — no web app confirmed yet"
  → "Any feedback?" → "Actually they have a web dashboard, I checked" → Saved to learnings

Cold outreach:
  /cold-email "Nexus Corp, hiring QA engineer, 50-person B2B SaaS, builds supply chain software"
  → Subject: your qa engineer listing
  → 5-sentence email leading with their specific pain
  → "Want me to save feedback?" → "Too formal, more casual" → Saved to learnings

Evening:
  /good-night
  → 3+2 Score: Meaningful 3/3, Light 2/2
  → Streak: 6 days ✓
  → Tomorrow's 3+2 planned and tagged in Linear
```

## This is not a prompt pack.

It's an operating system for founders who are figuring out sales.

The skills don't just generate text — they read your config, query your Linear pipeline, apply frameworks to real transcripts, score leads against your actual ICP, and create follow-up tasks with due dates. They improve themselves over time through feedback loops.

The 3+2 daily system forces intentionality. Every night you pick 3 meaningful tasks (moves deals forward) and 2 light tasks (keeps things running). Every morning you confirm. Every night you score. Your streak tracks consistency.

## Installation

### Option A: Install as a Claude Code plugin (recommended)

```
/plugin marketplace add himanshusaleria/gtm-engine
/plugin install gtm-engine@gtm-engine-marketplace
```

Skills are then invoked with the plugin prefix (e.g. `/gtm-engine:good-morning`). You still need a local clone for your config, frameworks, and context files:

```bash
git clone https://github.com/himanshusaleria/gtm-engine.git
cd gtm-engine
```

### Option B: Clone and copy skills manually

```bash
git clone https://github.com/himanshusaleria/gtm-engine.git
cd gtm-engine

# Install all skills to Claude Code
for skill in skills/*/; do
  cp -r "$skill" ~/.claude/skills/"$(basename "$skill")"
done
```

### Step 2: Run setup

Open Claude Code in the `gtm-engine/` directory:

```
/setup
```

The wizard walks you through:
1. **Stack discovery** — what tools you use (Linear required, Google Workspace recommended, call recording optional)
2. **MCP installation** — connects Claude Code to Linear, Google Workspace, etc.
3. **Company context** — name, product, team members, Linear teams
4. **ICP workshop** — define who you sell to, scoring criteria, auto-reject rules
5. **Persona mapping** — buyer personas and their pains
6. **Messaging** — objection playbook, company positioning
7. **Signal playbook** — intent signals for your product
8. **Finalize** — generates `config.yaml`, `CLAUDE.md`, creates your context files

Steps 4-7 are skippable. You can come back with `/setup --icp`, `/setup --personas`, `/setup --messaging`, `/setup --signals`.

~15 minutes for the full wizard. ~5 minutes if you skip the workshops.

## The Skills

### `/good-morning` — Your Daily Briefing

Every morning, one command gives you the full picture.

```
/good-morning           # Full briefing
/good-morning --quick   # Just calendar + tasks
/good-morning --team    # Just team outreach audit
```

Pulls from Linear and Google Calendar. Shows tasks by status (In Progress → Todo → Backlog), pipeline deals by stage (POC → Agreement → Demo), follow-ups due today, and your planned 3+2.

**Monday bonus:** Surfaces your entire parking lot for weekly review — promote, drop, or keep.

**Nudge system:** If your ICP or persona templates are unfilled, shows a gentle one-liner: "Your ICP is empty. Run `/setup --icp` — takes 5 minutes."

### `/good-night` — EOD Wrap-Up

```
/good-night             # Full wrap-up
/good-night --quick     # Skip call sync
/good-night --calls     # Only sync calls
```

Scores your 3+2 (how many meaningful/light tasks completed), tracks your streak, reviews open tasks, drafts an EOD message you can copy-paste, previews tomorrow's calendar, and plans tomorrow's 3+2.

Incomplete meaningful tasks get triaged: "Move to tomorrow or drop?"

Completed tasks get their daily labels cleaned up automatically.

### `/analyse-call` — Sales Coach in a Box

Save a call transcript to `my-context/call-transcripts/`, then:

```
/analyse-call my-context/call-transcripts/acme_discovery.md
/analyse-call --quick my-context/call-transcripts/acme_discovery.md
/analyse-call --scorecard-only my-context/call-transcripts/acme_discovery.md
/analyse-call --compare acme_call1.md acme_call2.md
```

Applies every available framework to the transcript:

- **ICP Fit** — does this prospect match your ideal customer profile?
- **Buyer's Pyramid** — are they in the 3% buying now or the 30% not thinking about it?
- **Discovery Quality** — did you ask Mom Test questions or leading questions?
- **Intent Signals** — what buying signals appeared in the conversation?
- **Messaging Effectiveness** — painkiller positioning or vitamin selling?
- **Commitment Scorecard** — words vs. actions, scored 1-3 on four dimensions

Then: what went right, what went wrong, specific coaching points, and concrete next steps with the option to create Linear tasks.

`--compare` mode shows side-by-side scorecards between two calls for the same prospect — is the deal gaining or losing momentum?

### `/validate-lead` — 30-Second Lead Scoring

```
/validate-lead "Acme Corp" https://jobs.lever.co/acme/qa-engineer
/validate-lead --batch           # Score unreviewed leads from your sheet
/validate-lead --improve "learning"  # Add a learning without running validation
```

Researches the company (web search + job listing analysis), checks your no-go rules, scores against your ICP criteria, and outputs a verdict: Core ICP / Broader ICP / Not ICP.

The skill reads your ICP definition from config. If you haven't filled it out, it uses the defaults from `/setup`.

**Self-improving:** Every time you correct a verdict ("this was wrong because..."), the feedback is saved to `learnings.md` and applied to all future validations.

### `/cold-email` — Pain-First Outreach

```
/cold-email "Nexus Corp, 50 people, hiring QA, B2B SaaS"
/cold-email --sequence "Nexus Corp..."    # 3-4 email sequence
/cold-email --improve "too formal"        # Save a learning
```

Reads your company overview, persona pain map, and objection playbook. Writes emails that:
- Lead with the prospect's pain, not your features
- Reference the specific signal that triggered outreach
- Use "I" not "we", no emojis, no exclamation marks
- 4-6 sentences, soft CTA, easy out
- Never say "AI-powered", "game-changer", "leverage", or "synergy"

Sequence mode generates 4 emails: signal-based first touch (Day 0), reply-bait nudge (Day 3), value-add from a different angle (Day 8), breakup (Day 13). Follow-up discipline is built in: due follow-ups beat new sends, ~5 new sends/day cap, one active thread per company.

**Self-improving:** Feedback on tone, what got replies, what bombed — all saved and applied next time.

### `/setup` — The Configuration Wizard

```
/setup                # Full wizard
/setup --icp          # Just ICP workshop
/setup --personas     # Just persona mapping
/setup --messaging    # Just messaging & objections
/setup --signals      # Just signal playbook
/setup --reinstall    # Regenerate config + reinstall skills
```

Interactive session that builds your entire sales context from scratch. Generates `config.yaml` (your settings), `CLAUDE.md` (Claude Code instructions), and populates `my-context/` with your ICP, personas, objections, and signals.

### `/whats-new` — Update Notifier

After running `git pull`, this skill compares your installed version against the repo, shows what changed, and offers to update affected skills. Your learnings files are never overwritten.

### `/sync-calls` — Call Transcript Sync

```
/sync-calls             # Fetch new calls since last sync
/sync-calls --all       # Show all recent calls
/sync-calls --id 123    # Import a specific recording
```

Fetches calls from your configured call recording provider (Fathom, Fireflies, etc.), shows what's new vs. already saved, and lets you pick which to download. For tools without API support (Otter, Grain), offers manual transcript import. Transcripts are formatted and saved to `my-context/call-transcripts/`.

## Frameworks

Fifteen sales frameworks covering the full sales cycle — from finding prospects to closing deals.

| Framework | What It Teaches |
|-----------|----------------|
| **[Discovery Questions](frameworks/discovery-questions.md)** | Ask questions that get honest answers, not polite validation. Based on Rob Fitzpatrick's *The Mom Test*. |
| **[Market Segments](frameworks/market-segments.md)** | Only 3% of your market is buying right now. How to reach the other 97%. Based on Chet Holmes' *Buyer's Pyramid*. |
| **[Customer Profile](frameworks/customer-profile.md)** | Three-layer ICP model: Market → Account → Person. With scoring criteria and no-go rules. |
| **[Intent Signals](frameworks/intent-signals.md)** | Six types of buying signals and how to score them. Know who needs you before you pitch. |
| **[Messaging Structure](frameworks/messaging-structure.md)** | Issue → Impact → Current Resolution → Outcome. Structure every outreach message. |
| **[Pipeline Scorecard](frameworks/pipeline-scorecard.md)** | Score prospect commitment objectively. Separate what they say from what they do. |
| **[Prospect Qualification](frameworks/prospect-qualification.md)** | BANT scoring — Budget, Authority, Need, Timeline. Decide if a prospect is worth your time. |
| **[Positioning Levels](frameworks/positioning-levels.md)** | Are you selling a vitamin or a painkiller? How to reposition through better discovery. |
| **[Selling Window](frameworks/selling-window.md)** | Five stages of org pain awareness. Time your outreach to when the window is open. |
| **[Pain Discovery](frameworks/pain-discovery.md)** | SPIN Selling — Situation, Problem, Implication, Need-payoff questions that surface real pain. |
| **[Sales Playbook](frameworks/sales-playbook.md)** | Seven-stage founder's deal checklist: Research → Outreach → Discovery → Demo → Proof → Close → Handoff. |
| **[Consequence Questions](frameworks/consequence-questions.md)** | Discovery that quantifies pain. Baseline how they operate, then let the prospect say the cost out loud. |
| **[Buyer Readiness](frameworks/buyer-readiness.md)** | Read buyer actions, not words. Diagnose the real journey stage and match your response mode to it. |
| **[Category Language](frameworks/category-language.md)** | Bypass the prospect's default filter with a distinctive term for what you do — earn "what do you mean by that?" |
| **[Revenue Visibility](frameworks/revenue-visibility.md)** | One sheet between you and cash-flow panic. Score every deal 1-5 on evidence that the money will actually arrive. |

Each framework includes: what it is, why it matters, the model, how to apply it, a workshop to build yours, a generic example, connections to other frameworks, and anti-patterns.

## Architecture

```
gtm-engine/
├── config/config.yaml          # Your settings (.gitignored)
├── CLAUDE.md                   # Generated by /setup (.gitignored)
├── frameworks/                 # Sales frameworks (git-tracked)
├── skills/                     # Skill source files (git-tracked)
├── templates/                  # Blank scaffolds (git-tracked)
├── my-context/                 # Your content (.gitignored)
│   ├── company-overview.md     # Your product positioning
│   ├── persona-pain-map.md     # Buyer personas and pains
│   ├── icp-definition.md       # ICP scoring criteria
│   ├── objections-playbook.md  # Common objections + responses
│   ├── signal-playbook.md      # Intent signals for your product
│   └── call-transcripts/       # Saved call recordings
├── memory/                     # Runtime state (.gitignored)
│   └── daily_streak.md         # 3+2 streak tracker
├── scripts/                    # Optional integrations
└── docs/                       # Guides (git-tracked)
```

**Git-tracked** (updated via `git pull`): frameworks, skill templates, docs, templates

**Stays local** (never pushed): config, CLAUDE.md, my-context/, memory/, learnings files

## Integrations

| Integration | Required? | What It Powers | Setup |
|-------------|-----------|----------------|-------|
| **[Linear](docs/linear-setup.md)** | Required | Pipeline CRM, task management, 3+2 daily system | MCP server |
| **[Google Workspace](docs/mcp-setup.md)** | Recommended | Calendar briefings, Gmail drafts, Sheets-based lead tracking | MCP server |
| **Call Recording** (Fathom, Fireflies, etc.) | Optional | Call transcript sync via `/sync-calls` | API key in `.env` (if API-based) |

## Updating

```bash
git pull origin main
```

Then in Claude Code:

```
/whats-new
```

Shows what changed. Offers to reinstall updated skills. Never overwrites your config, context, or learnings.

## What Gets Installed

- **Skill files** in `~/.claude/skills/` — the markdown prompts Claude Code executes
- **Config** at `config/config.yaml` — your settings (gitignored)
- **CLAUDE.md** at project root — instructions for Claude Code (gitignored)
- **Context files** in `my-context/` — your ICP, personas, objections, signals (gitignored)

## Troubleshooting

**Skills not showing up?** Claude Code reads from `~/.claude/skills/`. Run the install command:
```bash
for skill in skills/*/; do
  cp -r "$skill" ~/.claude/skills/"$(basename "$skill")"
done
```

**Config not found?** Run `/setup` from the `gtm-engine/` directory.

**Linear not connecting?** Check MCP installation: `claude mcp list`. See [MCP setup guide](docs/mcp-setup.md).

**Stale skills after git pull?** Run `/whats-new` — it detects drift between repo and installed skills.

## Documentation

- [Setup Guide](docs/setup-guide.md) — Full installation walkthrough
- [Linear Setup](docs/linear-setup.md) — Two-team CRM workflow
- [MCP Setup](docs/mcp-setup.md) — Connecting Linear, Google Workspace, call recording
- [Framework Guide](docs/framework-guide.md) — Learning and applying frameworks
- [Skill Catalog](skills/README.md) — All skills with detailed usage guides

## License

MIT — see [LICENSE](LICENSE).

---

Created by [Himanshu Saleria](https://www.linkedin.com/in/himanshusaleria/), co-founder of [QAbyAI](https://qabyai.com). Built this system to run my own GTM motion, then open-sourced the engine so any 0-to-1 founder can use it.
