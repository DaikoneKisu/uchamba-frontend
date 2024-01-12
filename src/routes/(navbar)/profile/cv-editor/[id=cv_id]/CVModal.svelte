<script lang="ts">
  import Input from '$lib/components/input/Input.svelte'
  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import { cv } from './cv.store'
  import { careers } from '$lib/profile/careers/careers.store'

  import cvIcon from '$lib/icons/cv.svg'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'

  export let isOpen: boolean

  let formData = {
    careerId: '',
    cvName: ''
  }

  let reachedCVNameLimitError = ''

  function handleSave() {
    updateCV()
    closeModal()
  }

  function updateCV() {
    cv.set({
      ...$cv,
      careerId: Number(formData.careerId),
      name: formData.cvName
    })
  }

  function closeModal() {
    isOpen = false
  }

  function setFormData() {
    formData = {
      careerId: String($cv.careerId),
      cvName: $cv.name
    }
  }

  $: if (isOpen) {
    setFormData()
  }

  $: if (!isOpen) {
    formData = {
      careerId: '',
      cvName: ''
    }
  }

  $: if (formData.cvName.length > 40) {
    formData.cvName = formData.cvName.slice(0, 40)
  }

  $: if (formData.cvName.length > 39) {
    formData.cvName = formData.cvName.slice(0, 40)
    reachedCVNameLimitError = 'Has alcanzado el límite de 40 carácteres'
  } else if (formData.cvName.length < 40) {
    reachedCVNameLimitError = ''
  }
</script>

<Modal bind:isOpen title="Preview CV" subtitle="Edita el área y el nombre de tu CV" icon={cvIcon}>
  <form slot="body" class="flex justify-center gap-10 px-8 py-10">
    <select
      bind:value={formData.careerId}
      class="flex h-[64px] w-full max-w-[330px] rounded-xl border-4 border-[#f0f0f0] bg-brand-white px-4"
    >
      <option value="0" disabled>Área del CV</option>
      {#each Object.entries($careers) as [id, name]}
        <option value={id}>{name}</option>
      {/each}
    </select>

    <Input
      type="text"
      label="Nombre del CV"
      bind:value={formData.cvName}
      error={reachedCVNameLimitError}
    />
  </form>
  <SaveModalFooter slot="footer" {handleSave} disabled={false} />
</Modal>
