<script lang="ts">
	import Pagination from './Pagination.svelte'
	import GraduateCard from './GraduateCard.svelte'
	import type { CatalogueInfo } from '$lib/types/catalogue-info.type'
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

<main class="w-full py-4 px-6 flex flex-col gap-5 bg-white rounded-[0.3125rem]">
	<section class="w-full pl-2">
		<label
			class="flex h-[64px] max-w-[383px] justify-between border-[3px] rounded-xl bg-brand-white pl-4 pr-3 border-[#f0f0f0]"
		>
			<input
				form="filters"
				autocomplete="off"
				name="name"
				class="flex-grow focus:outline-none focus:border-0 focus:shadow-none"
				type="text"
				placeholder="Buscar un egresado por su nombre..."
				on:change={(e) => searches.set({ name: e.currentTarget.value.trim() })}
			/>
			<div class="w-[40px] aspect-[15/11]">
				<img class="w-full h-full" alt="" src={searchIcon} />
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
