import { BACKEND_BASE_URL } from '$env/static/private'
import { token } from '../../api/token'

export async function load() {
	const langsRes = await fetch(`${BACKEND_BASE_URL}/languages/all`, {
		headers: {
			Authorization: 'Bearer ' + token
		}
	})

	const languages = (await langsRes.json()) as { languageId: number; name: string }[]

	return { langsList: languages }
}
