<script>
    export let post
    const boldName = (authors) => {
        if (!authors) return ''
        return authors.replace(/Bryan\s+[\w\.]+\s+de Oliveira|BLM de Oliveira|B\.?\s*L\.?\s*M\.?\s*de Oliveira/gi, '<strong>$&</strong>')
    }
</script>

<div class="pub-item mb-4">
    <div class="pub-title">
        {#if post.urls && post.urls.length > 0}
            <a href={typeof post.urls[0] === 'string' ? post.urls[0] : post.urls[0].url} target="_blank">{post.title}</a>
        {:else}
            <span>{post.title}</span>
        {/if}
        {#if post.oral}
            <span class="badge-oral ms-2">Oral</span>
        {/if}
    </div>
    {#if post.authors}
        <div class="pub-authors">{@html boldName(post.authors)}</div>
    {/if}
    {#if post.venue}
        <div class="pub-venue"><em>{post.venue}</em></div>
    {/if}
    <div class="pub-links mt-1">
        {#if post.urls && post.urls.length > 0}
            <a href={typeof post.urls[0] === 'string' ? post.urls[0] : post.urls[0].url} target="_blank" class="btn-pub">Paper</a>
        {/if}
        {#if post.arxiv}
            <a href="https://arxiv.org/abs/{post.arxiv}" target="_blank" class="btn-pub">arXiv</a>
        {/if}
    </div>
</div>

<style>
    .pub-item {
        border-left: 3px solid rgba(128,128,128,0.3);
        padding-left: 1rem;
        margin-bottom: 1.5rem;
    }
    .pub-title {
        font-size: 1.05rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
    }
    .pub-authors {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 0.15rem;
    }
    .pub-venue {
        font-size: 0.9rem;
        color: #888;
        margin-bottom: 0.15rem;
    }
    .badge-oral {
        background: #d4edda;
        color: #155724;
        border-radius: 4px;
        padding: 0.1rem 0.4rem;
        font-size: 0.75rem;
        font-weight: 600;
        display: inline-block;
    }
    .btn-pub {
        font-size: 0.8rem;
        border: 1px solid rgba(128,128,128,0.4);
        border-radius: 4px;
        padding: 0.15rem 0.5rem;
        text-decoration: none;
        margin-right: 0.4rem;
        color: inherit;
    }
    .btn-pub:hover {
        background: rgba(128,128,128,0.1);
    }
</style>
