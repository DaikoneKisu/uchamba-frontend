import type { Cookies } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import { StatusCodes } from '$lib/utils/http-status-codes.js'

import { getSessionData } from '$lib/server/login/get-session-data'

export const actions = {
	default: async ({ cookies, request }: { cookies: Cookies; request: Request }) => {
		const formData = await request.formData()
    
		try {
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

			const sessionData = await getSessionData(session)
			cookies.set('session', sessionData.token, { path: '/' })
		} catch (e) {
			if (!(e instanceof Error))
				throw new Error('Error inesperado. Por favor, intente de nuevo más tarde.')

			if (e.cause === StatusCodes.UNAUTHORIZED)
				throw error(e.cause, 'Email o contraseña equivocados. Por favor, intente de nuevo.')

			throw error(StatusCodes.INTERNAL_SERVER_ERROR, 'Error del servidor. Por favor, intente de nuevo más tarde.')
		}
	}
}
