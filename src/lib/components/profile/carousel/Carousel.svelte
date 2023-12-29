<script lang="ts">
  import rightArrow from '$lib/icons/right-arrow.svg'
  import leftArrow from '$lib/icons/left-arrow.svg'

  export let images: string[]

  let currentImage = 0

  $: nextImage = (currentImage + 1) % images.length
  $: prevImage = (currentImage - 1 + images.length) % images.length

  function goNext() {
    currentImage += 1 % images.length
  }

  function goPrev() {
    currentImage = (currentImage - 1 + images.length) % images.length
  }
</script>

<div class="flex flex-col items-center justify-center gap-4">
  <div class="flex items-end gap-7">
    <button on:click={goPrev}>
      <img
        src={images[prevImage]}
        alt="Imágen del carrusel"
        class="aspect-[316/200] w-[316px] rounded-[10px] object-contain opacity-40"
      />
    </button>
    <img
      src={images[currentImage]}
      alt="Imágen del carrusel"
      class="mb-4 aspect-[316/200] w-[316px] rounded-[10px] object-contain"
    />
    <button on:click={goNext}>
      <img
        src={images[nextImage]}
        alt="Imágen del carrusel"
        class="aspect-[316/200] w-[316px] rounded-[10px] object-contain opacity-40"
      />
    </button>
  </div>
  <div class="flex items-center gap-3">
    <button on:click={goPrev}>
      <img src={leftArrow} alt="Flecha izquierda" class="aspect-square w-[30px]" />
    </button>
    {#each images as _, index}
      <button
        on:click={() => (currentImage = index)}
        class={`mx-1 h-[15px] w-[15px] rounded-full transition-all ` +
          (currentImage === index ? 'bg-ucab-green' : 'bg-[#D9D9D9]')}
      />
    {/each}
    <button on:click={goNext}>
      <img src={rightArrow} alt="Flecha derecha" class="aspect-square w-[30px]" />
    </button>
  </div>
</div>
