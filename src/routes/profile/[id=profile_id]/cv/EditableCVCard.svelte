<script lang="ts">
  import { goto } from '$app/navigation'

  import type { CV } from '$lib/types/profile-data.type'

  import multiplesCV from '$lib/images/multiples-cvs.png'
  import fileDownloadIcon from '$lib/icons/file-download.svg'
  import fileEditIcon from '$lib/icons/file-edit.svg'

  export let cv: CV
  export let userName: string
  export let userId: number

  let disabledEditButton = false
  let disabledDownloadButton = false

  function goToCVEditor() {
    try {
      disabledEditButton = true
      goto(`/profile/cv-editor/${cv.cvId}`)
    } catch (error) {
      console.log(error)
      alert('Ha ocurrido un error en el servidor al intentar editar el CV')
    } finally {
      disabledEditButton = false
    }
  }

  async function downloadCV() {
    try {
      disabledDownloadButton = true
      const res = await fetch('/api/profile/generate-cv', {
        method: 'POST',
        body: JSON.stringify({ cvId: cv.cvId, userId })
      })

      console.log('XDDDDD')
      if (!res.ok) throw new Error()

      const file = await res.blob()
      downloadFile(file)
    } catch (e) {
      alert('Ha ocurrido un error en el servidor al intentar descargar el CV')
    } finally {
      disabledDownloadButton = false
    }
  }

  function downloadFile(file: Blob) {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(file)
    a.download = `${userName} - ${cv.name} - CV.pdf`
    a.click()
  }
</script>

<article
  class="m-8 flex h-[319px] w-[316px] flex-col items-start justify-start rounded-[10px] bg-zinc-100"
>
  <figure class="h-[154px] w-full">
    <img
      class="rounded-[10px] border-4 border-gray-300"
      src={multiplesCV}
      alt="Img de referencia CV"
    />
  </figure>
  <h2 class="brand-h2-black ml-3 mt-4 text-xl font-medium">{cv.name}</h2>
  <p class="brand-p-black ml-3 text-base font-normal">{cv.careerName}</p>
  <div class="flex w-full gap-2 px-3 pt-6">
    <button
      disabled={disabledEditButton}
      on:click={goToCVEditor}
      class="flex h-[38px] w-full items-center justify-center gap-2 rounded-[10px] bg-ucab-green text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200 disabled:bg-opacity-50"
    >
      <img src={fileEditIcon} alt="Icono de descargar CV" />
      <span class="text-sm text-white">Editar CV</span>
    </button>
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
