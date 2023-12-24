<script lang="ts">
  import type { HTMLInputTypeAttribute } from '../../../types/html-input-type-attribute.type'

  export let label: string
  export let name: string | undefined = undefined
  export let placeholder = ''
  export let type: HTMLInputTypeAttribute
  export let value: string | number = ''
  export let className = ''
  export let required = false
  export let disabled = false
</script>

<label
  class={'flex h-[64px] w-full max-w-[330px] rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4 ' +
    className}
>
  <div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
    <span class="text-brand-p-black">{label}</span>
    {#if type === 'text'}
      <input
        {name}
        type="text"
        {placeholder}
        bind:value
        class="text-sm focus:border-0 focus:shadow-none focus:outline-none"
        {required}
        {disabled}
      />
    {:else if type === 'number'}
      <input
        {name}
        type="number"
        {placeholder}
        bind:value
        class="text-sm focus:border-0 focus:shadow-none focus:outline-none"
        {required}
        {disabled}
      />
    {:else if type === 'email'}
      <input
        {name}
        type="email"
        {placeholder}
        bind:value
        class="text-sm focus:border-0 focus:shadow-none focus:outline-none"
        {required}
        {disabled}
      />
    {:else if type === 'tel'}
      <input
        {name}
        type="tel"
        {placeholder}
        bind:value
        class="text-sm focus:border-0 focus:shadow-none focus:outline-none"
        {required}
        {disabled}
      />
    {/if}
  </div>
</label>
