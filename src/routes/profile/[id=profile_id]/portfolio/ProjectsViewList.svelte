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

<article class="w-full flex-col bg-brand-white">
  <header>
    <div class="flex w-full justify-between">
      <h2>Proyectos Realizados</h2>
    </div>
    <div class="mt-2 h-1 w-full bg-ucab-blue" />
  </header>
  <ul class="m-auto mt-6 grid max-w-4xl grid-cols-2 gap-8">
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
