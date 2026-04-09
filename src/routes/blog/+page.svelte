<script>
    export let data
    import HorizontalNamePhoto from '$lib/components/HorizontalNamePhoto.svelte'
    import PostListItem from '$lib/components/PostListItem.svelte'
</script>

<svelte:head>
    <title>Blog</title>
</svelte:head>

<a href="/" class="back">« home</a>
<div class="mt-5 mb-5 pb-3 text-center">
    <h1 class="mt-2">Blog</h1>
</div>
<div>
    {#each data.posts as post}
        <PostListItem {post} />
    {/each}
</div>

<hr />
<footer class="text-center indicate_blank">
    <HorizontalNamePhoto />
</footer>
