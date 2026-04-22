---
title: 'Automating Your Day: Crons, Briefings, and Heartbeats'
slug: '2026-04-automating-your-day'
date: '2026-04-11'
urls: []
type: 'Blog Post'
tags: ['blog', 'openclaw', 'ai', 'automation', 'productivity']
image: '/img/placeholder.png'
description: 'How I use OpenClaw cron jobs and heartbeats to automate research digests, fitness check-ins, and proactive monitoring — without lifting a finger.'
---

The first few weeks with Vision, I used it like a chatbot. I'd ask questions, get answers, move on. It was useful, but it wasn't transformative.

Then I discovered crons.

OpenClaw's cron system lets you schedule tasks that run on their own — no prompt required. The agent wakes up, does the thing, posts the result to a channel, and goes back to sleep. It's like having a colleague who handles the recurring stuff so you don't have to think about it.

This is where the setup starts paying dividends.

## The Automation Stack

Here's what runs automatically in my setup:

| Cron | Schedule | What It Does |
|------|----------|--------------|
| `research-digest:daily` | 7:00 AM | Fetch newsletters → extract papers → post briefing + podcast |
| `fitness-checkin` | 11:23 PM | Pull Hevy/Strava → post workout summary |
| `wiki:ingest-watcher` | Midnight | Ingest dropped files into knowledge base |
| `wiki:weekly-lint` | Sunday 4 AM | Audit wiki for orphan pages, broken links |
| `currency-alert` | Varies | Alert when USD/BRL hits target rate |
| `vision-dream` | 6:00 AM | Consolidate daily logs into long-term memory |

Each of these used to be something I did manually — or more often, something I meant to do but forgot. Now they just happen.

## Research Digest: My Morning Briefing

This is the cron I'm most proud of. Every morning at 7 AM, Vision:

1. Fetches my research newsletter emails (via Google Workspace API)
2. Extracts the papers and stories
3. Deduplicates across sources
4. Categorizes by topic (RL, LLMs, robotics, etc.)
5. Writes a parallel summary for each category
6. Posts a formatted briefing to `#briefings`
7. Generates a TTS podcast version using Kokoro

By the time I'm making coffee, there's a Discord message waiting with the day's research highlights and an audio file I can listen to while getting ready.

The skill that powers this lives at `~/.openclaw/workspace/skills/research-digest/`. It's a SKILL.md file with instructions and a few helper scripts. The cron entry looks like:

```bash
openclaw cron add \
  --name "research-digest:daily" \
  --schedule "0 7 * * *" \
  --channel "#briefings" \
  --prompt "Run the research digest pipeline per the skill instructions."
```

The `--channel` flag is important. It tells the cron to post its output directly to that channel, even though no one prompted it there.

## Fitness Check-In

I lift weights (tracked in Hevy) and run occasionally (tracked in Strava). Every night at 11:23 PM, Vision:

1. Pulls today's workout from Hevy API
2. Pulls any runs from Strava
3. Compares against my training plan
4. Posts a summary to `#health-fitness`

Example output:

```
📊 **Daily Fitness Check-in — April 11, 2026**

**Workout:** Upper B (Machine) — 47 min
- Lat Pulldown: 60kg × 10, 10, 8 (PR on set 1!)
- Incline DB Press: 36kg × 12, 11, 10
- Lateral Raise: 24kg × 13, 12, 11
- Face Pulls: 20kg × 15, 15, 14

**Cardio:** Rest day

**Notes:** Third upper session this week. Recovery looking good.
Recommend rest day tomorrow before Lower A.
```

The skill for this lives at `~/.openclaw/workspace/skills/hevy/`. It wraps the Hevy API and knows about my training split.

## Currency Alerts

I hold some USD and need to convert to BRL occasionally for larger purchases. I have a cron that checks the exchange rate and alerts me when it crosses certain thresholds:

