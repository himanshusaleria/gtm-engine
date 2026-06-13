# Good Morning Briefing

Daily morning briefing that pulls calendar, tasks, pipeline, and outreach data into one view.

## Invocation
- `/good-morning` — Full morning briefing
- `/good-morning --quick` — Calendar + tasks only
- `/good-morning --team` — Only team outreach audit

## Prerequisites
- Linear MCP installed and connected
- Google Workspace MCP (for calendar) — optional but recommended
- `config/config.yaml` exists (run `/setup` first)

## Instructions

Parse the argument (if any) from `$ARGUMENTS` to determine mode:
- If `$ARGUMENTS` contains `--quick` → quick mode
- If `$ARGUMENTS` contains `--team` → team-outreach-only mode
- Otherwise → full mode

**First:** Read `config/config.yaml` (relative to project root) to load all configuration. Extract:
- `config.linear.action_team` — the team name for action tasks (e.g., "GTM")
- `config.linear.pipeline_team` — the team name for deal tracking (e.g., "Sales")
- `config.linear.default_label` — label applied to engine-created tasks
- `config.linear.pipeline_stages` — list of pipeline stage names
- `config.team` — list of team members with roles and Linear user IDs
- `config.ritual.labels` — label names for daily-3, daily-2, parking-lot
- `config.ritual.meaningful_count` — number of meaningful tasks (default 3)
- `config.ritual.light_count` — number of light tasks (default 2)
- `config.integrations.outreach_sheet` — outreach spreadsheet settings
- `config.integrations.google_workspace.enabled` — whether calendar is available

Identify the **default assignee** = the team member with `is_default_assignee: true`.

**Resolve Linear team IDs (required):** Some Linear MCP servers (e.g., `linear-mcp-server`) hang indefinitely when issue searches are made without a `teamId`. Before any issue query:

1. Call `mcp__linear__list_teams` once
2. Match `action_team` and `pipeline_team` names to their UUIDs
3. Store them as `{action_team_id}` and `{pipeline_team_id}` for the rest of the session
4. If either name cannot be matched, surface a clear error and stop — do not run unscoped Linear searches

Every Linear issue query below MUST include `teamId` (the UUID).

### Step 0: Morning Quote

Start the briefing with a motivating quote. Pick a quote that is energizing, action-oriented, and relevant to building something from scratch — entrepreneurship, sales, persistence, courage, or doing hard things. Rotate quotes so the user doesn't see the same one twice in a row. Draw from founders, athletes, philosophers, writers — anyone whose words light a fire.

Format:
```
> "{quote}"
> — {attribution}
```

### Step 1: Get today's date and calendar (skip in --team mode)

1. Use `mcp__google-workspace__time_getCurrentDate` to get today's date
   - If Google Workspace MCP is not installed or `config.integrations.google_workspace.enabled` is false, use the current date from context and skip the calendar section
2. Use `mcp__google-workspace__calendar_listEvents` with `calendarId: "primary"`, `timeMin` = start of today (00:00:00 in local TZ), `timeMax` = end of today (23:59:59 in local TZ)
3. Format as a table: `| Time | Event |`
4. If calendar is empty, say "No events scheduled"

### Step 2: Tasks due today + overdue (skip in --team mode)

Using the action team name from config:

1. Use `mcp__linear__list_issues` with `assignee: "me"`, `teamId: "{action_team_id}"`, `state: "In Progress"` — show all in-progress tasks
2. Use `mcp__linear__list_issues` with `assignee: "me"`, `teamId: "{action_team_id}"`, `state: "Todo"` — show all todo tasks
3. Use `mcp__linear__list_issues` with `assignee: "me"`, `teamId: "{action_team_id}"`, `state: "Backlog"` — check for any with today's due date
4. From all results, separate into:
   - **Tasks due today** — due date matches today
   - **Overdue tasks** — due date is before today
   - **In Progress (no due date)** — currently being worked on
5. Format each section as: `| Task | Priority | Status | Due |`

