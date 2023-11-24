<script lang="ts">
	import addIcon from '$lib/icons/add.svg'

	export let clickHandler: () => void
</script>

<button on:click={clickHandler} class="flex items-end gap-1">
	<img src={addIcon} alt="Añadir enlace de interés" />
	<p class="text-xl font-semibold font-poppins">Añadir</p>
</button>
