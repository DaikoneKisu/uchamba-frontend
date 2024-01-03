<script lang="ts">
	import DownButton from '$lib/icons/DownButton.svg'
    import { onMount } from 'svelte'

	let isDropdownVisible = false
	let isMouseOverCerrarSesion = false
	let isMouseOverMiPerfil = false

	function toggleDropdown() {
		isDropdownVisible = !isDropdownVisible
	}

	function shouldShowBackgroundCerrarSesion() {
		return isDropdownVisible && isMouseOverCerrarSesion
	}

	function shouldShowBackgroundMiPerfil() {
		return isDropdownVisible && isMouseOverMiPerfil
	}

	onMount(() => {
		//lógica de inicialización
	})
</script>

<div class="absolute">
	<button on:click={toggleDropdown} class="focus:outline-none mt-2">
		<img class="w-[48.38px] h-[32.54px]" alt="" src={DownButton} />
	</button>
	{#if isDropdownVisible}
		<div
			class="absolute top-full left-0 mt-4 w-[150px] bg-stone-50 rounded-[10px] border border-black"
		>
			<ul>
				<li>
					<a
						href="/"
						on:mouseenter={() => (isMouseOverCerrarSesion = true)}
						on:mouseleave={() => (isMouseOverCerrarSesion = false)}
					>
						Cerrar Sesión
					</a>
					{#if shouldShowBackgroundCerrarSesion()}
						<div class="w-full h-7 bg-sky-400 bg-opacity-20" />
					{/if}
				</li>
				<li>
					<a
						href="/"
						on:mouseenter={() => (isMouseOverMiPerfil = true)}
						on:mouseleave={() => (isMouseOverMiPerfil = false)}
					>
						Mi Perfil
					</a>
					{#if shouldShowBackgroundMiPerfil()}
						<div class="w-full h-7 bg-sky-400 bg-opacity-20" />
					{/if}
				</li>
			</ul>
		</div>
	{/if}
</div>
