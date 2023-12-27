import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export async function PUT({ request, fetch }: { request: Request; fetch: typeof window.fetch }) {
  const formData = await request.formData()

  const projectId = formData.get('projectId') as string

  formData.delete('projectId')

  const url = `${BACKEND_BASE_URL}/projects/${projectId}`
  const response = await fetch(url, {
    method: 'PUT',
    body: formData
  })
  const responseData = (await response.json()) as unknown
  if (!response.ok) return json(responseData, { status: response.status })
  return json(responseData)
}
