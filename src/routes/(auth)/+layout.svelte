<script lang="ts">
	import logoUcab from '$lib/images/logo-ucab.webp'
	import loginOne from '$lib/images/login-one.png'
</script>

<svelte:head>
	<link rel="preload" href={logoUcab} />
	<link rel="preload" href={loginOne} />
</svelte:head>

<div class="flex-grow flex min-[969px]:max-xl:gap-14">
	<main
		class="max-[968px]:w-full max-[968px]:h-full max-[968px]:self-center max-[968px]:mx-auto min-[969px]:basis-1/2 min-[969px]:my-auto flex flex-col items-center"
	>
		<div class="mb-9 max-w-[498px] aspect-[498/75]">
			<img src={logoUcab} alt="logo de la ucab" class="w-full h-full object-fill" />
		</div>
		<div class="mb-12 flex flex-col gap-6 items-center">
			<h1 class="text-center">Bienvenido de regreso</h1>
			<h2 class="text-center max-w-[445px]">A nuestro catálogo de egresados en línea</h2>
		</div>
		<slot />
	</main>
	<div
		class="max-[968px]:hidden max-[968px]:w-0 flex-grow flex justify-center max-h-[calc(100vh-2.5rem)]"
	>
		<img
			class="my-auto h-fit max-h-[calc(100vh-2.5rem)] object-contain rounded-[10px] rounded-bl-[190px]"
			src={loginOne}
			alt=""
		/>
	</div>
</div>
