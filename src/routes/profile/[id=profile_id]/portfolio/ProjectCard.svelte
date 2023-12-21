<script lang="ts">
	import type { Project } from '$lib/types/profile-data.type'

	export let project: Project

	export let handleShowMore = () => {}
</script>

<article class="max-w-[316px] h-[396px] bg-[#F9F9F9] rounded-[10px]">
	<img
		src={project.coverImageUrl}
		alt="Portada"
		class="max-h-[200px] w-full object-cover rounded-t-[10px]"
	/>

	<div class="px-3 mt-3">
		<h3 class="font-poppins font-semibold text-[20px]">{project.name}</h3>
		<a href={project.projectUrl} class="font-poppins font-semibold">{project.projectUrl}</a>
		<p>{project.description}</p>
		<button on:click={handleShowMore} class="text-ucab-green underline">Ver Información</button>
	</div>
</article>