### Step 2.5: Today's 3+2 Check (skip in --team mode)

Read the ritual label names from `config.ritual.labels` (meaningful label, light label, parking lot label).
Read the meaningful count (default 3) and light count (default 2) from `config.ritual`.

Show the tasks planned last night for today:

1. Use `mcp__linear__list_issues` with `teamId: "{action_team_id}"`, `assignee: "me"`, `label: "{meaningful_label}"` — filter to tasks with due date = today
2. Use `mcp__linear__list_issues` with `teamId: "{action_team_id}"`, `assignee: "me"`, `label: "{light_label}"` — filter to tasks with due date = today
3. Display:
   ```
   ### Today's {meaningful_count}+{light_count}

   **Meaningful:**
   1. [ ] {task}
   2. [ ] {task}
   3. [ ] {task}

   **Light:**
   1. [ ] {task}
   2. [ ] {task}
   ```
4. If fewer than `meaningful_count` meaningful tasks are tagged for today, flag: "Only X meaningful tasks planned for today. Want to add more?"
5. Quick confirm: "Good to go, or want to adjust?"
6. If user wants to adjust, handle adds/swaps:
   - New tasks → create in {action_team} Backlog with correct label (meaningful or light), due date today, assigned to the default assignee
   - Also add the default label from config
   - Swapped out tasks → remove the meaningful/light label and clear due date
7. If no meaningful or light tasks exist for today (system was not used last night), note: "No {meaningful_count}+{light_count} was planned last night. Want to plan now?" — if yes, suggest tasks using the same logic as good-night Step 8

**Monday bonus:** On Mondays, also surface ALL parking lot items:
1. Use `mcp__linear__list_issues` with `teamId: "{action_team_id}"`, `label: "{parking_lot_label}"`, `state: "Backlog"`
2. Display full parking lot table
3. Ask: "Weekly parking lot review — which to promote, drop, or keep?"

**Streak display:**
1. Read `memory/daily_streak.md` (relative to project root)
2. Show current streak: "**Streak: X days with {meaningful_count}/{meaningful_count} meaningful**"
3. If the streak file does not exist yet, show "No streak data yet — it will start tracking tonight."

**Nudge system:** Check if any template files in `my-context/` are empty or do not exist:
- `my-context/icp-definition.md` → "You haven't filled your ICP yet. Run /setup --icp to do it — takes 5 min."
- `my-context/persona-pain-map.md` → "Your persona map is empty. Run /setup --personas."
- `my-context/company-overview.md` → "Company overview isn't filled in. Run /setup --company."
- `my-context/signal-playbook.md` → "No signal playbook set up. Run /setup --signals."

Only show ONE nudge per session (pick the first empty one). Stop nudging once all are filled.

**If `--quick` mode, STOP HERE.** Output calendar + tasks + 3+2 sections and finish.

### Step 3: Pipeline check (full mode only)

Using the pipeline team name and pipeline stages from config:

1. Use `mcp__linear__list_issues` with `teamId: "{pipeline_team_id}"`, `state: "POC"` — active POCs (only if "POC" is in pipeline_stages)
2. Use `mcp__linear__list_issues` with `teamId: "{pipeline_team_id}"`, `state: "Agreement"` — deals in agreement (only if "Agreement" is in pipeline_stages)
3. Use `mcp__linear__list_issues` with `teamId: "{pipeline_team_id}"`, `state: "Demo Scheduled"` — upcoming demos (only if "Demo Scheduled" is in pipeline_stages)
4. If none of those specific stages exist in config, query the last 3 stages before "Closed Won" in the pipeline_stages list
5. Format as: `| Deal | Stage | Owner | Next Action |`
6. For each deal, note any pending action team follow-up tasks

### Step 4: Team Outreach Audit (full mode and --team mode)

**Only run this step if** `config.team` contains at least one member with `role: "sdr"` **AND** `config.integrations.outreach_sheet.enabled` is true. Otherwise skip entirely.

