import type { CatalogueResponse } from '$lib/types/catalogue-response.type'

import { BACKEND_BASE_URL } from '$env/static/private'

export async function load({
	url,
	fetch
}: {
	url: URL
	fetch: typeof window.fetch
}): Promise<CatalogueResponse> {
	const size = Number(url.searchParams.get('size')) > 0 ? Number(url.searchParams.get('size')) : 10
	const page = Number(url.searchParams.get('page')) > 0 ? Number(url.searchParams.get('page')) : 1

	async function getCatalogue(size: number = 10, page: number = 1) {
		const catalogue = await fetch(`${BACKEND_BASE_URL}/users?page=${page}&size=${size}`)
		const catalogueJson = (await catalogue.json()) as CatalogueResponse
		return catalogueJson
	}

	return getCatalogue(size, page)
}
