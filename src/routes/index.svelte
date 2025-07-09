<script context="module">
    export function preload() {
        return this.fetch(`blog.json`)
            .then((r) => r.json())
            .then((posts) =>
                posts.map((post) => {
                    // don't send whole html to frontend
                    delete post.html
                    return post
                })
            )
            .then((posts) => {
                return { posts }
            })
            .catch((e) => {
                console.error(e)
            })
    }
</script>

<script>
    export let posts // get from server side
    import SubLinks from '../components/SubLinks.svelte'
    import PostListItem from '../components/PostListItem.svelte'

    const tabs = {
        featured: 'Featured',
        all: 'All',
    }
    const tab_all = 'all'
    let active_tab = 'featured'
</script>

<svelte:head>
    <title>Bryan Oliveira</title>

    <!--  Include canonical links to your blog -->
    <link rel="canonical" href="https://bryanoliveira.github.io" />
    <meta property="og:url" content="https://bryanoliveira.github.io" />
    <meta property="og:title" content="Bryan Oliveira" />
    <meta
        property="og:description"
        content="Hi! I'm Bryan and this is my personal website."
    />
    <meta
        name="description"
        content="Hi! I'm Bryan and this is my personal website."
    />
    <!--  Link to your preferred image  -->
    <meta property="og:image" content="/img/icon.png" />
</svelte:head>

<div class="text-center">
    <h1 class="mt-5">Bryan de Oliveira</h1>
    <div class="mb-4">
        <SubLinks />
    </div>

    <div id="intro" class="text-justify indicate_blank">
        <!-- Who I am -->
        <p class="mt-4">
            <img
                src="/img/me.jpg"
                id="img-me"
                alt="Bryan de Oliveira"
                align="left"
            />
            Hi! I'm Bryan, a {new Date().getFullYear() - 1997}-year-old AI researcher based in Goiânia, Brazil. 
            I recently completed my Master's degree in Computer Science from the
            <a href="https://international.ufg.br/" target="_blank">Federal University of Goiás</a>, 
            specializing in Deep Reinforcement Learning with a publication at <a href="https://icml.cc/virtual/2025/poster/43653" target="_blank">ICML 2025</a>. 
            I am actively seeking PhD opportunities to advance cutting-edge research in AI and RL towards developing generalist agents that learn from experience.
        </p>
        <!-- What I do -->
        <p>
            I currently work at the <a
                href="https://ceia.ufg.br"
                target="_blank">Center of Excellence in Artificial Intelligence (CEIA)</a
            > and the <a href="https://akcit.ufg.br/" target="_blank">Advanced Knowledge Center for Immersive Technologies (AKCIT)</a>,
            where I lead interdisciplinary teams on cutting-edge AI R&D projects. My current work focuses on LLM training 
            and evaluation through reinforcement learning, emphasizing reasoning, tool use, information-seeking behavior, 
            interpretability, and steerability. I also explore LLM-based multi-agent systems, investigating evolutionary search, 
            computer use, and implicit feedback mechanisms. My approach combines theoretical advances in Deep RL with practical applications, 
            bridging the gap between academic innovation and real-world deployment.
        </p>
        <!-- Research focus and experience -->
        <p>
            My research expertise spans Deep Reinforcement Learning, with particular focus on representation learning, model-based RL, and industry applications 
            in pricing optimization and recommender systems. I have proven ability to structure and execute complex R&D projects from 
            conception to publication, complemented by extensive engineering experience in developing and deploying ML systems. This background provides me with unique 
            insights into both the theoretical foundations and practical constraints of AI systems.
        </p>
        <!-- Vision and interests -->
        <p>
            I'm deeply interested in the fundamental questions of artificial intelligence, neuroscience, and their interconnections, 
            particularly in how we can develop AI systems that learn better representations and leverage world models to effectively plan and adapt. I believe in a principled, interdisciplinary 
            approach to AI research that combines theory with rigorous empirical validation and real-world impact.
        </p>
    </div>
</div>

<div id="portfolio" class="mt-5 pt-4">
    <div id="portfolio-nav" class="text-center">
        <ul class="nav nav-tabs nav-fill no-underline">
            {#each Object.keys(tabs) as tab}
                <li class="nav-item">
                    <a
                        class="nav-link"
                        class:active={active_tab == tab}
                        href="#portfolio"
                        on:click={() => (active_tab = tab)}
                    >
                        {tabs[tab]}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
    <div class="mt-4 pt-3 text-justify">
        {#if active_tab != tab_all}
            {#each posts as post}
                {#if post.tags.includes("highlight")}
                    <PostListItem {post} />
                {/if}
            {/each}
        {/if}
        {#each posts as post}
            {#if active_tab == tab_all || (post.tags.includes(active_tab) && !post.tags.includes("highlight"))}
                <PostListItem {post} />
            {/if}
        {/each}
    </div>
</div>
<hr class="ml-5 mr-5 mt-5" />
<footer class="text-center indicate_blank">
    <small class="text-muted">
        These are a few of my most relevant work. Other projects can be found on <a
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
        <br />
        <!-- You can also check out my <a href="/blog" rel="prefetch">blog</a>. -->
    </small>
</footer>

<style>
    #img-me {
        /* margin-top: -40px;
        margin-right: 30px; */

        width: 140px;
        height: 140px;
        margin: 0 20px 5px 0;
        border-radius: 10%;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
    }

    #intro p {
        font-size: 1.2rem;
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
