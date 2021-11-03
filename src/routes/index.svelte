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
        all: 'All',
        game: 'Games',
        research: 'Research',
    }
    const tab_all = 'all'
    let active_tab = tab_all
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
    <h1 class="mt-5">Bryan Oliveira</h1>
    <div class="mb-4">
        <SubLinks />
    </div>

    <div id="intro" class="text-justify indicate_blank">
        <!-- Who I am -->
        <p class="mt-4">
            <img
                src="/img/me.jpg"
                id="img-me"
                alt="Bryan Oliveira"
                align="left"
            />
            Hi! I'm Bryan, {new Date().getFullYear() - 1997}, B.S. in Computer
            Science by Universidade Federal de Goiás (Brazil). Elegant code
            writer, eclectic listener, voracious meta-learner and sporadic
            gamer. I'm amazed by nature and how the mind works - things I'm
            forever curious about.
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
            developing automated pipelines for data processing, training,
            evaluating, deploying, and monitoring ML models.
        </p>
        <!-- My objective interests -->
        <p>
            I'm deeply interested in artificial intelligence, cognitive
            neuroscience, high-performance computing, evolution, quantum
            mechanics and their interconnections. I also like a broader
            philosophical approach to AI research, as I believe it can be used
            to explain numerous human behaviors and thought processes. I plan to
            do a Master's / PhD in this area soon.
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
        {#each posts as post}
            {#if active_tab == tab_all || post.tags.includes(active_tab)}
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
        You can also check out my <a href="/blog" rel="prefetch">blog</a>.
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
