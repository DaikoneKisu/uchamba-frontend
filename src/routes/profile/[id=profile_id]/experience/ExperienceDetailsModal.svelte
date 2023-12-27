<script lang="ts">
  import graduationCapIcon from '$lib/icons/graduation-cap.svg'
  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import business from '$lib/icons/business.svg'
  import { invalidateAll } from '$app/navigation'
  import EditModalFooter from '$lib/components/profile/modal/EditModalFooter.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import { ValidationError } from 'yup'
  import { validateAcademicExperience } from '$lib/profile/experience/validate-academic-experience'
  import { slide } from 'svelte/transition'
  import Textbox from '$lib/components/profile/textbox/Textbox.svelte'
  import type { WorkExperience } from '$lib/types/profile-data.type'
  export let openedModal = false

  export let mode: 'view' | 'edit'

  export let isEditable: boolean = true

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
        method: 'POST',
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Error al actualizar la experiencia academica')
      invalidateAll()
      closeModal()
    } catch (error) {
      alert(error)
    } finally {
      disabledSaveButton = false
    }
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
              label="Direccion"
              placeholder="Ingrese la direccion"
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
          placeholder="Ingrese el instituto o universidad"
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
              placeholder="Ingrese la direccion"
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
