<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { slide } from 'svelte/transition'
  
  import type { PersonalStudy } from '$lib/types/profile-data.type'
  
  import Add from '$lib/components/profile/add/Add.svelte'
  import AcademicTrainingCreationModal from './AcademicTrainingCreationModal.svelte'
  import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
  import AcademicTrainingEditionModal from './AcademicTrainingEditionModal.svelte'
  
  import pencilIcon from '$lib/icons/pencil.svg'
  import deleteIcon from '$lib/icons/delete.svg'

  export let studiesData: {
    featured: {
      ucareerId: number
      name: string
      degree: string
      graduationYear: string
      createdAt: string
    }[]
    personal: {
      studyId: number
      name: string
      universityName: string
      degree: string
      graduationYear: string
      createdAt: string
    }[]
  }

  export let isEditable: boolean

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

<article class="w-full flex-col bg-brand-white">
  <header>
    <div class="flex w-full justify-between">
      <h2 class="capitalize">Formación Académica</h2>
      {#if isEditable}
        <Add clickHandler={openModal} />
      {/if}
    </div>
    <div class="mt-2 h-1 w-full bg-ucab-blue" />
  </header>

  <ul class="mt-6 flex flex-col gap-8">
    {#each studiesData.featured as featStudy}
      <li transition:slide class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h3 class="font-poppins text-2xl capitalize">Universidad Católica Andrés Bello</h3>

          <div class="flex gap-6" />
        </div>
        <p class="text-brand-p-black capitalize">
          {featStudy.name} - {featStudy.degree}
        </p>
        <p>Año de graduación {featStudy.graduationYear}</p>
      </li>
    {/each}
    {#each studiesData.personal as personalStudy (personalStudy.studyId)}
      <li transition:slide class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h3 class="font-poppins text-2xl capitalize">{personalStudy.universityName}</h3>
          {#if isEditable}
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
          {/if}
        </div>
        <p class="text-brand-p-black capitalize">
          {personalStudy.name} - {personalStudy.degree}
        </p>
        <p>Año de graduación {personalStudy.graduationYear}</p>
      </li>
    {/each}
  </ul>
</article>

{#if isEditable}
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
{/if}
