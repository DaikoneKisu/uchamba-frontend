import { createFilterSetStore } from '$lib/utils/create-filter-set-store'

export const languageFilter = createFilterSetStore<number | boolean>()
