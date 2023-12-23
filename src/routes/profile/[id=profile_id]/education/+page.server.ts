import { BACKEND_BASE_URL } from '$env/static/private'

interface OptionsLists {
	languages: { languageId: number; name: string }[]
	hard: { hardSkillId: number; name: string }[]
	soft: { softSkillId: number; name: string }[]
}

export async function load({ fetch }: { fetch: typeof window.fetch }) {
	const optionsListsRes = await fetch(`${BACKEND_BASE_URL}/app-info`, {
		cache: 'reload'
	})

	const optionsLists = (await optionsListsRes.json()) as OptionsLists

	return {
		langsList: optionsLists.languages,
		hardSkillsList: optionsLists.hard,
		softSkillsList: optionsLists.soft
	}
}
