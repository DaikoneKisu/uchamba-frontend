<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import pencilIcon from '$lib/icons/pencil.svg'
	import deleteIcon from '$lib/icons/delete.svg'
	import AcademicTrainingCreationModal from './AcademicTrainingCreationModal.svelte'
	import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
	import { invalidateAll } from '$app/navigation'
	import { slide } from 'svelte/transition'
	import AcademicTrainingEditionModal from './AcademicTrainingEditionModal.svelte'
	import type { PersonalStudy } from '../../../types/profile-data.type'

	export let studiesData: {
		featured: {
			ucareerId: number
			name: string
			degree: string
			graduationDate: string
			createdAt: string
		}[]
		personal: {
			studyId: number
			name: string
			universityName: string
			degree: string
			graduationDate: string
			createdAt: string
		}[]
	}

	let openedModal = false
	let openedDeleteModal = false
	let openedEditionModal = false
	let studyIdToDelete: number
	let selectedStudyToUpdate: PersonalStudy

	function openModal() {
		openedModal = true
	}

	function openDeleteModal(id: number) {
		studyIdToDelete = id
		openedDeleteModal = true
	}

	function openEditionModal(study: PersonalStudy) {
		selectedStudyToUpdate = { ...study }
		openedEditionModal = true
	}

	async function handleDelete() {
		try {
			const res = await fetch('/api/profile/education/academic-training/delete', {
				method: 'POST',
				body: JSON.stringify({ id: studyIdToDelete })
			})
			if (!res.ok) throw new Error('Error al eliminar la formación académica')

			invalidateAll()
			closeDeleteModal()
		} catch (error) {
			alert(error)
		}
	}

	function closeDeleteModal() {
		openedDeleteModal = false
	}
</script>

<article class="bg-brand-white flex-col w-full">
	<header>
		<div class="flex justify-between w-full">
			<h2>Formación Académica</h2>
			<Add clickHandler={openModal} />
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex flex-col gap-8 mt-6">
		{#each studiesData.featured as featStudy}
			<li in:slide out:slide class="flex flex-col gap-2">
				<div class="flex justify-between">
					<h3 class="text-2xl font-poppins">Universidad Católica Andrés Bello</h3>

					<div class="flex gap-6" />
				</div>
				<p class="text-brand-p-black">
					{featStudy.name} - {featStudy.degree
						.split('')
						.map((c, i) => (i === 0 ? c.toUpperCase() : c))
						.join('')}
				</p>
				<p>Fecha de graduación: {featStudy.graduationDate}</p>
			</li>
		{/each}
		{#each studiesData.personal as personalStudy (personalStudy.studyId)}
			<li in:slide out:slide class="flex flex-col gap-2">
				<div class="flex justify-between">
					<h3 class="text-2xl font-poppins">{personalStudy.universityName}</h3>

					<div class="flex gap-6">
						<button
							on:click={() => {
								openEditionModal(personalStudy)
							}}
						>
							<img src={pencilIcon} alt="Editar estudio" />
						</button>
						<button
							on:click={() => {
								openDeleteModal(personalStudy.studyId)
							}}
						>
							<img src={deleteIcon} alt="Eliminar estudio" />
						</button>
					</div>
				</div>
				<p class="text-brand-p-black">
					{personalStudy.name} - {personalStudy.degree
						.split('')
						.map((c, i) => (i === 0 ? c.toUpperCase() : c))
						.join('')}
				</p>
				<p>Fecha de graduación {personalStudy.graduationDate}</p>
			</li>
		{/each}
	</ul>
</article>

<AcademicTrainingCreationModal bind:openedModal />
<AcademicTrainingEditionModal
	bind:studyData={selectedStudyToUpdate}
	bind:isOpen={openedEditionModal}
/>
<DeleteModal
	title="¿Seguro que desea eliminar esta formación académica?"
	bind:isOpen={openedDeleteModal}
	{handleDelete}
/>
