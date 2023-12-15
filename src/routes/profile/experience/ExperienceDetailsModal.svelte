<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import business from '$lib/icons/business.svg'
	import { invalidateAll } from '$app/navigation'
	import EditModalFooter from '$lib/components/profile/modal/EditModalFooter.svelte'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	export let openedModal = false

	export let mode: 'view' | 'edit'

	export let businesData: {
		workExpId: number
		organizationName: string
		jobTitle: string
		description: string
		address: string
		entryDate: string
		departureDate: string
		createdAt: string
	}
	export let disabled = false

	function goToEditMode() {
		mode = 'edit'
	}
	function closeModal() {
		openedModal = false
	}

	async function updateExperienceDetails() {
		try {
			disabled = true
			const res = await fetch('/api/profile/experience/academic-experience/update', {
				method: 'POST',
				body: JSON.stringify(businesData)
			})
			if (!res.ok) throw new Error('Error al actualizar la experiencia academica')
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
		title="Experiencia Laboral"
		subtitle="Ver mas informacion sobre la experiencia laboral"
		bind:isOpen={openedModal}
		icon={business}
	>
		<form slot="body" class="w-full flex pl-6 py-12 justify-between">
			<div class="flex flex-col w-full gap-12">
				<Input
					type="text"
					disabled
					label="Organizacion"
					placeholder="Ingrese el instituto o universidad"
					className="text-brand-p-black"
					bind:value={businesData.organizationName}
				/>
				<Input
					type="text"
					disabled
					label="Fecha de entrada"
					placeholder="dd/mm/aaaa"
					className="text-brand-p-black"
					bind:value={businesData.entryDate}
				/>
				<Input
					type="text"
					label="Rol"
					placeholder="Ingrese el rol"
					bind:value={businesData.jobTitle}
				/>
				<Input
					type="text"
					disabled
					label="Descripcion"
					placeholder="Ingrese una breve descripcion"
					className="text-brand-p-black"
					bind:value={businesData.description}
				/>
			</div>

			<div class="flex flex-col w-full items-center gap-12">
				<Input
					type="text"
					disabled
					label="Direccion"
					placeholder="Ingrese la direccion"
					className="text-brand-p-black"
					bind:value={businesData.address}
				/>
				<Input
					type="text"
					disabled
					label="Fecha de salida (opcional)"
					placeholder="dd/mm/aaaa"
					className="text-brand-p-black"
					bind:value={businesData.departureDate}
				/>
			</div>
		</form>
		<EditModalFooter slot="footer" handlePressEdit={goToEditMode} />
	</Modal>
{:else if mode === 'edit'}
	<Modal
		title="Experiencia Laboral"
		subtitle="Ver mas informacion sobre la experiencia laboral"
		bind:isOpen={openedModal}
		icon={business}
	>
		<form slot="body" class="w-full flex pl-6 py-12 justify-between">
			<div class="flex flex-col w-full gap-12">
				<Input
					type="text"
					label="Organizacion"
					placeholder="Ingrese el instituto o universidad"
					className="text-brand-p-black"
					bind:value={businesData.organizationName}
				/>
				<Input
					type="text"
					label="Fecha de entrada"
					placeholder="dd/mm/aaaa"
					className="text-brand-p-black"
					bind:value={businesData.entryDate}
				/>
				<Input
					type="text"
					label="Rol"
					placeholder="Ingrese el rol"
					bind:value={businesData.jobTitle}
				/>
				<Input
					type="text"
					label="Descripcion"
					placeholder="Ingrese una breve descripcion"
					className="text-brand-p-black"
					bind:value={businesData.description}
				/>
			</div>

			<div class="flex flex-col w-full items-center gap-12">
				<Input
					type="text"
					label="Direccion"
					placeholder="Ingrese la direccion"
					className="text-brand-p-black"
					bind:value={businesData.address}
				/>
				<Input
					type="text"
					label="Fecha de salida (opcional)"
					placeholder="dd/mm/aaaa"
					className="text-brand-p-black"
					bind:value={businesData.departureDate}
				/>
			</div>
		</form>
		<SaveModalFooter slot="footer" handleSave={updateExperienceDetails} {disabled} />
	</Modal>
{/if}
