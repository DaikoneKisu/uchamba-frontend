import { BACKEND_BASE_URL } from '$env/static/private'

import type { CatalogueResponse } from '$lib/types/catalogue-response.type'

export async function load({ url, fetch }: { url: URL; fetch: typeof window.fetch }) {
	const size = Number(url.searchParams.get('size')) > 0 ? Number(url.searchParams.get('size')) : 3
	const page = Number(url.searchParams.get('page')) > 0 ? Number(url.searchParams.get('page')) : 1
	const name = url.searchParams.get('name') || ''
	const country = url.searchParams.get('country') || ''
	const state = url.searchParams.get('state') || ''
	const city = url.searchParams.get('city') || ''
	const careers = url.searchParams.get('careers') || ''
	const searchInCV = url.searchParams.get('searchInCV') || ''
	const languages = url.searchParams.get('languages') || ''

	async function getCatalogue(size: number = 10, page: number = 1) {
		const catalogue = await fetch(
			`${BACKEND_BASE_URL}/users?page=${page}&size=${size}&name=${name}&country=${country}&state=${state}&city=${city}&careers=${careers}&searchInCV=${searchInCV}&languages=${languages}`
		)
		const catalogueJson = (await catalogue.json()) as CatalogueResponse
		return catalogueJson
	}

	return getCatalogue(size, page)
}
