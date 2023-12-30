<script lang="ts">
  import { ValidationError } from 'yup'
  import { invalidateAll } from '$app/navigation'

  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import Textbox from '$lib/components/profile/textbox/Textbox.svelte'
  import { validatePersonalInformation } from '$lib/profile/personal-information/validate-personal-information'

  import userIcon from '$lib/icons/user.svg'

  export let isOpen: boolean

  export let formData = {
    email: '',
    country: '',
    state: '',
    city: '',
    residenceAddress: '',
    aboutMe: ''
  }

  let formErrors = {
    email: '',
    country: '',
    state: '',
    city: '',
    residenceAddress: '',
    aboutMe: ''
  }

  let disabled = false

  async function updateInfo() {
    try {
      disabled = true

      const res = await fetch(`/api/profile/personal-information/update`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error()

      invalidateAll()
      closeModal()
    } catch (e) {
      alert('Hubo un error en el servidor al intentar actualizar tu información personal')
    } finally {
      disabled = false
    }
  }

  function closeModal() {
    isOpen = false
  }

  $: if (isOpen) {
    try {
      validatePersonalInformation(formData)
      disabled = false

      formErrors = {
        email: '',
        country: '',
        state: '',
        city: '',
        residenceAddress: '',
        aboutMe: ''
      }
    } catch (error: unknown) {
      disabled = true
      if (error instanceof ValidationError) {
        const errors = error.inner

        formErrors = {
          email: errors.find((e) => e.path === 'email')?.message ?? '',
          country: errors.find((e) => e.path === 'country')?.message ?? '',
          state: errors.find((e) => e.path === 'state')?.message ?? '',
          city: errors.find((e) => e.path === 'city')?.message ?? '',
          residenceAddress: errors.find((e) => e.path === 'residenceAddress')?.message ?? '',
          aboutMe: errors.find((e) => e.path === 'aboutMe')?.message ?? ''
        }
      }
    }
  }
</script>

<Modal
  bind:isOpen
  icon={userIcon}
  title="Información Personal"
  subtitle="Edita la información personal que se mostrará en el CV"
>
  <form slot="body" class="flex flex-col gap-6 px-8 py-6">
    <div class="grid grid-cols-2 gap-y-6">
      <Input
        type="text"
        label="Correo electrónico"
        bind:value={formData.email}
        error={formErrors.email}
        disabled
      />
      <Input type="text" label="País" bind:value={formData.country} error={formErrors.country} />
      <Input type="text" label="Estado" bind:value={formData.state} error={formErrors.state} />
      <Input type="text" label="Ciudad" bind:value={formData.city} error={formErrors.city} />
      <Input
        type="text"
        label="Dirección"
        bind:value={formData.residenceAddress}
        error={formErrors.residenceAddress}
      />
    </div>
    <Textbox label="Sobre mi" bind:value={formData.aboutMe} error={formErrors.aboutMe} />
  </form>
  <SaveModalFooter slot="footer" handleSave={updateInfo} {disabled} />
</Modal>
