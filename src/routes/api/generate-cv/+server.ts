import { BACKEND_BASE_URL } from '$env/static/private'

interface CVGenerationPayload {
  userId: string
  cvId: string
}

export async function POST({ request }: { request: Request }) {
  const { userId, cvId } = (await request.json()) as CVGenerationPayload
  const res = fetch(`${BACKEND_BASE_URL}/generar-cv/user/${userId}/cv/${cvId}`, {
    method: 'GET'
  })

  return res
}
