<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import languageIcon from '$lib/icons/language.svg'
	import EditModalFooter from '$lib/components/profile/modal/EditModalFooter.svelte'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'

	export let openedModal = false

	export let mode: 'view' | 'edit' = 'view'

	export let langData: {
		languageId: number
		name: string
		proficientLevel: string
		createdAt: string
		updatedAt: string
	}

	function goToEditMode() {
		mode = 'edit'
	}

	function closeModal() {
		openedModal = false
	}

	$: if (!openedModal) mode = 'view'
</script>

{#if mode === 'view'}
	<Modal
		title="Idioma"
		subtitle="Visualiza la información del idioma"
		bind:isOpen={openedModal}
		icon={languageIcon}
	>
		<form slot="body" class="w-full flex pl-6 py-12 justify-between">
			<div class="flex w-full gap-12">
				<Input
					type="text"
					disabled
					label="Idioma"
					placeholder="Ingrese el idioma"
					className="text-brand-p-black"
					bind:value={langData.name}
				/>
				<Input
					type="text"
					disabled
					label="Nivel del idioma"
					placeholder="Ingrese su nivel con el idioma"
					className="text-brand-p-black"
					bind:value={langData.proficientLevel}
				/>
			</div>
		</form>

		<EditModalFooter slot="footer" handlePressEdit={goToEditMode} />
	</Modal>
{:else if mode === 'edit'}
	<Modal
		title="Idioma"
		subtitle="Edita la información del idioma"
		bind:isOpen={openedModal}
		icon={languageIcon}
	>
		<form slot="body" class="w-full flex pl-6 py-12 justify-between">
			<div class="flex w-full gap-12">
				<Input
					type="text"
					label="Idioma"
					placeholder="Ingrese el idioma"
					bind:value={langData.name}
				/>
				<Input
					type="text"
					label="Nivel del idioma"
					placeholder="Ingrese su nivel con el idioma"
					bind:value={langData.proficientLevel}
				/>
			</div>
		</form>

		<SaveModalFooter slot="footer" handleSave={closeModal} />
	</Modal>
{/if}
