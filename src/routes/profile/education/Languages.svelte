<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import pencilIcon from '$lib/icons/pencil.svg'
	import deleteIcon from '$lib/icons/delete.svg'
	import LanguageCreationModal from './LanguageCreationModal.svelte'
	import LanguagesDetailsModal from './LanguagesDetailsModal.svelte'

	export let languages: {
		languageId: number
		name: string
		proficientLevel: string
		createdAt: string
		updatedAt: string
	}[]

	let openedCreationModal = false
	let openedDetailsModal = false

	function openCreationModal() {
		openedCreationModal = true
	}

	function openDetailsModal(lang: {
		languageId: number
		name: string
		proficientLevel: string
		createdAt: string
		updatedAt: string
	}) {
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
</script>

<article class="bg-brand-white flex-col w-full">
	<header>
		<div class="flex justify-between w-full">
			<h2>Idiomas</h2>
			<Add clickHandler={openCreationModal} />
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex flex-col gap-8 mt-6">
		{#each languages as lang}
			<li class="flex flex-col gap-2">
				<div class="flex justify-between">
					<h3 class="text-2xl font-poppins">{lang.name}</h3>

					<div class="flex gap-6">
						<button>
							<img src={pencilIcon} alt="Editar estudio" />
						</button>
						<button>
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

<LanguagesDetailsModal bind:openedModal={openedDetailsModal} langData={selectedLanguageDetails} />
<LanguageCreationModal bind:openedModal={openedCreationModal} />
