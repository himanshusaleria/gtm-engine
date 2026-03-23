# Linear Setup Guide

Linear is the CRM backbone of the GTM Engine. This guide explains the two-team workflow and how to set it up.

## The Two-Team System

The GTM Engine uses two Linear teams to separate concerns:

### Pipeline Team (default: "Sales")

**Purpose:** Track leads and deals through your sales pipeline.

Each issue = one prospect/company. Issues move through stages as the deal progresses.

**Recommended workflow states:**

| State | Type | When |
|-------|------|------|
| Backlog | backlog | New lead identified, not yet contacted |
| Todo | unstarted | Queued for outreach |
| Connection Started | started | First contact made |
| Discovery | started | Having conversations, learning about them |
| Qualified | started | Confirmed ICP fit + pain + budget |
| Demo Scheduled | started | Demo or deep-dive booked |
| POC | started | Running a proof of concept |
| Agreement | started | Discussing terms/pricing |
| Closed Won | completed | Deal closed, they're a customer |
| Closed Lost | completed | Deal didn't work out |

### Action Team (default: "GTM")

**Purpose:** Track tasks, follow-ups, outreach, and operational work.

Each issue = one action item. These are the things you DO every day.

**Recommended workflow states:**

| State | Type |
|-------|------|
| Backlog | backlog |
| Todo | unstarted |
| In Progress | started |
| Done | completed |
| Canceled | canceled |

## Required Labels

Create these labels in your Action team:

| Label | Color | Purpose |
|-------|-------|---------|
| `daily-3` | Red | Meaningful tasks for today |
| `daily-2` | Blue | Light tasks for today |
| `parking-lot` | Yellow | Ideas to revisit later |
| `gtm-engine` | (your choice) | Auto-applied to all engine-created tasks |

## Cross-Team Linking

The engine maintains connections between pipeline deals and action tasks:

```
Pipeline: SAL-42 "Acme Inc"
  ↓ references
Action: GTM-108 "Follow up with Acme CTO — send case study"
  ↓ on completion, updates
Pipeline: SAL-42 description gets timeline note
```

**How it works:**
1. When you create an action task related to a pipeline deal, the engine adds the pipeline ticket ID to the description
2. When you complete an action task, the engine can update the pipeline ticket
3. The `/good-morning` briefing shows both pipeline status and related action tasks

## Team Members

Each team member needs:
1. A Linear account (invite them to your workspace)
2. Their Linear user ID (found via Linear MCP: `list_users`)
3. A role assignment in your config

**Roles:**
- `founder` — default assignee, sees everything
- `sdr` — outreach tasks, profile management
- `cs` — customer success, POC support
- `engineer` — product/technical tasks
- `other` — custom role

## Setting Up Pipeline Stages

### Option A: Use Linear UI

1. Go to your Pipeline team settings
2. Under "Workflow," add/rename states to match the recommended stages
3. Set state types (backlog, unstarted, started, completed)

### Option B: During /setup

The `/setup` wizard asks about your pipeline stages and can help configure them.

## Daily Workflow

```
Morning (/good-morning):
  → See calendar + tasks + pipeline
  → Confirm today's 3+2 plan
  → Check team outreach (if SDR configured)

During the day:
  → Work on tasks, mark Done
  → "Park this" → creates parking-lot task
  → New outreach → draft on action ticket

Evening (/good-night):
  → Score today's 3+2
  → Sync call recordings
  → Draft EOD message
  → Plan tomorrow's 3+2
```

## Tips

- **Keep pipeline issues updated** — the briefing pulls from current state
- **Use action task descriptions** for context — what, why, and "done" criteria
- **Don't over-create tasks** — combine related items into one issue
- **Use parking-lot liberally** — capture ideas without cluttering your day
- **Weekly parking-lot review** — Monday `/good-morning` surfaces all parked items
