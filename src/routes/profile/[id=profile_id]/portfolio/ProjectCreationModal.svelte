<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import './portafolio.css'
	import Input from '$lib/components/input/Input.svelte'
	import languageIcon from '$lib/icons/Portfolio.svg'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'
	import type { ProjectCreationPayload } from '$lib/profile/portfolio/project-creation-payload.type'

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

			for (const img in formData.images) {
				form.append('images', img)
			}

			if (formData.coverImage) form.append('coverImage', formData.coverImage)

			disabled = true
			const res = await fetch(`https://uchamba-backend-staging.1.us-1.fl0.io/projects`, {
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFsZWphbmRybyBSb3NhcyIsImVtYWlsIjoiYWpyb3Nhcy4xOUBlc3QudWNhYi5lZHUudmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDIwNjQ5ODIsImV4cCI6MTcwMjkyODk4Mn0.sZYZvKi_gQ0CrkZe3li971QB8jHv5vsrANiROCECgcw'
				},
				method: 'POST',
				body: form
			})
			if (!res.ok) throw new Error('Error creando el Proyecto')

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

	function handleImageCoverChange(event: any) {
		const input = event.target
		if (input.files && input.files[0]) {
			const file = input.files[0]
			// Realizar la lógica con el archivo aquí
			if (file) {
				formData.coverImage = file
				console.log(formData.coverImage)
			}
		}
	}

	function handleFileChange(event: any) {
		const input = event.target
		if (input.files && input.files[0]) {
			const file = input.files[0]
			// Realizar la lógica con el archivo aquí
			if (file) {
				formData.images = file
			}
		}
	}
</script>

<Modal
	title="Proyecto Realizado"
	subtitle="Agrega un nuevo proyecto para añadir a tu CV"
	bind:isOpen={openedModal}
	icon={languageIcon}
>
	<form slot="body" class="w-full flex pl-6 py-12 justify-between">
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
					error={formErrors.name}
				/>
			</div>
			<div class="custom-input">
				<label for="custom-input">Descripcion</label>
				<input
					type="text"
					id="custom-input"
					bind:value={formData.description}
					placeholder="Ingrese una nueva descripcion"
				/>
			</div>
			<label>
				Imagen:
				<input type="file" accept="image/*" on:change={handleFileChange} />
			</label>
			<label>
				Imagen Cover:
				<input type="file" accept="image/*" on:change={handleImageCoverChange} />
			</label>
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
