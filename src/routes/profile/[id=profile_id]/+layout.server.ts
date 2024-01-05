import { redirect, type Cookies } from '@sveltejs/kit'
import { BACKEND_BASE_URL } from '$env/static/private'

import type { ProfileData } from '$lib/types/profile-data.type'

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
  let res: Response

  const accessingMyProfile = id === 'me'
  const sessionDoesntExists = !cookies.get('session')

  if (accessingMyProfile) {
    if (sessionDoesntExists) {
      throw redirect(303, `/login?redirectTo=${url.pathname}`)
    }

    res = await fetch(BACKEND_BASE_URL + '/users/me')
  } else {
    res = await fetch(BACKEND_BASE_URL + '/users/' + id)
  }

  const data = (await res.json()) as ProfileData

  return { ...data, isEditable: accessingMyProfile }
}
