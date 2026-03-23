# GTM Engine Setup Wizard

Interactive setup wizard that configures the GTM Engine for a new user. Collects company context, team info, ICP, personas, messaging, and signals, then generates all config and context files.

## Invocation
- `/setup` -- Full 8-step wizard
- `/setup --icp` -- Just ICP Workshop (Step 4)
- `/setup --personas` -- Just Pain & Persona Mapping (Step 5)
- `/setup --messaging` -- Just Messaging & Objections (Step 6)
- `/setup --signals` -- Just Signal Playbook (Step 7)
- `/setup --reinstall` -- Regenerate config, CLAUDE.md, and reinstall skills from current config

## Instructions

Parse `$ARGUMENTS` to determine mode:
- If `$ARGUMENTS` contains `--icp` -> run only Step 4
- If `$ARGUMENTS` contains `--personas` -> run only Step 5
- If `$ARGUMENTS` contains `--messaging` -> run only Step 6
- If `$ARGUMENTS` contains `--signals` -> run only Step 7
- If `$ARGUMENTS` contains `--reinstall` -> run only Step 8
- Otherwise -> run Steps 1 through 8 in order

For individual steps (--icp, --personas, --messaging, --signals), first read `config/config.yaml` to load existing config. If it does not exist, tell the user to run `/setup` first.

---

### Step 1: Welcome + Stack Discovery

Display this welcome message:

```
## Welcome to the GTM Engine

This is a Claude Code-powered sales system that gives you:
- Sales frameworks baked into every conversation
- Daily rituals (/good-morning, /good-night) to stay focused
- Self-improving skills that learn from your feedback
- Linear-based pipeline + task management

Let's get you set up. This takes about 10-15 minutes.
You can skip sections and come back to them later with flags like /setup --icp.
```

Then ask these questions one at a time, waiting for each answer:

1. "What **CRM/project tracker** do you use? Linear is required for the GTM Engine."
   - If they say Linear -> proceed
   - If they say something else -> explain Linear is required, link to https://linear.app, ask them to set it up first
   - Store: `linear_confirmed = true`

2. "Do you use a **call recording tool** for sales calls? (e.g., Fathom, Fireflies, Otter, Grain, or something else)"
   - If they name a tool -> `call_recording_enabled = true`, `call_recording_provider = "{tool_name_lowercase}"` (e.g., "fathom", "fireflies", "otter", "grain")
   - If none -> `call_recording_enabled = false`

3. "Do you use **Google Workspace** (Gmail, Google Calendar, Google Sheets)?"
   - If yes -> `google_workspace_enabled = true`
   - If no -> `google_workspace_enabled = false`

4. "Will you use a **Google Sheet** to track outreach/leads?"
   - If yes -> ask for the spreadsheet ID (the long string in the URL) -> `outreach_sheet_enabled = true`, store ID
   - If no -> `outreach_sheet_enabled = false`

Summarize what integrations will be enabled and confirm before proceeding.

---

### Step 2: MCP Installation

Based on the integrations from Step 1, guide the user through MCP server setup.

**Always required -- Linear MCP:**

Say: "The Linear MCP server connects Claude Code to your Linear workspace. Let me check if it's already installed."

1. Try calling `mcp__linear__list_teams` to test the connection
   - If it works -> "Linear MCP is connected! Found your teams: [list team names]"
   - If it fails -> Guide installation:

```
To install the Linear MCP server:

1. Get your Linear API key from Settings -> API -> Personal API keys
2. Add this to your Claude Code MCP config:

   Server name: linear
   Command: npx
   Args: ["@anthropic/linear-mcp-server"]
   Env: LINER_API_KEY=your-key-here

See docs/mcp-setup.md for detailed instructions.
```

Wait for user to confirm it's working, then verify with `mcp__linear__list_teams` again.

**If Google Workspace enabled:**

Say: "The Google Workspace MCP server connects Gmail, Calendar, Sheets, and Docs."

1. Try calling `mcp__google-workspace__time_getCurrentDate` to test
   - If it works -> "Google Workspace MCP is connected!"
   - If it fails -> Guide installation, referencing docs/mcp-setup.md

**If call recording enabled (API-based provider — fathom, fireflies):**

Say: "Your call recording tool ({provider}) uses an API key stored in your .env file."

