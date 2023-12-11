<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import business from '$lib/icons/business.svg'
	import { invalidateAll } from '$app/navigation'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	import { validateAcademicExperience } from '$lib/profile/experiencia/validate-academic-experience'
	import { ValidationError } from 'yup'

	//export let openedModal = false

	export let isOpen: boolean

	export let businesData: {
		workExpId: number
		organizationName: string
		jobTitle: string
		description: string
		address: string
		entryDate: string
		departureDate: string
		createdAt: string
	}

	let formErrors = {
		organizationName: '',
		jobTitle: '',
		description: '',
		address: '',
		entryDate: '',
		departureDate: ''
	}

	export let disabled = false

	async function updateExperienceAcademic() {
		try {
			disabled = true
			const res = await fetch('/api/profile/experience/academic-experience/update', {
				method: 'POST',
				body: JSON.stringify(businesData)
			})
			if (!res.ok) throw new Error('Error al actualizar la experiencia academica')
			invalidateAll()
			closeModal()
		} catch (error) {
			alert(error)
		} finally {
			disabled = false
		}
	}

	function closeModal() {
		isOpen = false
	}

	$: if (isOpen) {
		try {
			validateAcademicExperience(businesData)
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
</script>

<Modal
	title="Experiencia Laboral"
	subtitle="Edita la informacion de la experiencia laboral"
	bind:isOpen
	icon={business}
>
	<form slot="body" class="w-full flex pl-6 py-12 justify-between">
		<div class="flex flex-col w-full gap-12">
			<Input
				type="text"
				label="Organizacion"
				placeholder="Ingrese el instituto o universidad"
				className="text-brand-p-black"
				bind:value={businesData.organizationName}
                error={formErrors.organizationName}
			/>
			<Input
				type="text"
				label="Fecha de entrada"
				placeholder="dd/mm/aaaa"
				className="text-brand-p-black"
				bind:value={businesData.entryDate}
                error={formErrors.entryDate}
			/>
			<Input
				type="text"
				label="Rol"
				placeholder="Ingrese el rol"
				bind:value={businesData.jobTitle}
                error={formErrors.jobTitle}
			/>
			<Input
				type="text"
				label="Descripcion"
				placeholder="Ingrese una breve descripcion"
				className="text-brand-p-black"
				bind:value={businesData.description}
                error={formErrors.description}
			/>
		</div>

		<div class="flex flex-col w-full items-center gap-12">
			<Input
				type="text"
				label="Direccion"
				placeholder="Ingrese la direccion"
				className="text-brand-p-black"
				bind:value={businesData.address}
                error={formErrors.address}
			/>
			<Input
				type="text"
				label="Fecha de salida (opcional)"
				placeholder="dd/mm/aaaa"
				className="text-brand-p-black"
				bind:value={businesData.departureDate}
                error={formErrors.departureDate}
			/>
		</div>
	</form>
	<SaveModalFooter slot="footer" handleSave={updateExperienceAcademic} {disabled}/>
</Modal>
