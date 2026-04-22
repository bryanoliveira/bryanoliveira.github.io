---
title: 'Memory and Identity: How an AI Learns to Know You'
slug: '2026-04-memory-and-identity'
date: '2026-04-10'
urls: []
type: 'Blog Post'
tags: ['blog', 'openclaw', 'ai', 'memory', 'productivity']
image: '/img/placeholder.png'
description: 'How I built a persistent memory system for Vision using markdown files, daily logs, and a dream agent that consolidates everything every morning.'
---

Every LLM session starts with amnesia. You explain who you are, what you're working on, what you tried last time. Then the context window fills up, or you close the tab, and it's gone. Next session: amnesia again.

This is the fundamental problem with AI assistants for real work. It's not capability — modern models are remarkably capable. It's continuity.

My solution is simple and a little inelegant: markdown files.

## The External Memory Architecture

Vision's memory is a directory of markdown files that get injected into the context at session start. The files are read by the agent before it does anything else. They are also *written* by the agent — that's the important part.

Here's the structure:

```
~/.openclaw/workspace/
├── MEMORY.md          ← long-term curated memory
├── AGENTS.md          ← operating rules and workflow
├── USER.md            ← who I am (Bryan's profile)
├── SOUL.md            ← Vision's personality and values
└── memory/
    ├── 2026-04-10.md  ← today's raw log
    ├── 2026-04-09.md  ← yesterday
    ├── dream-log.md   ← history from the dream agent
    └── MEMORY-cluster.md  ← topical long-term notes
```

Each file has a purpose. Together, they give Vision enough context to function as if it never went away.

## The Four Core Files

### MEMORY.md — Long-Term Memory

This is the distilled essence of everything important. Active projects, key decisions, facts about my setup, lessons learned. It's structured but not rigid:

```markdown
## Active Projects

| Project | Path | Status |
|---------|------|--------|
| GRPO vs PPO | /mnt/workspace/bryan/grpo_vs_ppo | Active |
| InfoQuest | /mnt/workspace/bryan/infogainme | Active |
| latent-reasoning | /mnt/workspace/bryan/latent-reasoning | Active |

## Key Decisions
- Use uv for all Python package management (not pip/conda)
- Checkpoints every 500 steps — never write a training script without this
- Sebastian: always check with Luana before rebooting
```

Vision reads this on every main session start. It also updates it — if I mention a new project, Vision adds it. If I correct a wrong assumption, Vision fixes it. It's a living document.

### AGENTS.md — Operating Rules

This is how Vision is supposed to behave. Every rule it follows, every workflow it uses. Things like:

- "Never run sudo without describing the command and waiting for confirmation"
- "Write scripts to files before executing them — don't use heredocs"
- "Use TickTick for task tracking across sessions"
- "Commit workspace changes to git at the end of every turn"

When Vision makes a mistake, I correct it *and* tell it to update AGENTS.md. That correction persists. Next session, the same mistake doesn't happen.

### USER.md — Who I Am

My timezone, my email, my wife's name, my research projects, my weekly meeting schedule, my fitness profile, my communication preferences. Things like:

```markdown
- **Name:** Bryan
- **Timezone:** America/Sao_Paulo (GMT-3)
- **Language:** Native Portuguese, but prefers English for tech interactions
- **Communication:** Values precision. Dislikes small talk.
```

That last line matters. Vision used to ask "would you like me to do X?" constantly. I added that preference to USER.md and it stopped. One correction, permanent fix.

### SOUL.md — Personality and Values

This is Vision's character. Not the capabilities — the *way* it engages:

```markdown
**Be genuinely helpful, not performatively helpful.** Skip the "Great question!" 
and "I'd be happy to help!" — just help.

**Have opinions.** You're allowed to disagree, prefer things, find stuff amusing.

**Challenge assumptions.** If a premise seems wrong, say so before proceeding.
```

