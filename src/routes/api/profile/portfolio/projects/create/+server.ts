import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export async function POST({ request, fetch }: { request: Request; fetch: typeof window.fetch }) {
  const formData = await request.formData()

  const url = `${BACKEND_BASE_URL}/projects`
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  })
  const responseData = (await response.json()) as unknown
  if (!response.ok) return json(responseData, { status: response.status })
  return json(responseData)
}