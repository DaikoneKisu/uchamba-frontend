import { BACKEND_BASE_URL } from '$env/static/private'

export async function load({ fetch }: { fetch: typeof window.fetch }) {
	const langsRes = await fetch(`${BACKEND_BASE_URL}/languages/all`, {
		cache: 'reload'
	})

	const languages = (await langsRes.json()) as { languageId: number; name: string }[]

	return { langsList: languages }
}
