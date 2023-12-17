<script lang="ts">
	import { fly } from 'svelte/transition'

	export let label: string
	export let name: string | undefined = undefined
	export let placeholder = ''
	export let value: string | number = ''
	export let className = ''
	export let required = false
	export let disabled = false
	export let error = ''

	let isPristine = true
</script>

<div class="flex flex-col w-full">
	<label
		class={'flex border-4 min-h-[150px] w-full rounded-xl bg-brand-white pr-4 transition-all ' +
			(error && !isPristine ? ' border-[#D14F4F]' : 'border-[#f0f0f0]') +
			' ' +
			className}
	>
		<div class="flex flex-col pl-5 pt-3 h-full justify-center w-full text-[15px]">
			<span class="text-brand-p-black">{label}</span>
			<textarea
				on:input|once={() => (isPristine = false)}
				{name}
				{placeholder}
				bind:value
				class="text-sm focus:outline-none focus:border-0 focus:shadow-none h-full resize-none"
				{required}
				{disabled}
			/>
		</div></label
	>
	{#if error && !isPristine}
		<span
			in:fly={{ x: -12 }}
			out:fly={{ x: 12 }}
			class="text-red-600 text-[12px] ml-3 absolute translate-y-16">{error}</span
		>
	{/if}
</div>
