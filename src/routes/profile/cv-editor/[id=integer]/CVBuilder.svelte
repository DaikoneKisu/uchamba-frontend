<script lang="ts">
  import type { ProfileData } from '$lib/types/profile-data.type'
  import EducationDropdown from './EducationDropdown.svelte'
  import HardSkillsDropdown from './HardSkillsDropdown.svelte'
  import LanguagesDropdown from './LanguagesDropdown.svelte'
  import SoftSkillsDropdown from './SoftSkillsDropdown.svelte'
  import WorkExperiencesDropdown from './WorkExperiencesDropdown.svelte'

  export let profileData: ProfileData
</script>

<section class="flex w-full max-w-[400px] flex-col gap-8">
  <EducationDropdown
    featuredStudies={profileData.education.featured}
    personalStudies={profileData.education.personal}
  />
  <WorkExperiencesDropdown workExperiences={profileData.workExperiences} />
  <HardSkillsDropdown
    hardSkills={[...profileData.hardSkills.featured, ...profileData.hardSkills.personal]}
  />
  <SoftSkillsDropdown
    softSkills={[...profileData.softSkills.featured, ...profileData.softSkills.personal]}
  />
  <LanguagesDropdown languages={profileData.languages} />
</section>
