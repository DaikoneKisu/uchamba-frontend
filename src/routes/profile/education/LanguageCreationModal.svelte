<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import languageIcon from '$lib/icons/language.svg'
	import SaveModalFooter from '../../../lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'

	export let openedModal = false

	let formData = {
		universityName: '',
		name: '',
		degree: '',
		graduationDate: ''
	}

	function save() {
		invalidateAll()
		closeModal()
	}

	function closeModal() {
		openedModal = false
	}
</script>

<Modal
	title="Idioma"
	subtitle="Agrega un nuevo idioma para añadir a tu CV"
	bind:isOpen={openedModal}
	icon={languageIcon}
>
	<form slot="body" class="w-full flex pl-6 py-12 justify-between">
		<div class="flex w-full gap-12">
			<Input
				type="text"
				label="Idioma"
				placeholder="Ingrese el idioma"
				bind:value={formData.universityName}
			/>
			<Input
				type="text"
				label="Nivel del idioma"
				placeholder="Ingrese su nivel con el idioma"
				bind:value={formData.graduationDate}
			/>
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} />
</Modal>
