<script lang="ts">
  import Modal from '$lib/components/profile/modal/Modal.svelte'
  import Input from '$lib/components/input/Input.svelte'
  import languageIcon from '$lib/icons/Portfolio.svg'
  import EditModalFooter from '$lib/components/profile/modal/EditModalFooter.svelte'
  import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
  import type { Project } from '$lib/types/profile-data.type'
  import ImageInput from '$lib/components/profile/image-input/ImageInput.svelte'
  import Textbox from '$lib/components/profile/textbox/Textbox.svelte'
  import { validateProject } from '$lib/profile/portfolio/validate-project'
  import { ValidationError } from 'yup'
  import type { ProjectEditionPayload } from '$lib/profile/portfolio/project-edition-payload'
  import { invalidateAll } from '$app/navigation'
  import Carousel from '$lib/components/profile/carousel/Carousel.svelte'

  export let openedModal = false

  export let mode: 'view' | 'edit'

  export let disabled = false

  export let project: Project = {
    projectId: 0,
    name: '',
    description: '',
    projectUrl: '',
    coverImageId: '',
    coverImageUrl: '',
    images: []
  }

  let formData: ProjectEditionPayload = {
    projectId: 0,
    name: '',
    description: '',
    projectUrl: '',
    coverImage: null,
    coverImageId: null,
    images: [],
    deletedImages: []
  }

  let formErrors = {
    name: '',
    description: '',
    projectUrl: '',
    coverImage: '',
    images: ''
  }

  async function updateProject() {
    const form = new FormData()
    form.append('name', formData.name)
    form.append('description', formData.description)
    form.append('projectId', String(formData.projectId))
    if (formData.coverImage) form.append('coverImageId', String(formData.coverImageId))

    if (formData.projectUrl) form.append('projectUrl', formData.projectUrl)

    for (const img of formData.images) {
      if (img instanceof File) form.append('images', img)
    }

    if (formData.coverImage) form.append('coverImage', formData.coverImage)

    for (const delImg of formData.deletedImages) {
      form.append('deletedImages', delImg)
    }

    disabled = true
    try {
      disabled = true
      const res = await fetch('/api/profile/portfolio/projects/update', {
        method: 'PUT',
        body: form
      })
      if (!res.ok) throw new Error('Error editando el Proyecto')
      invalidateAll()
      closeModal()
    } catch (error) {
      alert(error)
    } finally {
      disabled = false
    }
  }

  function handleImageChange(event: any, imgId: string) {
    const input = event.target
    const { files } = input

    if (files[0]) {
      if (!formData.deletedImages.includes(imgId)) {
        formData.deletedImages = [...formData.deletedImages, imgId]
      }
    }
  }

  function handleImageDelete(imgId: string) {
    if (!formData.deletedImages.includes(imgId)) {
      formData.deletedImages = [...formData.deletedImages, imgId]
    }
  }

  function handleCoverImageChange(imgId: string) {
    formData.coverImageId = imgId
  }

  function goToEditMode() {
    mode = 'edit'
  }

  function closeModal() {
    openedModal = false
  }

  function setFormData() {
    formData = {
      projectId: project.projectId,
      coverImageId: null,
      name: project.name,
      description: project.description,
      projectUrl: project.projectUrl ?? '',
      coverImage: null,
      images: Array(5).fill(null),
      deletedImages: []
    }
  }

  $: if (project) {
    setFormData()
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
      disabled = false
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

  $: if (project) {
    setFormData()
  }
</script>

{#if mode === 'view'}
  <Modal
    title="Proyecto Realizado"
    subtitle={project.name}
    bind:isOpen={openedModal}
    icon={languageIcon}
  >
    <div
      slot="body"
      class="flex w-full flex-col justify-between gap-4 overflow-x-hidden px-6 py-12"
    >
      <div class="flex w-full flex-col">
        <h3>Descripción</h3>
        <p>
          {project.description}
        </p>
      </div>

      <a href={project.projectUrl} class="text-blue-500">{project.projectUrl}</a>
      <div class="relative right-[70px] mt-5 w-[calc(100%+140px)] overflow-x-hidden">
        <Carousel images={[project.coverImageUrl, ...project.images.map((img) => img.imageUrl)]} />
      </div>
    </div>

    <EditModalFooter slot="footer" handlePressEdit={goToEditMode} />
  </Modal>
{:else if mode === 'edit'}
  <Modal
    title="Proyecto Realizado"
    subtitle="Edita la información del proyecto"
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
            handleChange={() => {
              handleCoverImageChange(project.coverImageId)
            }}
            bind:image={formData.coverImage}
            isDeletable={false}
            imageUrl={project.coverImageUrl}
            title="Click para subir una imagen de portada"
            subTitle="Se admite cualquier formato de imágen"
          />
          {#each formData.images as img, i}
            <ImageInput
              handleChange={(e) => {
                handleImageChange(e, project.images[i]?.imageCloudId)
              }}
              handleDelete={() => {
                handleImageDelete(project.images[i]?.imageCloudId)
              }}
              imageUrl={project.images[i]?.imageUrl}
              title="Click para subir una imagen del carrusel"
              subTitle="Se admite cualquier formato de imágen"
              bind:image={img}
            />
          {/each}
        </div>
      </div>
    </form>

    <SaveModalFooter slot="footer" handleSave={updateProject} {disabled} />
  </Modal>
{/if}
