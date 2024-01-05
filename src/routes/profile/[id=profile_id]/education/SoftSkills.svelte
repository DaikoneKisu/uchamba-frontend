<script lang="ts">
  import { fade } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  import Add from '$lib/components/profile/add/Add.svelte'
  import Chip from '$lib/components/profile/chip/Chip.svelte'
  import SoftSkillCreationModal from './SoftSkillCreationModal.svelte'
  import EmptyListMessage from '$lib/components/profile/empty-list-message/EmptyListMessage.svelte'

  export let softSkills: string[]

  export let softSkillsList: string[]
  export let isEditable: boolean

  let openedModal = false

  async function handleDelete(name: string) {
    const [softSkillToDelete] = softSkills.filter((skill) => skill === name)

    try {
      softSkills = softSkills.filter((skill) => skill !== name)
      const res = await fetch('/api/profile/education/soft-skills/delete', {
        method: 'DELETE',
        body: JSON.stringify({ name })
      })

      const resBody = await res.json()

      if (!res.ok) throw new Error(resBody?.message)
    } catch (error) {
      if (error instanceof Error && error.message) alert(error.message)
      else alert('Hubo un error en el servidor al intentar eliminar la habilidad blanda')
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
    {#if softSkills.length === 0}
      <EmptyListMessage text="No hay habilidades blandas registradas" />
    {/if}
    {#each softSkills as skill (skill)}
      <div animate:flip in:fade class="flex justify-center">
        <Chip
          key={skill}
          text={skill}
          deleteHandler={() => handleDelete(skill)}
          animation={isEditable}
        />
      </div>
    {/each}
  </ul>
</article>

<SoftSkillCreationModal bind:openedModal {softSkillsList} />
