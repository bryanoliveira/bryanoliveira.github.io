<script>
    import { onMount } from 'svelte'
    export let data
    import SubLinks from '$lib/components/SubLinks.svelte'
    import PostListItem from '$lib/components/PostListItem.svelte'
    import PublicationListItem from '$lib/components/PublicationListItem.svelte'

    const tabs = {
        publications: 'Publications',
        other: 'Other',
    }
    const tab_all = 'other'
    let active_tab = 'publications'

    // Lazy load state for "All" tab
    const BATCH_SIZE = 5
    let visibleCount = BATCH_SIZE
    let sentinel
    let observer

    $: allPosts = data.posts
    $: otherPosts = allPosts.filter(p => !p.tags.includes('publication'))
    $: visibleAllPosts = otherPosts.slice(0, visibleCount)
    $: hasMore = visibleCount < otherPosts.length

    // Reset visible count when switching to "All" tab
    $: if (active_tab === tab_all) {
        visibleCount = BATCH_SIZE
    }

    function loadMore() {
        visibleCount = Math.min(visibleCount + BATCH_SIZE, allPosts.length)
    }

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadMore()
            },
            { rootMargin: '200px' }
        )
        return () => observer?.disconnect()
    })

    // Observe/unobserve sentinel whenever it changes (tab switch or posts exhausted)
    $: if (observer && sentinel) {
        observer.observe(sentinel)
    }
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
            Hi! I'm Bryan, a {new Date().getFullYear() - 1997}-year-old AI researcher and PhD Student in Computer Science at the <a href="https://international.ufg.br/" target="_blank">Federal University of Goiás (UFG)</a>, based in Goiânia, Brazil. I work at <a href="https://ceia.ufg.br" target="_blank">CEIA</a> and <a href="https://akcit.ufg.br/" target="_blank">AKCIT</a>, where I lead interdisciplinary research teams at the intersection of Deep Reinforcement Learning and decision-making under uncertainty, with a publication at <a href="https://icml.cc/virtual/2025/poster/43653" target="_blank">ICML 2025</a>.
        </p>
        <!-- What I do -->
        <p>
            My research centers on agents that make good decisions under uncertainty — combining Deep RL, information-seeking behavior, and Bayesian methods. I lead four research sub-teams at AKCIT: <strong>InfoGainme</strong> (dialogue agents for optimal question-asking, <a href="https://arxiv.org/abs/2601.17716" target="_blank">arXiv:2601.17716</a>), <strong>GRPO vs PPO</strong> (empirical study of policy gradient methods, <a href="https://arxiv.org/abs/2511.03527" target="_blank">arXiv:2511.03527</a>), <strong>Embodied Agents</strong> (LLM-based planning under uncertainty), and <strong>Autonomous Humanoids</strong> (teleoperation and sim-to-real transfer). I also lead applied R&amp;D projects with industry partners through CEIA: CEMIG, HUG Labs, bettrAds, Recovery/Itaú, and Bancorbrás.
        </p>
        <!-- Research focus and experience -->
        <p>
            My research expertise spans Deep Reinforcement Learning, representation learning, world models, and autonomous decision-making. I have proven ability to structure and execute complex R&amp;D projects from conception to publication, complemented by extensive engineering experience in developing and deploying ML systems at scale. This background provides unique insights into both the theoretical foundations and practical constraints of AI systems.
        </p>
        <!-- Vision and interests -->
        <p>
            I'm deeply interested in the fundamental questions of artificial intelligence and neuroscience — particularly how we can develop AI systems that learn better representations and world models to effectively plan and adapt in uncertain environments. I believe in a principled, interdisciplinary approach to AI research that combines theory with rigorous empirical validation and real-world impact.
        </p>
    </div>
</div>

<div id="research-interests" class="mt-4 text-center">
    <div class="research-tiles">
        <span class="research-tile">🎲 Decision Making Under Uncertainty</span>
        <span class="research-tile">·</span>
        <span class="research-tile">🦾 Robotics &amp; Embodied AI</span>
        <span class="research-tile">·</span>
        <span class="research-tile">🤖 Deep Reinforcement Learning</span>
        <span class="research-tile">·</span>
        <span class="research-tile">🧠 LLM Post-Training &amp; Alignment</span>
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
        {#if active_tab === 'publications'}
            {#each data.posts as post}
                {#if post.tags.includes("publication")}
                    <PublicationListItem {post} />
                {/if}
            {/each}
        {:else}
            {#each visibleAllPosts as post}
                {#if !post.tags.includes("publication")}
                    <PostListItem {post} />
                {/if}
            {/each}
            {#if hasMore}
                <div bind:this={sentinel} class="sentinel"></div>
            {/if}
        {/if}
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
    </small>
</footer>

<style>
    #img-me {
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

    .sentinel {
        height: 1px;
    }

    .research-tiles {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.4rem;
        margin: 0.75rem 0;
    }
    .research-tile {
        color: #888;
        font-size: 0.9rem;
        white-space: nowrap;
    }
</style>
