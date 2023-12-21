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
		name: '',
		description: '',
		projectUrl: '',
		coverImage: null,
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
		console.log(formData)

		/* 		const form = new FormData();
		form.append('name', project.name);
		form.append('description', project.description);
		form.append('projectUrl', project.projectUrl);
		form.append('images', project.images);
		form.append('coverImage', project.coverImage);
		form.append('imageOpcional', project.imageOpcional);
		try {
			disabled = true
			const res = await fetch(`https://uchamba-backend-staging.1.us-1.fl0.io/projects`, {
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFsZWphbmRybyBSb3NhcyIsImVtYWlsIjoiYWpyb3Nhcy4xOUBlc3QudWNhYi5lZHUudmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIwNjQ5ODIsImV4cCI6MTcwMjkyODk4Mn0.sZYZvKi_gQ0CrkZe3li971QB8jHv5vsrANiROCECgcw'
				},
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
		} */
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

	function goToEditMode() {
		mode = 'edit'
	}

	function closeModal() {
		openedModal = false
	}

	$: if (openedModal) {
		try {
			validateProject(project)
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

	function setFormData() {
		formData = {
			name: project.name,
			description: project.description,
			projectUrl: project.projectUrl,
			coverImage: null,
			images: [...project.images.map(() => null), null],
			deletedImages: []
		}
	}

	$: if (project) {
		setFormData()
	}

	$: {
		const imagesToDeleteQuantity = formData.deletedImages.length
		const imagesToUploadQuantity = formData.images.filter((img) => img instanceof File).length
		const projectImagesQuantity = project.images.length

		if (
			formData.images.every((img) => img instanceof File) ||
			imagesToDeleteQuantity + imagesToUploadQuantity === projectImagesQuantity
		) {
			formData.images.push(null)
		} else if (project.images.length) {
			formData.images = formData.images.filter((img) => img instanceof File)
			formData.images.push(null)
		}
	}
</script>

{#if mode === 'view'}
	<Modal
		title="Proyecto Realizado"
		subtitle="Agrega un nuevo proyecto para añadir a tu CV"
		bind:isOpen={openedModal}
		icon={languageIcon}
	>
		<form slot="body" class="w-full flex px-6 py-12 justify-between">
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
				<div class="w-[calc(100%+140px)] right-[70px] relative">
					<Carousel />
				</div>
			</div>
		</form>

		<EditModalFooter slot="footer" handlePressEdit={goToEditMode} />
	</Modal>
{:else if mode === 'edit'}
	<Modal
		title="Proyecto Realizado"
		subtitle="Edita la información del proyecto"
		bind:isOpen={openedModal}
		icon={languageIcon}
	>
		<form slot="body" class="w-full flex px-6 py-12 justify-between">
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

				<div class="flex justify-evenly items-center flex-wrap gap-y-4">
					<ImageInput
						bind:image={formData.coverImage}
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
