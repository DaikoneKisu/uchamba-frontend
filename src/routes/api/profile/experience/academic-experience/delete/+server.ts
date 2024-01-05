import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export interface AcademicExperienceDeletePayload {
  id: number
}

export async function DELETE({ request, fetch }: { request: Request; fetch: typeof window.fetch }) {
  const formData = (await request.json()) as AcademicExperienceDeletePayload
  const url = `${BACKEND_BASE_URL}/work-experiences/${formData.id}`
  const response = await fetch(url, {
    method: 'DELETE'
  })

  const responseData = (await response.json()) as unknown

  if (!response.ok) return json(responseData, { status: response.status })

  return json(responseData)
}
