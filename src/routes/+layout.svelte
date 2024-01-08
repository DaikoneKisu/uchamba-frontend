<script lang="ts">
  import '../app.css'

  import { navigating } from '$app/stores'
  import { Toaster } from 'svelte-french-toast'

  import type { SuccessToastOptions } from '$lib/types/success-toast-options.type'
  import type { ErrorToastOptions } from '$lib/types/error-toast-options.type'

  import SuccessToast from '$lib/components/toasts/success-toast/SuccessToast.svelte'
  import ErrorToast from '$lib/components/toasts/error-toast/ErrorToast.svelte'
  import { toast } from '$lib/utils/toast'
  import { successToast } from '$lib/stores/success-toast'
  import { errorToast } from '$lib/stores/error-toast'
  import Loading from '$lib/components/loading/Loading.svelte'

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

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Poppins:wght@500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#if $navigating}
  <Loading />
{/if}
<Toaster />

<slot />
