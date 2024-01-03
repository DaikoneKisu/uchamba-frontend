<script lang="ts">
  import { page } from '$app/stores'
  import CVBuilder from './CVBuilder.svelte'
  import CVPreview from './CVPreview.svelte'
  import { cv } from './cv.store'

  export let data

  const cvId = +$page.params.id

  if (cvId) {
    const currentCv = data.cvs.find((cv) => cv.cvId === cvId)
    if (currentCv) {
      cv.set(currentCv)
    }
  }
</script>

<main class="flex min-h-screen flex-col bg-[#F0F0F0] py-4">
  <div class="flex justify-center gap-10 py-8">
    <CVPreview profileData={data} />
    <CVBuilder profileData={data} />
  </div>
</main>
