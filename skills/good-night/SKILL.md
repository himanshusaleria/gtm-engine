# Good Night Wrap-up

End-of-day review that summarizes accomplishments, drafts EOD message, previews tomorrow, and optionally syncs call recordings.

## Invocation
- `/good-night` — Full evening wrap-up
- `/good-night --quick` — Skip call sync, just summary + EOD + tomorrow
- `/good-night --calls` — Only fetch and save calls (if call recording enabled)

## Prerequisites
- Linear MCP installed and connected
- Google Workspace MCP (optional, for calendar)
- `config/config.yaml` exists (run `/setup` first)

## Instructions

Parse the argument (if any) from `$ARGUMENTS` to determine mode:
- If `$ARGUMENTS` contains `--quick` → quick mode (skip call sync)
- If `$ARGUMENTS` contains `--calls` → calls-only mode
- Otherwise → full mode

**First:** Read `config/config.yaml` (relative to project root) to load all configuration. Extract:
- `config.linear.action_team` — action task team name
- `config.linear.pipeline_team` — pipeline tracking team name
- `config.linear.default_label` — label for engine-created tasks
- `config.team` — team members, roles, and Linear user IDs
- `config.ritual.labels` — meaningful, light, and parking lot label names
- `config.ritual.meaningful_count` — number of meaningful tasks (default 3)
- `config.ritual.light_count` — number of light tasks (default 2)
- `config.ritual.meaningful_definition` — what counts as meaningful
- `config.ritual.light_definition` — what counts as light
- `config.integrations.call_recording` — call recording provider settings (provider, api_key_env, enabled)
- `config.integrations.outreach_sheet` — outreach spreadsheet settings
- `config.integrations.google_workspace.enabled` — whether calendar is available

Identify the **default assignee** = the team member with `is_default_assignee: true`.

**Resolve Linear team IDs (required):** Some Linear MCP servers (e.g., `linear-mcp-server`) hang indefinitely when issue searches are made without a `teamId`. Before any issue query:

1. Call `mcp__linear__list_teams` once
2. Match `action_team` and `pipeline_team` names to their UUIDs
3. Store them as `{action_team_id}` and `{pipeline_team_id}` for the rest of the session
4. If either name cannot be matched, surface a clear error and stop — do not run unscoped Linear searches

Every Linear issue query below MUST include `teamId` (the UUID). The `team` name parameter is kept for readability but is not a substitute.

### Step 1: Get today's date and timezone

Use `mcp__google-workspace__time_getCurrentDate` to get today's date and timezone.
- If Google Workspace MCP is not available, use the current date from context.

### Step 2: Fetch calls (skip in --quick mode)

**Only run if** `config.integrations.call_recording.enabled` is true. Otherwise skip entirely.

**If `--calls` mode or full mode:**

1. Read `memory/call_sync.md` (relative to project root) to get the last synced tracking info. Look for `last_imported_call_date` and `last_imported_recording_id`. If the file does not exist, this is the first sync — fetch the most recent 20 calls.
2. Determine the provider from `config.integrations.call_recording.provider` and call the appropriate API:
   - **Fathom:** `curl -s -H "X-Api-Key: ${api_key_env_value}" "https://api.fathom.ai/external/v1/meetings?limit=20"`
   - **Fireflies:** `curl -s -X POST "https://api.fireflies.ai/graphql" -H "Authorization: Bearer ${api_key_env_value}" -H "Content-Type: application/json" -d '{"query": "{ transcripts { id title date duration organizer_email participants sentences { speaker_name text } } }"}'`
   - **Otter/Grain/other:** Prompt user to paste or drop a transcript file instead
   - Filter results to calls created after the last synced datetime
3. Present calls in a table:
   ```
   | # | Date | Title | Duration | Attendees |
   ```
4. Ask the user: "Which calls should I save? (Enter numbers, 'all', or 'none')"
5. For each selected call:
   - Fetch full transcript and summary using the provider-appropriate API endpoints (see `/sync-calls` SKILL.md for details)
   - Save transcript to `my-context/call-transcripts/{date}_{sanitized_title}.md` (relative to project root) with:
     - YAML frontmatter (title, date, attendees, duration, recording_id, source provider)
     - Summary/key points section
     - Full transcript
6. Update `memory/call_sync.md` with the new last-synced date and recording_id

**If `--calls` mode, STOP HERE** after saving calls.

### Step 3: Today's {meaningful_count}+{light_count} Scorecard (skip in --calls mode)

Read the ritual settings from config. Use the label names for meaningful and light tasks.

Before listing completed tasks, check how today's planned tasks went:

