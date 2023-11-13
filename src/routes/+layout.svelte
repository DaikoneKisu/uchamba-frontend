<script lang="ts">
	import '../app.css'
	import { page } from '$app/stores'
	import ucabLogo from '$lib/images/logo-ucab.webp'
	import firstLoginImage from '$lib/images/login-image-one.png'
	import secondLoginImage from '$lib/images/login-image-two.png'
	import SignInLogInSwitchButton from '$lib/sign-in-log-in-switch-button/SignInLogInSwitchButton.svelte'

	let chosen: 'Iniciar sesión' | 'Registrarse' = 'Iniciar sesión'

	$: if ($page.url.pathname === '/sign-up') {
		chosen = 'Registrarse'
	} else if ($page.url.pathname === '/login') {
		chosen = 'Iniciar sesión'
	}
</script>

<main class="min-h-screen flex flex-col items-center justify-start gap-10 pb-24 pt-10">
	<img src={ucabLogo} alt="logo de la ucab" class="max-w-[497px] aspect-[497/75] overflow-hidden" />

	<div class="flex flex-col justify-center items-center">
		<div class="flex flex-col gap-3">
			{#if $page.url.pathname === '/sign-up'}
				<h1 class="text-center font-bold text-5xl">¡Bienvenido!</h1>
				<h2 class="text-center font-semibolf text-xl text-zinc-400">
					A nuestro catálogo de egresados en línea.
				</h2>
			{:else if $page.url.pathname === '/login'}
				<h1>Bienvenido de regreso</h1>
				<h2>A nuestro catálogo de egresados en línea</h2>
			{/if}
		</div>

		<div class="py-10">
			<SignInLogInSwitchButton {chosen} logInUrl="/login" signInUrl="/sign-up" />
		</div>

		<div class="invisible xl:visible -z-10">
			<img src={firstLoginImage} alt="" class="absolute right-72 top-40" />
			<img src={secondLoginImage} alt="" class="absolute bottom-12 left-64" />
		</div>

		<slot />
	</div>
</main>
