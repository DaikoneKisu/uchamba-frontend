<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import graduationCapIcon from '$lib/icons/business.svg'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'
	import { validateAcademicExperience } from '$lib/profile/experiencia/validate-academic-experience'
	import { ValidationError } from 'yup'
	import Textbox from '$lib/components/profile/textbox/Textbox.svelte'

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

	async function save() {
		try {
			disabled = true
			const res = await fetch('/api/profile/experience/academic-experience/create', {
				method: 'POST',
				body: JSON.stringify(formData)
			})

			if (!res.ok) throw new Error('Error al crear una experiencia academica')

			invalidateAll()
			closeModal()
		} catch (error) {
			alert(error)
		} finally {
			disabled = false
		}
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
	<form slot="body" class="w-full flex-col px-6 py-12 justify-between">
		<div class="flex w-full">
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
				<Input
					type="text"
					label="Rol"
					placeholder="Ingrese el rol"
					bind:value={formData.jobTitle}
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
		</div>
		<Textbox
			className="mt-10"
			label="Descripción"
			bind:value={formData.description}
			error={formErrors.description}
			placeholder="Ingresa una breve descripción"
		/>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
