import { writable } from 'svelte/store'

import type { Suggestions } from '$lib/types/suggestions.type'

function createSuggestions() {
	const { subscribe, set } = writable<Suggestions>()

	const cleanSuggestions = {
		careers: [],
		skills: {
			hard: [],
			soft: []
		},
		languages: []
	}

	return {
		subscribe,
		set: (suggestions: Suggestions) => set(suggestions),
		clear: () => set(cleanSuggestions)
	}
}

export const suggestions = createSuggestions()
