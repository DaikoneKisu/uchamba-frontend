import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'
import { token } from '../../../token'

export interface PersonalLinkCreationPayload {
	name: string
	url: string
}

export async function POST({ request }: { request: Request }) {
	const formData = (await request.json()) as PersonalLinkCreationPayload
	const url = `${BACKEND_BASE_URL}/personal-links`
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	})
	const responseData = (await response.json()) as unknown
	console.log(responseData)
	if (!response.ok) return json(responseData, { status: response.status })
	return json(responseData)
}
