<script lang="ts">
  import type { CatalogueInfo } from '$lib/types/catalogue-info.type'

  import Pagination from './Pagination.svelte'
  import GraduateCard from './GraduateCard.svelte'
  import { searches } from '$lib/stores/catalogue-searches'

  import searchIcon from '$lib/icons/search.svg'

  export let graduates: CatalogueInfo[]
  export let total: number
  export let pages: number

  let amountMessage = ''

  $: {
    if (total === 0) {
      amountMessage = 'No hay egresados que cumplan con los filtros'
    } else if (total === 1) {
      amountMessage = 'Hay 1 egresado que cumple con los filtros, se muestra a continuación'
    } else if (total > 1) {
      amountMessage = `Hay ${total} egresados que cumplen con los filtros, se muestran ${graduates.length} en esta página`
    }
  }
</script>

<main class="flex w-full flex-col gap-5 rounded-[0.3125rem] bg-white px-6 py-4">
  <section class="w-full pl-2">
    <label
      class="flex h-[64px] max-w-[383px] justify-between rounded-xl border-[3px] border-[#f0f0f0] bg-brand-white pl-4 pr-3"
    >
      <input
        form="filters"
        autocomplete="off"
        name="name"
        class="flex-grow focus:border-0 focus:shadow-none focus:outline-none"
        type="text"
        placeholder="Buscar un egresado por su nombre..."
        on:change={(e) => searches.set({ name: e.currentTarget.value.trim() })}
      />
      <div class="aspect-[15/11] w-[40px]">
        <img class="h-full w-full" alt="" src={searchIcon} />
      </div>
    </label>
  </section>
  <strong class="inline-block pl-4 text-green-700">{amountMessage}</strong>
  <section class="flex flex-col">
    {#each graduates as graduate}
      <GraduateCard {graduate} />
    {/each}
  </section>
  <Pagination {pages} className="self-center mt-11 mb-16" />
</main>
