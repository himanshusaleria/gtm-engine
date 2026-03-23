# /sync-calls — Import Call Recordings

Syncs call recordings from your configured call recording provider, imports transcripts, and saves them as structured markdown files.

## What It Does

Fetches recent calls from your call recording tool (Fathom, Fireflies, etc.), presents them for selection, downloads the summary and full transcript for each, and saves them as formatted markdown in `my-context/call-transcripts/`. Tracks sync state so you only see new calls each time.

For providers without API support (Otter, Grain, etc.), the skill offers manual transcript import instead.

## Usage

```
/sync-calls                   # Fetch new calls since last sync
/sync-calls --all             # Show all recent calls (ignore last-sync marker)
/sync-calls --id 12345678     # Import a specific recording by ID
```

## Supported Providers

| Provider | Sync Method | Setup |
|----------|------------|-------|
| **Fathom** | API (automatic) | API key in `.env` |
| **Fireflies** | API (automatic) | API key in `.env` |
| **Otter** | Manual paste/drop | No API key needed |
| **Grain** | Manual paste/drop | No API key needed |

## Prerequisites

- `config/config.yaml` with `integrations.call_recording` configured (run `/setup` to set this up)
- For API-based providers: `.env` file with your API key

## What Gets Saved

Each imported call becomes a markdown file with:

- Metadata (title, date, participants, source provider)
- Provider-generated summary
- Key points extracted from the summary
- Full transcript with speaker labels

Files are named like `acme_corp_mar10_discovery.md` and saved to `my-context/call-transcripts/`.

## Sync State

The skill tracks what has already been imported in `memory/call_sync.md`. Each run only shows calls newer than the last sync. Use `--all` to bypass this and see everything.

## After Import

The skill offers two follow-up options:

- **Analyse the call** — triggers `/analyse-call` to run your frameworks against the transcript
- **Create follow-up tasks** — creates action items in your Linear action team

## Tips

- Run this as part of `/good-night` (it is built into the full wrap-up flow)
- Use `--id` when someone shares a specific recording link and you want to import just that one
- The skill always confirms before writing files — nothing is auto-imported
- If your provider doesn't have API support, you can always paste transcripts manually
