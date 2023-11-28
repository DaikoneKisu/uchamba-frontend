import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export interface AcademicTrainingCreationPayload {
	name: string
	universityName: string
	degree: string
	graduationDate: string
}

export async function POST({ request }: { request: Request }) {
	const formData = (await request.json()) as AcademicTrainingCreationPayload
	const url = `${BACKEND_BASE_URL}/foreign-studies`
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFsZWphbmRybyBSb3NhcyIsImVtYWlsIjoiYWpyb3Nhcy4xOUBlc3QudWNhYi5lZHUudmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDExMzc5NTMsImV4cCI6MTcwMjAwMTk1M30.3fo6TsWXPSpiK2xJbMn9Qlh9AM7-puxPbxfx1bs8BA0',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	})

	const responseData = (await response.json()) as unknown

	console.log(responseData)
	if (!response.ok) return json(responseData, { status: response.status })

	return json(responseData)
}