It sounds a little silly to write a "soul" for software. But it works. Without it, the model defaults to maximum agreeableness and corporate-speak. SOUL.md is the antidote.

## Daily Logs

Every day, Vision has a log file: `memory/2026-04-10.md`. Throughout the day, it writes things there — raw notes about what happened, decisions made, things to follow up on.

The philosophy here: **no mental notes**. If Vision wants to remember something across a session restart, it writes it to the daily log. "Mental notes" don't survive restarts. Files do.

Example entries:

```markdown
## 2026-04-10

- Bryan started GRPO experiment with perfect grouping, 507 SLURM jobs submitted
- Job failures on jarbas: WANDB_API_KEY missing from SLURM env — fixed
- Bryan mentioned he's traveling next week, don't schedule anything heavy
- TODO: check meeting transcription pipeline — last run errored on short audio
```

These logs are the raw material for long-term memory consolidation.

## The Dream Agent

At 6 AM every morning, a cron job runs what I call the "dream agent." It:

1. Reads the last 7 daily log files
2. Identifies what's worth keeping long-term
3. Updates `MEMORY.md` with new facts, decisions, and context
4. Appends a one-liner to `memory/dream-log.md`

The name is intentional. It's what happens when the brain processes the day's events and consolidates them into long-term memory. The agent does the same thing, but with markdown files instead of neurons.

```bash
# The cron entry
openclaw cron add --name "vision-dream" --schedule "0 6 * * *" \
  --prompt "Read last 7 daily logs. Distill into MEMORY.md. Post summary to #briefings-meta."
```

The result: Vision wakes up each morning with an updated long-term memory, without me having to manually maintain it.

## The Tension: Context vs. Durability

There's a real tension in this system. The context window is large but finite. You can inject a lot at session start, but not everything. You have to choose what matters.

My hierarchy:
1. **AGENTS.md** — always loaded, it's the rules
2. **SOUL.md + USER.md** — always loaded, identity
3. **MEMORY.md** — always loaded in main sessions
4. **Today + yesterday's daily logs** — always loaded
5. **Topical memory files** — loaded on demand via `memory_search`

The `memory_search` tool is key for the last category. Vision can semantically search across all memory files and pull just the relevant sections. If I ask about the GRPO project, it searches for "GRPO" and loads the relevant chunks.

## The Self-Correction Protocol

Here's the piece that makes this actually work: when I correct Vision, it's not just a conversation. It's a file update.

The rule in AGENTS.md:

```markdown
## Self-Correction Protocol

When Bryan corrects your behavior, reasoning, or a decision you made:

1. Identify which rule or gap caused the mistake
2. Update the relevant file with the corrected rule:
   - SOUL.md — tone, stance, personality
   - AGENTS.md — operating rules, workflow
   - USER.md — Bryan's preferences
   - MEMORY.md — facts, decisions, lessons learned
3. Confirm to Bryan what was updated and where
```

This means every correction is durable. I don't have to repeat myself. The system learns.

## Try It Yourself

Setting up your own memory system:

1. Create `~/.openclaw/workspace/` with the four core files
2. Add a `memory/` directory for daily logs
3. Add rules to AGENTS.md that require the agent to write things down
4. Set up a daily "dream" cron to consolidate logs

Start simple. MEMORY.md can just be a bulleted list of your active projects. USER.md can be your name and timezone. SOUL.md can be three sentences about how you want the AI to behave.

The key insight: the agent will only maintain what you tell it to maintain. If you want it to remember your projects, add a rule that says "when a new project starts, add it to MEMORY.md." If you want it to track decisions, add a rule for that.

The system is only as good as the rules you give it.

---

Memory is what transforms a chat interface into a collaborator. Without it, every session is a first meeting. With it, you're picking up where you left off.

The markdown files are unglamorous. But they work. And unlike proprietary memory features, you own them completely — they're just files on your disk.

*Next: [Automating Your Day: Crons, Briefings, and Heartbeats](/blog/2026-04-automating-your-day)*
