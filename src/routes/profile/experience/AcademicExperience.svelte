<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import pencilIcon from '$lib/icons/pencil.svg'
	import deleteIcon from '$lib/icons/delete.svg'
	import ExperienceCreationModal from './ExperienceCreationModal.svelte'
	import ExperienceDetailsModal from './ExperienceDetailsModal.svelte'
	import ExperienceEditionModal from './ExperienceEditionModal.svelte'

	export let business: {
		workExpId: number
		organizationName: string
		jobTitle: string
		description: string
		address: string
		entryDate: string
		departureDate: string
		createdAt: string
	}[]

	let openedcreationModal = false
	let openedDetailsModal = false
	let openedEditionModal = false

	function opencreationModal() {
		openedcreationModal = true
	}

	function openDetailsModal(busines: {
	  "workExpId":number
      "organizationName":string
      "jobTitle":string,
      "description": string,
      "address":string,
      "entryDate": string,
      "departureDate":string,
      "createdAt": string
	}) {
		selectedExperienceDetails = busines
		openedDetailsModal = true
	}

	function openEditionModal(busines: {
	  "workExpId":number
      "organizationName":string
      "jobTitle":string,
      "description": string,
      "address":string,
      "entryDate": string,
      "departureDate":string,
      "createdAt": string
	}) {
		selectedExperienceEdition = busines
		openedEditionModal = true
	}



	let selectedExperienceDetails = {
		workExpId: 0,
		organizationName:'',
		jobTitle:'',
		description:'',
		address:'',
		entryDate:'',
		departureDate:'',
		createdAt:'',
	}

	let selectedExperienceEdition = {
		workExpId: 0,
		organizationName:'',
		jobTitle:'',
		description:'',
		address:'',
		entryDate:'',
		departureDate:'',
		createdAt:'',
	}

</script>

<article class="bg-brand-white flex-col w-full">
	<header>
		<div class="flex justify-between w-full">
			<h2>Experiencia Laboral</h2>
			<Add clickHandler={opencreationModal} />
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex flex-col gap-8 mt-6">
		{#each business as busines}
			<li class="flex flex-col gap-2">
				<div class="flex justify-between items-center">
					<h3 class="text-2xl font-poppins">{busines.organizationName}</h3>
					<div class="flex gap-6">
						<button
						on:click={() => {
							openEditionModal( busines)
						}}
						>
							<img src={pencilIcon} alt="Editar estudio" />
						</button>
						<button>
							<img src={deleteIcon} alt="Eliminar estudio" />
						</button>
					</div>
				</div>

				<p class="font-bold font-open-sans text-ucab-black">{busines.jobTitle}</p>
				<p class="font-open-sans text-brand-p-black">{busines.description}</p>
				<p>{busines.address}</p>

				<div class="flex justify-start items-center mt-2">
					<button
						on:click={() => {
							openDetailsModal( busines)
						}}
						class="text-left text-ucab-green underline underline-offset-2"
					>
						Ver Información
					</button>
				</div>
			</li>
		{/each}
	</ul>
</article>

<ExperienceDetailsModal bind:openedModal={openedDetailsModal} businesData={selectedExperienceDetails} />
<ExperienceCreationModal bind:openedModal={openedcreationModal} />
<ExperienceEditionModal bind:openedModal = {openedEditionModal} businesData={selectedExperienceDetails} />
