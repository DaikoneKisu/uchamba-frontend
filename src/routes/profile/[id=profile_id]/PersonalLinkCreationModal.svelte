<script lang="ts">
	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import externalLinkIcon from '$lib/icons/external-link.svg'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	import { invalidateAll } from '$app/navigation'
	import { validatePersonalLink } from '$lib/profile/personal-links/validate-personal-link'
	import { ValidationError } from 'yup'

	export let openedModal = false

	let formData = {
		name: '',
		url: ''
	}

	let formErrors = {
		name: '',
		url: ''
	}

	let disabled = false

	async function save() {
		try {
			disabled = true
			const res = await fetch('/api/profile/personal-links/create', {
				method: 'POST',
				body: JSON.stringify(formData)
			})

			if (!res.ok) throw new Error('Error al crear el enlace')

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

	$: if (openedModal) {
		try {
			validatePersonalLink(formData)
			disabled = false

			formErrors = {
				name: '',
				url: ''
			}
		} catch (error: unknown) {
			disabled = true
			if (error instanceof ValidationError) {
				const errors = error.inner

				formErrors = {
					name: errors.find((e) => e.path === 'name')?.message ?? '',
					url: errors.find((e) => e.path === 'url')?.message ?? ''
				}
			}
		}
	}

	$: if (!openedModal) {
		formData = {
			name: '',
			url: ''
		}
	}
</script>

<Modal
	title="Link de interés"
	subtitle="Agrega un nuevo link para añadirlo a tu CV"
	bind:isOpen={openedModal}
	icon={externalLinkIcon}
>
	<form slot="body" class="w-full flex pl-6 py-12 justify-between">
		<div class="flex w-full gap-12">
			<Input
				type="text"
				label="Nombre"
				placeholder="Twitter"
				bind:value={formData.name}
				error={formErrors.name}
			/>
			<Input
				type="text"
				label="URL"
				placeholder="Tu enlace"
				bind:value={formData.url}
				error={formErrors.url}
			/>
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
