<script lang="ts">
  import pencilIcon from '$lib/icons/pencil.svg'
  import Header from './Header.svelte'
  import PersonalInformation from './PersonalInformation.svelte'
  import PersonalLinks from './PersonalLinks.svelte'

  export let data

  let disabledExport = false

  async function exportCV() {
    try {
      disabledExport = true
      const res = await fetch(`/api/profile/generate-cv`, {
        method: 'POST',
        body: JSON.stringify({ id: data.userId })
      })

      const pdfBlob = await res.blob()

      downloadPDF(pdfBlob)
    } catch (e) {
      alert('Hubo un error en el servidor al intentar exportar el CV')
    } finally {
      disabledExport = false
    }
  }

  function downloadPDF(pdfBlob: Blob) {
    const url = window.URL.createObjectURL(pdfBlob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${data.name.split(' ').join('-').toLowerCase()}.pdf`
    link.click()
  }
</script>

<main class="flex min-h-screen gap-10 bg-[#f0f0f0] p-10 pt-12">
  <div class="flex h-full w-full max-w-[465px] flex-col items-center justify-center gap-6">
    <section
      class={`flex w-full flex-col items-center justify-center gap-7 rounded-[20px] ${
        data.isEditable ? 'bg-brand-white' : 'bg-transparent'
      }`}
    >
      <div
        class="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[10px] rounded-bl-[150px] bg-ucab-green pb-28 pt-10 text-brand-white"
      >
        <h2 class="text-center font-poppins text-2xl">{data.name}</h2>
        <p class="w-[360px] font-open-sans text-lg">{data.aboutMe}</p>
      </div>
      {#if data.isEditable}
        <PersonalInformation {data} />
      {/if}
    </section>

    <PersonalLinks links={data.personalLinks} isEditable={data.isEditable} />

    <button
      on:click={exportCV}
      disabled={disabledExport}
      class="m-auto h-[61px] w-full rounded-[10px] bg-ucab-green text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200 disabled:opacity-50"
      >{data.isEditable ? 'Exportar mi CV' : 'Exportar CV'}</button
    >
  </div>

  <section class="flex w-full flex-col items-center rounded-[10px] bg-brand-white">
    <Header />

    <slot />
  </section>
</main>
