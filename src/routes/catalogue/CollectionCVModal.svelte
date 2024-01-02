<script lang="ts">
	import Modal from '$lib/components/Modal.svelte'
	import documentsIcon from '$lib/icons/documents.svg'
	import MultiplesCVModal from '$lib/components/MultiplesCVModal.svelte'

	export let openedModal = true
</script>

<Modal
	title="Coleción de CV'S"
	subtitle="Descarga el CV que mejor se adapte a sus necesidades"
	icon={documentsIcon}
	bind:isOpen={openedModal}
>
	<section slot="body" class="flex flex-wrap items-center justify-start">
		<MultiplesCVModal />
	</section>
	<footer
		slot="footer"
		class="flex w-full justify-end border-t-2 border-[#f3f3f3] pb-3 pr-10 pt-6"
	/>
</Modal>
