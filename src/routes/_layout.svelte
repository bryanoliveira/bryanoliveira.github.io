<script>
    export let segment
    console.log(segment)
</script>

<div class="cover-container d-flex w-100 p-3 mx-auto flex-column mt-5">
    <main class="cover mb-5">
        <slot />
    </main>
</div>

<style>
    .cover-container {
        max-width: 45em;
    }
    .cover {
        padding: 0 1.5rem;
    }
</style>
