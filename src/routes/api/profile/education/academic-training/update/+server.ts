import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export interface AcademicTrainingCreationPayload {
  id: number
  name: string
  universityName: string
  degree: string
  graduationYear: string
}

export async function PUT({ request, fetch }: { request: Request; fetch: typeof window.fetch }) {
  const formData = (await request.json()) as AcademicTrainingCreationPayload
  const url = `${BACKEND_BASE_URL}/foreign-studies/${formData.id}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const responseData = (await response.json()) as unknown

  if (!response.ok) return json(responseData, { status: response.status })

  return json(responseData)
}
