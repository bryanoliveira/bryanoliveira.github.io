<script>
    export let post
</script>

<div class="row post-item mb-5">
    <div class="col-md-8">
        <h3 class="text-left">
            <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
            <a rel="prefetch" href="blog/{post.slug}">
                {post.title}
            </a>
        </h3>
        <small class="text-muted">
            {post.type} · {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
            })}
        </small>
        <p class="item-description indicate_blank">
            {@html post.description}
            <a rel="prefetch" href="blog/{post.slug}" target="_blank">
                Read more
            </a>
        </p>
    </div>
    <div class="col-md-4 text-center">
        <a rel="prefetch" href="blog/{post.slug}">
            <img alt={post.title} src={post.image} />
        </a>
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
    .post-item .post-item small {
        line-height: 30px;
    }
    .post-item .item small.text-muted {
        color: #888 !important;
    }
    .post-item img {
        width: 100%;
        height: auto;
        object-fit: cover;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }
</style>
