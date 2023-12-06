import { BACKEND_BASE_URL } from '$env/static/private'
import { json } from '@sveltejs/kit'

export interface AcademicTrainingDeletePayload {
	id: number
}

export async function POST({ request }: { request: Request }) {
	const formData = (await request.json()) as AcademicTrainingDeletePayload
	const url = `${BACKEND_BASE_URL}/foreign-studies/${formData.id}`
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFsZWphbmRybyBSb3NhcyIsImVtYWlsIjoiYWpyb3Nhcy4xOUBlc3QudWNhYi5lZHUudmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDExMzc5NTMsImV4cCI6MTcwMjAwMTk1M30.3fo6TsWXPSpiK2xJbMn9Qlh9AM7-puxPbxfx1bs8BA0'
		}
	})

	const responseData = (await response.json()) as unknown

	console.log(responseData)
	if (!response.ok) return json(responseData, { status: response.status })

	return json(responseData)
}
