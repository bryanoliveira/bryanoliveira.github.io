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
    }
</script>

<script>
    export let posts // get from server side
    import HeadlineVertical from '../components/HeadlineVertical.svelte'

    const tab_all = 'all'
    const tab_publication = 'publication'
    const tab_projects = 'project'
    let active_tab = tab_all
</script>

<svelte:head>
    <title>Bryan Oliveira</title>
</svelte:head>

<div id="intro" class="text-center">
    <HeadlineVertical />

    <div class="text-center indicate_blank">
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
        {#each posts as post}
            {#if active_tab == tab_all || post.tags.includes(active_tab)}
                <div class="row item">
                    <div class="col-md-8">
                        <h3>
                            <a href="blog/{post.slug}">
                                {post.title}
                            </a>
                        </h3>
                        <small class="text-muted">
                            {post.type} · {new Date(
                                post.date
                            ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                            })}
                        </small>
                        <p class="item-description indicate_blank">
                            {@html post.description}
                            <a href="blog/{post.slug}" target="_blank">
                                Read more
                            </a>
                        </p>
                    </div>
                    <div class="col-md-4">
                        <a href="blog/{post.slug}">
                            <img alt={post.title} src={post.image} />
                        </a>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</div>
<hr class="ml-5 mr-5 mt-5" />
<div class="text-center indicate_blank">
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
    #intro p {
        font-size: 1.2rem;
    }

    #portfolio h3 {
        font-size: 1.3rem;
        margin-bottom: 0;
    }
    #portfolio a {
        padding: 3px 0;
    }
    .indicate_blank a[target='_blank']::after {
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
