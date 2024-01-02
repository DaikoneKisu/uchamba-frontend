<script lang="ts">
	import Header from './Header.svelte'
	import Buscador from '$lib/icons/Buscador.svg'
	import Selector from '$lib/icons/Selector.svg'
	import DownloadCv from '$lib/components/buttons/DownloadCV.svelte'
	import ViewProfile from '$lib/components/buttons/ViewProfile.svelte'
	import type { graduatedInfo } from '$lib/types/graduated-info.type'
	import MultiplesCvModal from './MultiplesCVModal.svelte'

	export let business: graduatedInfo[]
</script>

<main class="flex flex-col gap-10 min-h-screen p-10 pt-5 bg-[#f0f0f0]">
	<header class="w-full">
		<nav class="flex justify-between items-center bg-white p-6 rounded-[10px] mb-0">
			<a href="/" class="font-bold">Pagina Principal</a>
			<a href="/" class="font-bold">Catalogo</a>
			<a href="/" class="font-bold">Iniciar Sesion</a>
		</nav>
	</header>

	<div class="flex flex-col gap-10 flex-grow md:flex-row">
		<div
			class="flex flex-col gap-12 justify-center items-start flex-grow w-full max-w-[400px] mt-0"
		>
			<section
				class="flex flex-col gap-7 justify-center items-center bg-white w-full pb-12 rounded-[10px] flex-grow"
			>
				<div
					class="w-full flex flex-col justify-center items-center gap-2 text-brand-white pt-4 pb-28 bg-ucab-green rounded-[10px] rounded-bl-[150px]"
				>
					<h2 class="text-2xl font-poppins">Filtrar por</h2>
				</div>
			</section>
		</div>

		<section class="w-full flex flex-row items-start bg-white rounded-[10px]">
			<div class="flex flex-col mt-4 ml-8">
				<div
					class="flex items-start border-4 border-gray-300 rounded-xl bg-brand-white pr-4 pl-4 pt-4 pb-2"
				>
					<div class="flex flex-col p-2 w-full">
						<div class="relative">
							<input
								type="text"
								placeholder="Busca un egresado..."
								class="text-sm focus:outline-none focus:border-0 focus:shadow-none w-full pr-24"
							/>
							<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
								<img class="w-[48.38px] h-[32.54px]" alt="" src={Buscador} />
							</div>
						</div>
					</div>
				</div>

				<!-- Mostrando la informacion -->
				<div class="mt-8">
					<ul>
						{#each business as busines}
							<div class="max-w-[434px]">
								<h3 class="w-[434px] h-5 text-black text-xl font-medium leading-relaxed">
									{busines.name}
								</h3>
								<p class="mt-4">
									{busines.address.country} - {busines.address.state} - {busines.address.city}
								</p>
								<!-- <h3>
									{busines.featuredEducations.name} - Educacion -{busines.languages.name} -{busines
										.languages.proficientLevel}
								</h3> -->

								<h3 class="font-semibold whitespace-normal">{busines.aboutMe}</h3>

								<div class="mt-8 ml-0" />
								<DownloadCv />
								<ViewProfile />
								<div class="border-t-2 border-[#f3f3f3] mt-4" />
							</div>
						{/each}
					</ul>
				</div>
			</div>

			<div class="flex flex-col mt-4 ml-36">
				<div
					class="flex items-start border-4 border-gray-300 rounded-xl bg-brand-white pr-4 pl-4 pt-4 pb-2"
				>
					<div class="flex flex-col p-2 w-full">
						<div class="relative" style="width: calc(100% - 24px);">
							<input
								type="text"
								placeholder="Ordenar por"
								class="text-sm focus:outline-none focus:border-0 focus:shadow-none w-full pr-48"
								style="width: 100%;"
							/>
							<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
								<img class="w-[48.38px] h-[32.54px]" alt="" src={Selector} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<MultiplesCvModal />
		</section>
	</div>
</main>