1. Check if `.env` file exists in the repo root
2. Determine the env var name based on provider:
   - Fathom -> `FATHOM_API_KEY` (get from Fathom Settings -> Integrations -> API)
   - Fireflies -> `FIREFLIES_API_KEY` (get from Fireflies Settings -> Integrations -> API)
3. If `.env` doesn't exist or doesn't contain the key, tell user to add it: `{ENV_VAR_NAME}=your-key-here`
4. Explain where to find the API key for their specific provider

**If call recording enabled (manual provider — otter, grain, etc.):**

Say: "{provider} doesn't require an API key. You can import transcripts manually using `/sync-calls` — it will prompt you to paste or drop transcript files."

---

### Step 3: Company Context

Ask these questions one at a time:

1. "What is your **company name**?"
2. "What is your **product name**?" (may be same as company name)
3. "What is your **website URL**?"
4. "Give me a **one-liner** -- one sentence that explains what you do."
5. "What **stage** are you at?" (Pre-revenue / Early revenue / Scaling)
6. "What is your **first name**?" (for content voice -- "I" perspective)

Then ask about Linear teams:

7. "In Linear, what is your **pipeline tracking team** called? (default: 'Sales')"
   - If they just press enter or say default -> use "Sales"
8. "What is your **action/tasks team** called? (default: 'GTM')"
   - If they just press enter or say default -> use "GTM"
9. "What **label** should be applied to all engine-created tasks? (default: 'gtm-engine')"

Then ask about team members:

10. "Let's set up your team. I'll look up Linear user IDs for you."
    - Call `mcp__linear__list_users` to get all users
    - Display the list: "Here are the users in your Linear workspace: [table of name, email, ID]"
    - Ask: "Which one is **you** (the default assignee)?" -> store their user ID
    - Ask: "Any other team members to add? For each, tell me their name, role (sdr/cs/engineer/other), and which user from the list above."
    - Repeat until user says "done" or "that's all"

Store all values for config generation in Step 8.

---

### Step 4: ICP Workshop

**If user chose to skip:** Display "Skipping ICP for now. You can run `/setup --icp` anytime to come back to this." and move to Step 5.

Say:

```
## ICP Workshop

Let's define your Ideal Customer Profile using a three-layer model:
- **IMP** (Ideal Market Profile) -- which markets to target
- **ICP** (Ideal Customer Profile) -- which companies within those markets
- **IPP** (Ideal Prospect Profile) -- which people within those companies

This usually takes 5-10 minutes.
```

**IMP Layer:**

Ask:
1. "What **industry or vertical** are your best customers in? (can be multiple)"
2. "What **geography** do you target? (global, US-only, India, etc.)"
3. "What **market trend** is driving demand for your product right now?"

**ICP Layer:**

Ask:
1. "What **company size** (employees) is your sweet spot? (e.g., 10-500)"
2. "Any **tech stack requirements**? (e.g., must use React, must have CI/CD)"
3. "Any **org structure** signals? (e.g., must have a QA team, must have product team)"
4. "What does their **buying process** look like? (founder decides, committee, procurement)"

**IPP Layer:**

Ask:
1. "What **title/role** is your primary buyer? (the person who says yes)"
2. "Who is the **champion** inside the org? (the person who pushes for you)"
3. "What **KPIs** does your buyer own?"
4. "Where does your buyer **hang out** online? (LinkedIn, Twitter, Slack communities, etc.)"

**Scoring and No-Go Rules:**

1. Show the default scoring criteria from the template and ask: "Want to customize these criteria, or are the defaults good?"
   - If customize -> walk through each criterion, let them edit
2. Ask: "What are your **no-go rules**? Companies you should NEVER pursue, regardless of score. (e.g., 'Enterprise 5000+ employees', 'Government contracts')"
   - Collect until user says done

**Generate the file:**

Read the template from `templates/icp-definition.md`, fill in all collected answers, and write to `my-context/icp-definition.md`.

Show the user what was generated and ask: "Does this look right? Want to change anything?"

---

### Step 5: Pain & Persona Mapping

**If user chose to skip:** Display "Skipping personas for now. Run `/setup --personas` anytime." and move to Step 6.

Say:

```
## Pain & Persona Mapping

Let's map out your buyer personas and their pains.
We'll do 2-3 personas. For each one, I'll ask about their world and what hurts.
```

For each persona (repeat 2-3 times):

