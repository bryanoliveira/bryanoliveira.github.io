<script context="module">
    // backend
    export async function preload({ params }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`blog/${params.slug}.json`)
        const data = await res.json()

        if (res.status === 200) {
            return { post: data, slug: params.slug }
        } else {
            this.error(res.status, data.message)
        }
    }
</script>

<script>
    // frontend
    import HorizontalNamePhoto from '../../components/HorizontalNamePhoto.svelte'
    export let post
    export let slug
</script>

<svelte:head>
    <title>{post.title}</title>

    <!--  Include canonical links to your blog -->
    <link rel="canonical" href="https://bryanoliveira.github.io/blog/{slug}" />

    <!-- Validate your twitter card with https://cards-dev.twitter.com/validator  -->
    <!-- Update content properties with your URL   -->
    <!-- 	<meta property="og:url" content=""} /> -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content={post.title} />
    <meta name="Description" content={post.description} />
    <meta property="og:description" content={post.description} />

    <!--  Link to your preferred image  -->
    <meta property="og:image" content={post.image} />

    <meta name="twitter:card" content="summary_large_image" />

    <!--  Link to your Domain  -->
    <meta name="twitter:domain" value="bryanoliveira.github.io" />

    <!--  Link to your Twitter Account  -->
    <meta name="twitter:creator" value="bryanoliveira_" />

    <meta name="twitter:title" value={post.title} />
    <meta name="twitter:description" content={post.description} />

    <!--  Link to your preferred image to be displayed on Twitter (832x520px) -->
    <meta name="twitter:image" content={post.image} />

    <meta name="twitter:label1" value="Published on" />
    <meta
        name="twitter:data1"
        value={new Date(post.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })}
    />
    <meta name="twitter:label2" value="Reading Time" />
    <meta name="twitter:data2" value={post.readingTime} />
</svelte:head>

<a href="/blog" class="back">« posts</a>
<div class="mt-5 mb-5 text-center">
    <h1>{post.title}</h1>
    <div class="mt-4 text-muted">
        {post.type} ·
        <span title={new Date(post.date).toLocaleDateString()}>
            {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
            })}
        </span>
        · {post.readingTime}
    </div>
</div>
<div class="row">
    <div class="col-md-8">
        <p>{@html post.description}</p>
        <div class="mb-3">
            {#each post.urls as url}
                <a
                    href={url.url}
                    class="btn btn-sm btn-secondary mr-1 no-underline"
                    target="_blank"
                >
                    {url.cta} ⧉
                </a>
            {/each}
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
<hr />
<footer class="text-center indicate_blank">
    <HorizontalNamePhoto />
</footer>

<style>
    h1 {
        font-family: Merriweather, serif;
        font-size: 4em;
        margin: 0 0 0.3em 0;
        font-weight: 700;
        line-height: 1.2;
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
