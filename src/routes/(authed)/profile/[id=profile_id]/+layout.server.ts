import type { ProfileData } from '../../../../types/profile-data.type'
import { BACKEND_BASE_URL } from '$env/static/private'

export async function load({
	fetch,
	params: { id }
}: {
	fetch: typeof window.fetch
	params: { id: string }
}) {
	let res: Response

	const isLoggedUser = id === 'me'

	if (isLoggedUser) {
		res = await fetch(BACKEND_BASE_URL + '/users/me')
	} else {
		res = await fetch(BACKEND_BASE_URL + '/users/' + id)
	}

	const data = (await res.json()) as ProfileData

	return { ...data, isEditable: isLoggedUser }
}
