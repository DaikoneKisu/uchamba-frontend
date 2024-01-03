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
	class="flex flex-col w-[360px]"
	method="POST"
	use:enhance
	novalidate
	on:submit
	on:input
>
	<InputWithIcon
		name="email"
		type="email"
		placeholder="Ej pflorez.20@est.ucab.edu.ve"
		label="Correo electrónico"
		bind:value={email}
		src={emailIcon}
		required
	/>
	<div class="text-red-500 text-sm ml-4 my-1 text-left h-6">
		{#if emailError}
			<strong in:slide out:slide>{emailError}</strong>
		{/if}
	</div>
	<PasswordInput
		name="password"
		placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
		label="Contraseña"
		bind:value={password}
	/>
	<div class="text-red-500 text-sm ml-4 my-1 text-left h-6">
		{#if passwordError}
			<strong in:slide out:slide>{passwordError}</strong>
		{/if}
	</div>
	{#if disabled}
		<button
			type="submit"
			class="mt-4 bg-ucab-green/50 text-brand-white/50 rounded-[10px] w-[330px] h-[64px] m-auto shadow-inner"
			disabled
		>
			Continuar
		</button>
	{:else}
		<button type="submit" class="w-[330px] h-16 bg-green-700 text-white rounded-[10px] shadow">
			Continuar
		</button>
	{/if}
</form>
