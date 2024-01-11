<script lang="ts">
	import { scale } from 'svelte/transition'

	import checkmarkIcon from '$lib/icons/checkmark.svg'

	export let checked = false
	export let disabled = true
</script>

<label class="flex items-center justify-center">
	<input
		type="checkbox"
		bind:checked
		class="aspect-square w-5 min-w-[20px] appearance-none rounded-md border border-sky-600 border-opacity-20 bg-white shadow transition-colors checked:border-none checked:bg-sky-400 disabled:bg-gray-100 disabled:opacity-50 disabled:border-red-200"
		{disabled}
	/>
	{#if checked}
		<img in:scale src={checkmarkIcon} alt="" class="relative right-4 aspect-square w-3" />
	{:else}
		<div class="relative bottom-[1.4rem] left-1 aspect-square w-3" />
	{/if}
</label>
