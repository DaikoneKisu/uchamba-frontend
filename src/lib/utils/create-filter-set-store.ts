import { writable } from 'svelte/store'

export function createFilterSetStore<T extends string | number | boolean>(initialValue?: Set<T>) {
  const { subscribe, set, update } = writable<Set<T>>(initialValue ?? new Set<T>())

  return {
    subscribe,
    add: (filter: T) => update((filterSet) => filterSet.add(filter)),
    delete: (filter: T) =>
      update((filterSet) => {
        filterSet.delete(filter)
        return filterSet
      }),
    has: (filter: T) => {
      let hasFilter = false
      update((filterSet) => {
        hasFilter = filterSet.has(filter)
        return filterSet
      })
      return hasFilter
    },
    clear: () => set(new Set())
  }
}
