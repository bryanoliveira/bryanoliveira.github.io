---
title: 'PulseRL: Enabling Offline Reinforcement Learning for Digital Marketing Systems via Conservative Q-Learning'
slug: '2021-10-25-pulse-rl'
date: '2021-10-25'
urls:
    [
        { cta: 'Code', url: 'https://github.com/dlb-rl/pulse-rl' },
        {
            cta: 'Paper',
            url: 'https://offline-rl-neurips.github.io/2021/pdf/9.pdf',
        },
        { cta: 'Dataset', url: 'https://bit.ly/ac-dataset' },
    ]
type: 'Workshop Publication'
tags: ['research', 'publication']
image: '/img/pulserl.png'
description: 'Offline Reinforcement Learning for Digital Marketing Systems via Conservative Q-Learning - Presentation at the 2nd Offline Reinforcement Learning Workshop at the 35th Conference on Neural Information Processing (NeurIPS 2021).'
---

## Abstract

Digital Marketing Systems (DMS) are the primary point of contact between a digital business and its customers. In this context, the communication channel optimization problem poses a precious and still open challenge for DMS. Due to its interactive nature, Reinforcement Learning (RL) appears as a promising formulation for this problem. However, the standard RL setting learns from interacting with the environment, which is costly and dangerous for production systems. Furthermore, it also fails to learn from historical interactions due to the distributional shift between the collection and learning policies. For this matter, we present PulseRL, an offline RL-based production system for communication channel optimization built upon the Conservative Q-Learning (CQL) Framework. PulseRL architecture comprises the whole engineering pipeline (data processing, training, deployment, and monitoring), scaling to handle millions of users. Using CQL, PulseRL learns from historical logs, and its learning objective reduces the shift problem by mitigating the overestimation bias from out-of-distribution actions. We conducted experiments in a real-world DMS. Results show that PulseRL surpasses RL baselines with a significant margin in the online evaluation. They also validate the theoretical properties of CQL in a complex scenario with high sampling error and non-linear function approximation.

<div align="center">
    <img class="text-img mw-100" src="/img/pulserl_architecture.png">
</div>

> Illustration of PulseRL’s system pipeline. We compose it with different big data storage models, a data transformation engine, a task manager, and specialized microservices for training and inference, which ensures scalability for handling millions of users on a daily basis. It also provides version control for source code, dataset, MDP’s and RL agents.

<br/><br/>

More info soon.
