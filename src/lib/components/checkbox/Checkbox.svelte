<script lang="ts">
  import checkmarkIcon from '$lib/icons/checkmark.svg'
  import { scale } from 'svelte/transition'

  export let checked: boolean = false
  export let handleInput = (e: Event) => {}
</script>

<label class="flex items-center justify-center">
  <input
    on:input={handleInput}
    type="checkbox"
    bind:checked
    class="aspect-square w-5 min-w-[20px] appearance-none rounded-md border border-sky-600 border-opacity-20 bg-white shadow transition-colors checked:border-none checked:bg-sky-400"
  />
  {#if checked}
    <img in:scale src={checkmarkIcon} alt="" class="relative right-4 aspect-square w-3" />
  {:else}
    <div class="relative bottom-[1.4rem] left-1 aspect-square w-3" />
  {/if}
</label>
