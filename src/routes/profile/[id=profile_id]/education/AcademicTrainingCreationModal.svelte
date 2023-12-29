<script lang="ts">
  import { ValidationError } from 'yup'
  import { invalidateAll } from '$app/navigation'
  
  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import { validateAcademicTraining } from '$lib/profile/education/validate-academic-training'
  
  import graduationCapIcon from '$lib/icons/graduation-cap.svg'

  export let openedModal = false

  let formData = {
    name: '',
    degree: '',
    universityName: '',
    graduationYear: ''
  }

  let formErrors = {
    name: '',
    degree: '',
    universityName: '',
    graduationYear: ''
  }

  let disabled = false

  async function save() {
    try {
      disabled = true
      const res = await fetch('/api/profile/education/academic-training/create', {
        method: 'POST',
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Error al crear la formación académica')

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

  $: if (openedModal) {
    try {
      validateAcademicTraining(formData)
      disabled = false

      formErrors = {
        name: '',
        degree: '',
        universityName: '',
        graduationYear: ''
      }
    } catch (error: unknown) {
      disabled = true
      if (error instanceof ValidationError) {
        const errors = error.inner

        formErrors = {
          name: errors.find((e) => e.path === 'name')?.message ?? '',
          degree: errors.find((e) => e.path === 'degree')?.message ?? '',
          universityName: errors.find((e) => e.path === 'universityName')?.message ?? '',
          graduationYear: errors.find((e) => e.path === 'graduationYear')?.message ?? ''
        }
      }
    }
  }

  $: if (!openedModal) {
    formData = {
      name: '',
      degree: '',
      universityName: '',
      graduationYear: ''
    }
  }
</script>

<Modal
  title="Formación Académica"
  subtitle="Agrega una nueva formación académica para añadir a tu CV"
  bind:isOpen={openedModal}
  icon={graduationCapIcon}
>
  <form slot="body" class="flex w-full justify-between py-12 pl-6">
    <div class="flex w-full flex-col gap-12">
      <Input
        type="text"
        label="Instituto o Universidad"
        placeholder="Ingrese el instituto o universidad"
        bind:value={formData.universityName}
        error={formErrors.universityName}
      />
      <Input
        type="text"
        label="Año de Graduación"
        placeholder="2023"
        bind:value={formData.graduationYear}
        error={formErrors.graduationYear}
      />
    </div>
    <div class="flex w-full flex-col gap-12">
      <Input
        type="text"
        label="Carrera"
        placeholder="Ingrese la carrera"
        bind:value={formData.name}
        error={formErrors.name}
      />
      <div class="flex w-full flex-col">
        <select
          class="flex h-[64px] w-full max-w-[330px] rounded-xl border-4 border-[#f0f0f0] bg-brand-white px-4"
          bind:value={formData.degree}
        >
          <option value="" selected disabled>Seleccione el nivel de estudios</option>
          <option value="pregrado"> Pregrado </option>
          <option value="postgrado"> Postgrado </option>
          <option value="especializacion"> Especialización </option>
          <option value="maestria"> Maestría </option>
          <option value="doctorado"> Doctorado </option>
        </select>
      </div>
    </div>
  </form>

  <SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
