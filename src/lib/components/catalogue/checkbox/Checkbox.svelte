<script lang="ts">
  import { scale } from 'svelte/transition'

  import checkmarkIcon from '$lib/icons/checkmark.svg'

  export let checked = false
  export let disabled = true
  export let form = ''
  export let text = ''
  export let handleChange: (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    }
  ) => void = () => {}
</script>

<label class="flex items-center justify-center">
  <input
    data-sveltekit-keepfocus
    type="checkbox"
    bind:checked
    class="aspect-square w-5 min-w-[20px] appearance-none rounded-md border border-sky-600 border-opacity-20 bg-white shadow transition-colors checked:border-none checked:bg-sky-400 disabled:border-red-200 disabled:bg-gray-100 disabled:opacity-50"
    {disabled}
    {form}
    on:change={handleChange}
  />
  {#if checked}
    <img in:scale src={checkmarkIcon} alt="" class="relative right-4 aspect-square w-3" />
  {:else}
    <div class="relative bottom-[1.4rem] left-1 aspect-square w-3" />
  {/if}
  {#if text}
    <p class="ml-2 inline-block">{text}</p>
  {/if}
</label>
