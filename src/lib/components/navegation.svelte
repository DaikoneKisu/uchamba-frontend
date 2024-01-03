<script lang="ts">
	import { onMount } from 'svelte'

	let currentPath: string = window.location.pathname

	onMount(() => {
		window.addEventListener('popstate', () => {
			currentPath = window.location.pathname
		})
	})
</script>

<header class="w-full">
	<nav class="flex justify-between items-center bg-white p-2 rounded-[10px] mb-0">
		<a
			href="/prueba1"
			class="relative w-[275px] h-[37px] text-center text-black text-[15px] font-bold font-['Source Sans Pro'] leading-[37.50px]"
		>
			Página Principal
			{#if currentPath === '/prueba1'}
				<div
					class="w-[35.03px] h-[2px] bg-yellow-400 absolute bottom-0 left-[50%] transform -translate-x-1/2"
				/>
			{/if}
		</a>
		<a
			href="/catalogue"
			class="relative w-[275px] h-[37px] text-center text-black text-[15px] font-bold font-['Source Sans Pro'] leading-[37.50px]"
		>
			Catálogo
			{#if currentPath === '/catalogue'}
				<div
					class="w-[35.03px] h-[2px] bg-yellow-400 absolute bottom-0 left-[50%] transform -translate-x-1/2"
				/>
			{/if}
		</a>
		<a
			href="/prueba2"
			class="relative w-[275px] h-[37px] text-center text-black text-[15px] font-bold font-['Source Sans Pro'] leading-[37.50px]"
		>
			Iniciar Sesión
			{#if currentPath === '/prueba2'}
				<div
					class="w-[35.03px] h-[2px] bg-yellow-400 absolute bottom-0 left-[50%] transform -translate-x-1/2"
				/>
			{/if}
		</a>
	</nav>
</header>
