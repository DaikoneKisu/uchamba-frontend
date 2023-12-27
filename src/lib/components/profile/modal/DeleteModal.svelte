<script lang="ts">
  import Modal from './Modal.svelte'

  export let title: string
  export let isOpen = false
  let disabled = false

  function closeModal() {
    isOpen = false
  }

  export let handleDelete: () => Promise<void> | void
</script>

<Modal bind:isOpen {title}>
  <div slot="body" class="flex w-full items-center justify-center gap-5 py-8">
    <button on:click={closeModal} class="rounded-[10px] bg-slate-200 px-8 py-2 hover:bg-slate-300"
      >Cancelar</button
    >
    <button
      on:click={async () => {
        disabled = true
        await handleDelete()
        disabled = false
      }}
      {disabled}
      class="rounded-[10px] bg-red-600 px-8 py-2 text-brand-white shadow-md transition-all hover:bg-red-500 hover:shadow-red-300 disabled:opacity-50"
      >Eliminar</button
    >
  </div>
</Modal>
