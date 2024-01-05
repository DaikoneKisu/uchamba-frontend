<script lang="ts">
	import { ValidationError } from 'yup'
	import { invalidateAll } from '$app/navigation'

	import Modal from '$lib/components/profile/modal/Modal.svelte'
	import Input from '$lib/components/input/Input.svelte'
	import SaveModalFooter from '$lib/components/profile/modal/SaveModalFooter.svelte'
	import { validatePersonalLink } from '$lib/profile/personal-links/validate-personal-link'

	import externalLinkIcon from '$lib/icons/external-link.svg'

	export let openedModal = false

	let formData = {
		url: ''
	}

	let formErrors = {
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

			const resBody = await res.json()

			if (!res.ok) throw new Error(resBody?.message)

			invalidateAll()
			closeModal()
		} catch (error) {
			if (error instanceof Error && error.message) alert(error.message)
			else alert('Hubo un error en el servidor al intentar crear el link de interés')
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
				url: ''
			}
		} catch (error: unknown) {
			disabled = true
			if (error instanceof ValidationError) {
				const errors = error.inner

				formErrors = {
					url: errors.find((e) => e.path === 'url')?.message ?? ''
				}
			}
		}
	}

	$: if (!openedModal) {
		formData = {
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
	<form slot="body" class="flex w-full justify-center py-12">
		<div class="flex w-full justify-center pl-[30%]">
			<Input
				type="text"
				label="URL"
				placeholder="https://www.tu-enlace.com"
				bind:value={formData.url}
				error={formErrors.url}
			/>
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} {disabled} />
</Modal>
