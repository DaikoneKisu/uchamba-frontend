import type { ToastOptions } from 'svelte-french-toast'

export type ErrorToastOptions = ToastOptions & {
	reason: string
	solution?: string | undefined
}
