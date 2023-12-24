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
    softSkills={data.softSkills.featured.concat(data.softSkills.personal)}
    softSkillsList={data.softSkillsList.map((skill) => skill.name)}
    isEditable={data.isEditable}
  />
  <HardSkills
    hardSkills={data.hardSkills.featured.concat(data.hardSkills.personal)}
    hardSkillsList={data.hardSkillsList.map((skill) => skill.name)}
    isEditable={data.isEditable}
  />
</div>
