<script lang="ts">
	export let data
</script>

<main class="flex gap-6 min-h-screen p-4">
	<div class="flex flex-col gap-3 justify-center max-w-md h-full">
		<section class="flex flex-col gap-7 justify-center items-center bg-gray-100 px-6 pt-4 pb-8">
			<figure>
				<img
					src={data.personalInformation.img}
					alt="Foto de perfil"
					class="aspect-square object-cover rounded-full w-44"
				/>
				<figcaption class="text-center">{data.personalInformation.name}</figcaption>
			</figure>
			<p>{data.personalInformation.aboutMe}</p>
			<figure class="flex flex-col w-full gap-2">
				<figcaption class="text-center">Información Personal</figcaption>
				<ul class="w-full list-disc px-5">
					<li>
						{data.personalInformation.email}
					</li>
					<li>
						{data.personalInformation.phone}
					</li>
					<li>
						{data.personalInformation.residenceAddress}
					</li>
				</ul>
			</figure>
		</section>

		<section class="bg-gray-100 px-6 pt-2 pb-4">
			<figure class="flex flex-col gap-2">
				<figcaption class="text-center">Enlaces de Interés</figcaption>
				<ul class="w-full list-disc px-5">
					{#each data.linksOfInterest as link}
						<li>
							<a href={link.url}>{link.name}</a>
						</li>
					{/each}
				</ul>
			</figure>
		</section>

		<button class="mt-5 bg-ucab-green text-brand-white rounded-[10px] w-[330px] h-[64px] m-auto">Descargar CV</button>
	</div>

	<section class="w-full flex flex-col items-center justify-between">
		<header class="w-full">
			<nav class="w-full flex items-center justify-center px-5">
				<ul
					class="w-full max-w-3xl flex justify-evenly [&>li]:min-w-[150px] [&>li>a]:py-5 [&>li>a]:text-center"
				>
					<li>
						<a href="/profile/education" class="block w-full h-full">Educación</a>
					</li>
					<li>
						<a href="/profile/experience" class="block w-full h-full">Experiencia</a>
					</li>
					<li>
						<a href="/profile/portfolio" class="block w-full h-full">Portfolio</a>
					</li>
				</ul>
			</nav>
		</header>

		<slot />
	</section>
</main>
