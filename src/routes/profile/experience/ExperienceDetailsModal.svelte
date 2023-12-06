<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import busines from '$lib/icons/business.svg'
	import SaveModalFooter from './SaveModalFooters.svelte'
	import { invalidateAll } from '$app/navigation'

	export let openedModal = false

	let formData = {
		organizationName: '',
		jobTitle: '',
		description: '',
		address: '',
		entryDate: '',
		departureDate: ''
	}

	function save() {
		invalidateAll()
		closeModal()
	}

	function closeModal() {
		openedModal = false
	}
</script>

<Modal
	title="Experiencia Laboral"
	subtitle="Ver mas informacion sobre la experiencia laboral"
	bind:isOpen={openedModal}
	icon={busines}
>
	<form slot="body" class="w-full flex pl-6 py-12 justify-between">
		<div class="flex flex-col w-full gap-12">
			<Input
				type="text"
				label="Organizacion"
				placeholder="Ingrese el instituto o universidad"
				bind:value={formData.organizationName}
			/>
			<Input
				type="text"
				label="Fecha de entrada"
				placeholder="dd/mm/aaaa"
				bind:value={formData.entryDate}
			/>
			<Input type="text" label="Rol" placeholder="Ingrese el rol" bind:value={formData.jobTitle} />
			<Input
				type="text"
				label="Descripcion"
				placeholder="Ingrese una breve descripcion"
				bind:value={formData.description}
			/>
		</div>

		<div class="flex flex-col w-full items-center gap-12">
			<Input
				type="text"
				label="Direccion"
				placeholder="Ingrese la direccion"
				bind:value={formData.address}
			/>
			<Input
				type="text"
				label="Fecha de salida (opcional)"
				placeholder="dd/mm/aaaa"
				bind:value={formData.departureDate}
			/>
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} />
</Modal>
