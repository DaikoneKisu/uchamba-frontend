<script lang="ts">
  import type { Tasks } from '$lib/types/profile-data.type'
  import { scale } from 'svelte/transition'

  import languageIcon from '$lib/icons/language.svg'
  import learningIcon from '$lib/icons/learning.svg'
  import staffIcon from '$lib/icons/staff.svg'
  import businessIcon from '$lib/icons/business.svg'
  import cvIcon from '$lib/icons/cv.svg'

  export let tasks: Tasks
</script>

<article class="flex flex-col gap-3 rounded-[20px] bg-brand-white px-8 pb-8 pt-6 font-poppins">
  {#if tasks.experience || tasks.hardSkill || tasks.language || tasks.softSkill}
    <h3 class="text-[20px] font-bold">
      ¡Completa la información necesaria para que puedas crear tu CV!
    </h3>

    <figure class="flex flex-col gap-3">
      <figcaption>Te falta información de:</figcaption>

      <ul class="contents">
        {#if tasks.language}
          <li transition:scale class="flex items-center gap-2">
            <img src={languageIcon} alt="" class="aspect-square w-[30px]" />1 Idioma
          </li>
        {/if}
        {#if tasks.hardSkill}
          <li transition:scale class="flex items-center gap-2">
            <img src={learningIcon} alt="" class="aspect-square w-[30px]" />1 Habilidad dura
          </li>
        {/if}
        {#if tasks.softSkill}
          <li transition:scale class="flex items-center gap-2">
            <img src={staffIcon} alt="" class="aspect-square w-[30px]" />1 Habilidad blanda
          </li>
        {/if}
        {#if tasks.experience}
          <li transition:scale class="flex items-center gap-2">
            <img src={businessIcon} alt="" class="aspect-square w-[30px]" />1 Experiencia laboral
          </li>
        {/if}
      </ul>
    </figure>
  {:else if tasks.cv}
    <div class="flex gap-1">
      <img src={cvIcon} alt="" class="aspect-square w-[30px]" />
      <h3 class="px-1 text-[20px] font-bold">¡Ahora puedes crear un CV!</h3>
    </div>

    <p>
      Al crear tu CV se activará tu perfil, el cual permite que los reclutadores te encuentren en el
      catálogo de egresados. Puedes activarlo y desactivarlo cuando quieras.
    </p>
  {/if}
</article>
