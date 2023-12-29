<script lang="ts">
  import { ValidationError } from 'yup'
  import { slide } from 'svelte/transition'
  import { invalidateAll } from '$app/navigation'
  
  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import Textbox from '$lib/components/profile/textbox/Textbox.svelte'
  import { validateAcademicExperience } from '$lib/profile/experience/validate-academic-experience'
  
  import graduationCapIcon from '$lib/icons/business.svg'

  export let openedModal = false

  let formData = {
    organizationName: '',
    jobTitle: '',
    description: '',
    entryDate: '',
    departureDate: '',
    freelancer: false,
    country: '',
    state: '',
    city: '',
    address: ''
  }

  let formErrors = {
    organizationName: '',
    jobTitle: '',
    description: '',
    entryDate: '',
    departureDate: '',
    freelancer: '',
    country: '',
    state: '',
    city: '',
    address: ''
  }

  let disabledSaveButton = false

  let disabledDepartureDate = false

  async function save() {
    try {
      disabledSaveButton = true

      const res = await fetch('/api/profile/experience/academic-experience/create', {
        method: 'POST',
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Error al crear una experiencia laboral')

      invalidateAll()
      closeModal()
    } catch (error) {
      alert(error)
    } finally {
      disabledSaveButton = false
    }
  }

  function closeModal() {
    openedModal = false
  }

  $: if (openedModal) {
    try {
      validateAcademicExperience(formData)
      disabledSaveButton = false

      formErrors = {
        organizationName: '',
        jobTitle: '',
        description: '',
        entryDate: '',
        departureDate: '',
        freelancer: '',
        country: '',
        state: '',
        city: '',
        address: ''
      }
    } catch (error: unknown) {
      disabledSaveButton = true
      if (error instanceof ValidationError) {
        const errors = error.inner

        formErrors = {
          organizationName: errors.find((e) => e.path === 'organizationName')?.message ?? '',
          jobTitle: errors.find((e) => e.path === 'jobTitle')?.message ?? '',
          description: errors.find((e) => e.path === 'description')?.message ?? '',
          entryDate: errors.find((e) => e.path === 'entryDate')?.message ?? '',
          departureDate: errors.find((e) => e.path === 'departureDate')?.message ?? '',
          freelancer: errors.find((e) => e.path === 'freelancer')?.message ?? '',
          country: errors.find((e) => e.path === 'country')?.message ?? '',
          state: errors.find((e) => e.path === 'state')?.message ?? '',
          city: errors.find((e) => e.path === 'city')?.message ?? '',
          address: errors.find((e) => e.path === 'address')?.message ?? ''
        }
      }
    }
  }

  $: if (!openedModal) {
    formData = {
      organizationName: '',
      jobTitle: '',
      description: '',
      entryDate: '',
      departureDate: '',
      freelancer: false,
      country: '',
      state: '',
      city: '',
      address: ''
    }
  }

  $: if (formData.freelancer) {
    formData = {
      ...formData,
      country: '',
      state: '',
      city: '',
      address: ''
    }
  }
</script>

<Modal
  title="Experiencia Laboral"
  subtitle="Agrega una nueva experiencia laboral para añadir a tu CV"
  bind:isOpen={openedModal}
  icon={graduationCapIcon}
>
  <form slot="body" class="w-full flex-col justify-between px-6 py-12">
    <div class="grid w-full grid-cols-2 gap-y-2">
      <Input
        type="text"
        label="Organizacion"
        placeholder="Ingrese el nombre de la organización"
        bind:value={formData.organizationName}
        error={formErrors.organizationName}
      />
      <Input
        type="text"
        label="Rol"
        placeholder="Ingrese el rol"
        bind:value={formData.jobTitle}
        error={formErrors.jobTitle}
      />
      <Input
        type="date"
        label="Fecha de entrada"
        placeholder="dd/mm/aaaa"
        bind:value={formData.entryDate}
        error={formErrors.entryDate}
      />
      <Input
        type="date"
        disabled={disabledDepartureDate}
        label="Fecha de salida"
        placeholder="dd/mm/aaaa"
        bind:value={formData.departureDate}
        error={formErrors.departureDate}
      />
      <div />
      <label class="flex items-center justify-center gap-3">
        <input
          type="checkbox"
          bind:checked={disabledDepartureDate}
          on:input={() => {
            formData.departureDate = ''
          }}
        />
        Experiencia de trabajo actual
      </label>
    </div>

    <Textbox
      className="mt-10"
      label="Descripción"
      bind:value={formData.description}
      error={formErrors.description}
      placeholder="Ingresa una breve descripción"
    />
    <div class="flex flex-col">
      <label class="mb-4 flex items-center gap-2 pl-8">
        <input type="checkbox" bind:checked={formData.freelancer} />
        Trabajador autónomo
      </label>

      {#if !formData.freelancer}
        <div transition:slide class="grid w-full grid-cols-2 gap-y-2">
          <Input
            type="text"
            label="País"
            placeholder="Ingrese el país"
            bind:value={formData.country}
            error={formErrors.country}
          />
          <Input
            type="text"
            label="Estado"
            placeholder="Ingrese el estado"
            bind:value={formData.state}
            error={formErrors.state}
          />
          <Input
            type="text"
            label="Ciudad"
            placeholder="Ingrese la ciudad"
            bind:value={formData.city}
            error={formErrors.city}
          />
          <Input
            type="text"
            label="Dirección"
            placeholder="Ingrese la dirección"
            bind:value={formData.address}
            error={formErrors.address}
          />
        </div>
      {/if}
    </div>
  </form>

  <SaveModalFooter slot="footer" handleSave={save} disabled={disabledSaveButton} />
</Modal>
