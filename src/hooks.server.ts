import type { RequestEvent } from '@sveltejs/kit'

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

  return fetch(request)
}
