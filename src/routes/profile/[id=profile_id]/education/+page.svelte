<script lang="ts">
  import AcademicTraining from './AcademicTraining.svelte'
  import Languages from './Languages.svelte'
  import SoftSkills from './SoftSkills.svelte'
  import HardSkills from './HardSkills.svelte'

  export let data
</script>

<div class="flex w-full flex-col items-center justify-between gap-16 px-16 pb-28 pt-8">
  <AcademicTraining studiesData={data.education} isEditable={data.isEditable} />
  <Languages languages={data.languages} langsList={data.langsList} isEditable={data.isEditable} />
  <SoftSkills
    softSkills={data.skills.soft}
    softSkillsList={data.softSkillsList.map((s) => s.name)}
    isEditable={data.isEditable}
  />
  <HardSkills
    hardSkills={data.skills.hard}
    hardSkillsList={data.hardSkillsList.map((s) => s.name)}
    isEditable={data.isEditable}
  />
</div>
