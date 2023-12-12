<script lang="ts">
	export let chosen: 'Iniciar sesión' | 'Registrarse'
	export let logInUrl: string
	export let signInUrl: string
</script>

<div class="bg-[#ebebeb] mx-auto rounded-xl w-96 h-14 flex justify-center items-center">
	{#if chosen === 'Registrarse'}
		<button class="rounded-xl w-[49%] h-[85%]">
			<a href={logInUrl}>Iniciar sesión</a>
		</button>
		<button class="rounded-xl w-[49%] h-[85%] bg-white">
			<a href={signInUrl}>Registrarse</a>
		</button>
	{:else if chosen === 'Iniciar sesión'}
		<button class="rounded-xl w-[49%] h-[85%] bg-white">
			<a href={logInUrl}>Iniciar sesión</a>
		</button>
		<button class="rounded-xl w-[49%] h-[85%]">
			<a href={signInUrl}>Registrarse</a>
		</button>
	{/if}
</div>
