<script lang="ts">
	import InputWithIcon from '$lib/components/input-with-icon/InputWithIcon.svelte'
  import PasswordInput from '$lib/components/password-input/PasswordInput.svelte';

	import emailIcon from '$lib/icons/email.svg'

	let email: string
	let password: string
</script>

<form 
  aria-label="form" 
  class="flex flex-col gap-5 min-w-[400px]"
  method="POST"
>
	<InputWithIcon
    name="email"
		type="email"
		placeholder="johndalton@est.ucab.edu.ve"
		label="Correo electrónico"
		bind:value={email}
		src={emailIcon}
	/>
	<PasswordInput
    name="password"
		placeholder=""
		label="Contraseña"
		bind:value={password}
	/>
	<button
		type="submit"
		class="mt-5 bg-ucab-green text-brand-white rounded-[10px] w-[330px] h-[64px] m-auto"
	>
    Continuar
  </button>
</form>
