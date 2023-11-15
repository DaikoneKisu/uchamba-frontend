<script lang="ts">
	import eye from '$lib/icons/eye.svg'
	import eyeInvisible from '$lib/icons/eye-invisible.svg'
	import key from '$lib/icons/key.svg'
	export let label: string = "password"
	export let className: string = ""
	export let value: string
	let showPassword = false
</script>

<label class={'flex border-4 border-gray-300 rounded-xl bg-brand-white pr-4 ' + className}>
	<aside class="flex items-center justify-center py-4">
		<div class="flex items-center justify-center border-r-2 px-3 pr-2 border-gray-300 h-full">
			<img class="w-[40px] aspect-[15/11]" alt="" src={key} />
		</div>
	</aside>
	<div class="flex flex-col p-4 w-full">
		<span class="text-xs">{label}</span>
		{#if showPassword}
			<input
				type="text"
				bind:value
				class="text-sm focus:outline-none focus:border-0 focus:shadow-none"
			/>
		{:else}
			<input
				type="password"
				bind:value
				class="text-sm focus:outline-none focus:border-0 focus:shadow-none"
			/>
		{/if}
	</div>
	<button type="button" on:click={() => (showPassword = !showPassword)}>
		{#if !showPassword}
			<img src={eye} alt="" />
		{:else}
			<img src={eyeInvisible} alt="" />
		{/if}
	</button>
</label>
