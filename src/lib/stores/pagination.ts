import { writable } from 'svelte/store'

interface Pagination {
  route: string
  pages: number
  size: number
  currentPage: number
}

function createPagination() {
  const { subscribe, set } = writable<Pagination>()

  const cleanPagination = {
    route: '',
    pages: 0,
    size: 0,
    currentPage: 1
  }

  return {
    subscribe,
    create: (pagination: Pagination) => set(pagination),
    clear: () => set(cleanPagination)
  }
}

export const pagination = createPagination()
