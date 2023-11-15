<script lang="ts">
	import InputWithIcon from '$lib/input-with-icon/InputWithIcon.svelte'

	import emailIcon from '$lib/icons/email.svg'
	import keyIcon from '$lib/icons/key.svg'

	let email: string
	let password: string
</script>

<form 
  aria-label="form" 
  class="flex flex-col gap-5 min-w-[400px]"
>
	<InputWithIcon
		type="email"
		placeholder="johndalton@est.ucab.edu.ve"
		label="Correo electrónico"
		bind:value={email}
		src={emailIcon}
	/>
	<InputWithIcon
		type="password"
		placeholder=""
		label="Contraseña"
		bind:value={password}
		src={keyIcon}
	/>
	<button
		type="submit"
		aria-label="button"
		class="mt-5 bg-ucab-green text-brand-white rounded-[10px] w-[330px] h-[64px] m-auto"
	>
    Continuar
  </button>
</form>
