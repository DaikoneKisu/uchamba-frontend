import { writable } from 'svelte/store'

import type { SuccessToastOptions } from '$lib/types/success-toast-options.type'

type SuccessStoreToastOptions = Omit<SuccessToastOptions, 'position'>

function createSuccessToast() {
  const { subscribe, set, update } = writable<SuccessStoreToastOptions | undefined>()

  return {
    subscribe,
    _id: (id: string) => update((opts) => (opts ? { ...opts, id } : opts)),
    launch: (opts: SuccessStoreToastOptions) => set(opts),
    clearStore: () => set(undefined)
  }
}

export const successToast = createSuccessToast()
