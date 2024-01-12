import type { Cookies } from '@sveltejs/kit'

export const actions = {
	default: ({ cookies }: { cookies: Cookies }) => {
		cookies.delete('session', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			maxAge: 60 * 60 * 24 * 7
		})
	}
}
