import { writable } from 'svelte/store'

import type { ErrorToastOptions } from '$lib/types/error-toast-options.type'

type ErrorStoreToastOptions = Omit<ErrorToastOptions, 'position'>

function createErrorToast() {
	const { subscribe, set, update } = writable<ErrorStoreToastOptions | undefined>()

	return {
		subscribe,
		_id: (id: string) => update((opts) => (opts ? { ...opts, id } : opts)),
		launch: (opts: ErrorStoreToastOptions) => set(opts),
		clearStore: () => set(undefined)
	}
}

export const errorToast = createErrorToast()
