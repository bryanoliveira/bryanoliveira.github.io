<script context="module">
    // backend
    export async function preload({ params }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`blog/${params.slug}.json`)
        const data = await res.json()

        if (res.status === 200) {
            return { post: data }
        } else {
            this.error(res.status, data.message)
        }
    }
</script>

<script>
    // frontend
    export let post
</script>

<svelte:head>
    <title>{post.title}</title>
</svelte:head>

<div class="content">
    <div class="row">
        <div class="col-md-8">
            <h1>{post.title}</h1>
            <div class="mb-3">
                {#each post.urls as url}
                    <a
                        href={url.url}
                        class="btn btn-sm btn-secondary mr-1"
                        target="_blank"
                    >
                        {url.cta} ⧉
                    </a>
                {/each}
            </div>
            <p>{@html post.description}</p>
            <div class="mt-4 mb-2 text-muted author">
                <a href="/" class="no-decoration">
                    <img src="/img/me.jpg" id="img-me" alt="Bryan Oliveira" />
                    <h2>Bryan Oliveira</h2>
                </a>
                · {post.type} ·
                <span title={new Date(post.date).toLocaleDateString()}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                    })}
                </span>
            </div>
        </div>
        <div class="col-md-4">
            <img src={post.image} alt={post.title} class="cover" />
        </div>
    </div>
    <hr />
    <div class="post">
        {@html post.html}
    </div>
</div>

<style>
    .author {
        font-size: 0.8rem;
    }
    h2 {
        font-size: 0.8rem;
        display: inline;
        margin-left: 5px;
    }
    #img-me {
        width: 25px;
        height: 25px;
        margin-top: -3px;
        border-radius: 100%;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
    }
    a.no-decoration {
        border: none;
    }

    .cover {
        width: 100%;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }
    /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
    .post :global(h2) {
        font-size: 1.4em;
        font-weight: 500;
    }

    .post :global(pre) {
        background-color: #f9f9f9;
        box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
        padding: 0.5em;
        border-radius: 2px;
        overflow-x: auto;
    }

    .post :global(pre) :global(code) {
        background-color: transparent;
        padding: 0;
    }

    .post :global(ul) {
        line-height: 1.5;
    }

    .post :global(li) {
        margin: 0 0 0.5em 0;
    }
</style>
