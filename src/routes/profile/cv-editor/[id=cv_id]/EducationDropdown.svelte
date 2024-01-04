<script lang="ts">
  import type { Study } from '$lib/types/profile-data.type'
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte'
  import Dropdown from './Dropdown.svelte'
  import { cv } from './cv.store'

  export let featuredStudies: Study[]
  export let personalStudies: Study[]

  let addedFeaturedStudies: Record<number, boolean> = {}
  let addedPersonalStudies: Record<number, boolean> = {}

  function setAddedStudies() {
    featuredStudies.forEach((s) => {
      addedFeaturedStudies[s.id] = $cv.entries.education.featured.includes(s.id)
    })
    personalStudies.forEach((s) => {
      addedPersonalStudies[s.id] = $cv.entries.education.personal.includes(s.id)
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

<Dropdown title="Formaciones Académicas" max={5}>
  <ul class="flex flex-col gap-5 py-5">
    {#each featuredStudies as fs}
      <li class="flex items-center gap-5 pl-2">
        <Checkbox bind:checked={addedFeaturedStudies[fs.id]} />
        <div>
          <p>{fs.name} · {fs.degree}</p>
          <p>{'Universidad Católica Andrés Bello'}</p>
        </div>
      </li>
    {/each}
    {#each personalStudies as ps}
      <li class="flex items-center gap-5 pl-2">
        <Checkbox bind:checked={addedPersonalStudies[ps.id]} />
        <div>
          <p>{ps.name} · {ps.degree}</p>
          <p>{ps.universityName}</p>
        </div>
      </li>
    {/each}
  </ul>
</Dropdown>
