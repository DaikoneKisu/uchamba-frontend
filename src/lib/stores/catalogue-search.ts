import { writable } from 'svelte/store'

interface CatalogueSearch {
	name: string
}

function createSearch() {
	const { subscribe, set } = writable<CatalogueSearch>()

	return {
		subscribe,
		set: (search: CatalogueSearch) => set(search)
	}
}

export const search = createSearch()
