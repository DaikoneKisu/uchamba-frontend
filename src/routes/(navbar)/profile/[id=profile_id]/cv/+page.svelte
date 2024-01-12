<script lang="ts">
  import Add from '$lib/components/profile/add/Add.svelte'
  import CVModal from './CVModal.svelte'
  import EditableCVCard from './EditableCVCard.svelte'

  export let data

  let openedModal = false

  function openModal() {
    openedModal = true
  }
</script>

<article class="flex w-full flex-col items-center justify-between gap-10 px-16 pb-28 pt-8">
  <header class="w-full">
    <div class="flex w-full justify-between">
      <h2>Colección de CV</h2>
      {#if data.isEditable}
        <Add clickHandler={openModal} />
      {/if}
    </div>
    <div class="mt-2 h-1 w-full bg-ucab-blue" />
  </header>
  <section class="grid grid-cols-2">
    {#each data.cvs as cv}
      <EditableCVCard {cv} userId={data.userId} userName={data.name} isEditable={data.isEditable} />
    {/each}
  </section>
</article>

<CVModal bind:isOpen={openedModal} />
