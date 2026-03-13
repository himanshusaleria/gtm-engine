# MCP Server Setup

MCP (Model Context Protocol) servers let Claude Code interact with your external tools — Linear, Google Workspace, Fathom, etc.

## Required: Linear MCP

Linear is the backbone of the GTM Engine. It tracks your pipeline, manages tasks, and powers the 3+2 daily system.

### Installation

```bash
# In Claude Code, run:
/mcp add linear -- npx @anthropic-ai/linear-mcp
```

### Setup

1. The MCP server will prompt you to authenticate with Linear on first use
2. Create two teams in Linear:
   - **Pipeline team** (default: "Sales") — for tracking leads and deals
   - **Action team** (default: "GTM") — for tasks, follow-ups, outreach
3. Create these labels in your Action team:
   - `daily-3` — meaningful tasks (use red color)
   - `daily-2` — light tasks (use blue color)
   - `parking-lot` — parked ideas (use yellow color)
   - Your engine label (default: `gtm-engine`) — applied to all engine-created tasks

### Pipeline Stages

Set up these workflow states in your Pipeline team (customize as needed):

```
Backlog → Todo → Connection Started → Discovery → Qualified →
Demo Scheduled → POC → Agreement → Closed Won / Closed Lost
```

See [linear-setup.md](linear-setup.md) for detailed Linear configuration.

## Recommended: Google Workspace MCP

Powers calendar briefings, email drafting, sheet-based lead tracking, and document management.

### Installation

```bash
# In Claude Code, run:
/mcp add google-workspace -- npx @anthropic-ai/google-workspace-mcp
```

### Setup

1. Follow the OAuth authentication flow when prompted
2. Grant access to Calendar, Gmail, Sheets, and Docs

### What It Powers

| Feature | Skill | Without It |
|---------|-------|------------|
| Calendar view | `/good-morning`, `/good-night` | Calendar sections skipped |
| Lead tracking sheet | `/validate-lead --batch` | Batch mode unavailable |
| Email drafting | `/cold-email` (post to Gmail draft) | Manual copy-paste only |
| EOD message | `/good-night` | Manual copy-paste only |

## Optional: Fathom Integration

If you use Fathom for call recording, you can auto-sync transcripts.

### Setup

1. Get your Fathom API key from [fathom.video/settings](https://fathom.video/settings)
2. Add to your `.env` file:
   ```
   FATHOM_API_KEY=your-api-key-here
   ```
3. Set `integrations.fathom.enabled: true` in `config/config.yaml`

### What It Powers

| Feature | Skill |
|---------|-------|
| Call transcript sync | `/fathom-calls` |
| Auto-import in evening routine | `/good-night` (Step 2) |

## Verifying Installation

After installing MCP servers, verify they work:

```
# In Claude Code, test each:

# Linear — should list your teams
"List my Linear teams"

# Google Workspace — should show today's calendar
"What's on my calendar today?"

# Fathom — test API key
"Fetch my recent Fathom calls"
```

## Troubleshooting

### MCP server not connecting
- Check that the package is installed: `npx @anthropic-ai/linear-mcp --version`
- Restart Claude Code after adding MCP servers
- Check `~/.claude/mcp.json` for correct configuration

### Authentication issues
- Linear: Re-authenticate by running the MCP command again
- Google Workspace: Clear and re-authenticate with `/mcp` commands
- Fathom: Verify API key is correct in `.env`

### Missing permissions
- Linear: Ensure your account has access to both teams
- Google Workspace: Check OAuth scopes include Calendar, Gmail, Sheets, Docs
