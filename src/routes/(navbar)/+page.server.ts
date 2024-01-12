import type { Cookies } from '@sveltejs/kit'

export const actions = {
	deleteSession: ({ cookies }: { cookies: Cookies }) => {
		cookies.delete('session', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			maxAge: 60 * 60 * 24 * 7
		})

		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}
}
