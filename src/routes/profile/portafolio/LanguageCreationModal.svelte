<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import languageIcon from '$lib/icons/language.svg'
	import SaveModalFooter from '../../../lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'

	export let langsList: { languageId: number; name: string }[]

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
	subtitle="Agrega un nuevo idioma para añadir a tu CV"
	bind:isOpen={openedModal}
	icon={languageIcon}
>
<form slot="body" class="w-full flex pl-6 py-12 justify-between">
    <div class="flex w-full flex-col gap-12">
        <div class="flex w-full gap-12">
            <Input
                type="text"
                label="Instituto o Universidad"
                placeholder="Ingrese el instituto o universidad"
                bind:value={formData.name}
                error={formErrors.name}
            />
            <Input
                type="text"
                label="Fecha de Graduación"
                placeholder="aaaa-mm-dd"
                bind:value={formData.projectUrl}
                error={formErrors.name}
            />
        </div>
        <Input
            type="text"
            label="Nuevo Input"
            placeholder="Este input ocupará todo el ancho"
            className="input-full-width" 
            bind:value={formData.name}
            error={formErrors.name}
        />
    </div>
</form>


	<SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
