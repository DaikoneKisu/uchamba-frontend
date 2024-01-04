<script lang="ts">
  import type { WorkExperience } from '$lib/types/profile-data.type'
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte'
  import EmptyListMessage from './EmptyListMessage.svelte'
  import Dropdown from './Dropdown.svelte'
  import { cv } from './cv.store'

  export let workExperiences: WorkExperience[]

  let addedWorkExperiences: Record<number, boolean> = {}

  function setAddedWorkExperiences() {
    workExperiences.forEach((we) => {
      addedWorkExperiences[we.workExpId] = $cv.entries.experiences.includes(we.workExpId)
    })
  }

  function updateCv() {
    const workExperiencesToAdd = Object.keys(addedWorkExperiences)
      .map(Number)
      .filter((k) => addedWorkExperiences[k])

    cv.set({
      ...$cv,
      entries: {
        ...$cv.entries,
        experiences: workExperiencesToAdd
      }
    })
  }

  $: if (workExperiences) {
    setAddedWorkExperiences()
  }

  $: if (addedWorkExperiences) {
    updateCv()
  }
</script>

<Dropdown title="Experiencias Laborales" max={5}>
  {#if workExperiences.length < 1}
    <EmptyListMessage text="No has subido experiencias laborales" />
  {/if}
  <ul class="flex flex-col gap-5 py-5">
    {#each workExperiences as we}
      <li class="flex items-center gap-5 pl-2">
        <Checkbox bind:checked={addedWorkExperiences[we.workExpId]} />
        <div>
          <p>{we.organizationName}</p>
          <p>{we.jobTitle}</p>
        </div>
      </li>
    {/each}
  </ul>
</Dropdown>
