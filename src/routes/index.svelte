<script>
    const tab_all = 'all'
    const tab_publication = 'publication'
    const tab_projects = 'project'
    let active_tab = tab_all

    const projects = [
        {
            title: 'Cellular Automata Framework',
            url: 'https://github.com/bryanoliveira/cellular-automata',
            date: 'Mar, 2021',
            type: 'Project',
            tags: ['project', 'parallel', 'cuda', 'opengl'],
            image: 'img/cellular_automata.gif',
            description: `A <a href="https://en.wikipedia.org/wiki/Cellular_automaton" 
					target="_blank">Cellular Automata</a>
                    program built with C++, CUDA and OpenGL. The main objective of
                    this project is to allow scaling up to a fairly large number
                    of cells while maintaining the code legibility and allowing for
                    further customizations.`,
        },
        {
            title: 'Undergraduate Thesis',
            url: 'https://github.com/bryanoliveira/undergraduate-thesis',
            date: 'Dec, 2019',
            type: 'Research',
            tags: ['research', 'publication'],
            image: 'img/pick.gif',
            description: `Intrinsic motivation for robotic manipulation learning with
                    sparse rewards - Study of the impact of curiosity and
                    intrinsic motivation as an exploration strategy for deep
                    reinforcement learning agents on sparse-reward robotic
                    manipulator environments.`,
        },
        {
            title: 'Bone Age Regression',
            url: 'https://github.com/bryanoliveira/bone-age-regression',
            date: 'Nov, 2019',
            type: 'Deep Learning',
            tags: ['project', 'ai', 'deeplearning'],
            image: 'img/bone.png',
            description: `My code for the I2A2 Bone Age Regression competition. I
                    learned a lot building this pipeline from scratch and was
                    able to experiment with different model architectures and
                    optimizers. This was my first end-to-end image regression
                    model and it was very nice seeing my theoretic knowledge
                    working in practice.`,
        },
        {
            title: 'Quack',
            url: 'https://github.com/bryanoliveira/gjams-2019-quack',
            date: 'Jan, 2019',
            type: 'Game',
            tags: ['project', 'ai', 'deeplearning'],
            image: 'img/quack.png',
            description: `Quack is a Unity3D game made for the Global Game Jam 2019
                    with theme "What home means to you?". The game consists in a
                    happy chicken that wants to build a new home for it's
                    children. You have to collect sticks and group them in top
                    of the main tree to make a nice nest. This game was
                    developed within 12 hours.`,
        },
        {
            title: 'Rigid Body Physics Simulator',
            url:
                'https://github.com/bryanoliveira/processing-physics-simulator',
            date: 'Dec, 2018',
            type: 'Rendering',
            tags: ['project', 'rendering', 'simulation'],
            image: 'img/rigidbody_physics.gif',
            description: `3D Rigid Body Physics simulator using only Processing's
                    point() and line() functions. Uses Digital Differential
                    Analyzer (DDA) to render lines between two points, Scan Line
                    to render polygons, normal calculation to determine faces to
                    render in 3D space and Newtonian physics. Written in Java.`,
        },
        {
            title: 'IEEE VSSS Team',
            url: 'https://github.com/bryanoliveira/PY-VSSS-INF',
            date: 'Oct, 2018',
            type: 'Robotics',
            tags: ['project', 'robotics', 'leadership'],
            image: 'img/vsss.png',
            description: `A stack consisting of image processing, computer vision,
                    team coordination, navigation, control and communication
                    softwares to compete in the 2018's Latin-American Robotics
                    Competition for the Pequi Mecânico UFG - INF's team.`,
        },
        {
            title: 'Die Zombit',
            url: 'https://github.com/bryanoliveira/unity-zombit',
            date: 'Jun, 2015',
            type: 'Game',
            tags: ['project', 'game', 'indie'],
            image: 'img/zombit.png',
            description: `Reviving the classics of the 80's and 90's, Die Zombit is a
                    retrowave top-down shooting game that has a striking
                    soundtrack and an addictive gameplay which guarantee many
                    hours of fun.`,
        },
    ]
</script>

<svelte:head>
    <title>Bryan Oliveira</title>
</svelte:head>

