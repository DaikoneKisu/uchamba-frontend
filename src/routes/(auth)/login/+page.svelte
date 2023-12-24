<script lang="ts">
  import { ValidationError } from 'yup'
  import { onMount, tick } from 'svelte'
  import { fly } from 'svelte/transition'

  import Form from './Form.svelte'

  import type { LoginFailData } from './login-fail-data.type'
  import { userSchema } from './user-schema'

  export let form: LoginFailData

  let disabled = true
  let email: string
  let emailError: string
  let password: string
  let passwordError: string
  let alert: HTMLDivElement

  $: {
    if (form?.reason) disabled = false
  }

  onMount(async () => {
    await tick()
    disabled = true
  })

  function validateUserInput() {
    emailError = ''
    passwordError = ''

    try {
      userSchema.validateSync({ email, password }, { abortEarly: false })

      disabled = false
    } catch (e) {
      disabled = true

      if (e instanceof ValidationError) {
        const errors = e.inner
        for (const error of errors) {
          if (error.path === 'email' && emailError === '') emailError = error.message
          if (error.path === 'password' && passwordError === '') passwordError = error.message
        }
      }
    }
  }
</script>

<Form
  bind:email
  bind:password
  bind:disabled
  on:submit={() => (disabled = true)}
  {emailError}
  {passwordError}
  on:input={validateUserInput}
/>

{#if form?.reason}
  <div
    bind:this={alert}
    id="alert2"
    in:fly={{ x: 600 }}
    class="fixed bottom-3 right-3 mb-4 flex items-center rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 last:mb-0 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    <svg
      class="me-3 inline h-4 w-4 flex-shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
      />
    </svg>
    <span class="sr-only">Mensaje de error</span>
    <div>
      <p><b class="font-bold">{form.reason}</b> {form.solution}</p>
    </div>
    <button
      on:click={() => {
        alert.remove()
      }}
      type="button"
      class="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
      data-dismiss-target="#alert-2"
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
{/if}
