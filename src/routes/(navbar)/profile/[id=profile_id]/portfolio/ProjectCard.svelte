<script lang="ts">
  import type { Project } from '$lib/types/profile-data.type'

  export let project: Project

  export let handleShowMore = () => {}
</script>

<article class="h-[396px] max-w-[316px] rounded-[10px] bg-[#F9F9F9]">
  <img
    src={project.coverImageUrl}
    alt="Portada"
    class="max-h-[200px] w-full rounded-t-[10px] object-cover"
  />

  <div class="mt-3 px-3">
    <h3 class="font-poppins text-[20px] font-semibold">{project.name}</h3>
    {#if project.projectUrl}
      <a href={project.projectUrl} class="font-poppins font-semibold">{project.projectUrl}</a>
    {/if}
    <p>{project.description}</p>
    <button on:click={handleShowMore} class="text-ucab-green underline">Ver Información</button>
  </div>
</article>