Find the SDR team member(s) from config. Use their `linear_user_id` for assignment and the `config.integrations.outreach_sheet.spreadsheet_id` for sheet access.

**Outreach sheet audit:**
1. Use `mcp__google-workspace__sheets_getRange` with the configured spreadsheet ID, range based on the sheet's column mapping from config
2. Parse the data:
   - Count profiles added this week (check date column against current week's Monday)
   - **Date formats vary** — check for: `"17 Feb"`, `"18Feb"` (no space), and ISO `"2026-03-04"` formats
   - Count by status: "Connection Pending", "Msg Reached out", "Replied", etc.
   - Flag **stale profiles**: status is "Connection Pending" and date added is >7 days ago
   - Flag **missing dates**: any row with a name but no date
3. List specific names for any flagged issues

**SDR daily task check:**
1. Use `mcp__linear__list_issues` with `assignee: "{sdr_linear_user_id}"`, `teamId: "{action_team_id}"`, `state: "Backlog"` or `state: "Todo"`
2. Check if there is already a task for today's outreach (title contains today's date or "daily outreach" with today's due date)
3. If NOT, create one:
   ```
   mcp__linear__save_issue:
     title: "Daily outreach — reach out to 5 new profiles ({today's date})"
     teamId: "{action_team_id}"
     assignee: "{sdr_linear_user_id}"
     labels: ["{default_label}"]
     state: "Backlog"
     dueDate: "{today's date}"
     description: |
       Daily outreach task. Target: 5 new connection requests/messages today.

       Check the outreach tracking sheet for pending profiles.
   ```
4. If a task already exists, note it and skip creation

**If `--team` mode, STOP HERE.** Output only the team outreach audit section.

### Step 5: Follow-ups due (full mode only)

1. Use `mcp__linear__list_issues` with `teamId: "{action_team_id}"`, `assignee: "me"`, `label: "{default_label}"` — check due dates
2. Filter to tasks due today or overdue
3. Format as: `| Follow-up | Lead | Due | Status |`

### Step 6: Suggested Priority Order (full mode only)

Based on all gathered data, suggest a priority-ordered list:
1. Overdue tasks first
2. Calendar meetings that need prep
3. Active deal follow-ups (late pipeline stages)
4. Tasks due today
5. New outreach/prospecting

## Output Format

```markdown
## Good Morning — {date}

### Calendar
| Time | Event |
|------|-------|
| ... | ... |

### Tasks — In Progress
| Task | Priority | Due |
|------|----------|-----|
| ... | ... | ... |

### Tasks — Due Today
| Task | Priority | Status |
|------|----------|--------|
| ... | ... | ... |

### Today's {meaningful_count}+{light_count}
**Meaningful:**
1. [ ] {task}
2. [ ] {task}
3. [ ] {task}

**Light:**
1. [ ] {task}
2. [ ] {task}

**Streak: X days with {meaningful_count}/{meaningful_count} meaningful**

### Overdue
| Task | Priority | Due | Days Late |
|------|----------|-----|-----------|
| ... | ... | ... | ... |

### Pipeline — Active Deals
| Deal | Stage | Next Action |
|------|-------|-------------|
| ... | ... | ... |

### Team Outreach Audit
- Profiles added this week: X
- Connection pending: X (Y stale >7 days)
- Messages sent: X
- Issues: [list specific names and problems]
- Daily task: [Created / Already exists]

### Follow-ups Due
| Follow-up | Lead | Due |
|-----------|------|-----|
| ... | ... | ... |

### Suggested Priority Order
1. ...
2. ...
3. ...
```

## Important Notes
- Always use actual data — do not fabricate or assume
- If Google Workspace MCP is not installed, skip the calendar section and note it
- If outreach sheet is not configured (`enabled: false`), skip team audit entirely
- If a sheet read fails, note the error and continue with other sections
- If calendar is empty, say "No events scheduled"
- Flag anything that looks like it needs immediate attention with a warning
- Keep the output scannable — tables over paragraphs
- All file paths are relative to the project root unless otherwise stated
