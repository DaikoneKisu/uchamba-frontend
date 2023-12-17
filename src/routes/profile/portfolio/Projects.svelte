<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import pencilIcon from '$lib/icons/pencil.svg'
	import deleteIcon from '$lib/icons/delete.svg'
	import ProjectDetailsModal from './ProjectDetailsModal.svelte'
	import ProjectCreationModal from './ProjectCreationModal.svelte'
	import { flip } from 'svelte/animate'
	import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
	import { invalidateAll } from '$app/navigation'
	import type { ProfileData, Project } from '../../../types/profile-data.type'

	export let profileData: ProfileData
	export let projects: Project[] = profileData.projects

	let openedCreationModal = false
	let openedDeleteModal = false
	let openedDetailsModal = false
	let detailsModalMode: 'view' | 'edit' = 'view'

	let langIdToDelete: number

	function openCreationModal() {
		openedCreationModal = true
	}

	function openDeleteModal(id: number) {
		langIdToDelete = id
		openedDeleteModal = true
	}

	function openDetailsModal(project: Project) {
		detailsModalMode = 'view'
		selectedProjectsDetails = { ...project }
		console.log(selectedProjectsDetails)

		openedDetailsModal = true
	}

	function openEditModal(project: Project) {
		detailsModalMode = 'edit'
		selectedProjectsDetails = { ...project }
		console.log(selectedProjectsDetails)

		openedDetailsModal = true
	}

	let selectedProjectsDetails: Project = {
		projectId: 0,
		name: '',
		description: '',
		projectUrl: '',
		coverImageId: '',
		coverImageUrl: '',
		images: []
	}

	async function handleDelete() {
		try {
			const url = `https://uchamba-backend-staging.1.us-1.fl0.io/projects/${langIdToDelete}`
			const res = await fetch(url, {
				method: 'DELETE',
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFsZWphbmRybyBSb3NhcyIsImVtYWlsIjoiYWpyb3Nhcy4xOUBlc3QudWNhYi5lZHUudmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIwNjQ5ODIsImV4cCI6MTcwMjkyODk4Mn0.sZYZvKi_gQ0CrkZe3li971QB8jHv5vsrANiROCECgcw'
				}
			})
			if (!res.ok) throw new Error('Error al eliminar la Proyecto')

			invalidateAll()
			closeDeleteModal()
		} catch (error) {
			alert(error)
		}
	}

	function closeDeleteModal() {
		openedDeleteModal = false
	}
	console.log(projects)
</script>

<article class="bg-brand-white flex-col w-full">
	<header>
		<div class="flex justify-between w-full">
			<h2>Proyectos Realizados</h2>
			<Add clickHandler={openCreationModal} />
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex flex-col gap-8 mt-6">
		{#each projects as project (project.projectId)}
			<li animate:flip class="flex flex-col gap-2">
				<div class="flex justify-between">
					<h3 class="text-2xl font-poppins">{project.name}</h3>

					<div class="flex gap-6">
						<button
							on:click={() => {
								openEditModal(project)
							}}
						>
							<img src={pencilIcon} alt="Editar estudio" />
						</button>
						<button
							on:click={() => {
								openDeleteModal(project.projectId)
							}}
						>
							<img src={deleteIcon} alt="Eliminar estudio" />
						</button>
					</div>
				</div>
				<p class="text-brand-p-black">
					Nivel {project.description}
				</p>

				<button
					on:click={() => {
						openDetailsModal(project)
					}}
					class="text-left text-ucab-green underline underline-offset-2"
				>
					Ver Información
				</button>
			</li>
		{/each}
	</ul>
</article>

<ProjectDetailsModal
	bind:openedModal={openedDetailsModal}
	project={selectedProjectsDetails}
	bind:mode={detailsModalMode}
/>
<ProjectCreationModal bind:openedModal={openedCreationModal} />
<DeleteModal
	title="¿Seguro que deseas eliminar este proyecto de tu lista?"
	bind:isOpen={openedDeleteModal}
	{handleDelete}
/>
