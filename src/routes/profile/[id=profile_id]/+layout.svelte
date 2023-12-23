<script lang="ts">
	import pencilIcon from '$lib/icons/pencil.svg'
	import Header from './Header.svelte'
	import PersonalInformation from './PersonalInformation.svelte'
	import PersonalLinks from './PersonalLinks.svelte'

	export let data

	let disabledExport = false

	async function exportCV() {
		try {
			disabledExport = true
			const res = await fetch(`/api/profile/generate-cv`, {
				method: 'POST',
				body: JSON.stringify({ id: data.userId })
			})

			const pdfBlob = await res.blob()

			downloadPDF(pdfBlob)
		} catch (e) {
			alert(e)
		} finally {
			disabledExport = false
		}
	}

	function downloadPDF(pdfBlob: Blob) {
		const url = window.URL.createObjectURL(pdfBlob)

		const link = document.createElement('a')
		link.href = url
		link.download = 'CV.pdf'
		link.click()
	}
</script>

<main class="flex gap-10 min-h-screen p-10 pt-12 bg-[#f0f0f0]">
	<div class="flex flex-col gap-12 justify-center items-center h-full w-full max-w-[465px]">
		<section
			class="flex flex-col gap-7 justify-center items-center bg-brand-white w-full pb-12 rounded-[20px]"
		>
			<div
				class="w-full h-full flex flex-col justify-center items-center gap-2 text-brand-white pt-10 pb-28 bg-ucab-green rounded-[10px] rounded-bl-[150px]"
			>
				<h2 class="text-center text-2xl font-poppins">{data.name}</h2>
				<p class="text-lg w-[360px] font-open-sans">{data.aboutMe}</p>
			</div>
			<PersonalInformation {data} />
		</section>

		<PersonalLinks links={data.personalLinks} isEditable={data.isEditable} />

		<button
			on:click={exportCV}
			disabled={disabledExport}
			class="bg-ucab-green text-brand-white rounded-[10px] w-full h-[61px] m-auto shadow-xl hover:shadow-emerald-200 hover:shadow-lg hover:bg-green-600 transition-all duration-200 disabled:opacity-50"
			>Exportar mi CV</button
		>
	</div>

	<section class="w-full flex flex-col items-center bg-brand-white rounded-[10px]">
		<Header />

		<slot />
	</section>
</main>
