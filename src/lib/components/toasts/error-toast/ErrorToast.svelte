<script lang="ts">
	import { toast as toast_ } from 'svelte-french-toast'

	import type { ErrorToast } from './error-toast.type'

	import { errorToast } from '$lib/stores/error-toast'

	export let toast: ErrorToast

	export const reason = toast.reason
	export const solution = toast.solution
</script>

<div class="flex gap-2 items-center">
	<span class="text-justify"><b>{reason}</b>{solution ?? ''}</span>
	<button
		on:click={() => {
			toast_.dismiss(toast.id)
			errorToast.clearStore()
		}}
		type="button"
		class="-m-1.5 -mr-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg p-1.5 hover:bg-[#f0f0f0] focus:ring-2 focus:ring-[#e9e9e9]"
		aria-label="Close"
	>
		<span class="sr-only">Cerrar mensaje de error</span>
		<svg
			class="h-3 w-3"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 14 14"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
			/>
		</svg>
	</button>
</div>
