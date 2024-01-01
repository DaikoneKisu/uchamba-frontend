<script lang="ts">
  import { page } from '$app/stores'

  import CVModal from './CVModal.svelte'
  import { careers } from '../../careers.store'
  import { cv } from './cv.store'

  import pencilIcon from '$lib/icons/pencil.svg'

  let careerId = $page.url.searchParams.get('career') ?? 0
  let cvName = $page.url.searchParams.get('name') ?? ''

  let openedModal = false

  function openModal() {
    openedModal = true
  }

  $: if ($cv.careerId) careerId = $cv.careerId
  $: if ($cv.name) cvName = $cv.name
</script>

<header class="flex min-w-[21.59cm] items-center justify-center gap-12">
  <div class="flex flex-col items-center">
    <h2>Preview CV · {careerId ? $careers[Number(careerId)] : '(Área del CV)'}</h2>
    <h3>{cvName ? cvName : '(Nombre de tu CV)'}</h3>
  </div>
  <button on:click={openModal}>
    <img src={pencilIcon} alt="Editar CV" />
  </button>
</header>

<CVModal bind:isOpen={openedModal} />
