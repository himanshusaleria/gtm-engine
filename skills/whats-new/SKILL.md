# What's New — Update Checker

Checks if the GTM Engine has been updated since the user last checked, shows changelog entries for new versions, and offers to reinstall updated skills.

## Invocation
- `/whats-new` -- Check for updates

## Instructions

### Step 1: Read current version

Read the `VERSION` file from the repo root. Store as `current_version`.

If the VERSION file does not exist, display an error:
```
Could not find VERSION file. Make sure you're in the GTM Engine repo root.
```
And stop.

### Step 2: Read last seen version

Read `config/config.yaml` and extract the `last_seen_version` field.

If config.yaml does not exist, display:
```
No config found. Run /setup first to initialize the GTM Engine.
```
And stop.

Store as `last_seen_version`.

### Step 3: Compare versions

If `current_version` equals `last_seen_version`:

Display:
```
## You're up to date!

**Current version:** [current_version]

No new changes since you last checked.
```

Then skip to Step 7 (still check for skill drift).

If versions differ, proceed to Step 4.

### Step 4: Show changelog

Read `CHANGELOG.md` from the repo root.

Parse the changelog to find all version entries. Show only the entries that are NEWER than `last_seen_version`.

Display:
```
## New Updates Available!

**Your version:** [last_seen_version] -> **Latest:** [current_version]

---

[Paste the relevant changelog entries here, preserving markdown formatting]
```

### Step 5: Check for framework changes

1. List all `.md` files in the `frameworks/` directory
2. Read `config/config.yaml` to see if there's a record of known frameworks (if you added a `known_frameworks` field previously)
3. If new framework files exist that aren't in the user's context, list them:

```
### New Frameworks Added
- [framework name] — [one-line description from the file's first heading]

These frameworks will be automatically available in your conversations.
```

If no new frameworks, skip this section.

### Step 6: Check for skill updates

Compare skill files in the repo's `skills/` directory against installed skills in `~/.claude/skills/`:

1. List all subdirectories in `skills/` that contain a SKILL.md
2. For each skill:
   a. Check if `~/.claude/skills/[skill-name]/SKILL.md` exists
   b. If it doesn't exist -> mark as "New skill (not installed)"
   c. If it exists -> read both files and compare their contents
      - If contents differ -> mark as "Updated (changes available)"
      - If contents match -> mark as "Up to date"

Display a table:
```
### Skill Status
| Skill | Status | Action Needed |
|-------|--------|--------------|
| [name] | Up to date | None |
| [name] | Updated | Re-install to get changes |
| [name] | New | Install to enable |
```

### Step 7: Offer to reinstall

If any skills are marked as "Updated" or "New":

Ask: "Want me to reinstall updated skills? This will run `/setup --reinstall` to copy the latest skill files to ~/.claude/skills/."

If user says yes:
1. For each skill marked "Updated" or "New":
   - Create `~/.claude/skills/[skill-name]/` if it doesn't exist
   - Read the SKILL.md from `skills/[skill-name]/SKILL.md`
   - Write it to `~/.claude/skills/[skill-name]/SKILL.md`
   - If the skill directory contains a `learnings.md` in the repo, and there is NO existing `learnings.md` in `~/.claude/skills/[skill-name]/`, create an empty one (never overwrite learnings -- those are user data)
2. Display: "Reinstalled [N] skills: [list names]"

If user says no:
Display: "No problem. Run `/whats-new` anytime to check again, or `/setup --reinstall` to update manually."

### Step 8: Update last_seen_version

If the version changed (Step 3 found a difference):

1. Read the current `config/config.yaml`
2. Find the line containing `last_seen_version:` and replace its value with `current_version`
3. Write the updated config back

Display:
```
Updated your last_seen_version to [current_version].
```

If the version was already current (no change), skip this step.

---

## Important Notes

- Never overwrite `learnings.md` files in `~/.claude/skills/` -- those contain user-specific learning data
- Always preserve the rest of config.yaml when updating last_seen_version -- only change that one field
- The VERSION file is the single source of truth for the current engine version
- Changelog parsing: version headers follow the format `## [X.Y.Z]` -- use this to identify version boundaries
- If the user has local modifications to SKILL.md files in ~/.claude/skills/, warn them before overwriting: "Your installed [skill] has local changes. Overwrite with the latest version?"
