<script lang="ts">
  import { enhance } from '$app/forms'

  import InputWithIcon from '$lib/components/input-with-icon/InputWithIcon.svelte'
  import PasswordInput from '$lib/components/password-input/PasswordInput.svelte'

  import emailIcon from '$lib/icons/email.svg'

  export let disabled = false
  export let email: string
  export let password: string
  export let emailError = ''
  export let passwordError = ''

  export let handleInput: () => void
</script>

<form
  aria-label="form"
  class="flex flex-col justify-center gap-3"
  method="POST"
  on:submit={() => (disabled = true)}
  use:enhance
  novalidate
  on:input={handleInput}
>
  <InputWithIcon
    name="email"
    type="email"
    placeholder="mpforero.21@est.ucab.edu.ve"
    label="Correo electrónico"
    bind:value={email}
    src={emailIcon}
    required
    error={emailError}
    autocomplete="email"
  />
  <!-- \u2022 is this char '•' but encoded -->
  <PasswordInput
    name="password"
    placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
    label="Contraseña"
    bind:value={password}
    required
    error={passwordError}
  />
  <button
    class={'mt-3 h-16 max-w-[330px] rounded-[10px] bg-ucab-green font-normal text-brand-white shadow-md shadow-[rgba(0,0,0,0.5)] transition-all ' +
      (disabled ? 'opacity-50 hover:cursor-not-allowed' : '')}
    {disabled}
  >
    Continuar
  </button>
</form>
