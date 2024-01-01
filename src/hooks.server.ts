import { redirect, type RequestEvent } from '@sveltejs/kit'

export async function handleFetch({
  event,
  request,
  fetch
}: {
  event: RequestEvent
  request: Request
  fetch: typeof window.fetch
}) {
  const token = event.cookies.get('session')

  if (token) request.headers.set('Authorization', 'Bearer ' + token)

  const response = await fetch(request)

  if (response.status === 401 && !event.url.pathname.startsWith('/login')) {
    event.cookies.delete('session')
    throw redirect(303, `/login`)
  }

  return response
}
