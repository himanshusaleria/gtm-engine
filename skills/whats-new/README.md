# /whats-new — Update Checker

Checks if the GTM Engine has been updated and offers to install new or changed skills.

## What It Does

Compares the repo `VERSION` against `last_seen_version` in your config, shows relevant CHANGELOG entries, detects new or updated frameworks, and reinstalls skills if you want.

## Usage

```
/whats-new
```

No flags. Just run it.

## Prerequisites

- `config/config.yaml` exists (run `/setup` first)
- `VERSION` file in the repo root

## What It Checks

1. **Version diff** — shows CHANGELOG entries between your last seen version and current
2. **New frameworks** — lists any framework files added since your last check
3. **Skill status** — compares installed skills in `~/.claude/skills/` against the repo, reports which are up to date, updated, or new

## What Happens Next

- If skills are outdated or new, it offers to reinstall them
- Your `learnings.md` files are never overwritten (those are your data)
- Updates `last_seen_version` in config after you review

## Tips

- Run this after pulling new changes from the repo
- If you want to force-reinstall everything, use `/setup --reinstall` instead
