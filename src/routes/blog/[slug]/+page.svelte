<script>
    import HorizontalNamePhoto from '$lib/components/HorizontalNamePhoto.svelte'
    export let data
</script>

<svelte:head>
    <title>{data.post.title}</title>

    <!--  Include canonical links to your blog -->
    <link rel="canonical" href="https://bryanoliveira.github.io/blog/{data.slug}" />
    <meta name="Description" content={data.post.description} />

    <!-- Validate your twitter card with https://cards-dev.twitter.com/validator  -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.post.title} />
    <meta
        property="og:url"
        content="https://bryanoliveira.github.io/blog/{data.slug}"
    />
    <meta property="og:description" content={data.post.description} />

    <!--  Link to your preferred image  -->
    <meta property="og:image" content={data.post.image} />
    <meta name="image" content={data.post.image} />

    <meta name="twitter:card" content="summary_large_image" />

    <!--  Link to your Domain  -->
    <meta name="twitter:domain" value="bryanoliveira.github.io" />

    <!--  Link to your Twitter Account  -->
    <meta name="twitter:creator" value="bryanoliveira_" />

    <meta name="twitter:title" value={data.post.title} />
    <meta name="twitter:description" content={data.post.description} />

    <!--  Link to your preferred image to be displayed on Twitter (832x520px) -->
    <meta name="twitter:image" content={data.post.image} />

    <meta name="twitter:label1" value="Published on" />
    <meta
        name="twitter:data1"
        value={new Date(data.post.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })}
    />
    <meta name="twitter:label2" value="Reading Time" />
    <meta name="twitter:data2" value={data.post.readingTime} />
</svelte:head>

<a href="/blog" class="back">« posts</a>
<div class="mt-5 mb-5 text-center">
    <h1>{data.post.title}</h1>
    <div class="mt-4 text-muted">
        {data.post.type} ·
        <span title={new Date(data.post.date).toLocaleDateString()}>
            {new Date(data.post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
            })}
        </span>
        · {data.post.readingTime}
    </div>
</div>
<div class="row">
    <div class="col-md-8">
        <p>{@html data.post.description}</p>
        <div class="mb-3 text-center text-md-left">
            {#each data.post.urls as url}
                <a
                    href={url.url}
                    class="btn btn-sm btn-secondary mr-1 no-underline mb-1"
                    target="_blank"
                >
                    {url.cta} ⧉
                </a>
            {/each}
        </div>
    </div>
    <div class="col-md-4">
        <img src={data.post.image} alt={data.post.title} class="cover-img" />
    </div>
</div>
<hr />
<div class="post">
    {@html data.post.html}
</div>
<hr />
<footer class="text-center indicate_blank">
    <HorizontalNamePhoto />
</footer>

<style>
    .cover-img {
        width: 100%;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }

    .post :global(h2) {
        margin-top: 30px;
    }
    .post :global(h3) {
        font-size: 1.4rem;
        margin-top: 30px;
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

    .post :global(img) {
        margin: 10px 0 20px 0;
    }

    @media only screen and (max-width: 768px) {
        .post :global(.text-img) {
            max-width: 100% !important;
        }
    }
</style>
