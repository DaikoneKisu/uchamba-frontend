import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export interface PersonalLinkDeletePayload {
  id: number
}

export async function PUT({ request, fetch }: { request: Request; fetch: typeof window.fetch }) {
  const formData = (await request.json()) as PersonalLinkDeletePayload
  const url = `${BACKEND_BASE_URL}/personal-links/${formData.id}`
  const response = await fetch(url, {
    method: 'DELETE'
  })

  const responseData = (await response.json()) as unknown

  if (!response.ok) return json(responseData, { status: response.status })

  return json(responseData)
}
