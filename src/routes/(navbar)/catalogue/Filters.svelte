<script lang="ts">
  import CareersDropdown from './(filters)/CareersDropdown.svelte'
  import LocationDropdown from './(filters)/LocationDropdown.svelte'
  import LanguagesDropdown from './(filters)/LanguagesDropdown.svelte'
  import HardSkillsDropdown from './(filters)/HardSkillsDropdown.svelte'
  import { filtersForm } from '$lib/stores/filters-form'
</script>

<section class="flex w-full max-w-[378px] flex-col gap-5 rounded-[0.3125rem] bg-brand-white p-4">
  <header class="border-b pb-2 pl-2">
    <h2>Filtrar por</h2>
  </header>
  <form
    data-sveltekit-replacestate
    id="filters"
    class="flex w-full flex-col gap-5"
    action="/catalogue"
    method="GET"
    bind:this={$filtersForm}
    on:submit|preventDefault
  >
    <CareersDropdown />
    <LocationDropdown />
    <LanguagesDropdown />
    <HardSkillsDropdown />
  </form>
</section>
