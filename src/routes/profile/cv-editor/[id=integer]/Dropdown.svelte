<script lang="ts">
	import rightIcon from '$lib/icons/right-arrow.svg'
	import { slide } from 'svelte/transition'

	export let title: string

	let isOpen = false
</script>

<section>
	<header>
		<button on:click={() => (isOpen = !isOpen)} class="flex w-full justify-between">
			<h4 class="text-xl font-poppins">{title}</h4>
			<img src={rightIcon} class="w-[30px] aspect-square" alt="Expandir lista" />
		</button>
	</header>
	{#if isOpen}
		<div in:slide out:slide>
			<slot />
		</div>
	{/if}
</section>
