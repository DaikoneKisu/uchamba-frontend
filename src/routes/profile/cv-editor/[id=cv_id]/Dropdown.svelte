<script lang="ts">
  import { slide } from 'svelte/transition'

  import downIcon from '$lib/icons/down-arrow.svg'

  export let title: string
  export let max: number

  let isOpen = false
</script>

<section class="border-b-2 pb-4">
  <header>
    <button on:click={() => (isOpen = !isOpen)} class="flex w-full justify-between">
      <h4 class="font-poppins text-xl">{title}</h4>
      <div class="flex items-center gap-2">
        <strong class="text-lg">máx. {max}</strong>
        <img
          src={downIcon}
          class={`aspect-square w-[30px] select-none transition-transform duration-300 ${
            isOpen ? '-rotate-180' : 'rotate-0'
          }`}
          alt="Expandir lista"
        />
      </div>
    </button>
  </header>
  {#if isOpen}
    <div in:slide out:slide>
      <slot />
    </div>
  {/if}
</section>
