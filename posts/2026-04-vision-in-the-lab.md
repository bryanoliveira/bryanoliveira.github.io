---
title: 'Vision in the Research Lab: SLURM, Obsidian, and Meeting Notes'
slug: '2026-04-vision-in-the-lab'
date: '2026-04-12'
urls: []
type: 'Blog Post'
tags: ['blog', 'openclaw', 'ai', 'research', 'productivity', 'slurm']
image: '/img/placeholder.png'
description: 'How I use Vision to manage ML experiments on a SLURM cluster, auto-transcribe meetings into Obsidian, and build a personal research knowledge base.'
---

I'm a reinforcement learning researcher. My day involves a lot of: running experiments, reading papers, attending meetings, and trying to remember what I learned last month. Vision helps with all of it.

This post is about the research-specific workflows — the ones that turned Vision from a general assistant into a genuine lab partner.

## The Cluster: SLURM Job Management

I have a small GPU cluster at home: two machines with RTX 3090s running SLURM. When I'm running experiments, I might have dozens of jobs in flight — different hyperparameters, different seeds, different environment configurations.

Vision can submit jobs, monitor them, and summarize results.

### Submitting Jobs

Instead of writing SLURM scripts by hand, I describe what I want:

```
Run GRPO on HalfCheetah with learning rates [1e-4, 3e-4, 1e-3], 
3 seeds each, 1M steps. Use the grpo_vs_ppo repo on jarbas.
```

Vision generates the batch scripts, submits them, and posts a summary:

```
✅ Submitted 9 jobs to jarbas:

| Job ID  | Config                     | Status  |
|---------|----------------------------|---------|
| 847291  | lr=1e-4, seed=0            | PENDING |
| 847292  | lr=1e-4, seed=1            | PENDING |
| 847293  | lr=1e-4, seed=2            | PENDING |
| ...     | ...                        | ...     |

Estimated completion: ~4 hours. I'll check GPU utilization in 15 min.
```

The key here is that Vision knows my cluster setup from memory files. It knows where the repos are, which partitions to use, how to set up the environment.

### Monitoring Jobs

The heartbeat checks on SLURM jobs periodically, but I can also ask directly:

```
What's the status of the GRPO sweep?
```

Vision SSHes in, runs `squeue` and `sacct`, and summarizes:

```
**GRPO Sweep Status (9 jobs)**

- ✅ Completed: 6
- 🔄 Running: 2  
- ❌ Failed: 1 (847295 — OOM on seed=2, lr=1e-3)

Failed job log shows CUDA OOM at step 45000. 
Recommend: reduce batch size or enable gradient checkpointing.
```

### Results Analysis

When experiments finish, Vision can pull results and compare:

```
Compare the GRPO runs against PPO baselines on HalfCheetah
```

Vision reads the W&B logs (or local tensorboard files), computes summary statistics, and sometimes even generates plots if I ask.

## Meeting Transcription Pipeline

I'm in a lot of meetings. Research syncs, project standups, one-on-ones. I used to take notes manually. Now I don't.

The pipeline:
1. My Mac records the meeting audio
2. The recording lands on NFS (shared storage)
3. A watcher script detects new audio files
4. A SLURM job transcribes it using Qwen3-ASR
5. A subagent generates structured notes in Obsidian format
6. The notes appear in my vault

The watcher runs as a crontab entry on pie:

```bash
*/2 * * * * /home/bryan/.openclaw/workspace/scripts/meeting_watcher.sh
```

It checks for `.m4a` files without a corresponding `.txt` transcript, then submits transcription jobs.

The note generation prompt is tuned for my format:

```markdown
# Note Generation Prompt

Given this meeting transcript, generate an Obsidian note with:

- YAML frontmatter (title, date, time_start, time_end, project, attendees)
- ## Summary (3-5 bullet points)
- ## Key Decisions (if any)
- ## Action Items (with owners)
- ## Discussion Notes (detailed)

Save the note to ~/Notes/Work/<Project>/Meetings/<date>-<title>.md
```

