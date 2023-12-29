<script lang="ts">
  import { invalidateAll } from '$app/navigation'

  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import EditModalFooter from '$lib/components/profile/modal/EditModalFooter.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'

  import languageIcon from '$lib/icons/language.svg'

  export let openedModal = false

  export let mode: 'view' | 'edit'

  export let langData: {
    languageId: number
    name: string
    proficientLevel: string
    createdAt: string
    updatedAt: string
  }

  export let langsList: { languageId: number; name: string }[]

  export let disabled = false

  export let isEditable: boolean

  function goToEditMode() {
    mode = 'edit'
  }

  function closeModal() {
    openedModal = false
  }

  async function updateLanguage() {
    try {
      disabled = true
      const res = await fetch('/api/profile/education/languages/update', {
        method: 'POST',
        body: JSON.stringify(langData)
      })
      if (!res.ok) throw new Error('Error al actualizar el idioma')
      invalidateAll()
      closeModal()
    } catch (error) {
      alert(error)
    } finally {
      disabled = false
    }
  }
</script>

{#if mode === 'view'}
  <Modal
    title="Idioma"
    subtitle="Visualiza la información del idioma"
    bind:isOpen={openedModal}
    icon={languageIcon}
  >
    <form slot="body" class="flex w-full justify-between py-12 pl-6">
      <div class="flex w-full gap-12">
        <Input
          type="text"
          disabled
          label="Idioma"
          placeholder="Ingrese el idioma"
          className="text-brand-p-black"
          bind:value={langData.name}
        />
        <Input
          type="text"
          disabled
          label="Nivel del idioma"
          placeholder="Ingrese su nivel con el idioma"
          className="text-brand-p-black"
          bind:value={langData.proficientLevel}
        />
      </div>
    </form>
    <div slot="footer">
      {#if isEditable}
        <EditModalFooter handlePressEdit={goToEditMode} />
      {/if}
    </div>
  </Modal>
{:else if mode === 'edit'}
  <Modal
    title="Idioma"
    subtitle="Edita la información del idioma"
    bind:isOpen={openedModal}
    icon={languageIcon}
  >
    <form slot="body" class="flex w-full justify-between py-12 pl-6">
      <div class="flex w-full gap-12">
        <select
          class="flex h-[64px] w-full max-w-[330px] rounded-xl border-4 border-[#f0f0f0] bg-brand-white px-4"
          bind:value={langData.languageId}
        >
          <option value="" disabled>Seleccione su idioma</option>
          <option value={langData.languageId}>{langData.name}</option>
          {#each langsList as lang}
            <option value={lang.languageId}>{lang.name}</option>
          {/each}
        </select>
        <select
          class="flex h-[64px] w-full max-w-[330px] rounded-xl border-4 border-[#f0f0f0] bg-brand-white px-4"
          bind:value={langData.proficientLevel}
        >
          <option value="" disabled>Seleccione su nivel</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="Native">Nativo</option>
        </select>
      </div>
    </form>

    <SaveModalFooter slot="footer" handleSave={updateLanguage} {disabled} />
  </Modal>
{/if}
