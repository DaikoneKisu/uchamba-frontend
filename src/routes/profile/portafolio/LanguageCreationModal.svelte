<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import './portafolio.css';
	import Input from '$lib/components/input/Input.svelte'
	import languageIcon from '$lib/icons/Portfolio.svg'
	import SaveModalFooter from '../../../lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'

	export let openedModal = false

	let formData = {
		langId: '',
		name: '',
		proficientLevel: '',
		description: '',
		projectUrl: ""
	}
	let formErrors = {
		name: '',
		degree: '',
		description: '',
		projectUrl: ""
	}

	let disabled = false

	async function save() {
		try {
			disabled = true
			const res = await fetch('/api/profile/education/languages/create', {
				method: 'POST',
				body: JSON.stringify(formData)
			})
			if (!res.ok) throw new Error('Error creando el lenguaje')

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
			<input type="text" id="custom-input" placeholder="Ingrese una nueva descripcion" />
		</div>
		

    </div>
</form>


	<SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
