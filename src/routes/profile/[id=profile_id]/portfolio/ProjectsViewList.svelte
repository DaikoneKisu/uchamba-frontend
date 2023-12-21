<script lang="ts">
	import type { Project } from '$lib/types/profile-data.type'
	import ProjectCard from './ProjectCard.svelte'
	import ProjectDetailsModal from './ProjectDetailsModal.svelte'

	export let projects: Project[]

	let selectedProjectsDetails: Project = {
		projectId: 0,
		name: '',
		description: '',
		projectUrl: '',
		coverImageId: '',
		coverImageUrl: '',
		images: []
	}

	let openedModal = false

	function handleShowMore(p: Project) {
		selectedProjectsDetails = p
		openedModal = true
	}
</script>

<article class="bg-brand-white flex-col w-full">
	<header>
		<div class="flex justify-between w-full">
			<h2>Proyectos Realizados</h2>
		</div>
		<div class="h-1 bg-ucab-blue w-full mt-2" />
	</header>
	<ul class="grid grid-cols-2 gap-8 mt-6 max-w-4xl m-auto">
		{#each projects as project}
			<ProjectCard
				{project}
				handleShowMore={() => {
					handleShowMore(project)
				}}
			/>
		{/each}
	</ul>
</article>

<ProjectDetailsModal bind:openedModal project={selectedProjectsDetails} mode="view" />
