<script lang="ts">
	import cancelIcon from '$lib/icons/cancel.svg'
	import { expand, shrink } from './expand'

	export let text: string
	export let key: string
	export let animation: boolean = true
	export let deleteHandler: () => void

	let hovered = false

	let chip: HTMLElement
</script>

{#if animation}
	<article
		id={key}
		bind:this={chip}
		class="flex items-center gap-3 whitespace-nowrap bg-ucab-green px-4 py-2 max-h-[40px] text-brand-white rounded-full shadow-xl transition-all hover:shadow-lg hover:shadow-green-200 hover:bg-green-600"
		on:mouseenter={() => (hovered = true)}
		on:mouseleave={() => (hovered = false)}
		use:expand={hovered}
	>
		<b class="font-normal">{text}</b>

		{#if hovered}
			<button on:click={deleteHandler}>
				<img src={cancelIcon} alt="Eliminar chip" />
			</button>
		{/if}
	</article>
	<div class="w-[40px]" use:shrink={!hovered} />
{:else}
	<article
		id={key}
		bind:this={chip}
		class="flex items-center gap-3 whitespace-nowrap bg-ucab-green px-4 py-2 max-h-[40px] text-brand-white rounded-full shadow-xl transition-all hover:shadow-lg hover:shadow-green-200 hover:bg-green-600"
	>
		<b class="font-normal">{text}</b>
	</article>
	<div class="w-[40px]" />
{/if}
