<script lang="ts">
  import type { FeaturedStudy, PersonalStudy } from '$lib/types/profile-data.type'
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte'
  import Dropdown from './Dropdown.svelte'
  import { cv } from './cv.store'

  export let featuredStudies: FeaturedStudy[]
  export let personalStudies: PersonalStudy[]

  let addedFeaturedStudies: Record<number, boolean> = {}
  let addedPersonalStudies: Record<number, boolean> = {}

  function setAddedStudies() {
    featuredStudies.forEach((s) => {
      addedFeaturedStudies[s.ucareerId] = false
    })
    personalStudies.forEach((s) => {
      addedPersonalStudies[s.studyId] = false
    })
  }

  function updateCv() {
    const featuredStudiesToAdd = Object.keys(addedFeaturedStudies)
      .map(Number)
      .filter((k) => addedFeaturedStudies[k])

    const personalStudiesToAdd = Object.keys(addedPersonalStudies)
      .map(Number)
      .filter((k) => addedPersonalStudies[k])

    cv.set({
      ...$cv,
      entries: {
        ...$cv.entries,
        education: {
          featured: featuredStudiesToAdd,
          personal: personalStudiesToAdd
        }
      }
    })
  }

  $: if (featuredStudies && personalStudies) {
    setAddedStudies()
  }

  $: if (addedFeaturedStudies || addedPersonalStudies) {
    updateCv()
  }
</script>

<Dropdown title="Formaciones Académicas">
  <ul class="flex flex-col gap-5 py-5">
    {#each featuredStudies as fs}
      <li class="flex items-center gap-5 pl-2">
        <Checkbox bind:checked={addedFeaturedStudies[fs.ucareerId]} />
        <div>
          <p>{fs.name} · {fs.degree}</p>
          <p>{'Universidad Católica Andrés Bello'}</p>
        </div>
      </li>
    {/each}
    {#each personalStudies as ps}
      <li class="flex items-center gap-5 pl-2">
        <Checkbox bind:checked={addedPersonalStudies[ps.studyId]} />
        <div>
          <p>{ps.name} · {ps.degree}</p>
          <p>{ps.universityName}</p>
        </div>
      </li>
    {/each}
  </ul>
</Dropdown>