<div id="intro" class="text-center">
    <img src="img/me.jpg" id="img-me" alt="Bryan Oliveira" />
    <h1 class="cover-heading mt-3">Bryan Oliveira</h1>
    <p class="text-muted">Machine Learning Engineer</p>
    <p id="sub-links" class="lead mt-1">
        <a
            href="https://github.com/bryanoliveira"
            target="_blank"
            title="Github"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                <path
                    d="M36,20.3c0,3.5-1,6.6-3.1,9.4c-2,2.8-4.7,4.7-7.9,5.8c-0.4,0.1-0.6,0-0.8-0.1c-0.2-0.2-0.3-0.4-0.3-0.6v-4.4 c0-1.3-0.4-2.3-1.1-3c0.8-0.1,1.5-0.2,2.1-0.4c0.6-0.2,1.3-0.4,2-0.8c0.7-0.4,1.2-0.8,1.7-1.4c0.5-0.5,0.8-1.3,1.1-2.2 s0.4-2,0.4-3.1c0-1.7-0.5-3.1-1.6-4.3c0.5-1.3,0.5-2.7-0.2-4.2c-0.4-0.1-1,0-1.7,0.2c-0.7,0.3-1.4,0.6-1.9,0.9L24,12.5 c-1.3-0.4-2.6-0.5-4-0.5s-2.7,0.2-4,0.5c-0.2-0.2-0.5-0.3-0.9-0.6c-0.4-0.2-0.9-0.5-1.7-0.8c-0.8-0.3-1.4-0.4-1.8-0.3 c-0.6,1.6-0.7,3-0.1,4.2c-1.1,1.2-1.6,2.6-1.6,4.3c0,1.2,0.1,2.2,0.4,3.1s0.6,1.6,1.1,2.2s1,1,1.7,1.4c0.7,0.4,1.3,0.6,2,0.8 c0.6,0.2,1.3,0.3,2.1,0.4c-0.6,0.5-0.9,1.2-1,2.1c-0.3,0.1-0.6,0.2-0.9,0.3c-0.3,0.1-0.7,0.1-1.2,0.1c-0.5,0-0.9-0.1-1.4-0.4 c-0.5-0.3-0.8-0.7-1.2-1.3c-0.3-0.4-0.6-0.8-1-1.1c-0.4-0.3-0.8-0.4-1-0.5L9,26.5c-0.3,0-0.5,0-0.6,0.1c-0.1,0.1-0.1,0.1-0.1,0.2 c0,0.1,0.1,0.2,0.2,0.3c0.1,0.1,0.2,0.2,0.3,0.2l0.1,0.1c0.3,0.1,0.6,0.4,0.9,0.8s0.5,0.7,0.7,1.1l0.2,0.5c0.2,0.5,0.5,1,0.9,1.3 c0.4,0.3,0.9,0.5,1.4,0.6c0.5,0.1,1,0.1,1.4,0.1c0.5,0,0.9,0,1.2-0.1l0.5-0.1c0,0.5,0,1.1,0,1.9c0,0.7,0,1.1,0,1.1 c0,0.2-0.1,0.5-0.3,0.6c-0.2,0.2-0.5,0.2-0.8,0.1c-3.2-1.1-5.8-3-7.9-5.8S4,23.8,4,20.3c0-2.9,0.7-5.6,2.1-8S9.5,7.8,12,6.4 s5.1-2.1,8-2.1s5.6,0.7,8,2.1s4.4,3.4,5.8,5.8S36,17.4,36,20.3L36,20.3z"
                />
            </svg>
        </a>
        <a
            href="https://linkedin.com/in/bryanoliveira/"
            target="_blank"
            title="Linkedin"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style="padding: 1px;"
            >
                <path
                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                />
            </svg>
        </a>
        <a
            href="https://twitter.com/bryanlincoln_"
            target="_blank"
            title="Twitter"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                <path
                    d="M36.3,10.2c-1,1.3-2.1,2.5-3.4,3.5c0,0.2,0,0.4,0,1c0,1.7-0.2,3.6-0.9,5.3c-0.6,1.7-1.2,3.5-2.4,5.1 c-1.1,1.5-2.3,3.1-3.7,4.3c-1.4,1.2-3.3,2.3-5.3,3c-2.1,0.8-4.2,1.2-6.6,1.2c-3.6,0-7-1-10.2-3c0.4,0,1.1,0.1,1.5,0.1 c3.1,0,5.9-1,8.2-2.9c-1.4,0-2.7-0.4-3.8-1.3c-1.2-1-1.9-2-2.2-3.3c0.4,0.1,1,0.1,1.2,0.1c0.6,0,1.2-0.1,1.7-0.2 c-1.4-0.3-2.7-1.1-3.7-2.3s-1.4-2.6-1.4-4.2v-0.1c1,0.6,2,0.9,3,0.9c-1-0.6-1.5-1.3-2.2-2.4c-0.6-1-0.9-2.1-0.9-3.3s0.3-2.3,1-3.4 c1.5,2.1,3.6,3.6,6,4.9s4.9,2,7.6,2.1c-0.1-0.6-0.1-1.1-0.1-1.4c0-1.8,0.8-3.5,2-4.7c1.2-1.2,2.9-2,4.7-2c2,0,3.6,0.8,4.8,2.1 c1.4-0.3,2.9-0.9,4.2-1.5c-0.4,1.5-1.4,2.7-2.9,3.6C33.8,11.2,35.1,10.9,36.3,10.2L36.3,10.2z"
                />
            </svg>
        </a>
        <a href="mailto:bryanufg@gmail.com" target="_blank" title="E-mail me!">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 477.867 477.867"
            >
                <path
                    d="M460.8,68.267H17.067C7.641,68.267,0,75.908,0,85.333v307.2c0,9.426,7.641,17.067,17.067,17.067H460.8
	c9.426,0,17.067-7.641,17.067-17.067v-307.2C477.867,75.908,470.226,68.267,460.8,68.267z M432.811,102.4L238.933,251.529
	L45.056,102.4H432.811z M443.733,375.467h-409.6V137.062L228.54,286.6c6.13,4.707,14.657,4.707,20.787,0l194.406-149.538V375.467z
	"
                />
            </svg>
        </a>
    </p>
    <div class="text-center">
        <!-- Who I am -->
        <p class="mt-4">
            Hi! I'm Bryan,
            <script>
                // you didn't see this comming, right?
                document.write(new Date().getFullYear() - 1997 + ', ')
            </script>
            bachelor in Computer Science by Universidade Federal de Goiás (Brazil).
            Elegant code writer, eclectic listener, voracious meta-learner and sporadic
            gamer. I'm amazed by nature and how the mind works - things I'm forever
            curious about.
        </p>
        <!-- What I do -->
        <p>
            I'm currently working on offline reinforcement learning applied to
            debt collection and automatic advertisement generation as Machine
            Learning Engineer at <a
                href="http://centrodeia.org/"
                target="_blank">CEIA</a
            >
            /
            <a href="http://www.deeplearningbrasil.com.br/" target="_blank"
                >Deep Learning Brasil</a
            >. I'm also working as Machine Learning Operations (MLOps) Engineer
            at
            <a href="http://www.datah.ai/" target="_blank">Data-H</a>,
            developing automated pipelines for data processing and training,
            evaluating, deploying and monitoring of ML models.
        </p>
        <!-- My objective interests -->
        <p>
            I'm deeply interested in cognitive neuroscience, artificial
            intelligence, evolution, quantum mechanics and their
            interconnections. I also like a broader philosophical approach to AI
            research, as I believe it can be used to explain numerous human
            behaviors and thought processes. I plan to do a Master's / PhD in
            this area soon.
        </p>
    </div>
