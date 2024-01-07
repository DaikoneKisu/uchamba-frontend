<script lang="ts">
  import Add from '$lib/components/profile/add/Add.svelte'
  import pencilIcon from '$lib/icons/pencil.svg'
  import deleteIcon from '$lib/icons/delete.svg'
  import AcademicTrainingCreationModal from './AcademicTrainingCreationModal.svelte'
  import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
  import { invalidateAll } from '$app/navigation'
  import { slide } from 'svelte/transition'
  import AcademicTrainingEditionModal from './AcademicTrainingEditionModal.svelte'
  import type { Study } from '$lib/types/profile-data.type'
  import EmptyListMessage from '$lib/components/profile/empty-list-message/EmptyListMessage.svelte'
  import { errorToast } from '$lib/stores/error-toast'

  export let studiesData: Study[]

  export let isEditable: boolean

  let openedModal = false
  let openedDeleteModal = false
  let openedEditionModal = false
  let studyIdToDelete: number
  let selectedStudyToUpdate: Study

  function openModal() {
    openedModal = true
  }

  function openDeleteModal(id: number) {
    studyIdToDelete = id
    openedDeleteModal = true
  }

  function openEditionModal(study: Study) {
    selectedStudyToUpdate = { ...study }
    openedEditionModal = true
  }

  async function handleDelete() {
    try {
      const res = await fetch('/api/profile/education/academic-training/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id: studyIdToDelete })
      })

      const resBody = await res.json()

      if (!res.ok) throw new Error(resBody?.message)

      invalidateAll()
      closeDeleteModal()
    } catch (error) {
      if (error instanceof Error && error.message) errorToast.launch({ reason: error.message })
      else
        errorToast.launch({
          reason: 'Hubo un error en el servidor al intentar eliminar la formación académica'
        })
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
    {#if studiesData.length === 0}
      <EmptyListMessage text="No hay formación académica registrada" />
    {/if}
    {#each studiesData as study (study.id + (study.universityName ?? 'XD'))}
      <li in:slide out:slide class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h3 class="font-poppins text-2xl">
            {study.universityName ?? 'Universidad Católica Andrés Bello'}
          </h3>
          {#if isEditable && study.universityName}
            <div class="flex gap-6">
              <button
                on:click={() => {
                  openEditionModal(study)
                }}
              >
                <img src={pencilIcon} alt="Editar estudio" />
              </button>
              <button
                on:click={() => {
                  openDeleteModal(study.id)
                }}
              >
                <img src={deleteIcon} alt="Eliminar estudio" />
              </button>
            </div>
          {/if}
        </div>
        <p class="text-brand-p-black">
          {study.name} - {study.degree
            .split('')
            .map((c, i) => (i === 0 ? c.toUpperCase() : c))
            .join('')}
        </p>
        <p>Año de graduación {study.graduationYear}</p>
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
