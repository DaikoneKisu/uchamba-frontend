export interface CatalogueInfo {
	userId: number
	name: string
	aboutMe: string
	country: string
	state: string
	city: string
	languages: {
		name: string
		proficientLevel: string
	}[]
	skills: {
		hard: string[]
		soft: string[]
	}
	education: string[]
}
