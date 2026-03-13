# /fathom-calls — Import Call Recordings from Fathom

Fetch recent call recordings from Fathom, import transcripts, and save them as structured markdown files.

## Usage

- `/fathom-calls` — Fetch new calls since last sync
- `/fathom-calls --all` — Show all recent calls (ignore last-sync marker)
- `/fathom-calls --id {recording_id}` — Import a specific recording by ID

## Prerequisites

- `config/config.yaml` with `integrations.fathom.enabled: true`
- `.env` file with the Fathom API key (env var name from `config.integrations.fathom.api_key_env`)
- Fathom API base URL: `https://api.fathom.ai/external/v1`

## Instructions

### Step 1: Load Config and State

Read in parallel:
- `config/config.yaml` -> integrations.fathom section
- `memory/fathom_sync.md` (if exists) -> last sync timestamp and last imported recording ID

### Step 2: Fetch Recent Calls

```bash
curl -s -H "X-Api-Key: $FATHOM_API_KEY" \
  "https://api.fathom.ai/external/v1/meetings"
```

Parse the response. Filter to only show calls created AFTER the last sync timestamp (from `memory/fathom_sync.md`). If `--all` flag, skip the filter and show all.

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
```bash
curl -s -H "X-Api-Key: $FATHOM_API_KEY" \
  "https://api.fathom.ai/external/v1/recordings/{recording_id}/summary"
```

#### 4b: Fetch Transcript
```bash
curl -s -H "X-Api-Key: $FATHOM_API_KEY" \
  "https://api.fathom.ai/external/v1/recordings/{recording_id}/transcript"
```

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

**Recording:** [Fathom Recording](https://fathom.video/share/{recording_id})
**Date:** {date}
**Participants:** {list from API}

## Summary

{Fathom-generated summary}

## Key Points

{Extract key points from summary if available}

## Transcript

{Full transcript with speaker labels}
```

### Step 5: Update Sync State

After all imports complete, update `memory/fathom_sync.md`:

```markdown
# Fathom Sync State

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

- The Fathom API key is stored in `.env` and referenced by the env var name in config
- If the API returns an error, show the error and suggest checking the API key
- If `memory/fathom_sync.md` doesn't exist, treat all calls as new (first run)
- Always confirm with the user before writing files — never auto-import without approval
