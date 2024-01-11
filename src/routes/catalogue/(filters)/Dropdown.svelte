<script lang="ts">
	import { slide } from 'svelte/transition'

	import downIcon from '$lib/icons/down-arrow.svg'

	export let title: string

	let isOpen = false
</script>

<section class="border-b pb-2">
	<header class="pl-2 pr-2">
		<button on:click={() => (isOpen = !isOpen)} class="flex w-full items-center justify-between">
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
</section>
