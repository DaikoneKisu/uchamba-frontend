import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'
import { token } from '../../../../token'

export interface AcademicTrainingDeletePayload {
	id: number
}

export async function POST({ request }: { request: Request }) {
	const formData = (await request.json()) as AcademicTrainingDeletePayload
	const url = `${BACKEND_BASE_URL}/foreign-studies/${formData.id}`
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + token
		}
	})

	const responseData = (await response.json()) as unknown

	console.log(responseData)
	if (!response.ok) return json(responseData, { status: response.status })

	return json(responseData)
}