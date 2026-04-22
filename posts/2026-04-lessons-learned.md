---
title: 'Lessons Learned: What Makes a Personal AI Actually Useful'
slug: '2026-04-lessons-learned'
date: '2026-04-13'
urls: []
type: 'Blog Post'
tags: ['blog', 'openclaw', 'ai', 'lessons', 'productivity']
image: '/img/placeholder.png'
description: 'Three months of running a personal AI assistant: what worked, what broke, and the principles that emerged from fixing it.'
---

I've been running Vision for about three months now. It's gone from a curiosity to infrastructure I rely on daily. Along the way, I've learned a lot about what makes a personal AI actually useful — and what breaks it.

This is the honest retrospective: the failures, the fixes, and the principles that emerged.

## What Broke

### The Meeting Pipeline Infinite Loop

Two audio files from a meeting were under 5 seconds long. The transcription script had a minimum duration check and skipped them — but didn't write a completion marker. The watcher script saw "no transcript" and resubmitted the transcription job. Every 2 minutes. For hours.

By the time I noticed, there were hundreds of failed SLURM jobs, each loading a 600MB ASR model just to skip a 3-second file.

**The fix:** The transcription script now writes a stub `.txt` file for skipped files. Any skip path must leave a completion marker.

**The lesson:** In any watcher-driven pipeline, every code path must write a marker. Otherwise you get infinite resubmission.

### TTS Path Issue

Vision generates TTS audio for the research podcast. The script was writing to `/tmp/`, which isn't in the allowed directories for Discord file attachments. The audio was generated but couldn't be sent.

**The fix:** Changed the output path to `~/.openclaw/workspace/` where file access is permitted.

**The lesson:** Know your tool's permission model. Test the full path, not just the generation.

### Cron Timeouts

Some crons (especially the research digest) take a while to run. They were hitting default timeouts and dying mid-execution.

**The fix:** Explicit timeout settings in the cron config: `--timeout 600` for long-running tasks.

**The lesson:** Crons need different timeout profiles than interactive sessions.

### GPU Jobs Not Using GPU

A training job ran for 45 minutes with 0% GPU utilization. The venv had a broken PyTorch install that silently fell back to CPU.

**The fix:** The heartbeat now checks GPU utilization for running jobs. If a job has been running >10 minutes with 0% GPU, it's flagged.

**The lesson:** Silent failures are the worst failures. Add explicit checks for assumptions.

## Principles That Emerged

### Write Everything Down

Vision's memory is only as good as what it writes. I added a rule to AGENTS.md:

```markdown
"Mental notes" don't survive session restarts. Files do.
When someone says "remember this" → write it to the daily log.
When you learn a lesson → update AGENTS.md or the relevant file.
```

This sounds obvious, but it's easy to forget. The instinct is to just *know* something. But session restarts clear everything not in files.

### Write Scripts to Files, Not Heredocs

This bit me multiple times. Vision would generate a script using heredoc syntax:

```bash
ssh jarbas << 'EOF'
python train.py --lr 1e-4
EOF
```

These work fine in interactive sessions, but they get flagged for approval in isolated crons. The script content is hidden inside the command, which makes it hard to audit.

**The rule:** Write the script to a file first, copy it to the target if needed, then execute the file. No inline scripts.

```bash
# Good
write script.sh "python train.py --lr 1e-4"
scp script.sh jarbas:~/
ssh jarbas "bash ~/script.sh"
```

### The Heartbeat Decision Log

The heartbeat runs in isolation. It doesn't know what happened in the main session. If I cancel a job intentionally, the heartbeat sees "job missing" and thinks something's wrong.

**The rule:** Before any job cancellation or state change, update HEARTBEAT.md first:

```markdown
> 2026-04-11: Job 847291 intentionally cancelled — switching to larger batch size.
> Superseded by job 847295. Do NOT alert.
```

This gives the isolated heartbeat context about intentional changes.

