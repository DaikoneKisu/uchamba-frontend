<script lang="ts">
	import saveIcon from '$lib/icons/save.svg'

	export let handleSave: () => void
</script>

<footer class="w-full flex justify-end pr-10 border-t-2 border-[#f3f3f3] pt-6 pb-3">
	<button
		on:click={handleSave}
		class="flex items-center justify-center gap-2 max-w-[181px] w-full h-[46px] rounded-[10px] bg-ucab-green text-brand-white shadow-xl hover:shadow-emerald-200 hover:shadow-lg hover:bg-emerald-500 transition-all duration-200"
	>
		<img src={saveIcon} alt="" />
		<span>Guardar</span>
	</button>
</footer>
