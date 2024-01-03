<script lang="ts">
  import Input from '$lib/components/input/Input.svelte'
  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import { careers } from '$lib/profile/careers/careers.store'

  import cvIcon from '$lib/icons/cv.svg'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import { goto } from '$app/navigation'

  export let isOpen: boolean

  let formData = {
    careerId: '',
    cvName: ''
  }

  let disabledButton = false

  async function handleSave() {
    try {
      disabledButton = true
      await goToCVEditor()
    } catch (error) {
      alert('Ha ocurrido un error en el servidor al intentar navegar al editor de CV')
    } finally {
      disabledButton = false
    }
  }

  async function goToCVEditor() {
    await goto(`/profile/cv-editor/new?name=${formData.cvName}&career=${formData.careerId}`)
  }

  $: if (!isOpen) {
    formData = {
      careerId: '',
      cvName: ''
    }
  }
</script>

<Modal bind:isOpen title="Preview CV" subtitle="Edita el área y el nombre de tu CV" icon={cvIcon}>
  <form slot="body" class="flex justify-center gap-10 px-8 py-10">
    <select
      bind:value={formData.careerId}
      class="flex h-[64px] w-full max-w-[330px] rounded-xl border-4 border-[#f0f0f0] bg-brand-white px-4"
    >
      <option value="" selected>Área del CV</option>
      {#each Object.entries($careers) as [id, name]}
        <option value={id}>{name}</option>
      {/each}
    </select>

    <Input type="text" label="Nombre del CV" bind:value={formData.cvName} />
  </form>
  <SaveModalFooter slot="footer" {handleSave} disabled={disabledButton} />
</Modal>
