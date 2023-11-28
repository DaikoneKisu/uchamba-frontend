<script lang="ts">
	import graduationCapIcon from '$lib/icons/graduation-cap.svg'
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	import type { PersonalStudy } from '../../../types/profile-data.type'
	import { invalidateAll } from '$app/navigation'

	export let isOpen: boolean

	export let studyData: PersonalStudy = {
		studyId: 0,
		name: '',
		degree: '',
		universityName: '',
		graduationDate: '',
		createdAt: ''
	}

	async function updateAcademicTraining() {
		try {
			const res = await fetch('/api/profile/education/academic-training/update', {
				method: 'POST',
				body: JSON.stringify(studyData)
			})
			if (!res.ok) throw new Error('Error al actualizar la formación académica')
			invalidateAll()
			closeModal()
		} catch (error) {
			alert(error)
		}
	}

	function closeModal() {
		isOpen = false
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
			/>
			<Input
				type="text"
				label="Fecha de Graduación"
				placeholder="dd/mm/aaaa"
				bind:value={studyData.graduationDate}
			/>
		</div>
		<div class="flex flex-col w-full items-center gap-12">
			<Input
				type="text"
				label="Carrera"
				placeholder="Ingrese la carrera"
				bind:value={studyData.name}
			/>
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
	</form>

	<SaveModalFooter slot="footer" handleSave={updateAcademicTraining} />
</Modal>
