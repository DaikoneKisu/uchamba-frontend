import { writable } from 'svelte/store'

interface CatalogueSearches {
	name: string
}

function createSearches() {
	const { subscribe, set } = writable<CatalogueSearches>({ name: '' })

	return {
		subscribe,
		set: (search: CatalogueSearches) => set(search)
	}
}

export const searches = createSearches()
