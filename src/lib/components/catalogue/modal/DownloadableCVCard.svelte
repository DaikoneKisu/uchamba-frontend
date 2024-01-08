<script lang="ts">
	import { slide } from 'svelte/transition'

	import type { Curriculum } from '$lib/types/catalogue-info.type'

	import Loading from '$lib/components/loading/Loading.svelte'
	import { errorToast } from '$lib/stores/error-toast'

	import multiplesCV from '$lib/images/multiples-cvs.png'
	import fileDownloadIcon from '$lib/icons/file-download.svg'

	export let cv: Curriculum
	export let userName: string
	export let userId: number

	let disabledDownloadButton = false
	let isLoading = false

	async function downloadCV() {
		try {
			disabledDownloadButton = true
			isLoading = true
			const res = await fetch('/api/generate-cv', {
				method: 'POST',
				body: JSON.stringify({ cvId: cv.cvId, userId })
			})

			if (!res.ok) throw new Error()

			const file = await res.blob()
			downloadFile(file)
		} catch (e) {
			errorToast.launch({
				reason: 'Ha ocurrido un error en el servidor al intentar descargar el CV.',
				solution: 'Intente de nuevo más tarde.'
			})
		} finally {
			disabledDownloadButton = false
			isLoading = false
		}
	}

	function downloadFile(file: Blob) {
		const a = document.createElement('a')
		a.href = URL.createObjectURL(file)
		a.download = `${userName} - ${cv.name} - CV.pdf`
		a.click()
	}
</script>

{#if isLoading}
	<Loading />
{/if}

<article
	transition:slide
	class=" w-[316px] h-[319px] flex flex-col items-start justify-start bg-zinc-100 rounded-[10px] m-8"
>
	<figure class="w-full h-[154px]">
		<img
			class="rounded-[10px] border-4 border-gray-300"
			src={multiplesCV}
			alt="Img de referencia CV"
		/>
	</figure>
	<h2 class="brand-h2-black text-xl font-medium ml-3 mt-4">{cv.name}</h2>
	<p class="brand-p-black text-base font-normal ml-3">{cv.careerName}</p>
	<div class="flex w-full px-3 pt-6">
		<button
			disabled={disabledDownloadButton}
			on:click={downloadCV}
			class="flex items-center justify-center h-[45px] w-full rounded-[10px] gap-2 bg-ucab-green text-brand-white shadow-xl transition-all duration-200 hover:bg-green-600 hover:shadow-lg hover:shadow-emerald-200 merald-200 disabled:bg"
		>
			<img src={fileDownloadIcon} alt="Icono de descargar CV" />
			<span class="text-white">Descargar CV</span>
		</button>
	</div>
</article>
