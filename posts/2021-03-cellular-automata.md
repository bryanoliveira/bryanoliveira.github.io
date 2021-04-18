---
title: 'Cellular Automata Framework'
slug: '2021-03-10-cellular-automata'
date: '2021-03-10'
urls:
    [{ cta: 'Code', url: 'https://github.com/bryanoliveira/cellular-automata' }]
type: 'Project'
tags: ['project', 'parallel', 'cuda', 'opengl']
image: '/img/cellular_automata.gif'
description: 'A <a href="https://en.wikipedia.org/wiki/Cellular_automaton" target="_blank">Cellular Automata</a> program built with C++, CUDA and OpenGL. The main objective of this project is to allow scaling up to a fairly large number of cells while maintaining the code legibility and allowing for further customizations.'
---

A [Cellular Automata](https://en.wikipedia.org/wiki/Cellular_automaton) program built with C++, CUDA and OpenGL. It's built to run on a GPU but it also supports CPU-only execution (mainly for relative speedup comparisons).

The main objective of this project is to allow scaling up to a fairly large number of cells while maintaining the code legibility and allowing for further customizations. It supports command line arguments to set up quick configs (run `./automata -h` for details) like headless mode (which is significantly faster) and initial patterns (which can be loaded from the `patterns` folder). It doesn't yet support the definition of evolution rules at runtime, but I'm working on that.

This program can currently evolve a dense & high entropy 144 million cell Conway's Game of Life grid (12000x12000) with rendering enabled with up to 15 FPS on a Ryzen 7 3700X / RTX 3080 using up to 2GB RAM and 9GB VRAM (which is the actual scaling limiter).

<a href="https://raw.githubusercontent.com/bryanoliveira/cellular-automata/master/docs/12000x12000.png" target="_blank">
    <img src="https://raw.githubusercontent.com/bryanoliveira/cellular-automata/master/docs/12000x12000.png" style="width:100%">
</a>

> A 12000x12000 grid running Conway's Game of life.

<a href="https://raw.githubusercontent.com/bryanoliveira/cellular-automata/master/docs/1000x1000.gif" target="_blank">
    <img src="https://raw.githubusercontent.com/bryanoliveira/cellular-automata/master/docs/1000x1000.gif" style="width:100%">
</a>

> A 1000x1000 grid running Conway's Game of life.

---

This program was developed during the 2021/1 Parallel Computing (CCO0455) Computer Science graduate course at Universidade Federal de Goiás (UFG, Brazil).
