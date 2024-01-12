<script lang="ts">
	import '../app.css'

	import { navigating } from '$app/stores'
	import { Toaster } from 'svelte-french-toast'

	import type { SuccessToastOptions } from '$lib/types/success-toast-options.type'
	import type { ErrorToastOptions } from '$lib/types/error-toast-options.type'

	import SuccessToast from '$lib/components/toasts/success-toast/SuccessToast.svelte'
	import ErrorToast from '$lib/components/toasts/error-toast/ErrorToast.svelte'
	import Loading from '$lib/components/loading/Loading.svelte'
	import { toast } from '$lib/utils/toast'
	import { successToast } from '$lib/stores/success-toast'
	import { errorToast } from '$lib/stores/error-toast'

	const position = 'top-end'
	const duration = Number.POSITIVE_INFINITY
	const style = 'max-width: 500px; '

	$: if ($successToast) {
		successToast._id(
			toast<SuccessToastOptions>(SuccessToast, {
				duration,
				...$successToast,
				style: style + $successToast.style,
				position
			})
		)
	}

	$: if ($errorToast) {
		errorToast._id(
			toast<ErrorToastOptions>(ErrorToast, {
				duration,
				...$errorToast,
				style: style + $errorToast.style,
				position
			})
		)
	}
</script>

{#if $navigating}
	<Loading />
{/if}
<Toaster />

<slot />