The result: I can search my vault for "GRPO meeting" and find every discussion we've had, with decisions and action items extracted.

## Building a Personal Knowledge Base

I read a lot of papers. I used to lose track of what I'd read, what was relevant to my work, and where I'd written notes.

Now I have a wiki ingestion system. I drop PDFs or markdown files into a folder, and a nightly cron processes them:

```bash
openclaw cron add \
  --name "wiki:ingest-watcher" \
  --schedule "0 0 * * *" \
  --prompt "Check ~/wiki-inbox/ for new files. For each:
    1. Extract text (OCR if needed)
    2. Generate summary + tags
    3. Save to ~/Notes/Research/Papers/
    4. Move original to ~/wiki-archive/"
```

For papers, Vision generates a structured breakdown: context, problem, method, results, limitations, connections to my work. These go into Obsidian with backlinks to related concepts.

There's also a weekly lint job that audits the wiki:

```bash
openclaw cron add \
  --name "wiki:weekly-lint" \
  --schedule "0 4 * * 0" \
  --prompt "Audit ~/Notes/ for:
    - Orphan pages (no incoming links)
    - Broken links
    - Empty notes
    - Duplicate content
    Post report to #knowledge-base."
```

This keeps the wiki from becoming a graveyard of unconnected notes.

## Case Study: GRPO vs PPO Experiment

Let me walk through a real example. I'm working on a paper comparing GRPO (Group Relative Policy Optimization) to PPO in classical RL environments. The experiment involved 507 SLURM jobs across CartPole, Acrobot, and HalfCheetah.

### Submission

I described the experiment matrix:

```
Run the perfect grouping sweep from the GRPO paper:
- Envs: CartPole, Acrobot, HalfCheetah
- Group sizes: 4, 8, 16
- Algorithms: GRPO, PPO
- 3 seeds each
Use the grpo_vs_ppo repo, log to W&B project "grpo-perfect-grouping"
```

Vision generated the sweep configuration, wrote the submission scripts, and kicked everything off.

### Monitoring

Over the next few hours, heartbeats caught two issues:
1. One job failed because WANDB_API_KEY wasn't in the SLURM environment
2. Several CPU-only jobs were accidentally requesting GPU partition

Vision fixed both by updating the submission wrapper and resubmitting failed jobs.

### Results

When the sweep finished:

```
Summarize the perfect grouping results, focusing on:
- Performance vs group size
- GRPO vs PPO advantage
- Any surprising findings
```

Vision pulled the W&B data, computed means and confidence intervals, and wrote a summary that went directly into my paper's results section draft.

### Channel History

The entire experiment is documented in `#grpo-classic-rl`. Every submission, every failure, every result. When I need to remember what we tried, I can scroll through the channel or ask Vision to summarize.

## Try It Yourself

For SLURM integration:
1. Ensure Vision can SSH to your cluster nodes (key-based auth)
2. Add cluster info to MEMORY.md: hostnames, partitions, paths
3. Write rules in AGENTS.md for how to submit jobs (wrapper scripts, env setup)

For meeting transcription:
1. Set up a shared folder for recordings (NFS, Syncthing, etc.)
2. Install a transcription model (Whisper, Qwen3-ASR)
3. Write a watcher script that submits jobs for new files
4. Create a note generation prompt tuned to your format

For knowledge base:
1. Create an inbox folder for incoming documents
2. Set up a nightly cron to process the inbox
3. Define your note format (frontmatter, sections, tags)
4. Add a weekly lint job to maintain quality

---

The research workflows took the longest to set up, but they also provide the most value. The meeting notes alone save me hours per week. The experiment monitoring catches problems I'd otherwise miss. The wiki keeps my reading organized.

Vision isn't replacing the research — I still design experiments, analyze results, and write papers. But it handles the logistics, the record-keeping, and the monitoring. That frees me up to focus on the actual science.

*Next: [Lessons Learned: What Makes a Personal AI Actually Useful](/blog/2026-04-lessons-learned)*
