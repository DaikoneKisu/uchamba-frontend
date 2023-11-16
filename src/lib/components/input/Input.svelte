<script lang="ts">
	export let label: string
	export let className: string
	let value = ''
</script>

<label class={'flex border-4 border-gray-300 rounded-xl bg-brand-white pr-4 ' + className}>
	<div class="flex items-center justify-center border-r-2 px-0 pr-2 border-gray-300 h-full" />

	<div class="flex flex-col p-4 w-full">
		<span class="text-xs">{label}</span>

		<input
			type="text"
			bind:value
			class="text-sm focus:outline-none focus:border-0 focus:shadow-none"
		/>
	</div>
</label>
