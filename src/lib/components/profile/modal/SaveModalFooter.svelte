<script lang="ts">
  import saveIcon from '$lib/icons/save.svg'

  export let handleSave: () => void

  export let disabled: boolean
</script>

<footer class="flex w-full justify-end border-t-2 border-[#f3f3f3] pb-3 pr-10 pt-6">
  <button
    {disabled}
    on:click={handleSave}
    class="flex h-[46px] w-full max-w-[181px] items-center justify-center gap-2 rounded-[10px] bg-ucab-green text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200 disabled:opacity-50"
  >
    <img src={saveIcon} alt="" />
    <span>Guardar</span>
  </button>
</footer>
