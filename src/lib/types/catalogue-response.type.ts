import type { Paginate } from './paginate.type'
import type { CatalogueInfo } from './catalogue-info.type'
import type { Suggestions } from './suggestions.type'

export interface CatalogueResponse {
  paginate: Paginate
  suggestions: Suggestions
  items: CatalogueInfo[]
}
