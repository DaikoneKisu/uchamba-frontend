<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import graduationCapIcon from '$lib/icons/graduation-cap.svg'
	import SaveModalFooter from '../../../lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'
	import { validateAcademicTraining } from '$lib/profile/education/validate-academic-training'
	import { ValidationError } from 'yup'

	export let openedModal = false

	let formData = {
		name: '',
		degree: '',
		universityName: '',
		graduationDate: ''
	}

	let formErrors = {
		name: '',
		degree: '',
		universityName: '',
		graduationDate: ''
	}

	let disabled = false

	async function save() {
		try {
			disabled = true
			const res = await fetch('/api/profile/education/academic-training/create', {
				method: 'POST',
				body: JSON.stringify(formData)
			})

			if (!res.ok) throw new Error('Error al crear la formación académica')

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
			validateAcademicTraining(formData)
			disabled = false

			formErrors = {
				name: '',
				degree: '',
				universityName: '',
				graduationDate: ''
			}
		} catch (error: unknown) {
			disabled = true
			if (error instanceof ValidationError) {
				const errors = error.inner

				formErrors = {
					name: errors.find((e) => e.path === 'name')?.message ?? '',
					degree: errors.find((e) => e.path === 'degree')?.message ?? '',
					universityName: errors.find((e) => e.path === 'universityName')?.message ?? '',
					graduationDate: errors.find((e) => e.path === 'graduationDate')?.message ?? ''
				}
			}
		}
	}

	$: if (!openedModal) {
		formData = {
			name: '',
			degree: '',
			universityName: '',
			graduationDate: ''
		}
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
				error={formErrors.universityName}
			/>
			<Input
				type="text"
				label="Fecha de Graduación"
				placeholder="aaaa-mm-dd"
				bind:value={formData.graduationDate}
				error={formErrors.graduationDate}
			/>
		</div>
		<div class="flex flex-col w-full gap-12">
			<Input
				type="text"
				label="Carrera"
				placeholder="Ingrese la carrera"
				bind:value={formData.name}
				error={formErrors.name}
			/>
			<div class="flex flex-col w-full">
				<select
					class="flex border-4 border-[#f0f0f0] h-[64px] w-full max-w-[330px] rounded-xl bg-brand-white px-4"
					bind:value={formData.degree}
				>
					<option value="">Seleccione el nivel de estudios</option>
					<option value="pregrado"> Pregrado </option>
					<option value="postgrado"> Postgrado </option>
					<option value="especializacion"> Especialización </option>
					<option value="maestria"> Maestría </option>
					<option value="doctorado"> Doctorado </option>
				</select>
			</div>
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
