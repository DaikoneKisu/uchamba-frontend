<script lang="ts">
	export let label: string
	export let className = ''
	export let placeholder = ''
	export let value = ''
</script>

<label class={'flex border-4 border-[#f0f0f0] h-[64px] w-full max-w-[330px] rounded-xl bg-brand-white pr-4 ' + className}>
	<div class="flex flex-col pl-5 h-full justify-center w-full text-[15px]">
		<span class="text-brand-p-black">{label}</span>
		<input
			type="text"
			bind:value
			{placeholder}
			class="text-sm focus:outline-none focus:border-0 focus:shadow-none placeholder:text-brand-p-black"
		/>
	</div>
</label>
