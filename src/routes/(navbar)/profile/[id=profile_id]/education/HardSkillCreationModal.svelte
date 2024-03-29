<script lang="ts">
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'
  import { invalidateAll } from '$app/navigation'

  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import Chip from '$lib/components/profile/chip/Chip.svelte'

  import learningIcon from '$lib/icons/learning.svg'
  import { errorToast } from '$lib/stores/error-toast'

  export let openedModal = false

  export let hardSkillsList: string[] = []

  let skills: string[] = []

  let value = ''

  let input: HTMLInputElement

  let disabled = false

  async function save() {
    try {
      disabled = true

      const res = await fetch('/api/profile/education/hard-skills/create', {
        method: 'POST',
        body: JSON.stringify(skills)
      })

      const resBody = await res.json()

      if (!res.ok) throw new Error(resBody?.message)

      skills = []
      invalidateAll()
      closeModal()
    } catch (error) {
      if (error instanceof Error && error.message) errorToast.launch({ reason: error.message })
      else
        errorToast.launch({
          reason: 'Hubo un error en el servidor al intentar crear la habilidad dura'
        })
    } finally {
      disabled = false
    }
  }

  function insertSkill() {
    if (value) {
      skills = [...skills, value]
      value = ''
      input.focus()
    }
  }

  function deleteSkill(skillToDelete: string) {
    skills = skills.filter((skill) => skill !== skillToDelete)
  }

  function closeModal() {
    openedModal = false
  }

  $: skills = [...new Set(skills)]

  $: disabled = !skills.length
</script>

<Modal
  title="Habilidades Duras"
  subtitle="Agrega una nueva habilidad dura para añadir a tu CV"
  bind:isOpen={openedModal}
  icon={learningIcon}
>
  <svelte:fragment slot="body">
    <form
      class="flex w-full justify-between pb-8 pl-6 pt-12"
      on:submit|preventDefault={() => insertSkill()}
    >
      <div class="flex w-full justify-center gap-12">
        <label
          class={'flex h-[64px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4'}
        >
          <div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
            <input
              bind:this={input}
              list="hard-skills-list"
              type="text"
              bind:value
              placeholder="Ingresa una habilidad dura"
              class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none"
            />
            <datalist id="hard-skills-list">
              {#each hardSkillsList as skill}
                <option value={skill} />
              {/each}
            </datalist>
          </div>
        </label>
      </div>
    </form>

    <div class="min-h-[200px]">
      <ul class="flex flex-wrap items-start justify-center gap-2 px-8 pb-12">
        {#each skills as skill (skill)}
          <div animate:flip in:fade class="flex justify-center">
            <Chip
              key={skill}
              text={skill}
              deleteHandler={() => {
                deleteSkill(skill)
              }}
            />
          </div>
        {/each}
      </ul>
    </div>
  </svelte:fragment>

  <SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
