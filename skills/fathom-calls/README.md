# /fathom-calls — Import Call Recordings from Fathom

Syncs call recordings from the Fathom API, imports transcripts, and saves them as structured markdown files.

## What It Does

Fetches recent calls from Fathom, presents them for selection, downloads the summary and full transcript for each, and saves them as formatted markdown in `my-context/call-transcripts/`. Tracks sync state so you only see new calls each time.

## Usage

```
/fathom-calls                   # Fetch new calls since last sync
/fathom-calls --all             # Show all recent calls (ignore last-sync marker)
/fathom-calls --id 12345678     # Import a specific recording by ID
```

## Prerequisites

- `config/config.yaml` with `integrations.fathom.enabled: true`
- `.env` file with your Fathom API key (env var name is set in config, default: `FATHOM_API_KEY`)
- Get the API key from Fathom Settings > Integrations > API

## What Gets Saved

Each imported call becomes a markdown file with:

- YAML-style metadata (title, date, participants, recording ID)
- Fathom-generated summary
- Key points extracted from the summary
- Full transcript with speaker labels

Files are named like `acme_corp_mar10_discovery.md` and saved to `my-context/call-transcripts/`.

## Sync State

The skill tracks what has already been imported in `memory/fathom_sync.md`. Each run only shows calls newer than the last sync. Use `--all` to bypass this and see everything.

## After Import

The skill offers two follow-up options:

- **Analyse the call** — triggers `/analyse-call` to run your frameworks against the transcript
- **Create follow-up tasks** — creates action items in your Linear action team

## Tips

- Run this as part of `/good-night` (it is built into the full wrap-up flow)
- Use `--id` when someone shares a specific recording link and you want to import just that one
- The skill always confirms before writing files — nothing is auto-imported