```bash
openclaw cron add \
  --name "currency-alert" \
  --schedule "0 9,15,21 * * *" \
  --channel "#finance" \
  --prompt "Check USD/BRL rate. If below 4.90, alert Bryan with current rate and recent trend."
```

Simple, but it means I don't have to remember to check. When the rate is good, I get a ping.

## The Pattern: Isolated Agent + Cron + Channel

All these automations follow the same pattern:

1. **Isolated agent** — the cron runs in its own session, without conversation history from the main session
2. **Cron schedule** — triggers at a specific time or interval
3. **Channel delivery** — output goes to a specific Discord channel

The isolation is important. The cron doesn't have access to what I was chatting about yesterday. It just wakes up, does its job, and posts. This keeps things predictable.

The channel delivery is also important. Each automation has its own channel, so I can mute ones I don't care about right now without missing others.

## Heartbeats: Proactive Monitoring

Crons are scheduled. But some things need to be checked *whenever*, not on a schedule. That's what heartbeats are for.

A heartbeat is a periodic ping that asks: "Is everything okay?" If something needs attention, it surfaces it. If not, it stays silent.

My heartbeat runs every 30 minutes and checks:
- SLURM jobs: any failures? any stuck in queue?
- Discord sessions: any waiting on my response for >24h?
- TickTick tasks: any overdue?
- GPU utilization: any jobs running but not using GPU?

The heartbeat config lives in `HEARTBEAT.md`:

```markdown
## Heartbeat Checks

1. **SLURM Jobs** — `squeue -u vision` on jarbas and sebastian
2. **Session State** — any sessions waiting on Bryan >24h?
3. **TODO List** — `ttg task list --project "Tasks"`
4. **GPU Sanity** — if job running >10min with 0% GPU, investigate

## Silence Rule
If nothing needs attention, reply exactly: HEARTBEAT_OK
```

The silence rule is key. Most heartbeats should be silent. I only want to hear about problems.

When something is wrong, the heartbeat posts to `#heartbeats`:

```
⚠️ **Heartbeat Alert**

Job 847291 (grpo_pg__ng16__HalfCheetah) has been running for 45 min 
with 0% GPU utilization. Likely CUDA initialization issue.

Recommended: cancel and resubmit with CUDA_VISIBLE_DEVICES set.
```

This caught a real bug last week. A training job was running but not using the GPU because the venv had a broken PyTorch install. Without the heartbeat, I wouldn't have noticed for hours.

## Setting Up Your Own Crons

Adding a cron is straightforward:

```bash
# One-liner
openclaw cron add --name "my-task" --schedule "0 9 * * *" --prompt "Do the thing"

# With channel routing
openclaw cron add --name "my-task" --schedule "0 9 * * *" \
  --channel "#my-channel" \
  --prompt "Do the thing and post results"

# List existing crons
openclaw cron list

# Remove a cron
openclaw cron remove --name "my-task"
```

The schedule uses standard cron syntax: `minute hour day month weekday`.

For more complex tasks, write a skill and reference it in the prompt:

```bash
openclaw cron add --name "weekly-report" --schedule "0 9 * * 1" \
  --prompt "Follow the weekly-report skill. Post to #reports."
```

## When to Use Crons vs. Heartbeats

**Use crons when:**
- The task should happen at a specific time
- The output is always worth posting (e.g., daily digest)
- The task is self-contained

**Use heartbeats when:**
- You want to check for problems, not generate content
- Most checks should be silent (no news is good news)
- The check should happen frequently but results vary

I use crons for content generation (digests, check-ins) and heartbeats for monitoring (jobs, tasks, sessions).

---

Automation is where a personal AI stops being a novelty and starts being infrastructure. The research digest alone saves me 20 minutes every morning. The fitness check-in keeps me accountable without manual logging. The heartbeats catch problems before they become crises.

The investment is front-loaded. Setting up a cron takes 10 minutes. But once it's running, it runs forever — or until you decide to change it.

*Next: [Vision in the Research Lab: SLURM, Obsidian, and Meeting Notes](/blog/2026-04-vision-in-the-lab)*
