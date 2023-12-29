<script lang="ts">
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'
  import { invalidateAll } from '$app/navigation'
  
  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import Chip from '$lib/components/profile/chip/Chip.svelte
  
  import staffIcon from '$lib/icons/staff.svg'

  export let softSkillsList: string[] = []

  export let openedModal = false

  let skills: string[] = []

  let value = ''

  let input: HTMLInputElement

  let disabled = false

  async function save() {
    try {
      disabled = true

      const res = await fetch('/api/profile/education/soft-skills/create', {
        method: 'POST',
        body: JSON.stringify(skills)
      })

      if (!res.ok) throw new Error('Error al crear la habilidad blanda')

      skills = []
      invalidateAll()
      closeModal()
    } catch (e) {
      alert(e)
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
</script>

<Modal
  title="Habilidades Blandas"
  subtitle="Agrega una nueva habilidad blanda para añadir a tu CV"
  bind:isOpen={openedModal}
  icon={staffIcon}
>
  <svelte:fragment slot="body">
    <form
      class="flex w-full justify-between pb-8 pl-6 pt-12"
      on:submit={(e) => {
        e.preventDefault()
        insertSkill()
      }}
    >
      <div class="flex w-full justify-center gap-12">
        <label
          class={'flex h-[64px] w-full max-w-[330px] justify-center rounded-xl border-4 border-[#f0f0f0] bg-brand-white pr-4'}
        >
          <div class="flex h-full w-full flex-col justify-center pl-5 text-[15px]">
            <input
              bind:this={input}
              list="soft-skills-list"
              type="text"
              bind:value
              placeholder="Ingresa una habilidad blanda"
              class="text-sm placeholder:text-brand-p-black focus:border-0 focus:shadow-none focus:outline-none"
            />
            <datalist id="soft-skills-list">
              {#each softSkillsList as skill}
                <option value={skill} />
              {/each}
            </datalist>
          </div>
        </label>
      </div>
    </form>

    <div class="min-h-[200px]">
      <ul class="flex flex-wrap items-start justify-center gap-2 px-12 pb-12">
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
