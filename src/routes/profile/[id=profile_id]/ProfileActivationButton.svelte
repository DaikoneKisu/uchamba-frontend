<script lang="ts">
  export let isActive: boolean
  console.log(isActive)
</script>

{#if isActive}
  <button
    class="h-[59px] w-full max-w-[458] rounded-[10px] border-4 border-red-600 text-red-600 transition-colors hover:bg-red-600 hover:text-brand-white"
    >Desactivar Perfil
  </button>
{:else}
  <button
    class="text-ucabborder-ucab-green hover:bg-ucabborder-ucab-green h-[59px] w-full max-w-[458] rounded-[10px] border-4 border-ucab-green text-ucab-green transition-colors hover:bg-ucab-green hover:text-brand-white"
    >Activar Perfil
  </button>
{/if}
