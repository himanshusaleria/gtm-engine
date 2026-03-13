# /cold-email — Signal-Based Cold Outreach

Writes personalized cold emails that lead with pain and reference real intent signals.

## What It Does

Takes a company brief, identifies the signal and target persona, maps to a relevant pain point, and generates a cold email following strict messaging rules. Learns from your feedback over time.

## Usage

```
/cold-email "Acme Corp, hiring 3 QA engineers, Series B, 200 employees"
/cold-email --sequence "Beta Inc, CTO posted about release delays"
/cold-email --improve "shorter subject lines convert better for us"
```

## Prerequisites

- `config/config.yaml` (for company context)
- Recommended: `my-context/company-overview.md`, `my-context/persona-pain-map.md` filled

## Modes

| Mode | What It Does |
|------|-------------|
| Default | Single cold email from the company brief |
| `--sequence` | 3-4 email sequence spaced over ~2 weeks (first touch, value-add, different angle, breakup) |
| `--improve` | Saves a learning to `learnings.md` without generating an email |

## Sample Output

```
Subject: scaling qa without slowing releases

Hi [Name],

Noticed your team posted 3 QA roles last month. Usually means
releases are backing up while the team tries to keep coverage.

We ran into the same pattern with a similar-sized team — they
cut their regression cycle from 4 days to under an hour without
adding headcount.

Worth 15 minutes to see if I can help? If not, no worries at all.

[Your name]
```

**Reasoning:**
- **Signal:** Hiring 3 QA engineers
- **Persona:** VP Engineering (hiring manager)
- **Pain angle:** Release velocity bottleneck from manual QA
- **Buyer stage:** Stage 2 (aware of problem)

## Email Rules (Built In)

- Pain-first, never feature-first
- Conversational tone, no corporate speak
- 4-6 sentences for first touch
- Soft CTA with an easy out
- No banned words (AI-powered, revolutionary, game-changer, etc.)
- Subject lines under 8 words, lowercase or sentence case

## The Learnings Loop

After every email, the skill asks for feedback. Your corrections and observations accumulate in `learnings.md` and shape all future emails. The more feedback you give, the better the emails get.

## Tips

- Provide as much context as you can in the brief — signal, persona, and company details all improve output
- Use `--sequence` for cold outreach where you expect multiple touches
- Review and tweak the generated email before sending — the skill drafts, you own the final version
