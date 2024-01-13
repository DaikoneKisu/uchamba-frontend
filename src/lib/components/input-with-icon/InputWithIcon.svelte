<script lang="ts">
  import { fly } from 'svelte/transition'

  import type { HTMLInputTypeAttribute } from '$lib/types/html-input-type-attribute.type'

  import type { ValidAutocompleteValues } from './valid-autocomplete-values.type'

  export let label: string
  export let name: string | undefined = undefined
  export let placeholder = ''
  export let type: HTMLInputTypeAttribute
  export let value: string | number = ''
  export let className = ''
  export let src: string
  export let required = false
  export let disabled = false
  export let error = ''
  export let autocomplete: ValidAutocompleteValues = 'on'

  let isPristine = true
</script>

<div class="flex w-full flex-col">
  <label
    class={'flex h-[64px] max-w-[330px] gap-3 rounded-xl border-4 bg-brand-white pl-3 pr-4 transition-all ' +
      className +
      ' ' +
      (error && !isPristine ? 'border-[#D14F4F]' : 'border-[#f0f0f0]')}
  >
    <div class="aspect-[15/11] w-[40px]">
      <img class="h-full w-full" alt="" {src} />
    </div>
    <div class="h-9 w-[1px] self-center border" />
    <div class="flex flex-grow flex-col justify-center">
      <span class="text-[0.9375rem]">{label}</span>
      {#if type === 'text'}
        <input
          on:change|once={() => (isPristine = false)}
          {name}
          type="text"
          {placeholder}
          bind:value
          class="focus:border-0 focus:shadow-none focus:outline-none"
          {required}
          {disabled}
          {autocomplete}
        />
      {:else if type === 'number'}
        <input
          on:change|once={() => (isPristine = false)}
          {name}
          type="number"
          {placeholder}
          bind:value
          class="focus:border-0 focus:shadow-none focus:outline-none"
          {required}
          {disabled}
          {autocomplete}
        />
      {:else if type === 'email'}
        <input
          on:change|once={() => (isPristine = false)}
          {name}
          type="email"
          {placeholder}
          bind:value
          class="focus:border-0 focus:shadow-none focus:outline-none"
          {required}
          {disabled}
          {autocomplete}
        />
      {:else if type === 'tel'}
        <input
          on:change|once={() => (isPristine = false)}
          {name}
          type="tel"
          {placeholder}
          bind:value
          class="focus:border-0 focus:shadow-none focus:outline-none"
          {required}
          {disabled}
          {autocomplete}
        />
      {/if}
    </div>
  </label>
  {#if error && !isPristine}
    <strong in:fly={{ x: -12 }} class="ml-3 w-[80%] text-left text-[12px] text-red-600"
      >{error}</strong
    >
  {:else}
    <div class="invisible h-[18px]" aria-hidden />
  {/if}
</div>
