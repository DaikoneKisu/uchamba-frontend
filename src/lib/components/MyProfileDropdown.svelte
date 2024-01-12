<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation'
  import { slide } from 'svelte/transition'

  import downIcon from '$lib/icons/down-button.svg'

  export let isOpen = false
  export let className = ''
</script>

<button on:click={() => (isOpen = !isOpen)} type="button" class={'flex ' + className}>
  <img
    src={downIcon}
    class={`aspect-square h-[30px] w-[30px] select-none transition-transform duration-300 ${
      isOpen ? '-rotate-180' : 'rotate-0'
    }`}
    alt="Expandir lista"
  />
  {#if isOpen}
    <div
      transition:slide
      class="absolute flex -translate-x-16 translate-y-8 flex-col gap-2 rounded-[0.3125rem] border-4 border-[#f0f0f0] bg-brand-white px-4 py-2 shadow-lg shadow-[rgba(0,0,0,0.5)]"
    >
      <a
        href="/profile/me"
        class="flex h-[30px] w-full max-w-[150px] items-center justify-center rounded-[10px] bg-green-700 px-1 text-white"
        ><b class="font-normal">Mi perfil</b></a
      >
      <button
        on:click={async () => {
          await fetch('/api/delete-session', { method: 'DELETE' })
          await invalidateAll()
          await goto('/')
        }}
        class="flex h-[30px] w-full max-w-[150px] items-center justify-center rounded-[10px] bg-green-700 px-1 text-white"
        type="button"
        ><b class="font-poppins text-[1.125rem] font-normal leading-[150%] tracking-[-1.1%]"
          >Cerrar sesión</b
        ></button
      >
    </div>
  {/if}
</button>
