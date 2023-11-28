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
		proficientLevel: ''
	}

	async function save() {
		try {
			await fetch('/api/profile/education/languages/create', {
				method: 'POST',
				body: JSON.stringify(formData)
			})
			invalidateAll()
			closeModal()
		} catch (error) {
			alert(error)
		}
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
			<select
				class="flex border-4 border-[#f0f0f0] h-[64px] w-full max-w-[330px] rounded-xl bg-brand-white px-4"
				bind:value={formData.langId}
			>
				<option value="">Seleccione su idioma</option>
				{#each langsList as lang}
					<option value={lang.languageId}>{lang.name}</option>
				{/each}
			</select>
			<select
				class="flex border-4 border-[#f0f0f0] h-[64px] w-full max-w-[330px] rounded-xl bg-brand-white px-4"
				bind:value={formData.proficientLevel}
			>
				<option value="">Seleccione su nivel</option>
				<option value="A1">A1</option>
				<option value="A2">A2</option>
				<option value="B1">B1</option>
				<option value="B2">B2</option>
				<option value="C1">C1</option>
				<option value="C2">C2</option>
			</select>
		</div>
	</form>

	<SaveModalFooter slot="footer" handleSave={save} />
</Modal>
