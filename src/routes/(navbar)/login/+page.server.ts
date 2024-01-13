import type { Cookies } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'

import { StatusCodes } from '$lib/utils/http-status-codes.js'
import { getSessionData } from '$lib/server/login/get-session-data'
import type { LoginFailData } from './login-fail-data.type.js'

export const actions = {
  default: async ({ cookies, request, url }: { cookies: Cookies; request: Request; url: URL }) => {
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
        return fail<LoginFailData>(StatusCodes.INTERNAL_SERVER_ERROR, {
          reason: 'Error del servidor.',
          solution: 'Por favor, intente de nuevo más tarde.'
        })

      if (e.cause === StatusCodes.UNAUTHORIZED)
        return fail<LoginFailData>(e.cause, {
          reason: 'Email o contraseña incorrectos.',
          solution: 'Por favor, cámbielos y vuelva a intentarlo'
        })

      return fail<LoginFailData>(StatusCodes.INTERNAL_SERVER_ERROR, {
        reason: 'Error del servidor.',
        solution: 'Por favor, intente de nuevo más tarde.'
      })
    }

    if (cookies.get('session')) {
      const redirectTo = url.searchParams.get('redirectTo')
      if (redirectTo && redirectTo !== '/login')
        throw redirect(StatusCodes.SEE_OTHER, `${redirectTo}`)
      throw redirect(StatusCodes.SEE_OTHER, '/profile/me')
    }
  }
}
