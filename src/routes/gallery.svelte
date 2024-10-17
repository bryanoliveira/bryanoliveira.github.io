<script>
    import { onMount } from 'svelte'
    import Modal from './modal.svelte'

    let images = [
        '/img/bone.png',
        '/img/vsss.png',
        '/img/quack.png',
        '/img/pulserl.png',
        '/img/ciclo_do_credito.jpg',
    ]

    let gallery
    let showModal = false
    let selectedImage = ''
    let selectedDescription = ''

    onMount(() => {
        gallery.addEventListener('scroll', (e) => {
            e.preventDefault()
        })
    })

    function scrollGallery(direction) {
        console.log("modall")
        gallery.scrollBy({
            left: direction * (gallery.clientWidth - 32),
            behavior: 'smooth',
        })
    }

    function handleClick(image) {
        console.log("modall")
        selectedImage = image
        selectedDescription = `This is a description for \${image}`
        showModal = true
    }

    function handleCloseModal() {
        showModal = false
    }
</script>

{#if showModal}
    <Modal
        image={selectedImage}
        description={selectedDescription}
        closeModal={handleCloseModal}
    />
{/if}

<div class="gallery" bind:this={gallery}>
    {#each images as image}
        <img src={image} alt={image} on:click={() => handleClick(image)} />
    {/each}
</div>

<div class="arrow left-arrow" on:click={() => scrollGallery(-1)}>&larr;</div>
<div class="arrow right-arrow" on:click={() => scrollGallery(1)}>&rarr;</div>

<style>
    .gallery {
        display: flex;
        overflow-x: auto;
        gap: 150px;
        padding: 16px 300px;
        width: 100%;
        height: 100%;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
    }

    img {
        object-fit: contain;
        max-width: 70%;
        max-height: 70%;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    img:hover {
        transform: scale(1.2);
        z-index: 10;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }

    .arrow {
        position: fixed;
        top: calc(50% - 20px);
        font-size: 40px;
        padding-bottom: 3px;
        line-height: 40px;
        cursor: pointer;
        z-index: 10;
        background: #fff;
        border-radius: 10%;
        transition: all 0.3s ease-in-out;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    .arrow:hover {
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }

    .left-arrow {
        left: 10px;
    }

    .right-arrow {
        right: 10px;
    }
</style>
