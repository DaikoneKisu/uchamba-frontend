<script lang="ts">
  import Add from '$lib/components/profile/add/Add.svelte'
  import pencilIcon from '$lib/icons/pencil.svg'
  import deleteIcon from '$lib/icons/delete.svg'
  import ProjectDetailsModal from './ProjectDetailsModal.svelte'
  import ProjectCreationModal from './ProjectCreationModal.svelte'
  import { flip } from 'svelte/animate'
  import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
  import { invalidateAll } from '$app/navigation'
  import type { Project } from '$lib/types/profile-data.type'

  export let projects: Project[]

  let openedCreationModal = false
  let openedDeleteModal = false
  let openedDetailsModal = false
  let detailsModalMode: 'view' | 'edit' = 'view'

  let ProjectIdToDelete: number

  let selectedProjectsDetails: Project = {
    projectId: 0,
    name: '',
    description: '',
    projectUrl: '',
    coverImageId: '',
    coverImageUrl: '',
    images: []
  }

  function openCreationModal() {
    openedCreationModal = true
  }

  function openDeleteModal(id: number) {
    ProjectIdToDelete = id
    openedDeleteModal = true
  }

  function openDetailsModal(project: Project) {
    detailsModalMode = 'view'
    selectedProjectsDetails = { ...project }

    openedDetailsModal = true
  }

  function openEditionModal(project: Project) {
    detailsModalMode = 'edit'
    selectedProjectsDetails = { ...project }

    openedDetailsModal = true
  }

  async function handleDelete() {
    try {
      const url = '/api/profile/portfolio/projects/delete'
      const res = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ id: ProjectIdToDelete })
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
</script>

<article class="w-full flex-col bg-brand-white">
  <header>
    <div class="flex w-full justify-between">
      <h2>Proyectos Realizados</h2>
      <Add clickHandler={openCreationModal} />
    </div>
    <div class="mt-2 h-1 w-full bg-ucab-blue" />
  </header>

  <ul class="mt-6 flex flex-col gap-8">
    {#each projects as project (project.projectId)}
      <li animate:flip class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h3 class="font-poppins text-2xl font-medium">{project.name}</h3>

          <div class="flex gap-6">
            <button
              on:click={() => {
                openEditionModal(project)
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
        <p class="font-open-sans text-[15px] font-semibold">
          {project.projectUrl}
        </p>
        <p class="text-black">
          {project.description}
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