</div>

<div id="portfolio" class="mt-5 pt-4">
    <div id="portfolio-nav" class="text-center">
        <ul class="nav nav-tabs nav-fill">
            <li class="nav-item">
                <a
                    class="nav-link"
                    class:active={active_tab == tab_all}
                    href="#portfolio"
                    on:click={() => (active_tab = tab_all)}
                >
                    All
                </a>
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    class:active={active_tab == tab_publication}
                    href="#portfolio"
                    on:click={() => (active_tab = tab_publication)}
                >
                    Publications
                </a>
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    class:active={active_tab == tab_projects}
                    href="#portfolio"
                    on:click={() => (active_tab = tab_projects)}
                >
                    Projects
                </a>
            </li>
        </ul>
    </div>
    <div class="mt-4 text-justify">
        {#each projects as project}
            {#if active_tab == tab_all || project.tags.includes(active_tab)}
                <div class="row item">
                    <div class="col-md-8">
                        <h3>
                            <a href={project.url} target="_blank">
                                {project.title}
                            </a>
                        </h3>
                        <small class="text-muted">
                            {project.type} · {project.date}
                        </small>
                        <p class="item-description">
                            {@html project.description}
                            <a href={project.url} target="_blank">Read more</a>
                        </p>
                    </div>
                    <div class="col-md-4">
                        <a href={project.url} target="_blank"
                            ><img alt={project.title} src={project.image} />
                        </a>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</div>
<hr class="ml-5 mr-5 mt-5" />
<div class="text-center">
    <small class="text-muted">
        This is a few of my most relevant work. Other projects can be found at <a
            href="https://github.com/bryanoliveira"
            target="_blank"
            title="Github">Github</a
        >
        and
        <a
            href="https://linkedin.com/in/bryanoliveira/"
            target="_blank"
            title="Linkedin">LinkedIn</a
        >.
    </small>
</div>

<style>
    h1 {
        font-size: 1.9rem;
    }
    #intro p {
        font-size: 1.2rem;
    }

    #img-me {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
    }

    #sub-links a {
        padding: 10px;
        opacity: 0.6;
        transition: opacity 0.1s ease-in-out;
    }
    #sub-links a:hover {
        opacity: 0.8;
        border-bottom: none;
        text-decoration: none;
    }

    #sub-links a svg {
        width: 20px;
        height: 20px;
    }

    #portfolio h3 {
        font-size: 1.3rem;
        margin-bottom: 0;
    }
    #portfolio a {
        padding: 3px 0;
    }
    #portfolio .item-description a[target='_blank']::after {
        content: '\29C9' !important;
        margin: 0 3px 0 5px;
    }
    #portfolio .item small {
        line-height: 30px;
    }
    #portfolio .item small.text-muted {
        color: #888 !important;
    }
    #portfolio img {
        width: 100%;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }
    #portfolio .row {
        margin-top: 2rem;
    }

    #portfolio-nav {
        text-transform: uppercase;
        font-size: 0.9rem;
    }
    #portfolio-nav a {
        text-decoration: none;
        border-bottom: none;
    }
    #portfolio-nav a:hover {
        border-bottom: none;
    }
</style>
