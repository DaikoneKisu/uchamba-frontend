<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import pencilIcon from '$lib/icons/pencil.svg'
	import deleteIcon from '$lib/icons/delete.svg'
	import LanguageCreationModal from './LanguageCreationModal.svelte'
	import LanguagesDetailsModal from './LanguagesDetailsModal.svelte'
	import { flip } from 'svelte/animate'
	import DeleteModal from '$lib/components/profile/modal/DeleteModal.svelte'
	import { invalidateAll } from '$app/navigation'

	export let languages: {
		languageId: number
		name: string
		proficientLevel: string
		createdAt: string
		updatedAt: string
	}[]

	export let langsList: { languageId: number; name: string }[]

	let openedCreationModal = false
	let openedDeleteModal = false
	let openedDetailsModal = false
	let detailsModalMode: 'view' | 'edit' = 'view'

	let langIdToDelete: number

	function openCreationModal() {
		console.log("hola");
		
		openedCreationModal = true
	}

	function openDeleteModal(id: number) {
		langIdToDelete = id
		openedDeleteModal = true
	}

	function openDetailsModal(lang: {
		languageId: number
		name: string
		proficientLevel: string
		createdAt: string
		updatedAt: string
	}) {
		detailsModalMode = 'view'
		selectedLanguageDetails = { ...lang }
		openedDetailsModal = true
	}

	function openEditModal(lang: {
		languageId: number
		name: string
		proficientLevel: string
		createdAt: string
		updatedAt: string
	}) {
		detailsModalMode = 'edit'
		selectedLanguageDetails = { ...lang }
		openedDetailsModal = true
	}

	let selectedLanguageDetails = {
		languageId: 0,
		name: '',
		proficientLevel: '',
		createdAt: '',
		updatedAt: ''
	}

	async function handleDelete() {
		try {
			const res = await fetch('/api/profile/education/languages/delete', {
				method: 'POST',
				body: JSON.stringify({ id: langIdToDelete })
			})
			if (!res.ok) throw new Error('Error al eliminar la formación académica')

			invalidateAll()
			closeDeleteModal()
		} catch (error) {
			alert(error)
		}
	}

	function closeDeleteModal() {
		openedDeleteModal = false
	}
</script>

<article class="bg-brand-white flex-col w-full">
	<header>
		<div class="flex justify-between w-full">
			<h2>Proyectos Realizados</h2>
			<Add clickHandler={openCreationModal} />
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex flex-col gap-8 mt-6">
		{#each languages as lang (lang.languageId)}
			<li animate:flip class="flex flex-col gap-2">
				<div class="flex justify-between">
					<h3 class="text-2xl font-poppins">{lang.name}</h3>

					<div class="flex gap-6">
						<button
							on:click={() => {
								openEditModal(lang)
							}}
						>
							<img src={pencilIcon} alt="Editar estudio" />
						</button>
						<button
							on:click={() => {
								openDeleteModal(lang.languageId)
							}}
						>
							<img src={deleteIcon} alt="Eliminar estudio" />
						</button>
					</div>
				</div>
				<p class="text-brand-p-black">
					Nivel {lang.proficientLevel}
				</p>

				<button
					on:click={() => {
						openDetailsModal(lang)
					}}
					class="text-left text-ucab-green underline underline-offset-2"
				>
					Ver Información
				</button>
			</li>
		{/each}
	</ul>
</article>

<LanguagesDetailsModal
	bind:openedModal={openedDetailsModal}
	langData={selectedLanguageDetails}
	bind:mode={detailsModalMode}
	{langsList}
/>
<LanguageCreationModal bind:openedModal={openedCreationModal} {langsList} />
<DeleteModal
	title="¿Seguro que deseas eliminar este idioma de tu lista?"
	bind:isOpen={openedDeleteModal}
	{handleDelete}
/>
