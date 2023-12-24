<script lang="ts">
  import pencilIcon from '$lib/icons/pencil-white.svg'

  export let handlePressEdit: () => void
</script>

<footer class="flex w-full justify-end border-t-2 border-[#f3f3f3] pb-3 pr-10 pt-6">
  <button
    on:click={handlePressEdit}
    class="flex h-[46px] w-full max-w-[181px] items-center justify-center gap-2 rounded-[10px] bg-ucab-green text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200"
  >
    <img src={pencilIcon} alt="" class="-ml-4" />
    <span>Editar</span>
  </button>
</footer>
