<script lang="ts">
	import addIcon from '$lib/icons/add-white.svg'

	export let clickHandler: () => void
</script>

<button on:click={clickHandler} class="flex items-center justify-center pl-5 pr-6 py-1 gap-2 rounded-[10px] bg-ucab-green text-brand-white shadow-lg hover:shadow-emerald-200 hover:shadow-lg hover:bg-green-600 transition-all duration-200 ">
	<img src={addIcon} alt="Añadir enlace de interés" />
	<p class="text-[20px] font-medium font-poppins">Añadir</p>
</button>
