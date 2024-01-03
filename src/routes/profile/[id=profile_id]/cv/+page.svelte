<script lang="ts">
  import Add from '$lib/components/profile/add/Add.svelte'
  import CVModal from './CVModal.svelte'

  export let data

  let openedModal = false

  function openModal() {
    openedModal = true
  }
</script>

<article class="flex w-full flex-col items-center justify-between gap-16 px-16 pb-28 pt-8">
  <header class="w-full">
    <div class="flex w-full justify-between">
      <h2>Colección de CV</h2>
      {#if data.isEditable}
        <Add clickHandler={openModal} />
      {/if}
    </div>
    <div class="mt-2 h-1 w-full bg-ucab-blue" />
  </header>
</article>

<CVModal bind:isOpen={openedModal} />
