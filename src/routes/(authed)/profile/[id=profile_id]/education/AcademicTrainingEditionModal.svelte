<script lang="ts">
	import graduationCapIcon from '$lib/icons/graduation-cap.svg'
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	import type { PersonalStudy } from '../../../../../types/profile-data.type'
	import { invalidateAll } from '$app/navigation'
	import { validateAcademicTraining } from '$lib/profile/education/validate-academic-training'
	import { ValidationError } from 'yup'

	export let isOpen: boolean

	export let studyData: PersonalStudy = {
		studyId: 0,
		name: '',
		degree: '',
		universityName: '',
		graduationYear: '',
		createdAt: ''
	}

	let formErrors = {
		name: '',
		degree: '',
		universityName: '',
		graduationYear: ''
	}

	export let disabled = false

	async function updateAcademicTraining() {
		try {
			disabled = true
			const res = await fetch('/api/profile/education/academic-training/update', {
				method: 'POST',
				body: JSON.stringify(studyData)
			})
			if (!res.ok) throw new Error('Error al actualizar la formación académica')
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
			validateAcademicTraining(studyData)
			disabled = false

			formErrors = {
				name: '',
				degree: '',
				universityName: '',
				graduationYear: ''
			}
		} catch (error: unknown) {
			disabled = true
			if (error instanceof ValidationError) {
				const errors = error.inner

				formErrors = {
					name: errors.find((e) => e.path === 'name')?.message ?? '',
					degree: errors.find((e) => e.path === 'degree')?.message ?? '',
					universityName: errors.find((e) => e.path === 'universityName')?.message ?? '',
					graduationYear: errors.find((e) => e.path === 'graduationYear')?.message ?? ''
				}
			}
		}
	}
</script>

<Modal
	title="Formación Académica"
	subtitle="Edita tu información académica"
	bind:isOpen
	icon={graduationCapIcon}
>
	<form slot="body" class="w-full flex pl-6 py-12 justify-between">
		<div class="flex flex-col w-full gap-12">
			<Input
				type="text"
				label="Instituto o Universidad"
				placeholder="Ingrese el instituto o universidad"
				bind:value={studyData.universityName}
				error={formErrors.universityName}
			/>
			<Input
				type="text"
				label="Año de Graduación"
				placeholder="2023"
				bind:value={studyData.graduationYear}
				error={formErrors.graduationYear}
			/>
		</div>
		<div class="flex flex-col w-full items-center gap-12">
			<Input
				type="text"
				label="Carrera"
				placeholder="Ingrese la carrera"
				bind:value={studyData.name}
				error={formErrors.name}
			/>
			<div class="flex flex-col w-full">
				<select
					class="flex border-4 border-[#f0f0f0] h-[64px] w-full max-w-[330px] rounded-xl bg-brand-white px-4"
					bind:value={studyData.degree}
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

	<SaveModalFooter slot="footer" handleSave={updateAcademicTraining} {disabled} />
</Modal>
