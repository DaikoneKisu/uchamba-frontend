<script lang="ts">
	import deleteIcon from '$lib/icons/delete.svg'
	import uploadIcon from '$lib/icons/upload.svg'
	import { slide } from 'svelte/transition'

	export let title: string
	export let subTitle: string
	export let handleChange: (event: Event) => void = () => {}
	export let handleDelete: () => void = () => {}

	export let files: FileList | null = null

	export let imageUrl: string = ''

	export let image: File | null = null

	function deleteImage() {
		image = null
		imageUrl = ''
		handleDelete()
	}

	$: if (files) {
		image = files[0]
		imageUrl = URL.createObjectURL(files[0])
	}
</script>

<label
	in:slide
	out:slide
	class="w-[335px] h-[212px] mt-0 pt-0 flex flex-col justify-center items-center overflow-clip border border-dashed border-[#343434] border-opacity-25 text-center"
>
	<input type="file" accept="image/*" class="hidden" on:change={handleChange} bind:files />

	{#if imageUrl}
		<div class="relative h-0 w-0 top-7 left-36 flex justify-center items-center">
			<button
				on:click|preventDefault={deleteImage}
				class="hover:cursor-pointer absolute h-[33px] w-[39px] z-10"
			>
				<img src={deleteIcon} alt="Delete img" />
			</button>
		</div>
		<img src={imageUrl} alt="" class="object-contain h-full w-full relative" />
	{:else}
		<img src={uploadIcon} alt="" />
		<p class="font-bold">{title}</p>
		<p>{subTitle}</p>
	{/if}
</label>
