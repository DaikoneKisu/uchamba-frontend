<script lang="ts">
  import Projects from './Projects.svelte'
  import ProjectsViewList from './ProjectsViewList.svelte'

  export let data
</script>

<div class="flex w-full flex-col items-center justify-between gap-16 px-16 pb-28 pt-8">
  {#if data.isEditable}
    <Projects projects={data.projects} />
  {:else}
    <ProjectsViewList projects={data.projects} />
  {/if}
</div>
