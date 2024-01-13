<script lang="ts">
  import addIcon from '$lib/icons/add-white.svg'

  export let clickHandler: () => void
  export let altImgText = 'Añadir'
</script>

<button
  on:click={clickHandler}
  class="flex items-center justify-center gap-2 rounded-[10px] bg-ucab-green py-1 pl-5 pr-6 text-brand-white shadow-lg transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200"
>
  <img src={addIcon} alt={altImgText} />
  <p class="font-poppins text-[20px] font-medium">Añadir</p>
</button>
