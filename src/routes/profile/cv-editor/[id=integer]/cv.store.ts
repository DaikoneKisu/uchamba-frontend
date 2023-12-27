import { writable } from 'svelte/store'

interface CVPayload {
	careerId: number
	name: string
	entries: {
		education: {
			featured: number[]
			personal: number[]
		}
		experience: number[]
		languages: number[]
		skills: {
			soft: string[]
			hard: string[]
		}
	}
}

export const cv = writable<CVPayload>({
	careerId: 0,
	name: '',
	entries: {
		education: {
			featured: [],
			personal: []
		},
		experience: [],
		languages: [],
		skills: {
			soft: [],
			hard: []
		}
	}
})
