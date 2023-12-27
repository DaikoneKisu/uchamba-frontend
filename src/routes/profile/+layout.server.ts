import type { ProfileData } from '$lib/types/profile-data.type'
import { BACKEND_BASE_URL } from '$env/static/private'
import { redirect, type Cookies } from '@sveltejs/kit'

export async function load({
	fetch,
	params: { id },
	cookies,
	url
}: {
	fetch: typeof window.fetch
	params: { id: string }
	cookies: Cookies
	url: URL
}) {
	const isCVEditorPage = url.pathname === '/profile/cv-editor'
	const isLoggedUser = id === 'me'
	const sessionDoesntExist = !cookies.get('session')

	if (isCVEditorPage) {
		const res = await fetch(`${BACKEND_BASE_URL}/users/me`)
		const data = (await res.json()) as ProfileData
		return { ...data, isEditable: true }
	}

	if (isLoggedUser && sessionDoesntExist) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`)
	}

	const res = await fetch(`${BACKEND_BASE_URL}/users/${isLoggedUser ? 'me' : id}`)
	const data = (await res.json()) as ProfileData

	return { ...data, isEditable: isLoggedUser }
}
