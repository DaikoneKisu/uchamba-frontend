<script lang="ts">
	import Add from '$lib/components/profile/add/Add.svelte'
	import pencilIcon from '$lib/icons/pencil.svg'
	import deleteIcon from '$lib/icons/delete.svg'
	import AcademicTrainingCreationModal from './AcademicTrainingCreationModal.svelte'

	export let studiesData: {
		featured: {
			ucareerId: number
			name: string
			degree: string
			graduationDate: string
			createdAt: string
		}[]
		personal: {
			studyId: number
			name: string
			universityName: string
			degree: string
			graduationDate: string
			createdAt: string
		}[]
	}

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
		{#each studiesData.featured as featStudy}
			<li class="flex flex-col gap-2">
				<div class="flex justify-between">
					<h3 class="text-2xl font-poppins">Universidad Católica Andrés Bello</h3>

					<div class="flex gap-6" />
				</div>
				<p class="text-brand-p-black">
					{featStudy.name} - {featStudy.degree
						.split('')
						.map((c, i) => (i === 0 ? c.toUpperCase() : c))
						.join('')}
				</p>
				<p>Fecha de graduación: {featStudy.graduationDate}</p>
			</li>
		{/each}
		{#each studiesData.personal as personalStudy}
			<li class="flex flex-col gap-2">
				<div class="flex justify-between">
					<h3 class="text-2xl font-poppins">{personalStudy.universityName}</h3>

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
					{personalStudy.name} - {personalStudy.degree
						.split('')
						.map((c, i) => (i === 0 ? c.toUpperCase() : c))
						.join('')}
				</p>
				<p>Fecha de graduación: {personalStudy.graduationDate}</p>
			</li>
		{/each}
	</ul>
</article>

<AcademicTrainingCreationModal bind:openedModal />