1. "What is the **title/role** of this persona? (e.g., VP of Engineering, QA Lead)"
2. "Who do they **report to**?"
3. "What do they **care about most** in their day-to-day?"
4. "What are their **top 3 pains** related to the problem you solve?"
   - For each pain, ask: "How does this pain **impact** them? How often?"
5. "How do they **currently solve** this problem? (manual process, competitor tool, ignore it)"
6. "What **triggers** them to start looking for a solution?"
7. "What **objections** do they typically raise?"
8. "What's the best **channel** to reach them?"

Ask: "Want to add another persona?" -> repeat or move on.

**Generate the file:**

Read the template from `templates/persona-pain-map.md`, fill in all collected answers, and write to `my-context/persona-pain-map.md`.

Build the Persona-Pain Matrix at the bottom by cross-referencing all pains across all personas (High/Medium/Low relevance for each).

---

### Step 6: Messaging & Objections

**If user chose to skip:** Display "Skipping messaging for now. Run `/setup --messaging` anytime." and move to Step 7.

**Part A: Company Overview**

Say: "Let me generate your company overview based on what you've told me so far."

1. Read the template from `templates/company-overview.md`
2. Pre-fill what you already know from Step 3 (company name, product, website, one-liner, stage)
3. Ask:
   - "Can you give me **2-3 paragraphs** describing what your product does, who it's for, and how it works?"
   - "**Why now?** What market shift or trend makes this the right time?"
   - "What are your **top 3 differentiators** vs. alternatives?"
   - "What's your **current traction**? (customers, revenue, key metrics)"
   - "Who are your **main competitors**? For each, what do they do and what's your advantage?"
4. Write to `my-context/company-overview.md`

**Part B: Objections Playbook**

Say:

```
## Objections Playbook

Let's document the objections you hear most often.
For each one, we'll build a response framework.
```

Ask: "What are the **top 5 objections** you hear from prospects? Give me the exact words they say."

For each objection:
1. "Why do they say this? What's the **root cause** or underlying fear?"
2. "What **evidence or proof** do you have to counter it? (case studies, data, demos)"
3. "When do you hear this? Which **persona** and which **stage** of the sales process?"

Read template from `templates/objections-playbook.md`, fill in answers, write to `my-context/objections-playbook.md`.

---

### Step 7: Signal Playbook

**If user chose to skip:** Display "Skipping signals for now. Run `/setup --signals` anytime." and move to Step 8.

Say:

```
## Signal Playbook

Intent signals tell you WHEN to reach out. Let's catalog the signals
that indicate a company might need your product.
```

Walk through each signal category:

1. **Hiring Signals:** "What **job postings** indicate a company needs your product? (e.g., 'Hiring a QA engineer' means they're investing in testing)"
2. **Tech Stack Signals:** "What **technologies** in their stack indicate fit? (e.g., 'Uses Selenium' means they have test automation)"
3. **Content/Event Signals:** "What **content or events** indicate interest? (e.g., 'CTO posts about testing challenges on LinkedIn')"
4. **Pain Trigger Signals:** "What **events** create urgency? (e.g., 'Production outage', 'Failed audit', 'Negative reviews')"
5. **Competitive Signals:** "What **competitor usage** signals are relevant? (e.g., 'Currently using X', 'Contract renewal')"

For each signal they mention:
- Ask: "How **strong** is this signal? (Strong / Medium / Weak)"
- Ask: "Where do you **find** this signal?"
- Ask: "What should you **do** when you see it?"

Read template from `templates/signal-playbook.md`, fill in answers, write to `my-context/signal-playbook.md`.

---

### Step 8: Finalize

This step generates all config files and completes setup.

**8a: Generate config/config.yaml**

Read `config/config.example.yaml` as the schema reference. Generate `config/config.yaml` with all values collected during setup:

- Company section: name, product, website, one_liner, stage
- Team section: all team members with name, role, linear_user_id, is_default_assignee
- Linear section: pipeline_team, action_team, default_label, pipeline_stages (use defaults), canceled_spelling
- Integrations section: google_workspace.enabled, call_recording.enabled + provider + api_key_env, outreach_sheet.enabled + spreadsheet_id
- ICP section: scoring_criteria (from Step 4 or defaults), no_go_rules, tiers
- Content section: creator_name, platforms, audience, voice_notes
- Ritual section: use defaults from config.example.yaml, set cohort.enabled = false
- last_seen_version: read from VERSION file

