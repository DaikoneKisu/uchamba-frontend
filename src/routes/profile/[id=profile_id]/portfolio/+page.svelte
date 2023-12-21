<script lang="ts">
	import Projects from './Projects.svelte'
	import ProjectsViewList from './ProjectsViewList.svelte'

	export let data
</script>

<div class="w-full flex flex-col justify-between pb-28 items-center pt-8 gap-16 px-16">
	{#if data.isEditable}
		<Projects projects={data.projects} />
	{:else}
		<ProjectsViewList projects={data.projects} />
	{/if}
</div>