1. Use `mcp__linear__list_issues` with `teamId: "{action_team_id}"`, `assignee: "me"`, `label: "{meaningful_label}"` — filter to tasks with due date = today
2. Use `mcp__linear__list_issues` with `teamId: "{action_team_id}"`, `assignee: "me"`, `label: "{light_label}"` — filter to tasks with due date = today
3. For each, check if state is "Done"
4. Display:
   ```
   ### Today's {meaningful_count}+{light_count} Score

   **Meaningful: X/{meaningful_count} completed**
   - [x] {done task}
   - [ ] {not done — reschedule?}

   **Light: X/{light_count} completed**
   - [x] {done task}
   - [ ] {not done}
   ```
5. For incomplete meaningful tasks, ask: "Move to tomorrow or drop?"
6. After user responds, process incomplete tasks:
   - If moving to tomorrow → update due date to tomorrow (keep labels)
   - If dropping → remove the meaningful/light label
7. For completed tasks, **remove the meaningful and light labels** (cleanup so labels stay fresh for next day)
8. Read the streak file at `memory/daily_streak.md` (relative to project root). Create it if it does not exist, with this header:
   ```
   # Daily Streak

   | Date | Meaningful | Light | Notes |
   |------|------------|-------|-------|
   ```
9. Append today's row: `| {date} | {X}/{meaningful_count} | {X}/{light_count} | {notes} |`
10. Calculate and display: `**Streak: X days with {meaningful_count}/{meaningful_count} meaningful**` (count consecutive days with full meaningful completion from most recent backwards)

If no meaningful or light tasks exist for today (system was not used last night), skip this step silently and note "No {meaningful_count}+{light_count} planned for today" in the output.

### Step 3b: Tasks completed today (skip in --calls mode)

1. Use `mcp__linear__list_issues` with `assignee: "me"`, `teamId: "{action_team_id}"`, `state: "Done"`, `updatedAt: "-P1D"` — tasks completed recently
2. Filter to tasks whose completion happened today (check updatedAt)
3. Format as: `| Task | Priority | Completed |`

### Step 4: Tasks still open (skip in --calls mode)

1. Use `mcp__linear__list_issues` with `assignee: "me"`, `teamId: "{action_team_id}"`, `state: "In Progress"` — still open
2. Use `mcp__linear__list_issues` with `assignee: "me"`, `teamId: "{action_team_id}"`, `state: "Todo"` — not started
3. Identify tasks that were due today but not completed
4. For uncompleted tasks, suggest new due dates (tomorrow or next business day)
5. Ask: "Want me to update the due dates for incomplete tasks?"

### Step 5: Day summary (skip in --calls mode)

Generate a concise 2-3 sentence summary of what was accomplished today based on:
- Completed tasks
- Calls taken (from call sync if available)
- Any deals that moved stages
- Any notable follow-ups sent

### Step 6: EOD message (skip in --calls mode)

Draft an end-of-day message in this format:

```
**EOD Update — {date}**

**Done today:**
- {completed task/activity 1}
- {completed task/activity 2}
- ...

**Tomorrow:**
- {task/meeting 1}
- {task/meeting 2}
- ...
```

Rules for the EOD message:
- Keep items concise (one line each)
- Include calls/meetings attended under "Done today"
- Include both calendar events and due tasks under "Tomorrow"
- Group similar items (e.g., "3 follow-up emails sent" instead of listing each)
- Present the message and ask: "Want me to post this somewhere, or copy it?"

### Step 7: Tomorrow preview (skip in --calls mode)

1. If Google Workspace MCP is available: use `mcp__google-workspace__calendar_listEvents` with `calendarId: "primary"`, `timeMin` = start of tomorrow, `timeMax` = end of tomorrow
2. Use `mcp__linear__list_issues` with `assignee: "me"`, `teamId: "{action_team_id}"` — filter to tasks due tomorrow
3. Format as:
   ```
   ### Tomorrow — {date}

   **Calendar:**
   | Time | Event |
   |------|-------|

   **Tasks Due:**
   | Task | Priority |
   |------|----------|
   ```

### Step 8: Plan Tomorrow's {meaningful_count}+{light_count} (skip in --calls mode)

Plan tomorrow's meaningful and light tasks using data already gathered:

1. **Gather inputs** (most already fetched in earlier steps):
   - Tomorrow's calendar (from Step 7)
   - Open action team tasks — In Progress, Todo, Backlog (from Step 4)
   - Pipeline deals needing action (from context)
   - Parking lot items: `mcp__linear__list_issues` with `teamId: "{action_team_id}"`, `label: "{parking_lot_label}"`, `state: "Backlog"`

2. **Surface parking lot** — show top 5 items sorted by priority then age (oldest first):
   ```
   ### Parking Lot (X items)
   | # | Task | Created | Age |
   |---|------|---------|-----|
   | 1 | ... | Mar 8 | 2d |
   | 2 | ... | Mar 5 | 5d |
   ```
   Ask: "Want to pull any of these into tomorrow's {meaningful_count}+{light_count}?"

