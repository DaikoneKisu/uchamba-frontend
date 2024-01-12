<script lang="ts">
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
      class="absolute flex -translate-x-14 translate-y-8 flex-col gap-2 rounded-[0.3125rem] border-4 border-[#f0f0f0] bg-brand-white px-4 py-2 shadow-lg shadow-[rgba(0,0,0,0.5)]"
    >
      <a
        href="/profile/me"
        class="flex h-[30px] w-full max-w-[120px] items-center justify-center rounded-[10px] bg-green-700 px-1 text-white"
        ><b class="font-normal">Mi perfil</b></a
      >
      <a
        href="/"
        class="flex h-[30px] w-full max-w-[120px] items-center justify-center rounded-[10px] bg-green-700 px-1 text-white"
        ><b class="font-normal">Cerrar sesión</b></a
      >
    </div>
  {/if}
</button>

<!-- <section class="border-b pb-2">
	<header class="pl-2 pr-2">
		<button on:click={() => (isOpen = !isOpen)} type="button" class="flex w-full items-center justify-between">
			<h3>{title}</h3>
			<img
				src={downIcon}
				class={`aspect-square w-[30px] h-[30px] select-none transition-transform duration-300 ${
					isOpen ? '-rotate-180' : 'rotate-0'
				}`}
				alt="Expandir lista"
			/>
		</button>
	</header>
	{#if isOpen}
		<div transition:slide>
			<slot />
		</div>
	{/if}
</section> -->
