<script lang="ts">
	import type { HTMLInputTypeAttribute } from '../../types/html-input-type-attribute.type'

  export let name: string
	export let label: string = "Default label"
	export let placeholder = 'Default placeholder'
	export let type: HTMLInputTypeAttribute
	export let value: string | number = ''
  export let src: string
  export let className = ''
</script>

<label class={"flex border-4 border-gray-300 rounded-xl " + className}>
	<aside class="flex items-center justify-center py-4">
		<div class="flex items-center justify-center border-r-2 px-3 pr-2 border-gray-300 h-full">
			<img class="w-[40px] aspect-[15/11]" alt="" {src} />
		</div>
	</aside>
	<div class="flex flex-col p-4 w-full">
		<span class="text-xs">{label}</span>
		{#if type === 'text'}
			<input {name} type="text" {placeholder} bind:value class="text-sm" />
		{:else if type === 'number'}
			<input {name} type="number" {placeholder} bind:value class="text-sm" />
		{:else if type === 'email'}
			<input {name} type="email" {placeholder} bind:value class="text-sm" />
		{:else if type === 'password'}
			<input {name} type="password" {placeholder} bind:value class="text-sm" />
		{:else if type === 'tel'}
			<input {name} type="tel" {placeholder} bind:value class="text-sm" />
		{/if}
	</div>
</label>
