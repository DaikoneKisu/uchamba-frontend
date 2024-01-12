import { writable } from 'svelte/store'

function createFiltersForm() {
  const { subscribe, set } = writable<HTMLFormElement>()

  return {
    subscribe,
    set: (form: HTMLFormElement) => set(form)
  }
}

export const filtersForm = createFiltersForm()
