---
title: '3D Rendering & Force Simulator'
slug: '2018-12-10-rigid-body-physics'
date: '2018-12-10'
urls:
    [
        {
            cta: 'Code',
            url: 'https://github.com/bryanoliveira/processing-3d-force-simulator',
        },
    ]
type: 'Rendering'
tags: ['project', 'rendering', 'simulation']
image: '/img/rigidbody_physics.gif'
description: "3D Force simulator using only Processing's point() and line functions. Uses Digital Differential Analyzer (DDA) to render lines between two points, Scan Line to render polygons, normal calculation to determine faces to render in 3D space and Newtonian physics. Written in Java."
---

3D Force simulator using only [Processing](https://processing.org/)'s point() and line() functions. Uses Digital Differential Analyzer (DDA) to render lines between two points, Scan Line to render polygons, normal calculation to determine faces to render in 3D space and Newtonian physics. Written in Java.

<div align="center">
    <img class="text-img mw-100" src="/img/rigidbody_physics.gif"/>
</div>

> One of the project's scenes, where the cube is affected by gravity and the ground is not.

The program interface allows for real-time selection, positioning, rotation, scaling and acceleration of objects. In a [previous version](https://github.com/bryanoliveira/processing-3d-force-simulator/blob/fc899000baecf513cc3da4b38ab104cd4de260f7/Simulator/Projections.pde) it also supported selecting between Cavalier, Cabinet, Isometric, Perspective-Z and Perspective-XZ projections.

## Usage

-   Clone this repository
-   Install [Processing](https://processing.org/download/)
-   Open this project with Processing IDE or execute `processing-java --sketch=Simulator --force --run` in a CLI.

---

This program was developed as the final project for the 2018/2 Computer Graphics (INF0037) class of Computer Science at Universidade Federal de Goiás (UFG, Brazil).
