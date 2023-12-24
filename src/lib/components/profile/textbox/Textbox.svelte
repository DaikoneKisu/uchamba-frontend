<script lang="ts">
  import { fly } from 'svelte/transition'

  export let label: string
  export let name: string | undefined = undefined
  export let placeholder = ''
  export let value: string | number = ''
  export let className = ''
  export let required = false
  export let disabled = false
  export let error = ''

  let isPristine = true
</script>

<div class="flex w-full flex-col">
  <label
    class={'flex min-h-[150px] w-full rounded-xl border-4 bg-brand-white pr-4 transition-all ' +
      (error && !isPristine ? ' border-[#D14F4F]' : 'border-[#f0f0f0]') +
      ' ' +
      className}
  >
    <div class="flex h-full w-full flex-col justify-center pl-5 pt-3 text-[15px]">
      <span class="text-brand-p-black">{label}</span>
      <textarea
        on:input|once={() => (isPristine = false)}
        {name}
        {placeholder}
        bind:value
        class="h-full resize-none text-sm focus:border-0 focus:shadow-none focus:outline-none"
        {required}
        {disabled}
      />
    </div>
  </label>
  {#if error && !isPristine}
    <span in:fly={{ x: -12 }} class="ml-3 text-[12px] text-red-600">{error}</span>
  {:else}
    <span class="invisible ml-3 text-[12px] text-red-600" aria-hidden
      >Has como que no estás leyendo esto</span
    >
  {/if}
</div>
