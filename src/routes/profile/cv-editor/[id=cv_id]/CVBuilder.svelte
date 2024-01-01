<script lang="ts">
  import type { ProfileData } from '$lib/types/profile-data.type'
  import saveIcon from '$lib/icons/save.svg'
  import EducationDropdown from './EducationDropdown.svelte'
  import HardSkillsDropdown from './HardSkillsDropdown.svelte'
  import LanguagesDropdown from './LanguagesDropdown.svelte'
  import SoftSkillsDropdown from './SoftSkillsDropdown.svelte'
  import WorkExperiencesDropdown from './WorkExperiencesDropdown.svelte'

  export let profileData: ProfileData
</script>

<div class="flex w-full max-w-[500px] flex-col items-end gap-8">
  <header>
    <button
      class="m-auto flex h-[52px] w-[227px] items-center justify-center rounded-[10px] bg-ucab-green font-bold text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200 disabled:opacity-50"
    >
      <img src={saveIcon} alt="Guardar CV" class="aspect-[46/33] w-[46px]" />
      <p class="font-semibold">Guardar</p>
    </button>
  </header>

  <section class="flex w-full max-w-[500px] flex-col gap-8 rounded-xl bg-white px-14 py-10">
    <WorkExperiencesDropdown workExperiences={profileData.workExperiences} />
    <EducationDropdown
      featuredStudies={profileData.education.featured}
      personalStudies={profileData.education.personal}
    />
    <SoftSkillsDropdown
      softSkills={[...profileData.softSkills.featured, ...profileData.softSkills.personal]}
    />
    <HardSkillsDropdown
      hardSkills={[...profileData.hardSkills.featured, ...profileData.hardSkills.personal]}
    />
    <LanguagesDropdown languages={profileData.languages} />
  </section>
</div>
