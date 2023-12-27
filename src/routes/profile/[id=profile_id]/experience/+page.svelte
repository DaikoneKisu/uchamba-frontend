<script lang="ts">
  import AcademicExperience from './AcademicExperience.svelte'

  export let data
</script>

<div class="flex w-full flex-col items-center justify-between gap-16 px-16 pb-28 pt-8">
  <AcademicExperience business={data.workExperiences} isEditable={data.isEditable} />
</div>
