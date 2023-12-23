import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export interface AcademicExperienceCreationPayload {
	workExpId: number
	organizationName: string
	jobTitle: string
	description: string
	address: string
	entryDate: string
	departureDate: string
	createdAt: string
}

export async function POST({ request, fetch }: { request: Request; fetch: typeof window.fetch }) {
	const formData = (await request.json()) as AcademicExperienceCreationPayload
	const url = `${BACKEND_BASE_URL}/work-experiences`
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ ...formData })
	})
	const responseData = (await response.json()) as unknown
	console.log(responseData)
	if (!response.ok) return json(responseData, { status: response.status })
	return json(responseData)
}
