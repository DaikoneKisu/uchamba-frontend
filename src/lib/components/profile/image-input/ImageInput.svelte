<script lang="ts">
	import uploadIcon from '$lib/icons/upload.svg'

	export let handleChange: (event: Event) => void
	export let title: string
	export let subTitle: string
	export let name = ''

	let image: FileList
</script>

<label
	class="w-[335px] h-[212px] flex flex-col justify-center overflow-clip items-center border border-dashed border-[#343434] border-opacity-25 text-center hover:cursor-pointer"
>
	<input
		type="file"
		accept="image/*"
		class="hidden"
		on:change={handleChange}
		{name}
		bind:files={image}
	/>

	{#if image}
		<img src={URL.createObjectURL(image[0])} alt="" />
	{:else}
		<img src={uploadIcon} alt="" />
		<p class="font-bold">{title}</p>
		<p>{subTitle}</p>
	{/if}
</label>
