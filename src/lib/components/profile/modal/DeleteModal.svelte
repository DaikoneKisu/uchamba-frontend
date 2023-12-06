<script lang="ts">
	import Modal from './Modal.svelte'

	export let title: string
	export let isOpen = false

	function closeModal() {
		isOpen = false
	}

	export let handleDelete: () => Promise<void> | void
</script>

<Modal bind:isOpen {title}>
	<div slot="body" class="w-full flex justify-center items-center gap-5 py-8">
		<button on:click={closeModal} class="py-2 px-8 bg-slate-200 rounded-[10px] hover:bg-slate-300"
			>Cancelar</button
		>
		<button
			on:click={handleDelete}
			class="bg-red-600 text-brand-white rounded-[10px] py-2 px-8 shadow-md hover:bg-red-500 hover:shadow-red-300 transition-all"
			>Eliminar</button
		>
	</div>
</Modal>
