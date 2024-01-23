<script lang="ts">
  import { flip } from 'svelte/animate'
  import { fade, fly } from 'svelte/transition'
  import Chip from '$lib/components/chip/Chip.svelte'
  import Dropdown from './Dropdown.svelte'
  import Checkbox from '$lib/components/catalogue/checkbox/Checkbox.svelte'
  import { suggestions } from '$lib/stores/suggestions'
  import { hardSkillsFilter } from '$lib/stores/filters'

  let hardSkills: string[] = []
  let error = ''
  let isPristine = true

  $: choosableHardSkills = $suggestions.skills.hard.filter(
    (suggestedHardSkill) =>
      !hardSkills.some((choosenHardSkill) => choosenHardSkill === suggestedHardSkill.name)
  )

  $: if (hardSkills.length < 2 && hardSkillsFilter.has(true)) {
    hardSkillsFilter.delete(true)
  }

  $: hardSkills = [...$hardSkillsFilter].reduce((acc, curr) => {
    if (typeof curr === 'number') {
      let hardSkillName = ''
      $suggestions.skills.hard.forEach((hardSkill) => {
        if (hardSkill.id === curr) {
          hardSkillName = hardSkill.name
        }
      })
      if (!hardSkillName) {
        /* 
            This should never happen btw 'cuz of how everything works in here, I mean, if 
            hardSkillsFilter has an id of a hard skill then it means that hard skill 
            is in suggestions 
          */
        return acc
      }
      return [...acc, hardSkillName]
    }
    return acc
  }, [] as string[])

  function addInclusiveHardSkills(
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    }
  ) {
    if (e.currentTarget.checked) {
      hardSkillsFilter.add(true)
    } else {
      hardSkillsFilter.delete(true)
    }
  }

  function insertHardSkill(hardSkill: string) {
    if (hardSkill) {
      hardSkill = hardSkill.toLocaleLowerCase()

      if (hardSkills.map((h) => h.toLocaleLowerCase()).includes(hardSkill)) {
        error = 'Ya agregaste esta habilidad dura'
        return
      }

      let hardSkillId: number | undefined = undefined
      choosableHardSkills.forEach((choosableHardSkill) => {
        if (choosableHardSkill.name.toLocaleLowerCase() === hardSkill) {
          error = ''
          hardSkillId = choosableHardSkill.id
          return
        }
      })

      if (hardSkillId) {
        hardSkillsFilter.add(hardSkillId)
        return
      }

      error =
        'Esa habilidad dura no está entre las sugerencias, ingrese alguna que esté entre las sugeridas'
    }
  }

  function deleteHardSkill(hardSkillToDelete: string) {
    error = ''
    $suggestions.skills.hard.forEach((hardSkill) => {
      if (hardSkill.name === hardSkillToDelete) {
        hardSkillsFilter.delete(hardSkill.id)
      }
    })
  }
</script>

<Dropdown title="Habilidades Duras">
  <div class="flex w-full flex-col items-center justify-center gap-4 pt-4">
    <strong class="ml-4 mr-auto inline-block text-green-700">Selecciona una habilidad dura</strong>
    <div class="self-start pl-4">
      <Checkbox
        form="filters"
        disabled={hardSkills.length < 2}
        text="Incluyentes"
        checked={$hardSkillsFilter.has(true)}
        handleChange={(e) => {
          /*
           * Here I have to disable typescript-eslint's no-unsafe-argument rule
           * because it keeps saying that 'e' is of type any, and it's easy to go
           * to Checkbox.svelte component in lib and see that e is being exported
           * with the expected type and that it's in fact of that type, even
           * VSCode's intellisense infers it, so yeah, minus points to typescript-eslint
           */
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
          addInclusiveHardSkills(e)
        }}
      />
    </div>
    <div class="flex w-full flex-col">
      <label
        class={'flex h-[49px] w-full max-w-[330px] justify-center rounded-xl border-4 bg-brand-white pr-4' +
          (error && !isPristine ? ' border-[#D14F4F]' : ' border-[#f0f0f0]')}
      >
        <div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
          <input
            list="hard-skills-list"
            type="text"
            placeholder="Ej. Diseño Estructural"
            class="bg-brand-white placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none"
            on:input|once={() => (isPristine = false)}
            on:change={(e) => {
              // This previous treatment of value is due to the presence of the datalist
              const value = e.currentTarget.value.trim().toLocaleLowerCase()
              const hardSkillFormatted =
                $suggestions.skills.hard.find(
                  (hardSkill) =>
                    `${hardSkill.name.toLocaleLowerCase()} (${hardSkill.total})` === value
                )?.name ?? value

              insertHardSkill(hardSkillFormatted)
              e.currentTarget.value = ''
            }}
          />
          <datalist id="hard-skills-list">
            {#each choosableHardSkills as hardSkill}
              <option value={`${hardSkill.name} (${hardSkill.total})`} />
            {/each}
          </datalist>
        </div>
      </label>
      {#if error && !isPristine}
        <strong in:fly={{ x: -12 }} class="ml-3 w-[80%] text-left text-[12px] text-red-600"
          >{error}</strong
        >
      {:else}
        <div class="invisible h-[18px]" aria-hidden />
      {/if}
    </div>
  </div>

  <div class="w-full">
    <ul class="flex w-full flex-wrap items-center justify-center gap-2 pt-2">
      {#each hardSkills as hardSkill (hardSkill)}
        <div animate:flip in:fade class="flex justify-center pb-2">
          <Chip
            key={hardSkill}
            text={hardSkill}
            deleteHandler={() => {
              deleteHardSkill(hardSkill)
            }}
          />
        </div>
      {/each}
    </ul>
  </div>
</Dropdown>
