<script lang="ts">
  import { slide } from 'svelte/transition'

  import closeIcon from '$lib/icons/cancel-black.svg'
  import Dropdown from './Dropdown.svelte'
  import EmptyListMessage from './EmptyListMessage.svelte'
  import { cv } from './cv.store'

  export let softSkills: string[]

  let addedSoftSkills: string[] = $cv.entries.skills.soft
  let input: HTMLInputElement
  let value: string

  function addSoftSkill() {
    if (value && !addedSoftSkills.includes(value) && softSkills.find((ss) => ss === value)) {
      addedSoftSkills = [...addedSoftSkills, value]
      value = ''
      input.focus()
    }
  }

  function deleteSoftSkill(ssToDelete: string) {
    addedSoftSkills = addedSoftSkills.filter((skill) => skill !== ssToDelete)
  }

  function updateCv() {
    cv.set({
      ...$cv,
      entries: {
        ...$cv.entries,
        skills: {
          ...$cv.entries.skills,
          soft: addedSoftSkills
        }
      }
    })
  }

  $: if (addedSoftSkills) {
    updateCv()
  }
</script>

<Dropdown title="Habilidades Blandas" max={5}>
  {#if softSkills.length < 1}
    <EmptyListMessage text="No has subido habilidades blandas" />
  {/if}

  <div class="pt-4">
    <label
      class="flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4"
    >
      <form
        on:submit|preventDefault={addSoftSkill}
        class="flex h-full w-full flex-col justify-center pl-5 text-[15px]"
      >
        <input
          bind:this={input}
          list="soft-skills-list"
          type="text"
          bind:value
          placeholder="Ingresa una habilidad blanda"
          class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none"
        />
        <datalist id="soft-skills-list">
          {#each softSkills.filter((ss) => !addedSoftSkills.includes(ss)) as ss}
            <option value={ss} />
          {/each}
        </datalist>
      </form>
    </label>

    <ul class="flex flex-col gap-5 py-5">
      {#each addedSoftSkills as ss}
        <li transition:slide class="flex items-center gap-2 pl-2">
          <button on:click={() => deleteSoftSkill(ss)}>
            <img src={closeIcon} alt="Eliminar habilidad suave" class="aspect-square w-7" />
          </button>
          <p>{ss}</p>
        </li>
      {/each}
    </ul>
  </div>
</Dropdown>
