<script lang="ts">
  import { ValidationError } from 'yup'
  import { invalidateAll } from '$app/navigation'

  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import { validateLanguage } from '$lib/profile/education/validate-language'

  import languageIcon from '$lib/icons/language.svg'

  export let langsList: { languageId: number; name: string }[]

  export let openedModal = false

  let formData = {
    langId: '',
    proficientLevel: ''
  }

  let formErrors = {
    langId: '',
    proficientLevel: ''
  }

  let disabled = false

  async function save() {
    try {
      disabled = true
      const res = await fetch('/api/profile/education/languages/create', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Error creando el lenguaje')

      invalidateAll()
      closeModal()
    } catch (error) {
      alert(error)
    } finally {
      disabled = false
    }
  }

  function closeModal() {
    openedModal = false
  }

  $: if (!openedModal) {
    formData = {
      langId: '',
      proficientLevel: ''
    }
  }

  $: if (openedModal) {
    try {
      validateLanguage(formData)
      disabled = false

      formErrors = {
        langId: '',
        proficientLevel: ''
      }
    } catch (error: unknown) {
      disabled = true
      if (error instanceof ValidationError) {
        const errors = error.inner

        formErrors = {
          langId: errors.find((e) => e.path === 'name')?.message ?? '',
          proficientLevel: errors.find((e) => e.path === 'degree')?.message ?? ''
        }
      }
    }
  }
</script>

<Modal
  title="Idioma"
  subtitle="Agrega un nuevo idioma para añadir a tu CV"
  bind:isOpen={openedModal}
  icon={languageIcon}
>
  <form slot="body" class="flex w-full justify-between py-12 pl-6">
    <div class="flex w-full gap-12">
      <select
        class="flex h-[64px] w-full max-w-[330px] rounded-xl border-4 border-[#f0f0f0] bg-brand-white px-4"
        bind:value={formData.langId}
      >
        <option value="" selected disabled>Seleccione su idioma</option>
        {#each langsList as lang}
          <option class="capitalize" value={lang.languageId}>{lang.name}</option>
        {/each}
      </select>
      <select
        class="flex h-[64px] w-full max-w-[330px] rounded-xl border-4 border-[#f0f0f0] bg-brand-white px-4"
        bind:value={formData.proficientLevel}
      >
        <option value="" selected disabled>Seleccione su nivel</option>
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

  <SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
