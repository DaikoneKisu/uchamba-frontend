import type { Cookies } from '@sveltejs/kit'

export const load = ({ cookies }: { cookies: Cookies }) => {
	const session = cookies.get('session')

	return {
		isLoggedIn: !(session == null) && session !== ''
	}
}
