<script lang="ts">
  import { ValidationError } from 'yup'
  import { invalidateAll } from '$app/navigation'

  import type { ProjectCreationPayload } from '$lib/profile/portfolio/project-creation-payload.type'

  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import ImageInput from '$lib/components/profile/image-input/ImageInput.svelte'
  import Textbox from '$lib/components/profile/textbox/Textbox.svelte'
  import { validateProject } from '$lib/profile/portfolio/validate-project'

  import languageIcon from '$lib/icons/Portfolio.svg'

  export let openedModal = false

  let formData: ProjectCreationPayload = {
    name: '',
    description: '',
    projectUrl: '',
    coverImage: null,
    images: []
  }

  let formErrors = {
    name: '',
    description: '',
    projectUrl: '',
    coverImage: '',
    images: ''
  }

  let disabled = false

  async function save() {
    try {
      const form = new FormData()
      form.append('name', formData.name)
      form.append('description', formData.description)

      if (formData.projectUrl) form.append('projectUrl', formData.projectUrl)

      for (const img of formData.images) {
        if (img instanceof File) form.append('images', img)
      }

      if (formData.coverImage) form.append('coverImage', formData.coverImage)

      disabled = true

      const res = await fetch(`/api/profile/portfolio/projects/create`, {
        method: 'POST',
        body: form
      })
      if (!res.ok) throw new Error('Error creando el proyecto')

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
      name: '',
      description: '',
      projectUrl: '',
      coverImage: null,
      images: []
    }
    formErrors = {
      name: '',
      description: '',
      projectUrl: '',
      coverImage: '',
      images: ''
    }
  }

  $: if (openedModal) {
    try {
      validateProject(formData)
      disabled = false

      formErrors = {
        name: '',
        description: '',
        projectUrl: '',
        coverImage: '',
        images: ''
      }
    } catch (error: unknown) {
      disabled = true
      if (error instanceof ValidationError) {
        const errors = error.inner

        formErrors = {
          name: errors.find((e) => e.path === 'name')?.message ?? '',
          description: errors.find((e) => e.path === 'description')?.message ?? '',
          projectUrl: errors.find((e) => e.path === 'projectUrl')?.message ?? '',
          coverImage: errors.find((e) => e.path === 'coverImage')?.message ?? '',
          images: errors.find((e) => e.path === 'images')?.message ?? ''
        }
      }
    }
  }

  $: if (formData.images.every((img) => img instanceof File) && formData.images.length < 5) {
    formData.images.push(null)
  } else if (formData.images.length < 5) {
    formData.images = formData.images.filter((img) => img instanceof File)
    formData.images.push(null)
  }
</script>

<Modal
  title="Proyecto Realizado"
  subtitle="Agrega un nuevo proyecto para añadir a tu CV"
  bind:isOpen={openedModal}
  icon={languageIcon}
>
  <form slot="body" class="flex w-full justify-between px-6 py-12">
    <div class="flex w-full flex-col gap-12">
      <div class="flex w-full gap-12">
        <Input
          type="text"
          label="Proyecto"
          placeholder="Ingrese el nombre del proyecto"
          bind:value={formData.name}
          error={formErrors.name}
        />
        <Input
          type="text"
          label="Link (Opcional)"
          placeholder="Ingrese el link del proyecto"
          bind:value={formData.projectUrl}
          error={formErrors.projectUrl}
        />
      </div>
      <Textbox
        bind:value={formData.description}
        label="Descripción"
        placeholder="Ingrese una descripción del proyecto"
        error={formErrors.description}
      />

      <div class="flex flex-wrap items-center justify-evenly gap-y-4">
        <ImageInput
          bind:image={formData.coverImage}
          title="Click para subir una imagen de portada"
          subTitle="Se admite cualquier formato de imagen"
        />
        {#each formData.images as img}
          <ImageInput
            bind:image={img}
            title="Click para subir una imagen del carrusel"
            subTitle="Se admite cualquier formato de imagen"
          />
        {/each}
      </div>
    </div>
  </form>

  <SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
