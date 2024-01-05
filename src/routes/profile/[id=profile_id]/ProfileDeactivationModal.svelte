<script lang="ts">
  import Modal from '$lib/components/profile/modal/Modal.svelte'

  export let isOpen: boolean
  export let deactivateProfile: () => Promise<void>

  let disabledDeactivationButton = false

  async function handleClickDeactivationButton() {
    try {
      disabledDeactivationButton = true
      await deactivateProfile()
    } catch (error) {
    } finally {
      disabledDeactivationButton = false
      closeModal()
    }
  }

  function closeModal() {
    isOpen = false
  }
</script>

<Modal bind:isOpen title="¿Seguro que deseas desactivar tu perfil?">
  <section slot="body" class="flex justify-center">
    <p class="max-w-[85%] pb-10 pt-8 text-center font-open-sans text-xl font-bold">
      Al desactivar tu perfil los reclutadores no podrán encontarte en el catálogo de egresados, sin
      embargo, podrás activarlo posteriormente.
    </p>
  </section>
  <section slot="footer" class="flex items-center justify-center gap-5 border-t pb-4 pt-8">
    <button on:click={closeModal} class="h-[46px] w-[181px] rounded-[10px] bg-[#EFEFEF]"
      >Cancelar</button
    >
    <button
      on:click={handleClickDeactivationButton}
      disabled={disabledDeactivationButton}
      class="bg-white-600 h-[46px] w-[181px] rounded-[10px] border-2 border-red-600 text-red-600 transition-colors hover:bg-red-600 hover:text-brand-white disabled:bg-red-600 disabled:text-brand-white disabled:opacity-50"
      >Desactivar Perfil</button
    >
  </section>
</Modal>
