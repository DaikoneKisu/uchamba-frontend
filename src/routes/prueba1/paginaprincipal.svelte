<script lang="ts">
	import Navegation from '$lib/components/navegation.svelte'
	import DownButton from '$lib/icons/DownButton.svg'

	import { onMount } from 'svelte';

	let isDropdownVisible = false;
	let isMouseOverCerrarSesion = false;
	let isMouseOverMiPerfil = false;
  
	function toggleDropdown() {
	  isDropdownVisible = !isDropdownVisible;
	}
  
	function shouldShowBackgroundCerrarSesion() {
	  return isDropdownVisible && isMouseOverCerrarSesion;
	}
  
	function shouldShowBackgroundMiPerfil() {
	  return isDropdownVisible && isMouseOverMiPerfil;
	}
  
	onMount(() => {
	  // Puedes agregar lógica de inicialización aquí si es necesario
	});
</script>

<main class="flex flex-col gap-10 min-h-screen p-10 pt-5 bg-[#f0f0f0]">
	<Navegation />
	<div class="relative">
	   <button on:click={toggleDropdown} class="focus:outline-none">
		  <img class="w-[48.38px] h-[32.54px]" alt="" src={DownButton} />
	   </button>
	   {#if isDropdownVisible}
		  <div class="absolute top-full left-0 mt-4 w-[150px] bg-stone-50 rounded-[10px] border border-black">
			 <ul>
				<li>
				   <a 
					  href="/" 
					  on:mouseenter={() => isMouseOverCerrarSesion = true}
					  on:mouseleave={() => isMouseOverCerrarSesion = false}
				   >
					  Cerrar Sesión
				   </a>
				   {#if shouldShowBackgroundCerrarSesion()}
					  <div class="w-full h-7 bg-sky-400 bg-opacity-20"></div>
				   {/if}
				</li>
				<li>
				   <a 
					  href="/" 
					  on:mouseenter={() => isMouseOverMiPerfil = true}
					  on:mouseleave={() => isMouseOverMiPerfil = false}
				   >
					  Mi Perfil
				   </a>
				   {#if shouldShowBackgroundMiPerfil()}
					  <div class="w-full h-7 bg-sky-400 bg-opacity-20"></div>
				   {/if}
				</li>
				<!-- Agrega más elementos según sea necesario -->
			 </ul>
		  </div>
	   {/if}
	</div>
 </main>
 