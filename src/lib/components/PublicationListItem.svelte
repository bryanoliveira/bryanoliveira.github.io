<script>
    export let post

    // Get the primary paper URL (handles both string arrays and object arrays)
    function getPaperUrl(urls) {
        if (!urls || urls.length === 0) return null
        const first = urls[0]
        return typeof first === 'string' ? first : first.url
    }

    // Get all URLs as {cta, url} pairs
    function getLinks(post) {
        const links = []
        if (post.urls && post.urls.length > 0) {
            for (const u of post.urls) {
                if (typeof u === 'string') {
                    links.push({ cta: 'Paper', url: u })
                } else {
                    links.push({ cta: u.cta || 'Link', url: u.url })
                }
            }
        }
        if (post.arxiv && !links.some(l => l.url.includes(post.arxiv))) {
            links.push({ cta: 'arXiv', url: `https://arxiv.org/abs/${post.arxiv}` })
        }
        return links
    }

    // Bold Bryan's name in author string
    function boldName(authors) {
        if (!authors) return ''
        return authors.replace(
            /Bryan[\s\w\.]*de Oliveira|BLM de Oliveira|B\.?\s*L\.?\s*M\.?\s*de Oliveira/gi,
            '<strong>$&</strong>'
        )
    }
</script>

<div class="row post-item mb-5">
    <div class="col-md-8">
        <h3 class="text-left">
            {#if getPaperUrl(post.urls)}
                <a href={getPaperUrl(post.urls)} target="_blank">{post.title}</a>
            {:else}
                {post.title}
            {/if}
            {#if post.oral}
                <span class="badge-oral">Oral</span>
            {/if}
        </h3>
        <small class="text-muted">
            {post.venue || post.type} · {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </small>
        {#if post.authors}
            <p class="pub-authors">{@html boldName(post.authors)}</p>
        {/if}
        <p class="item-description indicate_blank">
            {post.description}
        </p>
        <div class="pub-links">
            {#each getLinks(post) as link}
                <a href={link.url} target="_blank" class="btn-pub">{link.cta}</a>
            {/each}
        </div>
    </div>
    <div class="col-md-4 text-center">
        {#if getPaperUrl(post.urls)}
            <a href={getPaperUrl(post.urls)} target="_blank">
                <img alt={post.title} src={post.image} />
            </a>
        {:else}
            <img alt={post.title} src={post.image} />
        {/if}
    </div>
</div>

<style>
    .post-item h3 {
        font-size: 1.3rem;
        margin-bottom: 0;
    }
    .post-item a {
        padding: 3px 0;
        width: 100%;
    }
    .post-item img {
        width: 100%;
        height: auto;
        object-fit: cover;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }
    .pub-authors {
        font-size: 0.9rem;
        color: #666;
        margin: 0.2rem 0 0.1rem;
    }
    .badge-oral {
        background: #d4edda;
        color: #155724;
        border-radius: 4px;
        padding: 0.1rem 0.45rem;
        font-size: 0.7rem;
        font-weight: 700;
        vertical-align: middle;
        display: inline-block;
        margin-left: 0.4rem;
        letter-spacing: 0.03em;
    }
    .pub-links {
        margin-top: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
    }
    .btn-pub {
        font-size: 0.85rem;
        display: inline-block !important;
        width: auto !important;
        position: relative !important;
    }
</style>
