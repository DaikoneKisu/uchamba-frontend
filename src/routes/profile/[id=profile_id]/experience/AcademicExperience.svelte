<script lang="ts">
  import { slide } from 'svelte/transition'
  import { invalidateAll } from '$app/navigation'
  
  import type { WorkExperience } from '$lib/types/profile-data.type'
  
  import Add from '$lib/components/profile/add/Add.svelte'
  import ExperienceCreationModal from './ExperienceCreationModal.svelte'
  import ExperienceDetailsModal from './ExperienceDetailsModal.svelte'
  import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
  
  import pencilIcon from '$lib/icons/pencil.svg'
  import deleteIcon from '$lib/icons/delete.svg'

  export let business: WorkExperience[]
  export let isEditable: boolean

  let openedCreationModal = false
  let openedDetailsModal = false
  let openedDeleteModal = false
  let experienceIdToDelete: number
  let detailsModalMode: 'view' | 'edit' = 'view'

  let selectedExperienceDetails: WorkExperience = {
    workExpId: 0,
    organizationName: '',
    jobTitle: '',
    description: '',
    entryDate: '',
    departureDate: '',
    freelancer: false,
    country: '',
    state: '',
    city: '',
    address: '',
    createdAt: ''
  }

  function openDeleteModal(id: number) {
    experienceIdToDelete = id
    openedDeleteModal = true
  }

  function openCreationModal() {
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

<article class="w-full flex-col bg-brand-white">
  <header>
    <div class="flex w-full justify-between">
      <h2 class="capitalize">Experiencia Laboral</h2>
      {#if isEditable}
        <Add clickHandler={openCreationModal} />
      {/if}
    </div>
    <div class="mt-2 h-1 w-full bg-ucab-blue" />
  </header>

  <ul class="mt-6 flex flex-col gap-8">
    {#each business as b (b.workExpId)}
      <li transition:slide class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <h3 class="font-poppins text-2xl capitalize">{b.organizationName}</h3>
          {#if isEditable}
            <div class="flex gap-6">
              <button
                on:click={() => {
                  openEditionModal(b)
                }}
              >
                <img src={pencilIcon} alt="Editar experiencia académica" />
              </button>
              <button
                on:click={() => {
                  openDeleteModal(b.workExpId)
                }}
              >
                <img src={deleteIcon} alt="Eliminar experiencia académica" />
              </button>
            </div>
          {/if}
        </div>

        <p class="font-open-sans font-bold text-ucab-black capitalize">{b.jobTitle}</p>
        <p class="font-open-sans text-brand-p-black">{b.description}</p>

        <div class="mt-2 flex items-center justify-start">
          <button
            on:click={() => {
              openDetailsModal(b)
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
  formData={{ ...selectedExperienceDetails }}
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
