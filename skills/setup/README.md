# /setup — Configuration Wizard

Interactive wizard that configures your GTM Engine.

## What It Does

Walks you through setting up your company context, Linear teams, ICP criteria, personas, messaging, and signals. Generates `config.yaml`, `CLAUDE.md`, and installs skills.

## Usage

```
/setup              # Full wizard (~15 min)
/setup --icp        # Just ICP workshop
/setup --personas   # Just persona mapping
/setup --messaging  # Just messaging & objections
/setup --signals    # Just signal playbook
/setup --reinstall  # Regenerate config + reinstall skills
```

## Prerequisites

- Linear MCP installed

## What Gets Generated

- `config/config.yaml` — your settings
- `CLAUDE.md` — Claude Code instructions
- `my-context/*.md` — your sales context files
- `~/.claude/skills/*` — installed skill files

## Tips

- You can skip Steps 4-7 and come back later with flags
- Re-running `/setup` preserves your existing `my-context/` files
- `/good-morning` nudges you if templates are unfilled
