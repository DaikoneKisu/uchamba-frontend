<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import graduationCapIcon from '$lib/icons/business.svg'
	import SaveModalFooter from './SaveModalFooters.svelte'
	import { invalidateAll } from '$app/navigation'
	import { validateAcademicExperience } from '$lib/profile/experiencia/validate-academic-experience'
	import { ValidationError } from 'yup'

	export let openedModal = false
	

	let formData = {
		organizationName: '',
		jobTitle: '',
		description: '',
		address: '',
		entryDate: '',
		departureDate: ''
	}

	let formErrors = {
		organizationName: '',
		jobTitle: '',
		description: '',
		address: '',
		entryDate: '',
		departureDate: ''
	}

	let disabled = false

	function save() {
		invalidateAll()
		closeModal()
	}

	function closeModal() {
		openedModal = false
	}

	$: if (openedModal) {
		try {
			validateAcademicExperience(formData)
			disabled = false

			formErrors = {
				organizationName: '',
				jobTitle: '',
				description: '',
				address: '',
				entryDate: '',
				departureDate: ''
			}
		} catch (error: unknown) {
			disabled = true
			if (error instanceof ValidationError) {
				const errors = error.inner

				formErrors = {
					organizationName: errors.find((e) => e.path === 'organizationName')?.message ?? '',
					jobTitle: errors.find((e) => e.path === 'jobTitle')?.message ?? '',
					description: errors.find((e) => e.path === 'description')?.message ?? '',
					address: errors.find((e) => e.path === 'address')?.message ?? '',
					entryDate: errors.find((e) => e.path === 'entryDate')?.message ?? '',
					departureDate: errors.find((e) => e.path === 'departureDate')?.message ?? ''
				}
			}
		}
	}

	$: if (!openedModal) {
		formData = {
			organizationName: '',
			jobTitle: '',
			description: '',
			address: '',
			entryDate: '',
			departureDate: ''
		}
	}
</script>

<Modal
	title="Experiencia Laboral"
	subtitle="Agrega una nueva experiencia laboral para añadir a tu CV"
	bind:isOpen={openedModal}
	icon={graduationCapIcon}
>
	<form slot="body" class="w-full flex pl-6 py-12 justify-between">
		<div class="flex flex-col w-full gap-12">
			<Input
				type="text"
				label="Organizacion"
				placeholder="Ingrese el instituto o universidad"
				bind:value={formData.organizationName}
				error={formErrors.organizationName}
			/>
			<Input
				type="text"
				label="Fecha de entrada"
				placeholder="dd/mm/aaaa"
				bind:value={formData.entryDate}
				error={formErrors.entryDate}
			/>
			<Input type="text" label="Rol" placeholder="Ingrese el rol" bind:value={formData.jobTitle} />
			<Input
				type="text"
				label="Descripcion"
				placeholder="Ingrese una breve descripcion"
				bind:value={formData.description}
				error={formErrors.description}
			/>
		</div>
		<div class="flex flex-col w-full items-center gap-12">
			<Input
				type="text"
				label="Direccion"
				placeholder="Ingrese la direccion"
				bind:value={formData.address}
				error={formErrors.address}
			/>
			<Input
				type="text"
				label="Fecha de salida (opcional)"
				placeholder="dd/mm/aaaa"
				bind:value={formData.departureDate}
				error={formErrors.departureDate}
			/>
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save}  />
</Modal>
