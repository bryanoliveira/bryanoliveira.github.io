---
title: 'Intrinsic motivation for robotic manipulation learning with sparse rewards'
slug: '2019-12-10-intrinsic-motivation'
date: '2019-12-10'
urls:
    [
        {
            cta: 'Paper',
            url: 'https://github.com/bryanoliveira/undergraduate-thesis/blob/master/Text%20-%20Intrinsic%20motivation%20for%20robotic%20manipulation%20learning%20with%20sparse%20rewards.pdf',
        },
    ]
type: 'Undergraduate Thesis'
tags: ['research', 'publication']
image: '/img/pick.gif'
description: 'Intrinsic motivation for robotic manipulation learning with sparse rewards - Study of the impact of curiosity and intrinsic motivation as an exploration strategy for deep reinforcement learning agents on sparse-reward robotic manipulator environments.'
---


Machine Learning Algorithms have become increasingly efficient at solving complexreal-world problems. In particular, Reinforcement Learning algorithms are capable of learning behaviors applicable to robotics that can replace or work together with classical control models, thereby increasing their robustness, applicability and viability. However,it remains difficult to design reward functions that represent, for a reinforcement learning agent, the task it must perform. Recent research in this area proposes techniques such as curiosity and intrinsic motivation as an alternative to the use of extrinsic environmental rewards, proving to be efficient in guiding the agent to satisfactory exploration in game environments such as VizDoom and Super Mario Bros. This paper analyzes the impact of the intrinsic motivation technique on agent training in robotic simulation environments, as well as its general implications for aspects such as generalization, exploration and sampling efficiency. We found that this approach encourages increasing exploratory behaviors even after the goal tasks were learned. Furthermore, we found that adding information about other objects' states into the agent's observation is crucial for learning complex behaviors when no dense reward signal is provided. This, however, requires the agent to learn it's own dynamics before interacting with the rest of the environment.

<div align="center">
    <img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/pick.gif">
    <img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/push.gif">
    <img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/reach.gif">
</div>

> Learned policies for the tasks Pick And Place (left), Push (center) and Reach (right).

To read the full report, [click here](https://github.com/bryanlincoln/undergraduate-thesis/blob/master/Monografia.pdf) (Portuguese).

This study was inspired by the [Robot open-Ended Autonomous Learning](https://www.aicrowd.com/challenges/robot-open-ended-autonomous-learning-real) competition. The theoretic background was mainly based on

-   [Curiosity-driven Exploration by Self-supervised Prediction](https://pathak22.github.io/noreward-rl/)
-   [Large-Scale Study of Curiosity-Driven Learning](https://pathak22.github.io/large-scale-curiosity/)




### Success Rate Charts

Pick And Place Task (left), Push Task (center) and Reach (right). Blue lines are results for vanilla PPO (baseline) and red lines for PPO + intrinsic motivation.

<div align="center">
    <img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/pick.png"> 
    <img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/push.png"> 
    <img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/reach.png">
</div>

### [Entropy](https://arxiv.org/abs/1811.11214) Charts

Pick And Place Task (left), Push Task (center) and Reach (right). Blue lines are results for vanilla PPO (baseline) and red lines for PPO + intrinsic motivation.

<div align="center">
<img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/pick_ent.png"> 
<img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/push_ent.png"> 
<img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/reach_ent.png">
</div>

### Intrinsic Reward Charts

Pick And Place Task (left), Push Task (center) and Reach (right).

<div align="center">
<img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/pick_int.png"> 
<img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/push_int.png"> 
<img class="text-img mw-33" src="https://github.com/bryanlincoln/undergraduate-thesis/raw/master/fig/preview/reach_int.png">
</div>
