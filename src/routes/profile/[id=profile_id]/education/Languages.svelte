<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { slide } from 'svelte/transition'
  
  import Add from '$lib/components/profile/add/Add.svelte'
  import LanguageCreationModal from './LanguageCreationModal.svelte'
  import LanguagesDetailsModal from './LanguagesDetailsModal.svelte'
  import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
  
  import pencilIcon from '$lib/icons/pencil.svg'
  import deleteIcon from '$lib/icons/delete.svg'

  export let languages: {
    languageId: number
    name: string
    proficientLevel: string
    createdAt: string
    updatedAt: string
  }[]

  export let langsList: { languageId: number; name: string }[]
  export let isEditable: boolean

  let openedCreationModal = false
  let openedDeleteModal = false
  let openedDetailsModal = false
  let detailsModalMode: 'view' | 'edit' = 'view'

  let langIdToDelete: number
  
  let selectedLanguageDetails = {
    languageId: 0,
    name: '',
    proficientLevel: '',
    createdAt: '',
    updatedAt: ''
  }

  function openCreationModal() {
    openedCreationModal = true
  }

  function openDeleteModal(id: number) {
    langIdToDelete = id
    openedDeleteModal = true
  }

  function openDetailsModal(lang: {
    languageId: number
    name: string
    proficientLevel: string
    createdAt: string
    updatedAt: string
  }) {
    detailsModalMode = 'view'
    selectedLanguageDetails = { ...lang }
    openedDetailsModal = true
  }

  function openEditModal(lang: {
    languageId: number
    name: string
    proficientLevel: string
    createdAt: string
    updatedAt: string
  }) {
    detailsModalMode = 'edit'
    selectedLanguageDetails = { ...lang }
    openedDetailsModal = true
  }

  async function handleDelete() {
    try {
      const res = await fetch('/api/profile/education/languages/delete', {
        method: 'POST',
        body: JSON.stringify({ id: langIdToDelete })
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

  $: langsList = langsList.filter((lang) => {
    return !languages.find((l) => l.languageId === lang.languageId)
  })
</script>

<article class="w-full flex-col bg-brand-white">
  <header>
    <div class="flex w-full justify-between">
      <h2 class="capitalize">Idiomas</h2>
      {#if isEditable}
        <Add clickHandler={openCreationModal} />
      {/if}
    </div>
    <div class="mt-2 h-1 w-full bg-ucab-blue" />
  </header>

  <ul class="mt-6 flex flex-col gap-8">
    {#each languages as lang (lang.languageId)}
      <li transition:slide class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h3 class="font-poppins text-2xl capitalize">{lang.name}</h3>
          {#if isEditable}
            <div class="flex gap-6">
              <button
                on:click={() => {
                  openEditModal(lang)
                }}
              >
                <img src={pencilIcon} alt="Editar idioma" />
              </button>
              <button
                on:click={() => {
                  openDeleteModal(lang.languageId)
                }}
              >
                <img src={deleteIcon} alt="Eliminar idioma" />
              </button>
            </div>
          {/if}
        </div>
        <p class="text-brand-p-black">
          Nivel {lang.proficientLevel === 'Native' ? 'Nativo' : lang.proficientLevel}
        </p>

        <button
          on:click={() => {
            openDetailsModal(lang)
          }}
          class="text-left text-ucab-green underline underline-offset-2"
        >
          Ver Información
        </button>
      </li>
    {/each}
  </ul>
</article>

<LanguagesDetailsModal
  bind:openedModal={openedDetailsModal}
  langData={selectedLanguageDetails}
  bind:mode={detailsModalMode}
  {langsList}
  {isEditable}
/>
{#if isEditable}
  <LanguageCreationModal bind:openedModal={openedCreationModal} {langsList} />
  <DeleteModal
    title="¿Seguro que deseas eliminar este idioma de tu lista?"
    bind:isOpen={openedDeleteModal}
    {handleDelete}
  />
{/if}