**8b: Generate CLAUDE.md**

Generate a CLAUDE.md file in the repo root with:

```markdown
# GTM Engine — [Company Name]

## Project
This is the GTM Engine for [Company Name]. It contains sales frameworks, customer context, and automated skills for running outbound sales with Claude Code.

## Linear Configuration
- **Pipeline team (leads/deals):** [pipeline_team]
- **Action team (tasks/follow-ups):** [action_team]
- **Default label:** [default_label]
- **Default assignee:** [default person name] — user ID `[their ID]`
[For each additional team member:]
- **[Name] ([Role]):** user ID `[their ID]` — [role-appropriate task description]

## Linear Two-Team Workflow

### [pipeline_team] team = Pipeline tracking (leads/deals only)
### [action_team] team = Action tasks (follow-ups, emails, outreach, CS, strategy)

**Cross-team rules:**
- When creating a [action_team] task for a [pipeline_team] lead, always reference the ticket ID in the description
- When updating a [pipeline_team] deal, check if a [action_team] follow-up task is needed
- When completing a [action_team] task, update the corresponding [pipeline_team] ticket

**Email/Message workflow:**
1. Draft emails/messages as comments on the relevant [action_team] ticket
2. After user confirms sent, create a follow-up task in [action_team] Backlog with a due date
3. Follow-up timing: 2-3 days for warm leads, 1 week for cold outreach

## Sales Frameworks Reference
[List all frameworks in frameworks/ as a table: Framework | File | When to Apply]

## Key Context Files
- Company overview: `my-context/company-overview.md`
- ICP definition: `my-context/icp-definition.md`
- Persona-pain map: `my-context/persona-pain-map.md`
- Objections playbook: `my-context/objections-playbook.md`
- Signal playbook: `my-context/signal-playbook.md`

## Config
- Config file: `config/config.yaml`
- To update config: edit directly or run `/setup --reinstall`
- To check for updates: run `/whats-new`
```

Populate the frameworks table by reading all `.md` files in `frameworks/` and listing them.

**8c: Install skills**

Copy skill SKILL.md files from `skills/` to `~/.claude/skills/`:

1. List all subdirectories in `skills/`
2. For each skill directory that contains a SKILL.md:
   - Create `~/.claude/skills/[skill-name]/` if it doesn't exist
   - Copy the SKILL.md file there
   - If the skill has a `learnings.md`, create an empty one in the destination
3. Skip skills that require integrations the user doesn't have:
   - `sync-calls` -> skip if call_recording not enabled
   - Skills that heavily use Google Workspace -> skip if not enabled

Report which skills were installed.

**8d: Create support files**

1. Create `memory/` directory if it doesn't exist
2. Create `memory/daily_streak.md` with initial content:
```markdown
# Daily 3+2 Streak

## Current Streak: 0 days
## Last Scored: never
## History
| Date | Meaningful (done/planned) | Light (done/planned) | Score |
|------|--------------------------|---------------------|-------|
```

**8e: Show summary**

Display a summary:

```
## Setup Complete!

### Company
- [Company name] ([stage])
- [one-liner]

### Linear
- Pipeline: [pipeline_team] | Tasks: [action_team]
- Label: [default_label]
- Team: [list names and roles]

### Integrations
- Linear: Connected
- Google Workspace: [Enabled/Disabled]
- Call Recording: [Enabled/Disabled] ([provider name] if enabled)
- Outreach Sheet: [Enabled/Disabled]

### Context Files Generated
- [list each my-context/ file that was created]
- [show "skipped" for any that were skipped]

### Skills Installed
- [list each skill installed to ~/.claude/skills/]

### What's Next
- Try `/good-morning` to see your first daily briefing
- Run `/setup --icp` if you skipped the ICP workshop
- Run `/whats-new` to check for updates anytime
```

---

## Important Notes

- Always wait for user responses before proceeding to the next question
- If user says "skip" at any step, mark it as skipped and move on
- For individual step flags (--icp, --personas, etc.), read existing config first and only run that step
- For --reinstall, read existing config.yaml, regenerate CLAUDE.md, and re-copy skills
- Never overwrite my-context/ files without asking -- if a file already exists, ask "This file already exists. Overwrite it?"
- Use markdown formatting in all generated files
- All file paths are relative to the repo root
