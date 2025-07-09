---
title: 'InfoQuest: Evaluating Multi-Turn Dialogue Agents for Open-Ended Conversations with Hidden Context'
slug: '2025-03-infoquest'
date: '2025-03-08'
urls:
    [
        {
            cta: 'Paper',
            url: 'https://arxiv.org/abs/2502.12257',
        },
        {
            cta: 'Data',
            url: 'https://huggingface.co/datasets/bryanlincoln/infoquest',
        },
    ]
type: 'Workshop on SSI-FM @ ICLR 2025'
tags: ['research', 'featured']
image: '/img/infoquest_cover.png'
description: 'A benchmark for evaluating how LLMs handle ambiguous open-ended requests through dialogue, revealing that current models struggle to ask effective clarifying questions.'
---

## Abstract

Large language models excel at following explicit instructions, but they often struggle with ambiguous or incomplete user requests, defaulting to verbose, generic responses instead of seeking clarification. We introduce InfoQuest, a multi-turn chat benchmark designed to evaluate how dialogue agents handle hidden context in open-ended user requests. This benchmark presents intentionally ambiguous scenarios that require models to engage in information-seeking dialogue by asking clarifying questions before providing appropriate responses. Our evaluation of both open and closed models reveals that, while proprietary models generally perform better, all current assistants struggle to gather critical information effectively. They often require multiple turns to infer user intent and frequently default to generic responses without proper clarification. We provide a systematic methodology for generating diverse scenarios and evaluating models' information-seeking capabilities, which can be leveraged to automatically generate data for self-improvement. We also offer insights into the current limitations of language models in handling ambiguous requests through multi-turn interactions.

<div align="center">
    <img class="text-img mw-100" src="/img/infoquest_diagram.png">
</div>

> <b>InfoQuest's three-stage benchmark construction process.</b> Left: initial state generation by selecting personas and creating ambiguous messages. Center: user setting with persona traits, goals, obstacles and constraints. Right: generation of a checklist to evaluate information gathering.

---
Presented at the Workshop on Scaling Self-Improving Foundation Models without Human Supervision at the 13th International Conference on Learning Representations (ICLR).