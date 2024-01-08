<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { HTMLInputTypeAttribute } from '../../../types/html-input-type-attribute.type'

	export let label: string
	export let name: string | undefined = undefined
	export let placeholder = ''
	export let type: HTMLInputTypeAttribute
	export let value: string | number = ''
	export let className = ''
	export let required = false
	export let disabled = false
	export let error = ''

	let isPristine = true
</script>

<div class="flex flex-col w-full">
	<label
		class={'flex border-4 border-[#f0f0f0] h-[64px] w-full max-w-[330px] rounded-xl bg-brand-white pr-4 transition-all ' +
			className +
			' ' +
			(error && !isPristine ? ' border-[#D14F4F]' : '')}
	>
		<div class="flex flex-col pl-5 h-full justify-center w-full text-[15px]">
			<span class="text-brand-p-black">{label}</span>
			{#if type === 'text'}
				<input
					on:input|once={() => (isPristine = false)}
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
					on:input|once={() => (isPristine = false)}
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
					on:input|once={() => (isPristine = false)}
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
					on:input|once={() => (isPristine = false)}
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
		<span in:fly={{ x: -12 }} class="text-red-600 text-[12px] ml-3">{error}</span>
	{:else}
		<span class="text-red-600 text-[12px] ml-3 invisible" aria-hidden>you haven't read this</span>
	{/if}
</div>
