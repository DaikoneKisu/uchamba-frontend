<script lang="ts">
  import { cv, cvInitialState } from './cv.store'
  import { page } from '$app/stores'

  import CVBuilder from './CVBuilder.svelte'
  import CVPreview from './CVPreview.svelte'

  import leftIcon from '$lib/icons/left-arrow2.svg'

  export let data

  const cvId = +$page.params.id

  const queryParams = $page.url.searchParams
  const careerId = queryParams.get('career')
  const cvName = queryParams.get('name')

  if (cvId) {
    const currentCv = data.cvs.find((cv) => cv.cvId === cvId)
    if (currentCv) {
      cv.set(currentCv)
    }
  }

  if (careerId && cvName && !cvId) {
    cv.set({
      ...cvInitialState,
      careerId: +careerId,
      name: cvName
    })
  }
</script>

<main class="flex min-h-screen flex-col bg-[#F0F0F0] py-4">
  <a href="/profile/me/cv" class="absolute flex translate-x-4 translate-y-8 gap-4">
    <img src={leftIcon} alt="Botón para volver a tu perfil" />
    <span
      class="font-open-sans text-lg underline decoration-ucab-blue decoration-4 underline-offset-8"
      >Ir a mi perfil</span
    >
  </a>
  <div class="flex justify-center gap-10 py-8">
    <CVPreview profileData={data} />
    <CVBuilder profileData={data} />
  </div>
</main>
