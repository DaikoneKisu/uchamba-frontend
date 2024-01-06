<script lang="ts">
	import underConstruction from '$lib/images/Page-under-construction.png'
	import roadblockSign from '$lib/images/Roadblock-sign.png'

	export let messagePrincipal = ''
	export let messageSecondary = ''
</script>

<main class="flex flex-col justify-center items-center h-screen relative">
	<section class="flex flex-col justify-center items-center gap-2">
		<h1 class="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">{messagePrincipal}</h1>
		<h1 class="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">{messageSecondary}</h1>
		<img
			class="w-[290px] h-[170px] md:w-[410px] md:h-[210px] lg:w-[600px] lg:h-[350px]"
			src={underConstruction}
			alt="Pagina bajo construccion img"
		/>
		<h1 class="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">
			¡Gracias por su paciencia!
		</h1>
		<h1 class="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">Seguimos trabajando</h1>
	</section>
	<img
		class="absolute bottom-0 right-0 invisible md:visible md:w-[241px] md:h-[155px] lg:visible lg:w-[321px] lg:h-[200px]"
		src={roadblockSign}
		alt="Señal de parada img"
	/>
</main>
