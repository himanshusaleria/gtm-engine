# /good-night — End-of-Day Wrap-Up

Close out your day with a review, scorecard, EOD message, and tomorrow's plan.

## What It Does

Scores your 3+2 task completion, summarizes what got done, drafts an EOD update message, previews tomorrow's calendar and tasks, and plans your next day's 3+2. Optionally syncs call recordings from Fathom.

## Usage

```
/good-night            # Full wrap-up
/good-night --quick    # Skip call sync, just summary + EOD + tomorrow
/good-night --fathom   # Only fetch and save new calls
```

## Prerequisites

- `config/config.yaml` exists (run `/setup` first)
- Linear MCP connected
- Google Workspace MCP (optional, for calendar)
- Fathom API key in `.env` (optional, for call sync)

## What It Covers

1. **Call sync** — fetches new recordings from Fathom, lets you pick which to save as transcripts
2. **3+2 scorecard** — checks which meaningful and light tasks you completed, updates your streak
3. **Completed tasks** — lists everything marked done today
4. **Open tasks** — flags incomplete tasks with suggested new due dates
5. **Day summary** — 2-3 sentence recap of the day
6. **EOD message** — ready to copy-paste update with "Done today" and "Tomorrow" sections
7. **Tomorrow preview** — calendar events and tasks due
8. **Plan tomorrow's 3+2** — surfaces parking lot items, suggests meaningful and light tasks, tags them in Linear
9. **Team check** — SDR outreach activity summary (if configured)

## The 3+2 System

Each night you pick 3 meaningful tasks (sales-moving) and 2 light tasks (operational) for tomorrow. These get tagged in Linear and checked the next morning. Consecutive days of completing all meaningful tasks build your streak.

## Tips

- Incomplete meaningful tasks can be moved to tomorrow or dropped
- The EOD message is formatted for easy copy-paste to Slack or email
- Run `--fathom` standalone anytime to import calls without doing the full wrap-up
- The streak resets if you miss all meaningful tasks for a day
