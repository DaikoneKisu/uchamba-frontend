<script lang="ts">
  import { slide } from 'svelte/transition'

  import closeIcon from '$lib/icons/cancel-black.svg'
  import type { Skill } from '$lib/types/profile-data.type'
  import Dropdown from './Dropdown.svelte'
  import EmptyListMessage from './EmptyListMessage.svelte'
  import { cv } from './cv.store'

  export let hardSkills: Skill[]

  let addedHardSkills: string[] = []
  let input: HTMLInputElement
  let value: string

  function addHardSkill() {
    if (value && !addedHardSkills.includes(value) && hardSkills.find((hs) => hs.name === value)) {
      addedHardSkills = [...addedHardSkills, value]
      value = ''
      input.focus()
    }
  }

  function deleteHardSkill(hsToDelete: string) {
    addedHardSkills = addedHardSkills.filter((skill) => skill !== hsToDelete)
  }

  function updateCv() {
    cv.set({
      ...$cv,
      entries: {
        ...$cv.entries,
        skills: {
          ...$cv.entries.skills,
          hard: addedHardSkills
        }
      }
    })
  }

  $: if (addedHardSkills) {
    updateCv()
  }
</script>

<Dropdown title="Habilidades Duras">
  {#if hardSkills.length < 1}
    <EmptyListMessage text="No has subido habilidades duras" />
  {/if}

  <div class="pt-4">
    <label
      class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4"
    >
      <form
        on:submit|preventDefault={addHardSkill}
        class="flex h-full w-full flex-col justify-center pl-5 text-[15px]"
      >
        <input
          bind:this={input}
          list="hard-skills-list"
          type="text"
          bind:value
          placeholder="Ingresa una habilidad dura"
          class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none"
        />
        <datalist id="hard-skills-list">
          {#each hardSkills.filter((hs) => !addedHardSkills.includes(hs.name)) as hs}
            <option value={hs.name} />
          {/each}
        </datalist>
      </form>
    </label>

    <ul class="flex flex-col gap-5 py-5">
      {#each addedHardSkills as hs}
        <li transition:slide class="flex items-center gap-2 pl-2">
          <button on:click={() => deleteHardSkill(hs)}>
            <img src={closeIcon} alt="Eliminar habilidad dura" class="aspect-square w-7" />
          </button>
          <p>{hs}</p>
        </li>
      {/each}
    </ul>
  </div>
</Dropdown>
