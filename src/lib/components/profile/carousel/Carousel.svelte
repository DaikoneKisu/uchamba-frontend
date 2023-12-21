<script lang="ts">
	import rightArrow from '$lib/icons/right-arrow.svg'
	import leftArrow from '$lib/icons/left-arrow.svg'

	export let images: string[] = [
		'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
		'https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
	]

	let currentImage = 0

	let nextImage = 1

	let prevImage = images.length - 1

	function goNext() {
		currentImage = (currentImage + 1) % images.length
	}

	function goPrev() {
		currentImage = (currentImage - 1 + images.length) % images.length
	}

	$: nextImage = (currentImage + 1) % images.length
	$: prevImage = (currentImage - 1 + images.length) % images.length
</script>

<div class="flex flex-col justify-center items-center">
	<div class="flex items-end gap-7">
		<button on:click={goPrev}>
			<img
				src={images[prevImage]}
				alt="Imágen del carrusel"
				class="w-[316px] aspect-[316/148] opacity-40 rounded-[10px] object-cover"
			/>
		</button>
		<img
			src={images[currentImage]}
			alt="Imágen del carrusel"
			class="w-[316px] aspect-[316/148] rounded-[10px] mb-4 object-cover"
		/>
		<button on:click={goNext}>
			<img
				src={images[nextImage]}
				alt="Imágen del carrusel"
				class="w-[316px] aspect-[316/148] opacity-40 rounded-[10px] object-cover"
			/>
		</button>
	</div>
	<div class="flex items-center gap-3">
		<button on:click={goPrev}>
			<img src={leftArrow} alt="Flecha izquierda" class="w-[30px] aspect-square" />
		</button>
		{#each images as _, index}
			<button
				on:click={() => (currentImage = index)}
				class={`w-[15px] h-[15px] rounded-full mx-1 transition-all ` +
					(currentImage === index ? 'bg-ucab-green' : 'bg-[#D9D9D9]')}
			/>
		{/each}
		<button on:click={goNext}>
			<img src={rightArrow} alt="Flecha derecha" class="w-[30px] aspect-square" />
		</button>
	</div>
</div>
