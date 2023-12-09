<script lang="ts">
	import Header from './Header.svelte'
	import PersonalLinks from './PersonalLinks.svelte'

	export let data
</script>

<main class="flex gap-10 min-h-screen p-10 pt-12 bg-[#f0f0f0]">
	<div class="flex flex-col gap-12 justify-center items-center h-full w-full max-w-[465px]">
		<section
			class="flex flex-col gap-7 justify-center items-center bg-brand-white w-full pb-12 rounded-[20px]"
		>
			<div
				class="w-full h-full flex flex-col justify-center items-center gap-2 text-brand-white pt-10 pb-28 bg-ucab-green rounded-[10px] rounded-bl-[150px]"
			>
				<h2 class="text-center text-2xl font-poppins">{data.name}</h2>
				<p class="text-lg w-[360px] font-open-sans">{data.aboutMe}</p>
			</div>
			<figure class="flex flex-col w-full gap-2 max-w-[420px]">
				<figcaption class="text-left w-full text-2xl font-poppins border-b-4 border-ucab-blue pb-2">
					Información Personal
				</figcaption>
				<div class="flex justify-between mt-3">
					<ul class="flex flex-col gap-4">
						<li>Correo electrónico:</li>
						<li>Número de contacto:</li>
						<li>Dirección de residencia:</li>
					</ul>
					<ul class="flex flex-col gap-4">
						<li>
							{data.email}
						</li>
						<li>
							{data.phoneNumber}
						</li>
						<li>
							{data.residenceAddress}
						</li>
					</ul>
				</div>
			</figure>
		</section>

		<PersonalLinks links={data.personalLinks} />

		<button class="bg-ucab-green text-brand-white rounded-[10px] w-full h-[61px] m-auto"
			>Exportar mi CV</button
		>
	</div>

	<section class="w-full flex flex-col items-center bg-brand-white rounded-[10px]">
		<Header />

		<slot />
	</section>
</main>
