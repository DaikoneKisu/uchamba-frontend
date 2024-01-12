<script lang="ts">
	import Checkbox from '$lib/components/Checkbox/Checkbox.svelte'
	import Dropdown from './Dropdown.svelte'
	import { suggestions } from '$lib/stores/suggestions'
	import { careersFilter } from '$lib/stores/filters'

	function addCareer(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement
		},
		careerId: number
	) {
		if (e.currentTarget.checked) {
			careersFilter.add(careerId)
		} else {
			careersFilter.delete(careerId)
		}
	}

	// This is commented because there is a bug in backend with suggestions when sending this filter modifier
	// function addSearchInCV(e: Event & {
	//   currentTarget: EventTarget & HTMLInputElement
	// }) {
	//   if (e.currentTarget.checked) {
	//     careersFilter.add(true)
	//   } else {
	//     careersFilter.delete(true)
	//   }
	// }
</script>

<Dropdown title="Carreras">
	<ul class="flex flex-col gap-5 py-5">
		{#if $suggestions.careers.length === 0}
			<strong class="inline-block pl-4 text-green-700"
				>No hay carreras que cumplan con los otros filtros colocados</strong
			>
			<!-- {:else} 
        This is commented because there is a bug in backend with suggestions
        when sending this filter modifier
			<Checkbox
				form="filters"
				disabled={false}
				text="Buscar en CVs"
				handleChange={(e) => {
					/*
					 * Here I have to disable typescript-eslint's no-unsafe-argument rule
					 * because it keeps saying that e is of type any, and it's easy to go
					 * to Checkbox.svelte component in lib and see that e is being exported
					 * with the expected type and that it's in fact of that type, even
					 * VSCode's intellisense infers it, so yeah, minus points to typescript-eslint
					 */
					/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
					addSearchInCV(e)
				}}
			/> -->
		{/if}
		{#each $suggestions.careers as career}
			<li class="flex items-center gap-5 pl-2">
				<Checkbox
					form="filters"
					disabled={career.total <= 0}
					text={`${career.name} (${career.total})`}
					handleChange={(e) => {
						/*
						 * See previous comment
						 */
						/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
						addCareer(e, career.id)
					}}
				/>
			</li>
		{/each}
	</ul>
</Dropdown>
