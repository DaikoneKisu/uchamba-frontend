<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import graduationCapIcon from '$lib/icons/graduation-cap.svg'
	import SaveModalFooter from '../../../lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'
	import type { AcademicTrainingCreationPayload } from './+server'
	import { page } from '$app/stores'

	export let openedModal = false

	let formData: AcademicTrainingCreationPayload = {
		name: '',
		degree: '',
		universityName: '',
		graduationDate: ''
	}

	async function save() {
		try {
			console.log(formData)
			const res = await fetch($page.url.pathname, {
				method: 'POST',
				body: JSON.stringify(formData)
			})

			if (!res.ok) throw new Error('Error al crear la formación académica')

			invalidateAll()
			closeModal()
		} catch (error) {
			alert(error)
		}
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
				type="text"
				label="Instituto o Universidad"
				placeholder="Ingrese el instituto o universidad"
				bind:value={formData.universityName}
			/>
			<Input
				type="text"
				label="Fecha de Graduación"
				placeholder="dd/mm/aaaa"
				bind:value={formData.graduationDate}
			/>
		</div>
		<div class="flex flex-col w-full items-center gap-12">
			<Input
				type="text"
				label="Carrera"
				placeholder="Ingrese la carrera"
				bind:value={formData.name}
			/>
			<Input
				type="text"
				label="Grado"
				placeholder="Ingrese el grado obtenido"
				bind:value={formData.degree}
			/>
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} />
</Modal>
