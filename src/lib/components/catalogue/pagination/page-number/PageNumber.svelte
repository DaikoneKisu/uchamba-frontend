<script lang="ts">
	export let pageNumber: number
	export let highlight = false
	export let href: string
</script>

<a {href}>
	{#if highlight}
		<button
			class="w-10 h-10 bg-[#e9e1ff] border border-ucab-blue rounded text-center text-ucab-blue"
		>
			{pageNumber}
		</button>
	{:else}
		<button class="w-10 h-10 bg-brand-white border border-[#bebebe] rounded text-center">
			{pageNumber}
		</button>
	{/if}
</a>
