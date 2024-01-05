import { BACKEND_BASE_URL } from '$env/static/private'

export async function POST({ request }: { request: Request }) {
  const { id } = (await request.json()) as { id: string }
  const res = await fetch(`${BACKEND_BASE_URL}/generar-cv/${id}`, {
    method: 'GET'
  })

  return res
}
