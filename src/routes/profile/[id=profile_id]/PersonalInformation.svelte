<script lang="ts">
	import pencilIcon from '$lib/icons/pencil.svg'
	import type { ProfileData } from '$lib/types/profile-data.type'
	import PersonalInformationEditionModal from './PersonalInformationEditionModal.svelte'

	export let data: ProfileData

	let openedModal = false

	function openModal() {
		openedModal = true
	}
</script>

<figure class="flex flex-col w-full gap-2 max-w-[420px]">
	<figcaption
		class="flex justify-between text-left w-full text-2xl font-poppins border-b-4 border-ucab-blue pb-2 pr-4"
	>
		Información Personal
		<button on:click={openModal}>
			<img src={pencilIcon} alt="Editar información del perfil" />
		</button>
	</figcaption>
	<div class="flex justify-between mt-3">
		<ul class="flex flex-col gap-4">
			<li>Correo electrónico:</li>
			<li>País:</li>
			<li>Estado:</li>
			<li>Ciudad:</li>
			<li>Dirección:</li>
		</ul>
		<ul class="flex flex-col gap-4 flex-grow ml-6">
			<li>
				{data.email}
			</li>
			<li>
				{data.country}
			</li>
			<li>
				{data.state}
			</li>
			<li>
				{data.city}
			</li>
			<li>
				{data.residenceAddress}
			</li>
		</ul>
	</div>
</figure>

<PersonalInformationEditionModal
	bind:isOpen={openedModal}
	formData={{
		email: data.email,
		country: data.country,
		state: data.state,
		city: data.city,
		residenceAddress: data.residenceAddress,
		aboutMe: data.aboutMe
	}}
/>
