<script context="module">
    export function preload() {
        return this.fetch(`blog.json`)
            .then((r) => r.json())
            .then((posts) => {
                return { posts }
            })
    }
</script>

<script>
    export let posts
    import HorizontalNamePhoto from '../../components/HorizontalNamePhoto.svelte'
    import PostListItem from '../../components/PostListItem.svelte'
</script>

<svelte:head>
    <title>Blog</title>
</svelte:head>

<a href="/" class="back" rel="prefetch">« home</a>
<div class="mt-5 mb-5 pb-3 text-center">
    <h1 class="mt-2">Blog</h1>
</div>
<div>
    {#each posts as post}
        <PostListItem {post} />
    {/each}
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
</style>
