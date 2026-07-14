# Changelog

All notable changes to the GTM Engine will be documented in this file.

## [1.2.0] — 2026-07-14

### Added
- **Consequence Questions** framework — two-question discovery discipline: baseline how the prospect operates, then let them quantify the cost out loud
- **Buyer Readiness** framework — diagnose a buyer's real journey stage from invested time/effort/money (not their words), with five readiness types and response modes
- **Category Language** framework — create a distinctive term for what you do that bypasses the prospect's default filter and earns "what do you mean by that?"
- **Revenue Visibility** framework — one-sheet cash-flow practice: score every opportunity 1-5 on action evidence, with a visibility-raising action per row
- **Claude Code plugin support** — install via `/plugin marketplace add himanshusaleria/gtm-engine` (repo is now a self-hosting plugin marketplace)

### Changed
- `/analyse-call` gains four new analysis sections (K: Consequence Question Discipline, L: Buyer Readiness Diagnosis, M: Category Language Check, N: Revenue Visibility Score)
- `/cold-email` outreach workflow updated: new Outreach Discipline rules (due follow-ups beat new sends, ~5 new sends/day cap, one active thread per company, never fabricate), sequence cadence revised to Day 0 → Day 3 reply-bait → Day 8 value-add → Day 13 breakup, no-em-dash rule, optional LinkedIn lane (noteless connection request, DM after accept)
- `/good-morning` priority order makes the follow-ups-before-new-sends rule explicit
- Sales Playbook outreach stage updated to the same follow-up cadence
- Framework guide extended to 15 frameworks with an 8-week learning path
- Bumped version to 1.2.0

## [1.1.0] — 2026-03-22

### Added
- **Prospect Qualification (BANT)** framework — Budget, Authority, Need, Timeline scoring for qualifying prospects
- **Positioning Levels (Vitamin vs Painkiller)** framework — Diagnosing and elevating your positioning level
- **Selling Window** framework — Five stages of org pain awareness (Unaware → Annoyed → Hurting → Desperate → Solved)
- **Pain Discovery (SPIN Selling)** framework — Situation, Problem, Implication, Need-payoff question methodology
- **Sales Playbook** framework — Seven-stage founder's deal checklist (Research → Outreach → Discovery → Demo → Proof → Close → Handoff)

### Changed
- All 11 frameworks now active — no more "Coming Soon" placeholders
- Updated `/analyse-call` skill with new framework sections (G: Positioning Analysis, H: Selling Window Assessment, I: SPIN Analysis, J: Sales Playbook Progress)
- Updated framework guide with expanded learning path (now 6 weeks)
- Bumped version to 1.1.0

### Removed
- Placeholder "Coming Soon" pages for 5 frameworks
- "Pending attribution approval" language throughout

## [1.0.0] — 2026-03-13

### Added
- Initial release of GTM Engine
- 6 active frameworks: Mom Test, Buyer's Pyramid, ICP, Intent Diagnostic, Outcome Messaging, Commitment Scorecard
- 5 placeholder frameworks pending attribution approval: TEMQ, Positioning Levels, Deal Stages, Pain Validation, Sales Process
- 7 skills: `/setup`, `/whats-new`, `/good-morning`, `/good-night`, `/analyse-call`, `/validate-lead`, `/cold-email`
- Config system with `config.example.yaml`
- Interactive `/setup` wizard with ICP workshop
- Daily 3+2 ritual system
- Linear two-team workflow (Pipeline + Action)
- Self-improving learnings system for `/validate-lead` and `/cold-email`
- Template scaffolds for company context, personas, objections, signals
- `/whats-new` update notification system
- Full documentation: setup guide, Linear setup, MCP setup, framework guide
