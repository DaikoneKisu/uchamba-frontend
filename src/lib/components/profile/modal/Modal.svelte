<script lang="ts">
  import { fade, scale } from 'svelte/transition'

  import cancelIcon from '$lib/icons/cancel-black.svg'

  export let isOpen: boolean
  export let title = ''
  export let subtitle = ''
  export let icon = ''

  function closeModal() {
    isOpen = false
  }
</script>

{#if isOpen}
  <dialog
    transition:fade={{ duration: 100 }}
    class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
  >
    <div
      in:scale
      class="max-h-[95%] w-[90%] max-w-[802px] items-center justify-center overflow-y-auto rounded-[20px] bg-white py-4 shadow"
    >
      <header
        class="flex w-full items-center justify-between border-b-2 border-[#f3f3f3] px-8 pb-5 pt-3"
      >
        <div class={`flex w-full gap-6 ${icon !== '' ? 'justify-start' : 'justify-center'}`}>
          <img src={icon} alt="" />
          <div class="flex flex-col">
            <h2 class={`m-0 ${icon !== '' ? 'font-poppins' : 'font-open-sans'}`}>{title}</h2>
            <p class="text-brand-p-black">{subtitle}</p>
          </div>
        </div>
        <button class="text-red-500" on:click={closeModal}
          ><img src={cancelIcon} alt="Cerrar modal" /></button
        >
      </header>

      <slot name="body" />

      <slot name="footer" />
    </div>
  </dialog>
{/if}