3. **Suggest {meaningful_count} meaningful + {light_count} light tasks** for tomorrow, categorized:
   ```
   ### Tomorrow's {meaningful_count}+{light_count}

   **Meaningful (must do):**
   1. [task — why it matters]
   2. [task — why it matters]
   3. [task — why it matters]

   **Light (keep moving):**
   1. [task]
   2. [task]
   ```

   **What counts as "meaningful"** — read from `config.ritual.meaningful_definition`. Default examples:
   - Test a new GTM strategy
   - Identify/validate a new intent signal
   - Reach out to prospects (outreach, cold email)
   - Find new channels/ways to reach prospects
   - Follow up with existing pipeline
   - Do a sales/discovery call
   - Write content (framework, experiment writeup)
   - Run a new experiment

   **What counts as "light"** — read from `config.ritual.light_definition`. Default examples:
   - Respond to messages
   - Update Linear/CRM
   - Schedule meetings
   - Review team member output
   - Admin/housekeeping

4. Ask: "Does this look right, or want to swap anything?"

5. After user confirms, **tag tasks in Linear**:
   - For each meaningful task:
     - If it already exists in Linear → add the meaningful label and set due date to tomorrow
     - If it does not exist → create in {action_team} Backlog with the meaningful label, due date tomorrow, assigned to default assignee. Also add the default label from config.
   - For each light task:
     - If it already exists in Linear → add the light label and set due date to tomorrow
     - If it does not exist → create in {action_team} Backlog with the light label, due date tomorrow, assigned to default assignee. Also add the default label from config.

### Step 9: Team end-of-day check (full mode only, skip in --quick and --calls)

**Only run this step if** `config.team` contains at least one member with `role: "sdr"` **AND** `config.integrations.outreach_sheet.enabled` is true. Otherwise skip entirely.

Find the SDR team member(s) from config. Use their `linear_user_id` and the configured outreach spreadsheet.

1. Use `mcp__google-workspace__sheets_getRange` with the configured spreadsheet ID and appropriate range
2. Check if the SDR added or updated any profiles today (look at date columns matching today)
3. Quick summary:
   ```
   ### {SDR name} Today
   - Profiles added: X
   - Messages sent: X
   - Status updates: X
   ```
4. If nothing was updated today, flag: "No updates from {SDR name} today — follow up tomorrow"

## Output Format

```markdown
## Good Night — {date}

### Calls Synced
| # | Date | Title | Duration |
|---|------|-------|----------|
| ... | ... | ... | ... |
[Saved: X calls / No new calls / Call sync disabled]

### Today's {meaningful_count}+{light_count} Score
**Meaningful: X/{meaningful_count} completed**
- [x] {done task}
- [ ] {not done}

**Light: X/{light_count} completed**
- [x] {done task}
- [ ] {not done}

**Streak: X days with {meaningful_count}/{meaningful_count} meaningful**

### Completed Today
| Task | Priority |
|------|----------|
| ... | ... |

### Still Open
| Task | Priority | Due | Suggested New Date |
|------|----------|-----|--------------------|
| ... | ... | ... | ... |

### Day Summary
{2-3 sentence summary}

### EOD Message
```
**EOD Update — {date}**

**Done today:**
- ...

**Tomorrow:**
- ...
```

### Tomorrow — {date}

**Calendar:**
| Time | Event |
|------|-------|
| ... | ... |

**Tasks Due:**
| Task | Priority |
|------|----------|
| ... | ... |

### Parking Lot (X items)
| # | Task | Created | Age |
|---|------|---------|-----|
| ... | ... | ... | ... |

### Tomorrow's {meaningful_count}+{light_count}

**Meaningful (must do):**
1. [task — why it matters]
2. [task — why it matters]
3. [task — why it matters]

**Light (keep moving):**
1. [task]
2. [task]

### {SDR name} Today
- Profiles added: X
- Messages sent: X
- Updates: X
```

### Step 10: Evening Quote

End the wrap-up with a fulfilling, contentment-oriented quote. Pick a quote that is calming, reflective, and acknowledges the value of the work done — themes of gratitude, progress, patience, perspective, or inner peace. Rotate quotes so the user doesn't see the same one twice in a row. Draw from philosophers, poets, writers, spiritual thinkers — anyone whose words bring a sense of fulfillment.

Format:
```
> "{quote}"
> — {attribution}
```

## Important Notes
- Always use actual data — do not fabricate or assume
- If call recording is not enabled in config, skip call sync entirely and note "Call sync disabled"
- If the call recording API fails, note the error and continue with other sections
- If Google Workspace MCP is not available, skip calendar sections
- If no tasks were completed, still generate the EOD with meetings/activities
- The EOD message should be ready to copy-paste — clean formatting, no extra markup
- For call transcript saving, sanitize filenames (replace spaces with underscores, remove special chars)
- Update `memory/call_sync.md` ONLY after successfully fetching calls
- All file paths are relative to the project root unless otherwise stated
- If outreach sheet is not configured, skip team end-of-day check entirely
