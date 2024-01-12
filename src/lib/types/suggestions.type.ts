interface CareersSuggestions {
	id: number
	name: string
	total: number
}

interface HardSkillsSuggestions {
	id: number
	name: string
	total: number
}

interface SoftSkillsSuggestions {
	id: number
	name: string
	total: number
}

interface LanguagesSuggestions {
	id: number
	name: string
	proficientLevel: string
	total: number
}

export interface Suggestions {
	careers: CareersSuggestions[]
	skills: {
		hard: HardSkillsSuggestions[]
		soft: SoftSkillsSuggestions[]
	}
	languages: LanguagesSuggestions[]
}
