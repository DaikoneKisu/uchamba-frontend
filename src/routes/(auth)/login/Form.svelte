<script lang="ts">
	import { slide } from 'svelte/transition'
	import { enhance } from '$app/forms'

	import InputWithIcon from '$lib/components/input-with-icon/InputWithIcon.svelte'
	import PasswordInput from '$lib/components/password-input/PasswordInput.svelte'

	import emailIcon from '$lib/icons/email.svg'

	export let disabled = false
	export let email: string
	export let password: string
  export let emailError = ''
  export let passwordError = ''
</script>

<form
	aria-label="form"
	class="flex flex-col gap-5 w-[400px]"
	method="POST"
	use:enhance
	novalidate
  on:submit
  on:input
>
	<InputWithIcon
		name="email"
		type="email"
		placeholder="johndalton@est.ucab.edu.ve"
		label="Correo electrónico"
		bind:value={email}
		src={emailIcon}
		required
	/>
  {#if emailError}
    <strong in:slide out:slide class="text-red-500 text-sm text-center">{emailError}</strong>
  {/if}
	<PasswordInput
		name="password"
		placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
		label="Contraseña"
		bind:value={password}
	/>
  {#if passwordError}
    <strong in:slide out:slide class="text-red-500 text-sm text-center">{passwordError}</strong>
  {/if}
	{#if disabled}
		<button
			type="submit"
			class="mt-5 bg-ucab-green/50 text-brand-white/50 rounded-[10px] w-[330px] h-[64px] m-auto shadow-inner"
			disabled
		>
			Continuar
		</button>
	{:else}
		<button
			type="submit"
			class="mt-5 bg-ucab-green text-brand-white rounded-[10px] w-[330px] h-[64px] m-auto shadow-lg"
		>
			Continuar
		</button>
	{/if}
</form>
