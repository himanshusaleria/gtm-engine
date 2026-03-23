# /sync-calls — Import Call Recordings

Fetch recent call recordings from your configured call recording provider, import transcripts, and save them as structured markdown files.

## Usage

- `/sync-calls` — Fetch new calls since last sync
- `/sync-calls --all` — Show all recent calls (ignore last-sync marker)
- `/sync-calls --id {recording_id}` — Import a specific recording by ID

## Prerequisites

- `config/config.yaml` with `integrations.call_recording.provider` set (e.g., `fathom`, `fireflies`, `otter`, `grain`)
- `.env` file with the API key (env var name from `config.integrations.call_recording.api_key_env`)

## Supported Providers

| Provider | API Base | Auth Header |
|----------|----------|-------------|
| `fathom` | `https://api.fathom.ai/external/v1` | `X-Api-Key` |
| `fireflies` | `https://api.fireflies.ai/graphql` | `Authorization: Bearer` |
| `otter` | Manual import (no API) | — |
| `grain` | Manual import (no API) | — |

For providers without an API (`otter`, `grain`, etc.), the skill prompts the user to paste or drop a transcript file instead.

## Instructions

### Step 1: Load Config and State

Read in parallel:
- `config/config.yaml` -> `integrations.call_recording` section
- `memory/call_sync.md` (if exists) -> last sync timestamp and last imported recording ID

Extract:
- `provider` — which call recording tool (fathom, fireflies, otter, grain)
- `api_key_env` — name of the env var holding the API key
- `api_base` — API base URL (use default for known providers)

If `call_recording.provider` is not set or `call_recording.enabled` is false, tell the user: "No call recording provider configured. Run `/setup` to set one up, or add transcripts manually to `my-context/call-transcripts/`."

### Step 2: Fetch Recent Calls

**If provider is `fathom`:**
```bash
curl -s -H "X-Api-Key: $API_KEY" \
  "https://api.fathom.ai/external/v1/meetings"
```

**If provider is `fireflies`:**
```bash
curl -s -X POST "https://api.fireflies.ai/graphql" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ transcripts { id title date duration organizer_email participants sentences { speaker_name text } } }"}'
```

**If provider is `otter`, `grain`, or unknown:**
Say: "Your provider ({provider}) doesn't have API sync. You can import transcripts manually:"
1. Ask: "Paste a transcript, drop a file path, or type 'skip'"
2. If they paste/provide a file, go to Step 4c for formatting and saving
3. If skip, exit

Parse the response. Filter to only show calls created AFTER the last sync timestamp (from `memory/call_sync.md`). If `--all` flag, skip the filter and show all.

If `--id` flag, skip listing and go directly to Step 4 for that recording.

### Step 3: Present Calls for Selection

Show the user a numbered list of new calls:

```
## New Calls Since Last Sync

| # | Date | Title / Participants | Recording ID |
|---|------|---------------------|--------------|
| 1 | 2025-03-10 | Acme Corp - Discovery | 12345678 |
| 2 | 2025-03-11 | Beta Inc - Follow-up | 12345679 |
```

Ask: **"Which calls should I import? (all / numbers / skip)"**

### Step 4: Import Selected Calls

For each selected call:

#### 4a: Fetch Summary

**Fathom:**
```bash
curl -s -H "X-Api-Key: $API_KEY" \
  "https://api.fathom.ai/external/v1/recordings/{recording_id}/summary"
```

**Fireflies:**
Summary is included in the transcript response (use the `summary` field from the GraphQL query).

#### 4b: Fetch Transcript

**Fathom:**
```bash
curl -s -H "X-Api-Key: $API_KEY" \
  "https://api.fathom.ai/external/v1/recordings/{recording_id}/transcript"
```

**Fireflies:**
Transcript sentences are included in the initial GraphQL response.

#### 4c: Determine File Routing

Route the file based on call type:
- **Customer/prospect calls** -> `my-context/call-transcripts/`
- **Cohort/accountability calls** -> only if `config.ritual.cohort.enabled`, route to a `cohort/` folder or skip

Use this naming convention: `{company}_{date}_{topic}.md`
- Company: lowercase, underscores for spaces
- Date: YYYYMMDD or monthDD format (e.g., mar10)
- Topic: brief descriptor (discovery, demo, followup, kickoff, poc_review)

Example: `acme_corp_mar10_discovery.md`

#### 4d: Ask User to Confirm

Before writing, show:
- Proposed filename and path
- Call summary preview
- Ask: **"Save this? (yes / rename / skip)"**

If rename -> let user specify new filename.

#### 4e: Write the File

Format the transcript file as:

```markdown
# {Call Title}

**Date:** {date}
**Participants:** {list from API}
**Source:** {provider name}

## Summary

{Provider-generated summary}

## Key Points

{Extract key points from summary if available}

## Transcript

{Full transcript with speaker labels}
```

### Step 5: Update Sync State

After all imports complete, update `memory/call_sync.md`:

```markdown
# Call Sync State

- **Provider:** {provider}
- **Last synced:** {current ISO timestamp}
- **Last imported call date:** {date of most recent imported call}
- **Last imported recording_id:** {id}

## Import History
| Date | Recording ID | File | Company |
|------|-------------|------|---------|
| {date} | {id} | {filepath} | {company} |
```

Append new imports to the history table (don't overwrite previous entries).

### Step 6: Offer Next Steps

After import, ask:
- **"Want me to analyse any of these calls?"** -> triggers `/analyse-call`
- **"Want me to create follow-up tasks?"** -> creates tasks in {config.linear.action_team}

---

## Mode: `--all`

Show all calls from the API response, not just those after last sync. Useful for re-importing or finding older calls.

## Mode: `--id {recording_id}`

Skip the listing step. Directly fetch summary + transcript for the given recording ID. Still confirm filename before saving.

## Notes

- The API key is stored in `.env` and referenced by the env var name in config
- If the API returns an error, show the error and suggest checking the API key
- If `memory/call_sync.md` doesn't exist, treat all calls as new (first run)
- Always confirm with the user before writing files — never auto-import without approval
- For providers without API support, the skill gracefully falls back to manual import
