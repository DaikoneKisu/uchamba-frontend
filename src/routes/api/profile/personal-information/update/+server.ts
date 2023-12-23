import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

interface PersonalInformationEditionPayload {
	aboutMe: string
	phoneNumber: string
	country: string
	state: string
	city: string
	residenceAddress: string
}

export async function PUT({ request, fetch }: { request: Request; fetch: typeof window.fetch }) {
	const formData = (await request.json()) as PersonalInformationEditionPayload
	const url = `${BACKEND_BASE_URL}/users`
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	})

	const responseData = (await response.json()) as unknown

	console.log(responseData)
	if (!response.ok) return json(responseData, { status: response.status })

	return json(responseData)
}
