<script lang="ts">
  import { slide } from 'svelte/transition'

  import deleteIcon from '$lib/icons/delete.svg'
  import uploadIcon from '$lib/icons/upload.svg'

  export let title: string
  export let subTitle: string
  export let handleChange: (event: Event) => void = () => {}
  export let handleDelete: () => void = () => {}
  export let isDeletable = true

  export let files: FileList | null = null
  export let imageUrl = ''
  export let image: File | null = null

  let input: HTMLInputElement

  function deleteImage() {
    image = null
    imageUrl = ''
    files = null
    input.value = ''
    handleDelete()
  }

  $: if (files) {
    image = files[0]
    imageUrl = URL.createObjectURL(files[0])
  }
</script>

<label
  transition:slide
  class="mt-0 flex h-[212px] w-[335px] flex-col items-center justify-center overflow-clip border border-dashed border-[#343434] border-opacity-25 pt-0 text-center"
>
  <input
    type="file"
    accept="image/*"
    class="hidden"
    on:change={handleChange}
    bind:files
    bind:this={input}
  />

  {#if imageUrl}
    {#if isDeletable}
      <div class="relative left-36 top-7 flex h-0 w-0 items-center justify-center">
        <button
          on:click|preventDefault={deleteImage}
          class="absolute z-10 aspect-square w-[40px] rounded-full bg-brand-white hover:cursor-pointer"
        >
          <img src={deleteIcon} alt="Borrar imagen" class="h-[33px] w-[39px]" />
        </button>
      </div>
    {/if}
    <img
      src={imageUrl}
      alt="Imagen subida por el usuario"
      class="relative h-full w-full object-contain"
    />
  {:else}
    <img src={uploadIcon} alt="Sube una imagen" />
    <p class="font-bold">{title}</p>
    <p>{subTitle}</p>
  {/if}
</label>
