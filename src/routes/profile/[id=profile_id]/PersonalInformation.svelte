<script lang="ts">
  import type { ProfileData } from '$lib/types/profile-data.type'
  
  import PersonalInformationEditionModal from './PersonalInformationEditionModal.svelte'
  
  import pencilIcon from '$lib/icons/pencil.svg'

  interface ProfileDataWithIsEditable extends ProfileData {
    isEditable: boolean
  }

  export let data: ProfileDataWithIsEditable

  let openedModal = false

  function openModal() {
    openedModal = true
  }
</script>

<figure class="flex w-full max-w-[420px] flex-col gap-2 pb-12">
  <figcaption
    class="flex w-full justify-between border-b-4 border-ucab-blue pb-2 pr-4 text-left font-poppins text-2xl"
  >
    Información Personal
    {#if data.isEditable}
      <button on:click={openModal}>
        <img src={pencilIcon} alt="Editar información del perfil" />
      </button>
    {/if}
  </figcaption>
  <div class="mt-3 flex justify-between">
    <ul class="flex flex-col gap-4">
      <li>Correo electrónico:</li>
      <li>País:</li>
      <li>Estado:</li>
      <li>Ciudad:</li>
      <li>Dirección:</li>
    </ul>
    <ul class="ml-6 flex flex-grow flex-col gap-4">
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
