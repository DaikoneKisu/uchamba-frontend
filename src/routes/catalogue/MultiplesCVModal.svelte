<script lang="ts">
	import Modal from '$lib/components/Modal.svelte'
	import multiples_cv from '$lib/images/multiples-cvs.png'
	import documentsIcon from '$lib/icons/Documents.svg'

	export let openedModal = true

	function closeModal() {
		openedModal = false
	}
</script>

<Modal
	title="Coleción de CV'S"
	subtitle="Descarga el CV que mejor se adapte a sus necesidades"
	icon={documentsIcon}
	bind:isOpen={openedModal}
>
	<section slot="body" class="flex flex-wrap items-center justify-start">
		<article class=" w-[316px] h-[319px] flex flex-col items-start justify-start bg-zinc-100 rounded-[10px] m-8">
			<figure class="w-full h-[154px]">
				<img class="rounded-[10px] border-4 border-gray-300" src={multiples_cv} alt="Img de referencia CV" />
			</figure>
			<h2 class="brand-h2-black text-xl font-medium ml-3 mt-3">Software Developer</h2>
			<p class="brand-p-black text-base font-normal ml-3">Ingeniería Informática</p>
		</article>
	</section>
	<footer slot="footer" class="flex w-full justify-end border-t-2 border-[#f3f3f3] pb-3 pr-10 pt-6"/>
</Modal>
