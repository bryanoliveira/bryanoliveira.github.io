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
    import HeadlineVertical from '../../components/HeadlineVertical.svelte'
    import PostListItem from '../../components/PostListItem.svelte'
</script>

<svelte:head>
    <title>Blog</title>
</svelte:head>

<div class="text-center mb-5">
    <HeadlineVertical />
</div>
<div>
    {#each posts as post}
        <PostListItem {post} />
    {/each}
</div>

<style>
    ul {
        margin: 0 0 1em 0;
        line-height: 1.5;
    }
</style>
