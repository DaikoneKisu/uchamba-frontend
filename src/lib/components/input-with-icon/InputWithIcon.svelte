<script lang="ts">
	import { fly } from 'svelte/transition'

	import type { HTMLInputTypeAttribute } from '$lib/types/html-input-type-attribute.type'

	export let label: string
	export let name: string | undefined = undefined
	export let placeholder = ''
	export let type: HTMLInputTypeAttribute
	export let value: string | number = ''
	export let className = ''
	export let src: string
	export let required = false
	export let disabled = false
	export let error = ''

	let isPristine = true
</script>

<div class="flex w-full flex-col">
	<label
		class={'flex gap-3 h-[64px] max-w-[330px] border-4 rounded-xl bg-brand-white pl-3 pr-4 transition-all ' +
			className +
			' ' +
			(error && !isPristine ? 'border-[#D14F4F]' : 'border-[#f0f0f0]')}
	>
		<div class="w-[40px] aspect-[15/11]">
			<img class="w-full h-full" alt="" {src} />
		</div>
		<div class="border h-9 w-[1px] self-center" />
		<div class="flex-grow flex flex-col justify-center">
			<span class="text-xs">{label}</span>
			{#if type === 'text'}
				<input
					on:change|once={() => (isPristine = false)}
					{name}
					type="text"
					{placeholder}
					bind:value
					class="text-sm focus:outline-none focus:border-0 focus:shadow-none"
					{required}
					{disabled}
				/>
			{:else if type === 'number'}
				<input
					on:change|once={() => (isPristine = false)}
					{name}
					type="number"
					{placeholder}
					bind:value
					class="text-sm focus:outline-none focus:border-0 focus:shadow-none"
					{required}
					{disabled}
				/>
			{:else if type === 'email'}
				<input
					on:change|once={() => (isPristine = false)}
					{name}
					type="email"
					{placeholder}
					bind:value
					class="text-sm focus:outline-none focus:border-0 focus:shadow-none"
					{required}
					{disabled}
				/>
			{:else if type === 'tel'}
				<input
					on:change|once={() => (isPristine = false)}
					{name}
					type="tel"
					{placeholder}
					bind:value
					class="text-sm focus:outline-none focus:border-0 focus:shadow-none"
					{required}
					{disabled}
				/>
			{/if}
		</div>
	</label>
	{#if error && !isPristine}
		<strong in:fly={{ x: -12 }} class="ml-3 w-[80%] text-left text-[12px] text-red-600"
			>{error}</strong
		>
	{:else}
		<div class="invisible h-5" aria-hidden />
	{/if}
</div>
