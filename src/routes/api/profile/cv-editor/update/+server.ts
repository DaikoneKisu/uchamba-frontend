import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export interface CVEditionPayload {
  cvId: number
  careerId: number
  name: string
  entries: {
    education: {
      featured: number[]
      personal: number[]
    }
    experience: number[]
    languages: number[]
    skills: {
      soft: string[]
      hard: string[]
    }
  }
}

export async function PUT({ request, fetch }: { request: Request; fetch: typeof window.fetch }) {
  const formData = (await request.json()) as CVEditionPayload

  const url = `${BACKEND_BASE_URL}/user-cvs/${formData.cvId}`
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
