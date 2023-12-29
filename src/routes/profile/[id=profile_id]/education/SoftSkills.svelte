<script lang="ts">
  import { fade } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  import Add from '$lib/components/profile/add/Add.svelte'
  import Chip from '$lib/components/profile/chip/Chip.svelte'
  import SoftSkillCreationModal from './SoftSkillCreationModal.svelte'

  export let softSkills: {
    skillId: number
    name: string
    createdAt: string
  }[]

  export let softSkillsList: string[]
  export let isEditable: boolean

  let openedModal = false

  async function handleDelete(name: string) {
    const [softSkillToDelete] = softSkills.filter((skill) => skill.name === name)

    try {
      softSkills = softSkills.filter((skill) => skill.name !== name)
      const res = await fetch('/api/profile/education/soft-skills/delete', {
        method: 'DELETE',
        body: JSON.stringify({ name })
      })

      if (!res.ok) throw new Error('Error al eliminar la habilidad blanda')
    } catch (e) {
      alert(e)
      softSkills = [...softSkills, softSkillToDelete]
    }
  }

  function openModal() {
    openedModal = true
  }
</script>

<article class="mb-5 w-full flex-col bg-brand-white">
  <header>
    <div class="flex w-full justify-between">
      <h2 class="capitalize">Habilidades Blandas</h2>
      {#if isEditable}
        <Add clickHandler={openModal} />
      {/if}
    </div>
    <div class="mt-2 h-1 w-full bg-ucab-blue" />
  </header>

  <ul class="mt-6 flex flex-wrap gap-2">
    {#each softSkills as skill (skill)}
      <div animate:flip in:fade class="flex justify-center">
        <Chip
          key={skill.name}
          text={skill.name}
          deleteHandler={() => handleDelete(skill.name)}
          animation={isEditable}
        />
      </div>
    {/each}
  </ul>
</article>

<SoftSkillCreationModal bind:openedModal {softSkillsList} />
