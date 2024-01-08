import type { Paginate } from './paginate.type'
import type { CatalogueInfo } from './catalogue-info.type'

export interface CatalogueResponse {
	paginate: Paginate
	suggestions: unknown[]
	items: CatalogueInfo[]
}
