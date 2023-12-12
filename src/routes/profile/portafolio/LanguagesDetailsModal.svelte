<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import languageIcon from '$lib/icons/Portfolio.svg'
	import EditModalFooter from '$lib/components/profile/modal/EditModalFooter.svelte'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'
	import type { Project } from '../../../types/profile-data.type'

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

	async function updateLanguage() {
		try {
			disabled = true
			const res = await fetch('/api/profile/education/languages/update', {
				method: 'POST',
				body: JSON.stringify(project)
			})
			if (!res.ok) throw new Error('Error al actualizar el idioma')
			invalidateAll()
			closeModal()
		} catch (error) {
			alert(error)
		} finally {
			disabled = false
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
