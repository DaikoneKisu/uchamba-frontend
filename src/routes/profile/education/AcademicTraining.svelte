<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import pencilIcon from '$lib/icons/pencil.svg'
	import deleteIcon from '$lib/icons/delete.svg'
	import AcademicTrainingCreationModal from './AcademicTrainingCreationModal.svelte'

	export let studies: {
		studyId: number
		name: string
		universityName: string
		degree: string
		graduationDate: string | null
		createdAt: string
		updatedAt: string
	}[]

	let openedModal = false

	function openModal() {
		openedModal = true
	}
</script>

<article class="bg-brand-white flex-col w-full">
	<header>
		<div class="flex justify-between w-full">
			<h2>Formación Académica</h2>
			<Add clickHandler={openModal} />
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>

	<ul class="flex flex-col gap-8 mt-6">
		{#each studies as study}
			<li class="flex flex-col gap-2">
				<div class="flex justify-between">
					<h3 class="text-2xl font-poppins">{study.universityName}</h3>

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
					{study.name} - {study.degree
						.split('')
						.map((c, i) => (i === 0 ? c.toUpperCase() : c))
						.join('')}
				</p>

				{#if study.graduationDate}
					<p>Fecha de graduación {study.graduationDate}</p>
				{:else}
					<p>En curso</p>
				{/if}
			</li>
		{/each}
	</ul>
</article>

<AcademicTrainingCreationModal bind:openedModal />
