<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte'
  import type { Language } from '$lib/types/profile-data.type'
  import Dropdown from './Dropdown.svelte'
  import { cv } from './cv.store'

  export let languages: Language[]

  let addedLanguages: number[] = []

  async function handleInput(langId: number) {
    if (addedLanguages.includes(langId)) {
      addedLanguages = addedLanguages.filter((id) => id !== langId)
    } else {
      addedLanguages = [...addedLanguages, langId]
    }
    updateCv()
  }

  function updateCv() {
    cv.set({
      ...$cv,
      entries: {
        ...$cv.entries,
        languages: addedLanguages
      }
    })
  }
</script>

<Dropdown title="Idiomas">
  <ul class="flex flex-col gap-5 py-5">
    {#each languages as l (l.languageId)}
      <li class="flex items-center gap-5 pl-2">
        <Checkbox handleInput={() => handleInput(l.languageId)} />
        <p>{l.name} {l.proficientLevel === 'Native' ? 'Nativo' : l.proficientLevel}</p>
      </li>
    {/each}
  </ul>
</Dropdown>
