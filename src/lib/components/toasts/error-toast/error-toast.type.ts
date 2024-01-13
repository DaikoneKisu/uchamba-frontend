import type { Toast } from 'svelte-french-toast'

export type ErrorToast = Toast & {
  reason: string
  solution: string | undefined
}
