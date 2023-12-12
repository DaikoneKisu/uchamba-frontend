import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export interface AcademicExperienceDeletePayload {
	id: number
}

export async function POST({ request }: { request: Request }) {
	const formData = (await request.json()) as AcademicExperienceDeletePayload
	const url = `${BACKEND_BASE_URL}/work-experiences/${formData.id}`
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkVkdWFyZG8gU3VjcmUiLCJlbWFpbCI6ImVqc3VjcmUuMTlAZXN0LnVjYWIuZWR1LnZlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAyMjY1MDk1LCJleHAiOjE3MDMxMjkwOTV9.908ldtc_d1ftJrboWfSTD8TKHBcrcCCDB4_gUaFYBek'
		}
	})

	const responseData = (await response.json()) as unknown

	console.log(responseData)
	if (!response.ok) return json(responseData, { status: response.status })

	return json(responseData)
}
