import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export type HardSkillCreationPayload = string[]

export async function POST({ request, fetch }: { request: Request; fetch: typeof window.fetch }) {
  const formData = (await request.json()) as HardSkillCreationPayload
  const url = `${BACKEND_BASE_URL}/profile-hard-skills`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  const responseData = (await response.json()) as unknown
  if (!response.ok) return json(responseData, { status: response.status })
  return json(responseData)
}
