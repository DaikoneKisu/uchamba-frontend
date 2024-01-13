<script lang="ts">
  import type { Curriculum } from '$lib/types/catalogue-info.type'

  import Modal from '$lib/components/catalogue/modal/Modal.svelte'
  import DownloadableCVCard from '$lib/components/catalogue/modal/DownloadableCVCard.svelte'

  import documentsIcon from '$lib/icons/documents.svg'

  export let cvs: Curriculum[]
  export let userName: string
  export let userId: number
  export let openedModal = false

  $: user = {
    userId,
    userName
  }
</script>

<Modal
  title="Colección de CV"
  subtitle="Descarga el CV que mejor se adapte a sus necesidades"
  icon={documentsIcon}
  bind:isOpen={openedModal}
>
  <section slot="body" class="flex flex-wrap items-center justify-start">
    {#each cvs as cv}
      <DownloadableCVCard {cv} {...user} />
    {/each}
  </section>
  <footer
    slot="footer"
    class="flex w-full justify-end border-t-2 border-[#f3f3f3] pb-3 pr-10 pt-6"
  />
</Modal>
