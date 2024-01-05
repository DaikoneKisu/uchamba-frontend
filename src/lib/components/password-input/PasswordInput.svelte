<script lang="ts">
  import { fly } from 'svelte/transition'

  import eye from '$lib/icons/eye.svg'
  import eyeInvisible from '$lib/icons/eye-invisible.svg'
  import key from '$lib/icons/key.svg'

  export let label: string = 'password'
  export let name: string | undefined = undefined
  export let placeholder = ''
  export let value: string = ''
  export let className: string = ''
  export let required = false
  export let disabled = false
  export let error = ''

  let isPristine = true
  let showPassword = false
</script>

<div class="flex w-full flex-col">
  <label
    class={'flex h-[64px] max-w-[330px] gap-3 rounded-xl border-4 bg-brand-white pl-3 pr-4 transition-all ' +
      className +
      ' ' +
      (error && !isPristine ? 'border-[#d14f4f]' : 'border-[#f0f0f0]')}
  >
    <div class="aspect-[15/11] w-[40px]">
      <img class="h-full w-full" alt="" src={key} />
    </div>
    <div class="h-9 w-[1px] self-center border" />
    <div class="flex flex-grow flex-col justify-center">
      <span class="text-[0.9375rem]">{label}</span>
      {#if showPassword}
        <input
          on:change|once={() => (isPristine = false)}
          {name}
          type="text"
          {placeholder}
          bind:value
          class="focus:border-0 focus:shadow-none focus:outline-none"
          {required}
          {disabled}
          autocomplete="current-password"
        />
      {:else}
        <input
          on:change|once={() => (isPristine = false)}
          {name}
          type="password"
          {placeholder}
          bind:value
          class="focus:border-0 focus:shadow-none focus:outline-none"
          {required}
          {disabled}
          autocomplete="current-password"
        />
      {/if}
    </div>
    <button type="button" on:click={() => (showPassword = !showPassword)}>
      <div class="aspect-[15/11] w-[40px]">
        {#if !showPassword}
          <img class="h-full w-full" src={eye} alt="Mostrar contraseña" />
        {:else}
          <img class="h-full w-full" src={eyeInvisible} alt="Ocultar contraseña" />
        {/if}
      </div>
    </button>
  </label>
  {#if error && !isPristine}
    <strong in:fly={{ x: -12 }} class="ml-3 w-[80%] text-left text-red-600">{error}</strong>
  {:else}
    <div class="invisible h-[22.5px]" aria-hidden />
  {/if}
</div>
