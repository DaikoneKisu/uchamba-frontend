<script lang="ts">
	import pencilIcon from '$lib/icons/pencil.svg'
	import saveIcon from '$lib/icons/save.svg'
</script>

<div class="flex justify-around">
	<div class="flex justify-center items-center gap-6">
		<div class="flex flex-col items-center">
			<h2>Preview CV · Ingeniería Informática</h2>
			<h3>Software Developer</h3>
		</div>
		<button>
			<img src={pencilIcon} alt="Editar CV" />
		</button>
	</div>

	<div>
		<button
			class="flex items-center justify-center w-[227px] font-bold bg-ucab-green text-brand-white rounded-[10px] h-[52px] m-auto shadow-xl hover:shadow-emerald-200 hover:shadow-lg hover:bg-green-600 transition-all duration-200 disabled:opacity-50"
		>
			<img src={saveIcon} alt="Guardar CV" class="w-[46px] aspect-[46/33]" />
			<p class="font-semibold">Guardar</p>
		</button>
	</div>
</div>
