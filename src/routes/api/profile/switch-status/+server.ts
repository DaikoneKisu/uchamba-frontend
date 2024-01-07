import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export async function POST({ fetch }: { fetch: typeof window.fetch }) {
  const url = `${BACKEND_BASE_URL}/users/change-status`
  const response = await fetch(url, {
    method: 'POST'
  })

  const responseData = (await response.json()) as unknown

  if (!response.ok) return json(responseData, { status: response.status })

  return json(responseData)
}
