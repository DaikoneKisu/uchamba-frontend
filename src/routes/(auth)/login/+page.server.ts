import type { Cookies } from '@sveltejs/kit'

import { getSessionData } from '$lib/server/login/get-session-data'

export const actions = {
	default: async ({ cookies, request }: { cookies: Cookies; request: Request }) => {
		const formData = await request.formData()

		const session = await fetch('https://uchamba-backend-staging.1.us-1.fl0.io/auth/login', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password')
			})
		})

		cookies.set('session', (await getSessionData(session)).token, { path: '/' })
	}
}
