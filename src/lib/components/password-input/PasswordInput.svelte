<script lang="ts">
  import eye from '$lib/icons/eye.svg'
  import eyeInvisible from '$lib/icons/eye-invisible.svg'
  import key from '$lib/icons/key.svg'

  export let name: string
  export let label: string = 'password'
  export let className: string = ''
  export let value: string
  export let placeholder = ''

  let showPassword = false
</script>

<label class={'flex rounded-xl border-4 border-gray-300 bg-brand-white pr-4 ' + className}>
  <aside class="flex items-center justify-center py-4">
    <div class="flex h-full items-center justify-center border-r-2 border-gray-300 px-3 pr-2">
      <img class="aspect-[15/11] w-[40px]" alt="" src={key} />
    </div>
  </aside>
  <div class="flex w-full flex-col p-4">
    <span class="text-xs">{label}</span>
    {#if showPassword}
      <input
        {name}
        type="text"
        bind:value
        {placeholder}
        class="text-sm focus:border-0 focus:shadow-none focus:outline-none"
      />
    {:else}
      <input
        {name}
        type="password"
        bind:value
        {placeholder}
        class="text-sm focus:border-0 focus:shadow-none focus:outline-none"
      />
    {/if}
  </div>
  <button type="button" on:click={() => (showPassword = !showPassword)}>
    {#if !showPassword}
      <img src={eye} alt="Mostrar contraseña" />
    {:else}
      <img src={eyeInvisible} alt="Ocultar contraseña" />
    {/if}
  </button>
</label>
