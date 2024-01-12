<script lang="ts">
	import { slide } from 'svelte/transition'

	import downIcon from '$lib/icons/down-button.svg'

	export let isOpen = false
	export let className = ''
</script>

<button on:click={() => (isOpen = !isOpen)} type="button" class={'flex ' + className}>
	<img
		src={downIcon}
		class={`aspect-square w-[30px] h-[30px] select-none transition-transform duration-300 ${
			isOpen ? '-rotate-180' : 'rotate-0'
		}`}
		alt="Expandir lista"
	/>
	{#if isOpen}
		<div
			transition:slide
			class="shadow-lg shadow-[rgba(0,0,0,0.5)] flex flex-col gap-2 py-2 px-4 bg-brand-white border-4 border-[#f0f0f0] rounded-[0.3125rem] absolute translate-y-8 -translate-x-14"
		>
			<a
				href="/profile/me"
				class="flex items-center justify-center px-1 w-full max-w-[120px] h-[30px] bg-green-700 rounded-[10px] text-white"
				><b class="font-normal">Mi perfil</b></a
			>
			<a
				href="/"
				class="flex items-center justify-center px-1 w-full max-w-[120px] h-[30px] bg-green-700 rounded-[10px] text-white"
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
