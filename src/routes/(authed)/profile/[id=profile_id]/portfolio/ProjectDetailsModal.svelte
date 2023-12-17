<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import languageIcon from '$lib/icons/Portfolio.svg'
	import EditModalFooter from '$lib/components/profile/modal/EditModalFooter.svelte'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'
	import type { Project } from '../../../../../types/profile-data.type'

	export let openedModal = false

	export let mode: 'view' | 'edit'

	export let project: Project

	export let disabled = false

	function goToEditMode() {
		mode = 'edit'
	}

	function closeModal() {
		openedModal = false

	}
	

	function handleImageCoverChange(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Realizar la lógica con el archivo aquí
	  if (file) {
      project.coverImage = file;
	  console.log(project.coverImage);
	  
    }
    }
  }

  function handleFileChangeOpcional(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Realizar la lógica con el archivo aquí
	  if (file) {
      project.imageOpcional = file;
    }
    }
  }

	function handleFileChange(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Realizar la lógica con el archivo aquí
	  if (file) {
      project.images = file;
    }
    }
  }

	async function updateLanguage() {
	console.log(project);

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
</script>

{#if mode === 'view'}
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
					bind:value={project.name}
					error={project.name}
				/>
				<Input
					type="text"
					label="Link (Opcional)"
					placeholder="Ingrese el link del proyecto"
					bind:value={project.projectUrl}
					error={project.name}
				/>
			</div>
			<div class="custom-input">
				<label for="custom-input">Descripcion</label>
				<input type="text" id="custom-input" bind:value={project.description} placeholder="Ingrese una nueva descripcion" />
			</div>
			<img src={project.coverImageUrl} alt="Descripción de la imagen" style="width: 200px; height: 150px;" />

			{#if project.images && project.images.length > 0}
			{#each project.images as image, index}
			  <div>
				<!-- <img src={image.imageUrl} alt={`Imagen ${index + 1}`} /> -->
			<!-- 	<button on:click={() => editImage(index)}>Editar</button>
				<button on:click={() => deleteImage(index)}>Eliminar</button> -->
			  </div>
			{/each}
		  {/if}
			
	
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
	<form slot="body" class="w-full flex pl-6 py-12 justify-between">
		<div class="flex w-full flex-col gap-12">
			<div class="flex w-full gap-12">
				<Input
					type="text"
					label="Proyecto"
					placeholder="Ingrese el nombre del proyecto"
					bind:value={project.name}
					error={project.name}
				/>
				<Input
					type="text"
					label="Link (Opcional)"
					placeholder="Ingrese el link del proyecto"
					bind:value={project.projectUrl}
					error={project.name}
				/>
			</div>
			<div class="custom-input">
				<label for="custom-input">Descripcion</label>
				<input type="text" id="custom-input" value={project.description} placeholder="Ingrese una nueva descripcion" />
			</div>
		</div>
	</form>

		<SaveModalFooter slot="footer" handleSave={updateLanguage} {disabled} />
	</Modal>
{/if}
