# /good-morning — Daily Morning Briefing

Start your day with a single view of calendar, tasks, pipeline, and outreach status.

## What It Does

Pulls together everything you need to see first thing: today's calendar, tasks due and overdue, your planned 3+2 tasks, active pipeline deals, team outreach audit, and a suggested priority order for the day.

## Usage

```
/good-morning           # Full briefing
/good-morning --quick   # Calendar + tasks + 3+2 only
/good-morning --team    # Team outreach audit only
```

## Prerequisites

- `config/config.yaml` exists (run `/setup` first)
- Linear MCP connected
- Google Workspace MCP (optional, for calendar)

## Sample Output

```
## Good Morning — Mar 13

### Calendar
| Time | Event |
|------|-------|
| 10:00 | Discovery call - Prospect A |
| 14:30 | Internal sync |

### Today's 3+2
**Meaningful:**
1. [ ] Follow up with Prospect B on POC feedback
2. [ ] Send cold outreach to 3 new leads
3. [ ] Prep discovery questions for afternoon call

**Light:**
1. [ ] Update CRM with yesterday's notes
2. [ ] Reply to Slack messages

**Streak: 4 days with 3/3 meaningful**
```

## Monday Bonus

On Mondays, the briefing includes a **weekly parking lot review** — all parked ideas surface so you can promote, drop, or keep them.

## Context Nudges

If any `my-context/` files are empty, you will see a one-time nudge to fill them (e.g., "Run `/setup --icp` to define your ICP"). Only one nudge per session.

## Tips

- Use `--quick` when you just need a fast check before jumping into work
- The 3+2 system is planned the night before via `/good-night` — if nothing was planned, the briefing offers to plan on the spot
- The suggested priority order at the end ranks overdue items and late-stage deals first
