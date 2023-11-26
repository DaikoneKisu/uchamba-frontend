<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import graduationCapIcon from '$lib/icons/graduation-cap.svg'
	import SaveModalFooter from './SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'

	export let openedModal = false

	let formData = {
		universityName: '',
		name: '',
		degree: '',
		graduationDate: ''
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
	title="Formación Académica"
	subtitle="Agrega una nueva formación académica para añadir a tu CV"
	bind:isOpen={openedModal}
	icon={graduationCapIcon}
>
	<form slot="body" class="w-full flex pl-6 py-12 justify-between">
		<div class="flex flex-col w-full gap-12">
			<Input
				label="Instituto o Universidad"
				placeholder="Ingrese el instituto o universidad"
				bind:value={formData.universityName}
			/>
			<Input
				label="Fecha de Graduación"
				placeholder="dd/mm/aaaa"
				bind:value={formData.graduationDate}
			/>
		</div>
		<div class="flex flex-col w-full items-center gap-12">
			<Input label="Carrera" placeholder="Ingrese la carrera" bind:value={formData.name} />
			<Input label="Grado" placeholder="Ingrese el grado obtenido" bind:value={formData.degree} />
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} />
</Modal>
