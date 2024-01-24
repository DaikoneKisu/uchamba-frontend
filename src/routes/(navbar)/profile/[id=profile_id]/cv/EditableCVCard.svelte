<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation'
  import { slide } from 'svelte/transition'

  import type { CV } from '$lib/types/profile-data.type'

  import multiplesCV from '$lib/images/multiples-cvs.png'
  import fileDownloadIcon from '$lib/icons/file-download.svg'
  import fileEditIcon from '$lib/icons/file-edit.svg'
  import deleteIcon from '$lib/icons/delete.svg'
  import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
  import { errorToast } from '$lib/stores/error-toast'
  import Loading from '$lib/components/loading/Loading.svelte'

  export let cv: CV
  export let userName: string
  export let userId: number
  export let isEditable: boolean

  let disabledEditButton = false
  let disabledDownloadButton = false
  let isLoading = false

  let openedDeleteModal = false

  function goToCVEditor() {
    try {
      disabledEditButton = true
      goto(`/profile/cv-editor/${cv.cvId}`)
    } catch (error) {
      errorToast.launch({
        reason:
          'Ha ocurrido un error en el servidor al intentar editar el CV, intenta de nuevo más tarde'
      })
    } finally {
      disabledEditButton = false
    }
  }

  async function downloadCV() {
    try {
      disabledDownloadButton = true
      isLoading = true
      const res = await fetch('/api/profile/generate-cv', {
        method: 'POST',
        body: JSON.stringify({ cvId: cv.cvId, userId })
      })

      if (!res.ok) throw new Error()

      const file = await res.blob()
      downloadFile(file)
    } catch (e) {
      errorToast.launch({
        reason:
          'Ha ocurrido un error en el servidor al intentar descargar el CV, intente de nuevo más tarde'
      })
    } finally {
      disabledDownloadButton = false
      isLoading = false
    }
  }

  function downloadFile(file: Blob) {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(file)
    a.download = `${userName} - ${cv.name} - CV.pdf`
    a.click()
  }

  async function handleDelete() {
    try {
      const res = await fetch('/api/profile/cv-editor/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id: cv.cvId })
      })

      if (!res.ok) throw new Error()

      invalidateAll()
      closeModal()
    } catch (error) {
      errorToast.launch({
        reason:
          'Ha ocurrido un error en el servidor al intentar eliminar el CV, intente de nuevo más tarde'
      })
    } finally {
      disabledDownloadButton = false
    }
  }

  function openDeleteModal() {
    openedDeleteModal = true
  }

  function closeModal() {
    openedDeleteModal = false
  }
</script>

{#if isLoading}
  <Loading />
{/if}
<article
  transition:slide
  class="m-8 flex h-[319px] w-[316px] flex-col items-start justify-start rounded-[10px] bg-zinc-100"
>
  {#if isEditable}
    <button on:click={openDeleteModal} class="absolute translate-x-[268px] translate-y-[10px]">
      <img src={deleteIcon} alt="Eliminar CV" class="h-[33px] w-[39px]" />
    </button>
  {/if}
  <figure class="h-[154px] w-full">
    <img
      class="rounded-[10px] border-4 border-gray-300"
      src={multiplesCV}
      alt="Img de referencia CV"
    />
  </figure>
  <h2 class="brand-h2-black ml-3 mt-4 text-xl font-medium">{cv.name}</h2>
  <p class="brand-p-black ml-3 text-base font-normal">{cv.careerName}</p>
  <p class="brand-p-black ml-3 text-sm">Última actualización: {cv.updatedAt}</p>
  <div class="flex w-full gap-2 px-3 pt-6">
    {#if isEditable}
      <button
        disabled={disabledEditButton}
        on:click={goToCVEditor}
        class="flex h-[38px] w-full items-center justify-center gap-2 rounded-[10px] bg-ucab-green text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200 disabled:bg-opacity-50"
      >
        <img src={fileEditIcon} alt="Icono de descargar CV" />
        <span class="text-sm text-white">Editar CV</span>
      </button>
    {/if}
    <button
      disabled={disabledDownloadButton}
      on:click={downloadCV}
      class="flex h-[38px] w-full items-center justify-center gap-2 rounded-[10px] bg-ucab-green text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200 disabled:bg-opacity-50"
    >
      <img src={fileDownloadIcon} alt="Icono de descargar CV" />
      <span class="text-sm text-white">Descargar CV</span>
    </button>
  </div>
</article>

<DeleteModal
  bind:isOpen={openedDeleteModal}
  title="¿Estás seguro de que deseas eliminar este CV?"
  {handleDelete}
/>
