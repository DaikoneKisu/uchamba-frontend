<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { errorToast } from '$lib/stores/error-toast'
  import { successToast } from '$lib/stores/success-toast'
  import ProfileDeactivationModal from './ProfileDeactivationModal.svelte'

  export let isActive: boolean

  let openedModal = false
  let disabledActivationButton = false

  function openModal() {
    openedModal = true
  }

  async function switchProfileStatus() {
    try {
      const res = await fetch('/api/profile/switch-status', {
        method: 'POST'
      })

      if (!res.ok) throw new Error()

      await invalidateAll()
    } catch (error) {
      if (error instanceof Error && error.message) errorToast.launch({ reason: error.message })
      else
        errorToast.launch({
          reason: 'Hubo un error en el servidor al intentar cambiar el estado del perfil'
        })
    } finally {
    }
  }

  async function handleClickActivationButton() {
    try {
      disabledActivationButton = true
      await switchProfileStatus()
      successToast.launch({ text: 'Tu perfil se ha activado con éxito' })
    } catch (error) {
    } finally {
      disabledActivationButton = false
    }
  }
</script>

{#if isActive}
  <button
    on:click={openModal}
    class="h-[59px] w-full max-w-[458] rounded-[10px] border-4 border-red-600 text-red-600 transition-colors hover:bg-red-600 hover:text-brand-white"
    >Desactivar Perfil
  </button>
{:else}
  <button
    disabled={disabledActivationButton}
    on:click={handleClickActivationButton}
    class="text-ucabborder-ucab-green hover:bg-ucabborder-ucab-green h-[59px] w-full max-w-[458] rounded-[10px] border-4 border-ucab-green text-ucab-green transition-colors hover:bg-ucab-green hover:text-brand-white disabled:bg-ucab-green disabled:text-brand-white disabled:opacity-50"
    >Activar Perfil
  </button>
{/if}

<ProfileDeactivationModal bind:isOpen={openedModal} deactivateProfile={switchProfileStatus} />
