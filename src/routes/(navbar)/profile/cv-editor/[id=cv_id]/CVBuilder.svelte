<script lang="ts">
  import { goto } from '$app/navigation'

  import type { ProfileData } from '$lib/types/profile-data.type'
  import saveIcon from '$lib/icons/save.svg'
  import EducationDropdown from './EducationDropdown.svelte'
  import HardSkillsDropdown from './HardSkillsDropdown.svelte'
  import LanguagesDropdown from './LanguagesDropdown.svelte'
  import SoftSkillsDropdown from './SoftSkillsDropdown.svelte'
  import WorkExperiencesDropdown from './WorkExperiencesDropdown.svelte'
  import Loading from '$lib/components/loading/Loading.svelte'
  import { cv } from './cv.store'
  import { validateCV } from '$lib/profile/cv/validate-cv'
  import { errorToast } from '$lib/stores/error-toast'

  export let profileData: ProfileData

  let disabledButton = false
  let isLoading = false

  async function createCV() {
    try {
      disabledButton = true
      isLoading = true
      const res = await fetch('/api/profile/cv-editor/create', {
        method: 'POST',
        body: JSON.stringify($cv)
      })

      if (!res.ok) throw new Error()

      await goto('/profile/me/cv')
    } catch (error) {
      if (error instanceof Error && error.message) errorToast.launch({ reason: error.message })
      errorToast.launch({ reason: 'Ha ocurrido un error en el servidor al intentar crear tu CV' })
    } finally {
      disabledButton = false
      isLoading = false
    }
  }

  async function updateCV() {
    try {
      disabledButton = true
      isLoading = true
      const res = await fetch('/api/profile/cv-editor/update', {
        method: 'PUT',
        body: JSON.stringify($cv)
      })

      if (!res.ok) throw new Error()

      await goto('/profile/me/cv')
    } catch (error) {
      if (error instanceof Error && error.message) errorToast.launch({ reason: error.message })
      errorToast.launch({ reason: 'Ha ocurrido un error en el servidor al intentar editar tu CV' })
    } finally {
      disabledButton = false
      isLoading = false
    }
  }

  function handleSubmit() {
    if ($cv.cvId !== 0) updateCV()
    else createCV()
  }

  $: if ($cv) {
    try {
      validateCV($cv)
      disabledButton = false
    } catch (error: unknown) {
      disabledButton = true
    }
  }
</script>

{#if isLoading}
  <Loading />
{/if}
<div class="flex w-full max-w-[500px] flex-col items-end gap-11">
  <header>
    <button
      on:click={handleSubmit}
      disabled={disabledButton}
      class="m-auto flex h-[52px] w-[227px] items-center justify-center rounded-[10px] bg-ucab-green font-bold text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200 disabled:opacity-50"
    >
      <img src={saveIcon} alt="Guardar CV" class="aspect-[46/33] w-[46px]" />
      <p class="font-semibold">Guardar</p>
    </button>
  </header>

  <section class="flex w-full max-w-[500px] flex-col gap-8 rounded-xl bg-white px-14 py-10">
    <WorkExperiencesDropdown workExperiences={profileData.workExperiences} />
    <EducationDropdown
      featuredStudies={profileData.education.filter((s) => !s.universityName)}
      personalStudies={profileData.education.filter((s) => !!s.universityName)}
    />
    <SoftSkillsDropdown softSkills={profileData.skills.soft} />
    <HardSkillsDropdown hardSkills={profileData.skills.hard} />
    <LanguagesDropdown languages={profileData.languages} />
  </section>
</div>
