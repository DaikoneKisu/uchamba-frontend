<script lang="ts">
  import { ValidationError } from 'yup'
  import { slide } from 'svelte/transition'
  import { invalidateAll } from '$app/navigation'

  import type { WorkExperience } from '$lib/types/profile-data.type'

  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import EditModalFooter from '$lib/components/profile/modal/EditModalFooter.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import Textbox from '$lib/components/profile/textbox/Textbox.svelte'
  import { validateAcademicExperience } from '$lib/profile/experience/validate-academic-experience'

  import graduationCapIcon from '$lib/icons/graduation-cap.svg'
  import business from '$lib/icons/business.svg'

  export let openedModal = false

  export let mode: 'view' | 'edit'

  export let isEditable = true

  export let formData: WorkExperience = {
    workExpId: 0,
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

  function goToEditMode() {
    mode = 'edit'
  }

  function closeModal() {
    openedModal = false
  }

  async function updateExperienceDetails() {
    try {
      disabledSaveButton = true
      const res = await fetch('/api/profile/experience/academic-experience/update', {
        method: 'PUT',
        body: JSON.stringify(formData)
      })

      const resBody = await res.json()

      if (!res.ok) throw new Error(resBody?.message)
      invalidateAll()
      closeModal()
    } catch (error) {
      if (error instanceof Error && error.message) alert(error.message)
      else alert('Hubo un error en el servidor al intentar actualizar la experiencia laboral')
    } finally {
      disabledSaveButton = false
    }
  }

  function setDepartureDateCheckbox() {
    disabledDepartureDate = !formData.departureDate
  }

  $: if (openedModal) {
    try {
      validateAcademicExperience(formData)

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

      if (!disabledDepartureDate && formData.departureDate === '') throw new Error()

      disabledSaveButton = false
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
      workExpId: 0,
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

  $: if (openedModal) {
    setDepartureDateCheckbox()
  }
</script>

{#if mode === 'view'}
  <Modal
    title="Experiencia Laboral"
    subtitle="Ve más información sobre la experiencia laboral"
    bind:isOpen={openedModal}
    icon={graduationCapIcon}
  >
    <form slot="body" class="w-full flex-col justify-between px-6 py-12">
      <div class="grid w-full grid-cols-2 gap-y-2">
        <Input
          type="text"
          disabled
          label="Organizacion"
          placeholder="Ingrese el nombre de la organización"
          bind:value={formData.organizationName}
          error={formErrors.organizationName}
        />
        <Input
          type="text"
          disabled
          label="Rol"
          placeholder="Ingrese el rol"
          bind:value={formData.jobTitle}
        />
        <Input
          type="date"
          disabled
          label="Fecha de entrada"
          placeholder="dd/mm/aaaa"
          bind:value={formData.entryDate}
          error={formErrors.entryDate}
        />
        {#if formData.departureDate}
          <Input
            type="date"
            disabled
            label="Fecha de salida"
            placeholder="dd/mm/aaaa"
            bind:value={formData.departureDate}
            error={formErrors.departureDate}
          />
        {/if}
        <div />
      </div>

      <Textbox
        className="mt-10"
        disabled
        label="Descripción"
        bind:value={formData.description}
        error={formErrors.description}
        placeholder="Ingresa una breve descripción"
      />
      <div class="flex flex-col">
        {#if !formData.freelancer}
          <div in:slide out:slide class="grid w-full grid-cols-2 gap-y-2">
            <Input
              type="text"
              disabled
              label="País"
              placeholder="Ingrese el país"
              bind:value={formData.country}
              error={formErrors.country}
            />
            <Input
              type="text"
              disabled
              label="Estado"
              placeholder="Ingrese el estado"
              bind:value={formData.state}
              error={formErrors.state}
            />
            <Input
              type="text"
              disabled
              label="Ciudad"
              placeholder="Ingrese la ciudad"
              bind:value={formData.city}
              error={formErrors.city}
            />
            <Input
              type="text"
              disabled
              label="Dirección"
              placeholder="Ingrese la dirección"
              bind:value={formData.address}
              error={formErrors.address}
            />
          </div>
        {/if}
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
    title="Experiencia Laboral"
    subtitle="Edita la información de la experiencia laboral"
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
          label="Fecha de salida (opcional)"
          placeholder="dd/mm/aaaa"
          bind:value={formData.departureDate}
          error={formErrors.departureDate}
        />
        <div />
        <label class="flex items-center gap-2 pl-3">
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
          <div in:slide out:slide class="grid w-full grid-cols-2 gap-y-2">
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
              label="Direccion"
              placeholder="Ingrese la dirección"
              bind:value={formData.address}
              error={formErrors.address}
            />
          </div>
        {/if}
      </div>
    </form>

    <SaveModalFooter
      slot="footer"
      handleSave={updateExperienceDetails}
      disabled={disabledSaveButton}
    />
  </Modal>
{/if}
