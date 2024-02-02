<script lang="ts">
  import { flip } from 'svelte/animate'
  import { fade, fly } from 'svelte/transition'

  import Chip from '$lib/components/chip/Chip.svelte'
  import Dropdown from './Dropdown.svelte'
  import Checkbox from '$lib/components/catalogue/checkbox/Checkbox.svelte'
  import { suggestions } from '$lib/stores/suggestions'
  import { softSkillsFilter } from '$lib/stores/filters'

  let softSkills: string[] = []
  let error = ''
  let isPristine = true

  $: choosableSoftSkills = $suggestions.skills.soft.filter(
    (suggestedSoftSkill) =>
      !softSkills.some((choosenSoftSkill) => choosenSoftSkill === suggestedSoftSkill.name)
  )

  $: softSkills = [...$softSkillsFilter].reduce((acc, curr) => {
    if (typeof curr === 'number') {
      let softSkillName = ''
      $suggestions.skills.soft.forEach((softSkill) => {
        if (softSkill.id === curr) {
          softSkillName = softSkill.name
        }
      })
      if (!softSkillName) {
        /* 
            This should never happen btw 'cuz of how everything works in here, I mean, if 
            softSkillsFilter has an id of a soft skill then it means that soft skill 
            is in suggestions 
          */
        return acc
      }
      return [...acc, softSkillName]
    }
    return acc
  }, [] as string[])

  $: if (softSkills.length < 2 && softSkillsFilter.has(true)) {
    softSkillsFilter.delete(true)
  }

  function addInclusiveSoftSkills(
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    }
  ) {
    if (e.currentTarget.checked) {
      softSkillsFilter.add(true)
    } else {
      softSkillsFilter.delete(true)
    }
  }

  function insertSoftSkill(softSkill: string) {
    if (softSkill) {
      softSkill = softSkill.toLocaleLowerCase()

      if (softSkills.map((s) => s.toLocaleLowerCase()).includes(softSkill)) {
        error = 'Ya agregaste esta habilidad blanda'
        return
      }

      let softSkillId: number | undefined = undefined
      choosableSoftSkills.forEach((choosableSoftSkill) => {
        if (choosableSoftSkill.name.toLocaleLowerCase() === softSkill) {
          error = ''
          softSkillId = choosableSoftSkill.id
          return
        }
      })

      if (softSkillId) {
        softSkillsFilter.add(softSkillId)
        return
      }

      error =
        'Esa habilidad blanda no está entre las sugerencias, ingrese alguna que esté entre las sugeridas'
    }
  }

  function deleteSoftSkill(softSkillToDelete: string) {
    error = ''
    $suggestions.skills.soft.forEach((softSkill) => {
      if (softSkill.name === softSkillToDelete) {
        softSkillsFilter.delete(softSkill.id)
      }
    })
  }
</script>

<Dropdown title="Habilidades Blandas">
  <div class="flex w-full flex-col items-center justify-center gap-4 pt-4">
    <strong class="ml-4 mr-auto inline-block text-green-700">Selecciona una habilidad blanda</strong
    >
    <div class="self-start pl-4">
      <Checkbox
        form="filters"
        disabled={softSkills.length < 2}
        text="Incluyentes"
        checked={$softSkillsFilter.has(true)}
        handleChange={(e) => {
          /*
           * Here I have to disable typescript-eslint's no-unsafe-argument rule
           * because it keeps saying that 'e' is of type any, and it's easy to go
           * to Checkbox.svelte component in lib and see that e is being exported
           * with the expected type and that it's in fact of that type, even
           * VSCode's intellisense infers it, so yeah, minus points to typescript-eslint
           */
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
          addInclusiveSoftSkills(e)
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
            list="soft-skills-list"
            type="text"
            placeholder="Ej. Pensamiento crítico"
            class="bg-brand-white placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none"
            on:input|once={() => (isPristine = false)}
            on:change={(e) => {
              // This previous treatment of value is due to the presence of the datalist
              const value = e.currentTarget.value.trim().toLocaleLowerCase()
              const softSkillFormatted =
                $suggestions.skills.soft.find(
                  (softSkill) =>
                    `${softSkill.name.toLocaleLowerCase()} (${softSkill.total})` === value
                )?.name ?? value

              insertSoftSkill(softSkillFormatted)
              e.currentTarget.value = ''
            }}
          />
          <datalist id="soft-skills-list">
            {#each choosableSoftSkills as softSkill}
              <option value={`${softSkill.name} (${softSkill.total})`} />
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
      {#each softSkills as softSkill (softSkill)}
        <div animate:flip in:fade class="flex justify-center pb-2">
          <Chip
            key={softSkill}
            text={softSkill}
            deleteHandler={() => {
              deleteSoftSkill(softSkill)
            }}
          />
        </div>
      {/each}
    </ul>
  </div>
</Dropdown>
