<script lang="ts">
	import multiplesCV from '$lib/images/multiples-cvs.png'
	import fileDownloadIcon from '$lib/icons/file-download.svg'
</script>

<article
	class=" w-[316px] h-[319px] flex flex-col items-start justify-start bg-zinc-100 rounded-[10px] m-8"
>
	<figure class="w-full h-[154px]">
		<img
			class="rounded-[10px] border-4 border-gray-300"
			src={multiplesCV}
			alt="Img de referencia CV"
		/>
	</figure>
	<h2 class="brand-h2-black text-xl font-medium ml-3 mt-4">Software Developer</h2>
	<p class="brand-p-black text-base font-normal ml-3">Ingeniería Informática</p>
	<div class="flex w-full px-3 pt-6">
		<button
			on:click={() => alert('Descargando CV')}
			class="flex items-center justify-center h-[45px] w-full rounded-[10px] gap-2 bg-ucab-green text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200"
		>
			<img src={fileDownloadIcon} alt="Icono de descargar CV" />
			<span class="text-white">Descargar CV</span>
		</button>
	</div>
</article>
