<script>
    import SubLinks from './SubLinks.svelte'
</script>

<img src="/img/me.jpg" id="img-me" alt="Bryan Oliveira" />
<h1 class="cover-heading mt-3">Bryan Oliveira</h1>
<p class="text-muted">Machine Learning Engineer</p>
<div>
    <SubLinks />
</div>

<style>
    h1 {
        font-size: 1.9rem;
    }

    #img-me {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
    }
</style>
