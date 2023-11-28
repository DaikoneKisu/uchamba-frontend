import { BACKEND_BASE_URL } from '$env/static/private'

export async function load() {
	const langsRes = await fetch(`${BACKEND_BASE_URL}/languages/all`, {
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFsZWphbmRybyBSb3NhcyIsImVtYWlsIjoiYWpyb3Nhcy4xOUBlc3QudWNhYi5lZHUudmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDExMzc5NTMsImV4cCI6MTcwMjAwMTk1M30.3fo6TsWXPSpiK2xJbMn9Qlh9AM7-puxPbxfx1bs8BA0'
		}
	})

	const languages = (await langsRes.json()) as { languageId: number; name: string }[]

	return { langsList: languages }
}