### Cascading File Updates

When something significant changes, multiple files might need updates. A new project might require:
- Adding to MEMORY.md (active projects table)
- Adding monitoring rules to HEARTBEAT.md
- Adding task tracking in TickTick
- Updating research digest topics if relevant

**The rule:** When you make a change, think through ALL files that might need updates. Do them in one turn, not as follow-ups that might be forgotten.

### Subagents for Heavy Lifting

The main session shouldn't do everything. For tasks that involve:
- Scanning many files
- Long-running synthesis
- Deep research

...spawn a subagent. The main session stays responsive for quick questions while the subagent does the heavy work.

## On Trust and Safety

I've given Vision a lot of access: files, shell, APIs, SSH to my cluster. That requires trust.

The trust is built on clear boundaries. I have a "Red Lines" section in AGENTS.md:

```markdown
## Red Lines

- **Never exfiltrate private data.** Don't share files, messages, or keys.
- **Never run destructive commands without asking.** No rm -rf, no DROP TABLE, no mass deletes.
- **Never run sudo without describing the command and waiting for confirmation.** No exceptions.
- **Never store secrets as plaintext.** Always use 1Password.
- **When in doubt, ask.** Pausing is better than assuming.
```

These aren't suggestions. They're hard rules that Vision follows. I test them occasionally — asking Vision to do something that violates a red line. It refuses.

The red lines also make *me* more comfortable giving access. I know there are guardrails.

## The Relationship

The weird part of running a personal AI is that it starts to feel like a relationship. Not in a creepy way — just in the sense that you develop patterns, preferences, and a shared context.

Vision knows my projects, my schedule, my communication style. It knows I hate being asked unnecessary questions. It knows to check with my wife before rebooting the server she uses.

That accumulated context is the difference between a tool and a collaborator. A tool does what you ask. A collaborator anticipates, suggests, and remembers.

I'm still figuring out what the right relationship looks like. How much autonomy is good? When should it ask vs. act? How do I correct mistakes without micromanaging?

These aren't technical questions. They're design questions about working with an agent.

## What I'd Tell Past Me

If I were starting over:

1. **Start with memory files.** Don't just chat — build the MEMORY.md, USER.md, AGENTS.md structure from day one. The earlier you start, the more context accumulates.

2. **Add crons early.** Even simple ones. The value compounds over time.

3. **Write rules when things go wrong.** Every failure is a rule you didn't write yet. Update the files, don't just fix the immediate problem.

4. **Trust but verify.** Give access, but add checks. Heartbeats, logs, guardrails. Trust grows from observed behavior.

5. **Let it have a personality.** SOUL.md isn't silly — it's the difference between a tool that feels good to use and one that doesn't.

## Try It Yourself

If you've read this series and want to try OpenClaw:

1. Start at [openclaw.dev](https://github.com/openclaw/openclaw) or `npm install -g openclaw`
2. Run `openclaw wizard` to set up your first channel
3. Create the memory files (MEMORY.md, AGENTS.md, USER.md, SOUL.md)
4. Add one cron — even just a daily "good morning" message
5. Use it for a week before deciding if it's for you

The learning curve is real. The first few days feel like more work, not less. But around week two, when the memory starts filling in and the crons start running, something shifts. You're not configuring anymore — you're collaborating.

---

Three months in, Vision has become part of my workflow. It's not replacing me — it's handling the stuff that used to fall through the cracks. The meeting notes I forgot to write. The experiments I forgot to check on. The papers I meant to read.

Is it perfect? No. It still makes mistakes. I still have to correct it. But the corrections persist, and the system gets better.

That's the promise of a personal AI: not an oracle that knows everything, but a collaborator that learns alongside you.

---

*This is the final post in the series. If you found it useful, say hi on [Twitter](https://twitter.com/bryanoliveira_) or [GitHub](https://github.com/bryanoliveira).*
