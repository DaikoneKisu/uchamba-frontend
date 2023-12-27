<script lang="ts">
	import checkmarkIcon from '$lib/icons/checkmark.svg'
	import { scale } from 'svelte/transition'

	export let checked: boolean = false
	export let handleInput = (e: Event) => {}
</script>

<label class="flex justify-center items-center">
	<input
		on:input={handleInput}
		type="checkbox"
		bind:checked
		class="appearance-none w-5 min-w-[20px] aspect-square bg-white rounded-md shadow checked:bg-sky-400 border border-sky-600 checked:border-none border-opacity-20 transition-colors"
	/>
	{#if checked}
		<img in:scale src={checkmarkIcon} alt="" class="w-3 aspect-square relative right-4" />
	{:else}
		<div class="w-3 aspect-square relative bottom-[1.4rem] left-1" />
	{/if}
</label>
