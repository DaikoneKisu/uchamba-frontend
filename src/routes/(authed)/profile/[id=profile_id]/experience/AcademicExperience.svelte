<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import pencilIcon from '$lib/icons/pencil.svg'
	import deleteIcon from '$lib/icons/delete.svg'
	import ExperienceCreationModal from './ExperienceCreationModal.svelte'
	import ExperienceDetailsModal from './ExperienceDetailsModal.svelte'
	import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
	import type { WorkExperience } from '../../../../../types/profile-data.type'
	import { slide } from 'svelte/transition'
	import { invalidateAll } from '$app/navigation'

	export let business: {
		workExpId: number
		organizationName: string
		jobTitle: string
		description: string
		address: string
		entryDate: string
		departureDate: string
		createdAt: string
	}[]

	let openedCreationModal = false
	let openedDetailsModal = false
	let openedDeleteModal = false
	let experienceIdToDelete: number
	let detailsModalMode: 'view' | 'edit' = 'view'
	let isEditable: boolean

	function openDeleteModal(id: number) {
		experienceIdToDelete = id
		openedDeleteModal = true
	}

	function opencreationModal() {
		openedCreationModal = true
	}

	function openDetailsModal(business: WorkExperience) {
		selectedExperienceDetails = { ...business }
		detailsModalMode = 'view'
		openedDetailsModal = true
	}

	function openEditionModal(business: WorkExperience) {
		selectedExperienceDetails = { ...business }
		detailsModalMode = 'edit'
		openedDetailsModal = true
	}

	let selectedExperienceDetails = {
		workExpId: 0,
		organizationName: '',
		jobTitle: '',
		description: '',
		address: '',
		entryDate: '',
		departureDate: '',
		createdAt: ''
	}

	async function handleDelete() {
		try {
			const res = await fetch('/api/profile/experience/academic-experience/delete', {
				method: 'POST',
				body: JSON.stringify({ id: experienceIdToDelete })
			})
			if (!res.ok) throw new Error('Error al eliminar la experiencia laboral')

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
			<h2>Experiencia Laboral</h2>
			{#if isEditable}
				<Add clickHandler={opencreationModal} />
			{/if}
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex flex-col gap-8 mt-6">
		{#each business as busines (busines.workExpId)}
			<li in:slide out:slide class="flex flex-col gap-2">
				<div class="flex justify-between items-center">
					<h3 class="text-2xl font-poppins">{busines.organizationName}</h3>
					{#if isEditable}
						<div class="flex gap-6">
							<button
								on:click={() => {
									openEditionModal(busines)
								}}
							>
								<img src={pencilIcon} alt="Editar estudio" />
							</button>
							<button
								on:click={() => {
									openDeleteModal(busines.workExpId)
								}}
							>
								<img src={deleteIcon} alt="Eliminar estudio" />
							</button>
						</div>
					{/if}
				</div>

				<p class="font-bold font-open-sans text-ucab-black">{busines.jobTitle}</p>
				<p class="font-open-sans text-brand-p-black">{busines.description}</p>
				<p>{busines.address}</p>

				<div class="flex justify-start items-center mt-2">
					<button
						on:click={() => {
							openDetailsModal(busines)
						}}
						class="text-left text-ucab-green underline underline-offset-2"
					>
						Ver Información
					</button>
				</div>
			</li>
		{/each}
	</ul>
</article>

<ExperienceDetailsModal
	bind:openedModal={openedDetailsModal}
	businesData={selectedExperienceDetails}
	bind:mode={detailsModalMode}
	{isEditable}
/>
{#if isEditable}
	<ExperienceCreationModal bind:openedModal={openedCreationModal} />
	<DeleteModal
		title="¿Seguro que desea eliminar esta experiencia laboral?"
		bind:isOpen={openedDeleteModal}
		{handleDelete}
	/>
{/if}
