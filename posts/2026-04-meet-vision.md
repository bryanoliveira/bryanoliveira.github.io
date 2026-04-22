---
title: 'Meet Vision: Running a Personal AI on a Raspberry Pi'
slug: '2026-04-meet-vision'
date: '2026-04-09'
urls: []
type: 'Blog Post'
tags: ['blog', 'openclaw', 'ai', 'raspberry-pi', 'self-hosted']
image: '/img/placeholder.png'
description: 'How I built a persistent AI assistant called Vision on a Raspberry Pi 5, connected to Discord and a GPU cluster, and why it changed how I work.'
---

I've been using AI assistants since the early ChatGPT days. Like most people, I started with the browser interface, then the API, then various wrappers that promised to be "your personal AI." They were all missing the same thing: persistence. Every conversation started from zero. The AI didn't know my projects, my machines, my deadlines, or my name.

So I built my own.

## What OpenClaw Is

[OpenClaw](https://github.com/openclaw/openclaw) is a self-hosted AI assistant framework. You install it on a machine, connect it to a messaging channel (Discord, Telegram, Slack), give it tools (file access, shell execution, APIs), and it becomes a persistent agent that lives in your infrastructure.

It's not a chatbot. It's more like a remote colleague who happens to live on your server. You message them in Discord, they do things, remember things, and check in on you when something needs attention.

I run it on a Raspberry Pi 5 I call "pie." That's the brain. It's always on, always connected, and costs almost nothing to run. Heavy compute — model inference, SLURM job submission, transcription — happens on my GPU cluster.

## The Hardware Stack

```
pie (Raspberry Pi 5)           ← OpenClaw lives here
  ├── Discord / Telegram        ← interfaces I actually use
  ├── jarbas (RTX 3090)         ← ML training, transcription
  └── sebastian (RTX 3090)      ← parallel experiments
```

pie runs the OpenClaw gateway daemon. It handles message routing, cron scheduling, tool execution, and subagent spawning. It doesn't run models itself — for that it calls out to my cluster via SSH or to cloud providers via API.

The GPU nodes run SLURM for job scheduling. When I ask Vision to "kick off the GRPO experiment with lr=3e-4," it SSHes into jarbas, writes a SLURM batch script, and submits it. When the job finishes, Vision can pull the loss curves and tell me if it's worth continuing.

## Why Discord?

I live in Discord. My research channels, my homelab notes, my fitness summaries — all of it. Having Vision live there too means there's no context-switching. I just talk to it the same way I talk to everything else.

My Discord guild has a channel for almost everything:
- `#general` — casual questions, quick lookups
- `#briefings` — morning research digest posts
- `#health-fitness` — daily workout check-ins
- `#heartbeats` — proactive status pings
- `#paper-breakdowns` — detailed paper summaries with audio
- `#grpo-classic-rl`, `#infogainme`, `#latent-reasoning` — project-specific threads

Telegram is my backup channel. When I'm away from my desk and don't want to open Discord, I can message Vision there.

## The Philosophy: Persistent Collaborator, Not Chat

Here's the thing about conversational AI: the interaction model is wrong for serious work. Chat implies a session. You open it, you close it, it's done. That works for looking up a recipe. It doesn't work for a research project that spans months.

Vision is designed to be a collaborator. It has:
- **Memory** — markdown files it reads and writes across sessions
- **Proactivity** — heartbeats that check on running jobs and surface issues
- **Tools** — SSH, file access, APIs, browser control
- **Identity** — files like `SOUL.md` and `USER.md` that define who it is and who I am

When I come back after a week away from a project, Vision knows what was running, what the last results were, and what the next step is. Not because I told it just now, but because it wrote it down when it happened.

## What Vision Does Day-to-Day

On a typical day, without me asking:

- **7:00 AM** — pulls my research newsletters, extracts the interesting papers, posts a briefing to `#briefings` with a TTS podcast I can listen to while making coffee
- **11:23 PM** — checks my workout app and running data, posts a fitness summary to `#health-fitness`
- **Midnight** — ingests any files I dropped into the wiki folder
- **Throughout the day** — heartbeat checks on SLURM jobs, Discord sessions, pending tasks

When I actively ask it things:
- "What did the entropy-research runs look like?" → pulls SLURM logs, summarizes results
- "Transcribe this meeting recording" → submits to the transcription pipeline, generates Obsidian notes
- "Add a task to research GRPO with clipped rewards" → adds to TickTick with context
- "What's on my calendar tomorrow?" → pulls from Google Calendar

The key is that it's always available and always has context. I don't need to re-explain my setup every time.

## Getting Started

OpenClaw installs as a Node.js package:

```bash
npm install -g openclaw
```

The first-run wizard walks you through:
1. Choosing a channel (Discord, Telegram, Slack, etc.)
2. Connecting your bot token
3. Selecting a model provider (OpenAI, Anthropic, GitHub Copilot, Ollama, etc.)
4. Setting a workspace directory

```bash
openclaw wizard
openclaw gateway start
```

After that, message your bot in Discord. It'll respond.

To make it more than a chatbot, you need to build out the memory files. I'll cover that in the next post.

The full workspace lives at `~/.openclaw/workspace`. That's where all the markdown files, skills, cron configs, and memory files live. It's just a directory — you can `git init` it and version everything, which I highly recommend.

## Try It Yourself

The minimum viable setup:
1. A machine that's always on (Pi, old laptop, VPS)
2. Node.js 20+
3. A Discord bot token (free from the Discord Developer Portal)
4. An API key for your preferred model provider

Total cost to run: basically the cost of the API calls. The Pi draws about 5 watts. My monthly OpenClaw bill is dominated by the Claude API, not the hardware.

---

The first week I ran Vision, I mostly just asked it questions. Then I realized I could give it rules. Then I gave it cron jobs. Three months later, it's running parts of my research workflow I used to do manually.

It's not magic. It's just software that's always on, always connected, and designed to remember. That turns out to be enough.

*Next: [Memory and Identity: How an AI Learns to Know You](/blog/2026-04-memory-and-identity)*
